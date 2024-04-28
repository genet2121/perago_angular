import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';

import { NzTableModule } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/core/crud.service';
import { DeletePositions, GetPositions, UpdatePositions } from 'src/app/core/state/actions/position.actions';
import { PositionState } from 'src/app/core/state/state/position.state';
import {ItemData} from 'src/app/core/models/data'

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PositionDetailComponent implements OnInit {
  positionInfo?: ItemData[] ;
  @Select(PositionState.selectStateData) positionInfo$?: Observable<any>
constructor(private router:Router, private store: Store, private crudservice:CrudService){}

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


  ngOnInit(): void {
    this.store.dispatch(new GetPositions());

    this.positionInfo$?.subscribe((returnData) => {
      this.positionInfo = returnData;
    })
    console.log('hhh', this.positionInfo)
    // this.addRow();
    // this.addRow();
  }


  updatePosition(id: number, i: number) {

    const newData = {
      id: id,
      name: "CEO",
      parentId: null,
      description: 'Position description',

    }

    this.store.dispatch(new UpdatePositions(newData, id, i));
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

}
