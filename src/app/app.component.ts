import { Component } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';


interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'perago-angular';
  // nodes = [
  //   {
  //     title: 'parent 1',
  //     key: '100',
  //     expanded: true,
  //     children: [
  //       {
  //         title: 'parent 1-0',
  //         key: '1001',
  //         expanded: true,
  //         children: [
  //           { title: 'leaf', key: '10010', isLeaf: true },
  //           { title: 'leaf', key: '10011', isLeaf: true },
  //           { title: 'leaf', key: '10012', isLeaf: true }
  //         ]
  //       },
  //       {
  //         title: 'parent 1-1',
  //         key: '1002',
  //         children: [{ title: 'leaf', key: '10020', isLeaf: true }]
  //       },
  //       {
  //         title: 'parent 1-2',
  //         key: '1003',
  //         children: [
  //           { title: 'leaf', key: '10030', isLeaf: true },
  //           { title: 'leaf', key: '10031', isLeaf: true }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  // nzEvent(event: NzFormatEmitEvent): void {
  //   console.log(event);
  // }


  nodes: TreeNode[] = [
    {
      title: 'CEO',
      key: 'CEO',
      children: [
        {
          title: 'CTO',
          key: 'CTO',
          children: [
            {
              title: 'Project Manager',
              key: 'ProjectManager',
              children: [
                {
                  title: 'Product Owner',
                  key: 'ProductOwner',
                  children: [
                    { title: 'Tech Lead', key: 'TechLead' },
                    { title: 'Frontend Developer', key: 'FrontendDev' },
                    { title: 'Backend Developer', key: 'BackendDev' },
                    { title: 'DevOps Engineer', key: 'DevOpsEng' },
                    // Add more positions as needed...
                  ]
                },
                { title: 'QA Engineer', key: 'QAEngineer' },
                { title: 'Scrum Master', key: 'ScrumMaster' },
                // Add more positions as needed...
              ]
            },
            // Add more positions as needed...
          ]
        },
        {
          title: 'CFO',
          key: 'CFO',
          children: [
            {
              title: 'Chef Accountant',
              key: 'ChefAccountant',
              children: [
                { title: 'Financial Analyst', key: 'FinancialAnalyst' },
                { title: 'Account and Payable', key: 'AccountPayable' }
              ]
            },
            { title: 'Internal Audit', key: 'InternalAudit' }
            // Add more positions as needed...
          ]
        },
        {
          title: 'COO',
          key: 'COO',
          children: [
            { title: 'Product Manager', key: 'ProductManager' },
            { title: 'Operation Manager', key: 'OperationManager' },
            { title: 'Customer Relation', key: 'CustomerRelation' }
            // Add more positions as needed...
          ]
        },
        { title: 'HR', key: 'HR' }
        // Add more top-level positions as needed...
      ]
    }
  ];

  handleNodeClick(event: NzFormatEmitEvent): void {
    console.log('Clicked node:', event.node);
  }
}








