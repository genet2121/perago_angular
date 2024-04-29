import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { AddPositions, GetPositions, UpdatePositions } from 'src/app/core/state/actions/position.actions';
import { PositionState } from 'src/app/core/state/state/position.state';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ActivatedRoute, Router } from '@angular/router';

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

  @Select(PositionState.selectStateData) positionInfo$?: Observable<any>
  constructor(private fb:FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedNodeId = params['nodeId'];

      // Now you can use the nodeId as needed in your component
    });
    this.dataForm = fb.group({
      id:[],
      parentId:[this.selectedNodeId],
      name:['', Validators.required],
      description:['']
    })
    this.store.dispatch(new GetPositions());

    this.positionInfo$?.subscribe((returnData) => {
      this.positionInfo = returnData;
    })

    this.route.queryParams.pipe(
      map((params) => JSON.parse(params['position']))
    ).subscribe((positionData) => {
      this.positionData = positionData;
      this.populateFormWithPositionData();
    });

    this.store.dispatch(new GetPositions());

    this.positionInfo$?.subscribe((returnData) => {
      this.positionInfo = returnData;
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

  // addPosition() {
  //   console.log(this.dataForm.value)
  //   //this.store.dispatch(new AddPositions(this.dataForm.value));

  //     if (this.dataForm.valid) {
  //       const formData = this.dataForm.value;
  //       this.store.dispatch(new AddPositions(formData))
  //         .subscribe(() => {
  //           console.log('Position added successfully');
  //           this.dataForm.reset();
  //           this.store.dispatch(new GetPositions());
  //           this.dataForm.reset();

  //         }, (error) => {
  //           console.error('Error adding position:', error);
  //         });
  //     } else {
  //       this.markFormGroupTouched(this.dataForm);
  //     }
  //   }
  addPosition() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;

      if (formData.id) {
        // Update existing position
        this.store.dispatch(new UpdatePositions(formData, formData.id, 0))
          .subscribe(() => {
            console.log('Position updated successfully');

            this.dataForm.reset();
            this.store.dispatch(new GetPositions());
            this.router.navigate(['/position/create']);

          }, (error) => {
            console.error('Error updating position:', error);
          });
      } else {
        // Add new position
        this.store.dispatch(new AddPositions(formData))
          .subscribe(() => {
            console.log('Position added successfully');
            this.dataForm.reset();
            this.store.dispatch(new GetPositions());
            this.router.navigate(['/position/create',]);

          }, (error) => {
            console.error('Error adding position:', error);
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







