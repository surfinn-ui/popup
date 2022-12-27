import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {PopupView} from './Popup.view';
import uuid from 'surfinn-uuid';

type TPopupId = string;

export interface IPopupState {
  id?: TPopupId;
  show?: boolean;
  backdrop?: boolean;
  backdropOpacity?: number;
  children: ReactNode;
}

const initialStates: IPopupState[] = [];

const reducer = (state: any, action: any) => {
  let Popup = null;
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          show: false,
          children: action.children,
          backdrop: action.backdrop,
          backdropOpacity: action.backdropOpacity,
        },
      ];

    case 'REMOVE':
      return state.filter((_Popup: IPopupState) => _Popup.id !== action.id);

    case 'OPEN':
      Popup = state.find((_Popup: IPopupState) => _Popup.id === action.id);
      if (Popup) {
        return [
          ...state.filter((_Popup: IPopupState) => _Popup.id !== action.id),
          {
            // @ts-ignore
            ...Popup,
            show: true,
          },
        ];
      } else {
        return state;
      }

    case 'CLOSE':
      Popup = state.find((_Popup: IPopupState) => _Popup.id === action.id);
      if (Popup) {
        return [
          ...state.filter((_Popup: IPopupState) => _Popup.id !== action.id),
          {
            // @ts-ignore
            ...Popup,
            show: false,
          },
        ];
      } else {
        return state;
      }

    default:
      return state;
  }
};

export interface IPopupContext {
  add: (state: IPopupState) => string;
  remove: (id: string) => void;
  open: (id: string) => void;
  close: (id: string) => void;
}

export const PopupContext = createContext<IPopupContext | null>(null);

export const usePopup = () => useContext(PopupContext);

export interface IPopupProviderProps {
  children: ReactNode;
}

export const PopupProvider = ({children}: IPopupProviderProps) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  const add = useCallback((state: IPopupState) => {
    const id = uuid.v4();
    dispatch({type: 'ADD', ...state, id});
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    dispatch({type: 'REMOVE', id});
  }, []);

  const open = useCallback((id: string) => {
    dispatch({type: 'OPEN', id});
  }, []);

  const close = useCallback((id: string) => {
    dispatch({type: 'CLOSE', id});
  }, []);

  const context: IPopupContext = useMemo(
    () => ({
      add,
      remove,
      open,
      close,
    }),
    [add, remove, open, close],
  );
  return (
    <PopupContext.Provider value={context}>
      {children}
      {states
        .filter((popup: IPopupState) => popup.show)
        .map((popup: IPopupState) => {
          return (
            <PopupView
              key={popup.id}
              backdrop={popup.backdrop}
              backdropOpacity={popup.backdropOpacity}>
              {popup.children}
            </PopupView>
          );
        })}
    </PopupContext.Provider>
  );
};
