import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit,  } from '@angular/core';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    children: [
      {
        name: 'parent 1-0',
        children: [{ name: 'leaf' }, { name: 'leaf' }]
      },
      {
        name: 'parent 1-1',
        children: [
          { name: 'leaf' },
          {
            name: 'parent 1-1-0',
            children: [{ name: 'leaf' }, { name: 'leaf' }]
          },
          { name: 'leaf' }
        ]
      }
    ]
  },
  {
    name: 'parent 2',
    children: [{ name: 'leaf' }, { name: 'leaf' }]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

// interface TreeNode {
//   title: string;
//   key: string;
//   children?: TreeNode[];
// }
@Component({
  selector: 'app-add-postion',
  templateUrl: './add-postion.component.html',
  styleUrls: ['./add-postion.component.scss']
})
export class AddPostionComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
  }
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
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
  constructor() {
    this.dataSource.setData(TREE_DATA);
  }

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
  }

  getNode(name: string): FlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
  // nodes: TreeNode[] = [
  //   {
  //     title: 'CEO',
  //     key: 'CEO',
  //     children: [
  //       {
  //         title: 'CTO',
  //         key: 'CTO',
  //         children: [
  //           {
  //             title: 'Project Manager',
  //             key: 'ProjectManager',
  //             children: [
  //               {
  //                 title: 'Product Owner',
  //                 key: 'ProductOwner',
  //                 children: [
  //                   { title: 'Tech Lead', key: 'TechLead' },
  //                   { title: 'Frontend Developer', key: 'FrontendDev' },
  //                   { title: 'Backend Developer', key: 'BackendDev' },
  //                   { title: 'DevOps Engineer', key: 'DevOpsEng' },
  //                   // Add more positions as needed...
  //                 ]
  //               },
  //               { title: 'QA Engineer', key: 'QAEngineer' },
  //               { title: 'Scrum Master', key: 'ScrumMaster' },
  //               // Add more positions as needed...
  //             ]
  //           },
  //           // Add more positions as needed...
  //         ]
  //       },
  //       {
  //         title: 'CFO',
  //         key: 'CFO',
  //         children: [
  //           {
  //             title: 'Chef Accountant',
  //             key: 'ChefAccountant',
  //             children: [
  //               { title: 'Financial Analyst', key: 'FinancialAnalyst' },
  //               { title: 'Account and Payable', key: 'AccountPayable' }
  //             ]
  //           },
  //           { title: 'Internal Audit', key: 'InternalAudit' }
  //           // Add more positions as needed...
  //         ]
  //       },
  //       {
  //         title: 'COO',
  //         key: 'COO',
  //         children: [
  //           { title: 'Product Manager', key: 'ProductManager' },
  //           { title: 'Operation Manager', key: 'OperationManager' },
  //           { title: 'Customer Relation', key: 'CustomerRelation' }
  //           // Add more positions as needed...
  //         ]
  //       },
  //       { title: 'HR', key: 'HR' }
  //       // Add more top-level positions as needed...
  //     ]
  //   }
  // ];
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
}


