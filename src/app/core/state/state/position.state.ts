import { CrudService } from '../../service/crud.service';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { tap } from 'rxjs/operators';
import { AddPositions, DeletePositions, FetchPositionById, GetPositions, UpdatePositions, SelectNode } from '../actions/position.actions';
import { PositioStateModel } from '../../models/PositionalState';




@State<PositioStateModel>({
    name: 'positionstate',
    defaults: {
      positions: [],
      selectedPosition:[]
    }
})

@Injectable()
export class PositionState {
    constructor(private crudservice: CrudService) { }

    @Selector()
    static selectStateData(state:PositioStateModel){
        return state.positions;
    }
    @Selector()
    static selectSelectedPositionData(state:PositioStateModel){
        return state.selectedPosition;
    }


    @Action(GetPositions)
    getDataFromState(ctx: StateContext<PositioStateModel>) {
        return this.crudservice.fetchPositions().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                positions: returnData
            })
        }))
    }

    @Action(AddPositions)
    addDataToState(ctx: StateContext<PositioStateModel>, { payload }: AddPositions) {
        return this.crudservice. addPositions(payload).pipe(tap(returnData => {
            const state=ctx.getState();
            ctx.patchState({
              positions:[...state.positions,returnData]
            })
        }))
    }

    @Action(UpdatePositions)
    updateDataOfState(ctx: StateContext<PositioStateModel>, { payload, id, i }: UpdatePositions) {
        return this.crudservice.updatePosition(payload, id).pipe(tap(returnData => {
            const state=ctx.getState();

            const positionList = [...state.positions];
            positionList[i]=payload;

            ctx.setState({
                ...state,
                positions: positionList,
            });
        }))
    }

    @Action(DeletePositions)
    deleteDataFromState(ctx: StateContext<PositioStateModel>, { id }: DeletePositions) {
        return this.crudservice.deletePosition(id).pipe(tap(returnData => {
            const state=ctx.getState();
            console.log("The is is",id)

            const filteredArray = state.positions.filter((contents: any) => contents.id !== id);

            ctx.setState({
                ...state,
                positions:filteredArray
            })
        }))
    }
    @Action(FetchPositionById)
fetchPositionById(ctx: StateContext<PositioStateModel>, { id }: FetchPositionById) {
  return this.crudservice.fetchPositionById(id).pipe(tap(returnData => {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedPosition: [returnData]

    });
    console.log('uuuuu',returnData)
  }));
}
}
