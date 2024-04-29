export class GetPositions {
  static readonly type = '[Positions] Fetch';
}

//Create
export class AddPositions {
  static readonly type = '[Positions] Add';
  constructor(public payload: any) { }
}

//Update
export class UpdatePositions {
  static readonly type = '[Positions] Update';
  constructor(public payload: any, public id: number, public i:number) { }
}

//Delete
export class DeletePositions {
  static readonly type = '[Positions] Delete';
  constructor(public id: number) { }
}
export class FetchPositionById {
  static readonly type = '[Positions] Fetch Position By Id';
  constructor(public id: number) {}
 }
// export class FetchPositionById {
//   static readonly type = '[Positions] Fetch Position By Id';
//   constructor(public response: any) {}
// }
// position.state.actions.ts
export class SelectNode {
  static readonly type = '[Position] Select Node';
  constructor(public nodeId: number) {}
}
