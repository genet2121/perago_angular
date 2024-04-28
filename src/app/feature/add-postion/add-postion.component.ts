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
import { GetPositions } from 'src/app/core/state/actions/position.actions';
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
  @Select(PositionState.selectStateData) positionInfo$?: Observable<TreeNode[]>;
constructor(private router:Router, private store: Store, ){

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
  onNodeClick(node: any): void {
    const nodeId = node.id;
    console.log('genet',nodeId)// Assuming the ID property is named 'id'
    // Do something with the node ID
  }
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
