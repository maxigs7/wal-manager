///////////////////////////////////////////////
// State and Dispatch interfaces
export interface IState {
  isOpen: boolean;
  text: string;
}

export interface IDispatch {
  onChangedText(text: string): void;
  onClose(): void;
  onOpen(): void;
  onToggle(): void;
}

export const initialState: IState = {
  isOpen: false,
  text: '',
};

///////////////////////////////////////////////
// Actions
export const CHANGE_TEXT = '[ACCOUNT][Filter] Change Text';

export type Actions = { type: typeof CHANGE_TEXT; payload: string };

export const changeText = (payload: string): Actions => ({
  type: CHANGE_TEXT,
  payload,
});

///////////////////////////////////////////////
// Reducer
export type Reducer = (state: IState, actions: Actions) => IState;

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CHANGE_TEXT: {
      return {
        ...state,
        text: action.payload,
      };
    }
    default:
      return state;
  }
};
