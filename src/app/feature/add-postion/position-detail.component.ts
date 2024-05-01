import { ItemData } from '../../core/models/data';
import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { Select, Store } from '@ngxs/store';
import { PositionState } from 'src/app/core/state/state/position.state';
import { CrudService } from 'src/app/core/crud.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeletePositions, FetchPositionById, GetPositions, SelectNode } from 'src/app/core/state/actions/position.actions';
import { TreeNode } from 'src/app/core/models/tree-nodeData';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SelectionModel } from '@angular/cdk/collections';
import { NzModalService } from 'ng-zorro-antd/modal';


interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id:number
}


@Component({
  selector: 'app-add-postion',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PostionDetailComponent implements OnInit {
  positionInfo?: TreeNode[];
  selectedPositionInfo?: TreeNode[];
  @Select(PositionState.selectStateData) positionInfo$?: Observable<TreeNode[]>;
  @Select(PositionState.selectSelectedPositionData) selectedPositionInfo$?:Observable<TreeNode[]>
  selectedNodeId: number | null = null;
  listOfData: ItemData[] = [];
constructor(
  private router:Router,
   private store: Store,
   private crudservice:CrudService,
   private message: NzMessageService,
   private modalService: NzModalService
  ){

}
  // constructor() { }

  ngOnInit(): void {
    this.store.dispatch(new GetPositions());

    this.positionInfo$?.subscribe((returnData:TreeNode[]) => {
      this.positionInfo = returnData;
      this.dataSource.setData(this.positionInfo)
    })
    console.log('tiiiidii',this.positionInfo)
  }



  // onNodeClick(node: any): void {
  //   this.selectedNodeId = node.id;
  //   console.log('selectedNodeId',this.selectedNodeId);
  //   if (this.selectedNodeId !== null) {
  //     this.store.dispatch(new FetchPositionById(this.selectedNodeId));
  //     this.selectedPositionInfo$?.subscribe((returnData:TreeNode[])=>{
  //       this.selectedPositionInfo = returnData;

  //     })
  // } else {
  //     console.log('error selected node id is null')
  // }

  // }
  onNodeClick(node: any): void {
    this.selectedNodeId = node.id;
    console.log('selectedNodeId', this.selectedNodeId);
    if (this.selectedNodeId !== null) {
      this.store.dispatch(new FetchPositionById(this.selectedNodeId));
      this.selectedPositionInfo$?.subscribe((returnData: TreeNode[] | undefined) => {
        // Check if returnData is defined and not empty
        if (returnData && returnData.length > 0) {
          // Extract children from the first element of the array
          this.selectedPositionInfo = returnData[0].children || [];
        } else {
          console.log('No children found for the selected node');
          this.selectedPositionInfo = []; // Clear the list if no children found
        }
      });
    } else {
      console.log('Error: Selected node id is null');
      this.listOfData = []; // Clear the list if selectedNodeId is null
    }
  }

  updatePosition(id: number) {
    this.crudservice.fetchPositionById(id).subscribe((positionData) => {

      this.router.navigate(['position/create'], { queryParams: { position: JSON.stringify(positionData) } });
    });

  }
  deletePosition(i: number) {

    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this item?',
      nzOkText: 'Yes',

      nzOnOk: () => {
        console.log('Deleting item with ID:', i);
        // Dispatch the delete action here
        this.selectedPositionInfo = this.selectedPositionInfo?.filter(d => d.id !== i);

        this.store.dispatch(new DeletePositions(i)).subscribe(() => {
          window.location.reload();
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel delete')
    });
  }


  add(): void {
    if (this.selectedNodeId !== null) {
      this.router.navigate(['position/create'], { queryParams: { nodeId: this.selectedNodeId } });

    } else {
      // Handle case when no node is selected
      console.error('No node selected.');
      this.message.error('Please Select the Position you want add child!');
      //this.message.warning('First select node')

    }}
  // onNodeClick(node: any): void {
  //   this.selectedNodeId = node.id;
  //   console.log('jjjjj',this.selectedNodeId)
  // }
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    id:node.id,
    level
  });

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  selectListSelection = new SelectionModel<FlatNode>();

  ngAfterViewInit(): void {
    this.treeControl.expandAll();

  }

  getNode(name: string): FlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}


