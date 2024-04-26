import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { Router } from '@angular/router';

import { NzTableModule } from 'ng-zorro-antd/table';

interface ItemData {
  id:string
  parentid: string;
  name: string;
  description: string;

}
@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PositionDetailComponent implements OnInit {
constructor(private router:Router){}

  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  add():void{
this.router.navigate(['/position/detail'])
  }
  // addRow(): void {
  //   this.listOfData = [
  //     ...this.listOfData,
  //     {
  //       id: `${this.i}`,
  //       name: `Edward King ${this.i}`,
  //       age: '32',
  //       address: `London, Park Lane no. ${this.i}`
  //     }
  //   ];
  //   this.i++;
  // }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
    // this.addRow();
    // this.addRow();
  }

}
