import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  dataForm: FormGroup;
  constructor(private fb:FormBuilder) {
    this.dataForm = fb.group({
      id:[],
      parentId:[ Validators.required],
      name:[ Validators.required],
      description:[]
    })
  }

  ngOnInit(): void {
  }

}
