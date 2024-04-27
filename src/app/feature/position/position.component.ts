import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddPositions, GetPositions } from 'src/app/core/state/actions/position.actions';
import { PositionState } from 'src/app/core/state/state/position.state';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  dataForm: FormGroup;
  positionInfo: [] | undefined;
  @Select(PositionState.selectStateData) positionInfo$?: Observable<any>
  constructor(private fb:FormBuilder, private store: Store) {
    this.dataForm = fb.group({
      id:[],
      parentId:[''],
      name:['', Validators.required],
      description:['']
    })
    this.store.dispatch(new GetPositions());

    this.positionInfo$?.subscribe((returnData) => {
      this.positionInfo = returnData;
    })
  }

  ngOnInit(): void {
  }

  addPosition() {
    console.log(this.dataForm.value)
    //this.store.dispatch(new AddPositions(this.dataForm.value));

      if (this.dataForm.valid) {
        const formData = this.dataForm.value;
        this.store.dispatch(new AddPositions(formData))
          .subscribe(() => {
            console.log('Position added successfully');
            this.dataForm.reset();
            this.store.dispatch(new GetPositions());
            this.dataForm.reset();

          }, (error) => {
            console.error('Error adding position:', error);
          });
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







