export var sideBarMenus = [
  {
    nodeId: '01',
    nodeText: 'Dashboard',
    iconCss: 'fa fa-tachometer',
    url: 'dashboard',
    tooltip: 'Dashboard',
  },
  {
    nodeId: '24',
    nodeText: 'Applicants',
    iconCss: 'fa fa-users',
    tooltip: 'Applicants',
    nodeChild: [
      {
        nodeId: '24-01',
        nodeText: 'Applicant',
        iconCss: 'fa fa-user-circle',
        url: 'applicants/applicant/list',
        tooltip: 'Applicant',
      }
    ]
  }
];
