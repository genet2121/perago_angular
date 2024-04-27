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
