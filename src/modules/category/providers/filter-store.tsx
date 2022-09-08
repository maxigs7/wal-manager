import { CategoryType, DEFAULT_CATEGORY_TYPE } from '@models';

///////////////////////////////////////////////
// State and Dispatch interfaces
export interface IState {
  type?: CategoryType;
}

export interface IDispatch {
  onChangedType(type: CategoryType): void;
}

export const initialState: IState = {
  type: undefined,
};

///////////////////////////////////////////////
// Actions
export const CHANGE_TYPE = '[CATEGORY][Filter] Change Type';

export type Actions = { type: typeof CHANGE_TYPE; payload: CategoryType };

export const changeType = (payload: CategoryType): Actions => ({
  type: CHANGE_TYPE,
  payload,
});

///////////////////////////////////////////////
// Reducer
export type Reducer = (state: IState, actions: Actions) => IState;

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CHANGE_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    default:
      return state;
  }
};
