import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { AddPositions, GetPositions, UpdatePositions } from 'src/app/core/state/actions/position.actions';
import { PositionState } from 'src/app/core/state/state/position.state';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  dataForm: FormGroup;
  positionInfo?: [] ;
  positionData: any;
  selectedNodeId: number | null = null;
  mode?: 'add' | 'update' ;

  @Select(PositionState.selectStateData) positionInfo$?: Observable<any>
  constructor(private fb:FormBuilder,
     private store: Store,
     private route: ActivatedRoute,
     private router: Router,
     private message: NzMessageService,

  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedNodeId = params['nodeId'];

    });
    this.dataForm = this.fb.group({
      id: [],
      parentId: [this.selectedNodeId],
      name: ['', Validators.required],
      description: ['']
    });


    this.route.queryParams.pipe(
      map((params) => params['position'] ? JSON.parse(params['position']) : null)
    ).subscribe((positionData) => {
      if (positionData) {
        this.positionData = positionData;
        this.populateFormWithPositionData();
        this.mode = 'update';
      } else {
        this.mode = 'add';
      }
    });


  }

  ngOnInit(): void {

  }
  populateFormWithPositionData() {
    if (this.positionData) {
      this.dataForm.patchValue({
        id: this.positionData.id,
        parentId: this.positionData.parentId,
        name: this.positionData.name,
        description: this.positionData.description
      });
    }
  }

  addPosition() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;

      if (this.mode === 'update') {

        this.store.dispatch(new UpdatePositions(formData, formData.id, 0))
          .subscribe(() => {
            this.message.success('Position updated successfully');
            this.dataForm.reset();
            this.store.dispatch(new GetPositions());
            this.router.navigate(['/position/detail']);
          }, (error) => {
            this.message.error('Error updating position:', error);
          });
      } else {

        this.store.dispatch(new AddPositions(formData))
          .subscribe(() => {
            this.message.success('Position Created successfully');
            this.dataForm.reset();
            this.store.dispatch(new GetPositions());
            this.router.navigate(['/position/detail']);
          }, (error) => {
            this.message.error('Error adding position:', error);
          });
      }
    } else {
      this.markFormGroupTouched(this.dataForm);
    }
  }

    markFormGroupTouched(formGroup: FormGroup): void {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
    }

    getFormControlValidationStatus(controlName: string): string {
      const control = this.dataForm.get(controlName);
      return control?.dirty && control?.invalid ? 'error' : '';
    }

}







