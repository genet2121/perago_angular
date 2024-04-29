import { ItemData } from './../../core/models/data';
import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit,  } from '@angular/core';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { Select, Store } from '@ngxs/store';
import { PositionState } from 'src/app/core/state/state/position.state';
import { CrudService } from 'src/app/core/crud.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeletePositions, FetchPositionById, GetPositions, SelectNode } from 'src/app/core/state/actions/position.actions';
import { TreeNode } from 'src/app/core/models/tree-nodeData';
import { NzTreeModule } from 'ng-zorro-antd/tree';

;

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id:number
}


@Component({
  selector: 'app-add-postion',
  templateUrl: './add-postion.component.html',
  styleUrls: ['./add-postion.component.scss']
})
export class AddPostionComponent implements OnInit {
  positionInfo?: TreeNode[];
  selectedPositionInfo?: TreeNode[];
  @Select(PositionState.selectStateData) positionInfo$?: Observable<TreeNode[]>;
  @Select(PositionState.selectSelectedPositionData) selectedPositionInfo$?:Observable<TreeNode[]>
  selectedNodeId: number | null = null;
  listOfData: ItemData[] = [];
constructor(private router:Router, private store: Store, private crudservice:CrudService){

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
      this.selectedPositionInfo$?.subscribe((returnData: TreeNode[]) => {
        // Check if returnData is an array and not empty
        if (Array.isArray(returnData) && returnData.length > 0) {
          // Extract children from the first element of the array
          this.selectedPositionInfo = returnData[0].children;
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
  updatePositionn(id: number) {
    this.crudservice.fetchPositionById(id).subscribe((positionData) => {

      this.router.navigate(['/position/detail'], { queryParams: { position: JSON.stringify(positionData) } });
    });

  }
  deletePosition(i: number) {
    console.log("The i value is:-", i);
    this.store.dispatch(new DeletePositions(i));
  }

  add(): void {
    if (this.selectedNodeId !== null) {
      this.router.navigate(['/position/detail'], { queryParams: { nodeId: this.selectedNodeId } });
    } else {
      // Handle case when no node is selected
      console.error('No node selected.');
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

  showLeafIcon = false;
  // constructor() {
  //   this.dataSource.setData(TREE_DATA);
  // }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

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


// interface TreeNode {
//   name: string;
//   children?: TreeNode[];
// }

// TREE_DATA: TreeNode[]
// = [
//   {
//     name: 'parent 1',
//     children: [
//       {
//         name: 'parent 1-0',
//         children: [{ name: 'leaf' }, { name: 'leaf' }]
//       },
//       {
//         name: 'parent 1-1',
//         children: [
//           { name: 'leaf' },
//           {
//             name: 'parent 1-1-0',
//             children: [{ name: 'leaf' }, { name: 'leaf' }]
//           },
//           { name: 'leaf' }
//         ]
//       }
//     ]
//   },
//   {
//     name: 'parent 2',
//     children: [{ name: 'leaf' }, { name: 'leaf' }]
//   }
// ]
