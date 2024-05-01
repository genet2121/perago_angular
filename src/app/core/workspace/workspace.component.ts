import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
//import { filter } from 'rxjs/operators';
import { Router, NavigationStart, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
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

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    this.showLogo = !this.isCollapsed;
  }
  // openMap = {
  //   sub1: true,
  //   sub2: false
  // };
  openMap: OpenMap = {
    sub1: true,
    sub2: false
  };

  collapseWidth: number =80;
  constructor(public breakpointObserver: BreakpointObserver, private router: Router) {
    setTimeout(() => {
      if (window.innerWidth < 992 && this.isCollapsed == false) {
        this.isCollapsed = true;
      }
    })
  }
  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.collapseWidth = 80;
        } else {
          this.collapseWidth = 0;
        }
      });

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationStart)
    //   ).subscribe((event: NavigationStart) => {
    //     if (RegExp('(\/overview?.+)').test(event.url)){
    //       this.openMap.sub1 = true;
    //       this.openHandler('sub1');
    //     } else if (RegExp('(\/nav2?.+)').test(event.url)){
    //       this.openMap.sub2 = true;
    //       this.openHandler('sub2');
    //     }

    //   });
       this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationStart => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
        if (RegExp('(\/overview?.+)').test(event.url)){
          // Handle navigation to /overview
        } else if (RegExp('(\/nav2?.+)').test(event.url)){
          // Handle navigation to /nav2
        }
      });
  }

  overview(){
    this.router.navigate(['overview'])
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }



  // constructor() { }
  // ngOnInit(): void {

  // }

  // Method to handle node click event
  public route(event: any): void {
    console.log(event);
    // Add logic to handle routing based on the selected node
  }



}
