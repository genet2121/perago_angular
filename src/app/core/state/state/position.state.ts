import { CrudService } from './../../crud.service';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { tap } from 'rxjs/operators';
import { AddPositions, DeletePositions, GetPositions, UpdatePositions } from '../actions/position.actions';


export class PositioStateModel {
  positions: any
}

@State<PositioStateModel>({
    name: 'positionstate',
    defaults: {
      positions: []
    }
})

@Injectable()
export class PositionState {
    constructor(private crudservice: CrudService) { }

    @Selector()
    static selectStateData(state:PositioStateModel){
        return state.positions;
    }

    @Action(GetPositions)
    getDataFromState(ctx: StateContext<PositioStateModel>) {
        return this.crudservice.fetchPositions().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                positions: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
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
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
           // const filteredArray=state.positions.filter(contents=>contents.id!==id);

            const filteredArray = state.positions.filter((contents: any) => contents.id !== id);

            ctx.setState({
                ...state,
                positions:filteredArray
            })
        }))
    }
}
