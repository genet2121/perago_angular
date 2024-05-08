import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
//import { filter } from 'rxjs/operators';
import { Router, NavigationStart, Event as RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

export interface OpenMap {
  [key: string]: boolean; // Index signature allowing any string key with boolean value
  sub1: boolean;
  sub2: boolean;
}
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('trigger') customTrigger?: TemplateRef<void>;
  @ViewChild('trigger') triggerTemplate?: TemplateRef<void>; // Define triggerTemplate
  isCollapsed = false;
  showLogo = true;
  breadcrumbText: string | undefined;


  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    this.showLogo = !this.isCollapsed;
  }
  // openMap = {
  //   sub1: true,
  //   sub2: false
  // };


  collapseWidth: number =80;
  constructor(public breakpointObserver: BreakpointObserver, private router: Router, private activatedRoute: ActivatedRoute) {
    setTimeout(() => {
      if (window.innerWidth < 992 && this.isCollapsed == false) {
        this.isCollapsed = true;
      }
    })
  }
  //iiiii

  ngOnInit() {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.breadcrumbText = data['breadcrumb'] || 'Structure';
      });
  }



  //   this.breakpointObserver
  //     .observe(['(min-width: 500px)'])
  //     .subscribe((state: BreakpointState) => {
  //       if (state.matches) {
  //         this.collapseWidth = 80;
  //       } else {
  //         this.collapseWidth = 0;
  //       }
  //     });




  // }







  // Method to handle node click event
  public route(event: any): void {
    console.log(event);
  }



}
