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

let order = 0;

export interface IPopupState {
  /** private 팝업 ID */
  id?: TPopupId;
  /** 팝업 보임 / 숨김 */
  show?: boolean;
  /** 백드롭 보임 / 숨김 - 기본값 `false` */
  backdrop?: boolean;
  /** 백드롭 색상 - 기본값 `"#000000"` */
  backdropColor?: string;
  /** 백드롭 투명도 - 기본값 `0.2` */
  backdropOpacity?: number;
  /** private 팝업 순서 - 팝업의 순서는 open 하는 순서대로 증가한다. */
  order?: number;
  /** 팝업 내용 */
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
          backdropColor: action.backdropColor,
          backdropOpacity: action.backdropOpacity,
          order: -1,
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
            order: order++,
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
  /** 팝업 추가 - 추가한 팝업은 오픈하기 전까지 보이지 않는다. 팝업ID를 반환한다. */
  add: (state: IPopupState) => string;
  /** 팝업 제거 - 팝업을 제거한다. 제거한 팝업은 다시 사용할 수 없다. */
  remove: (id: string) => void;
  /** 팝업 오픈 - 팝업을 오픈한다. */
  open: (id: string) => void;
  /** 팝업 닫기 - 팝업을 닫는다. */
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
        .sort((a: IPopupState, b: IPopupState) => a.order! - b.order!)
        .map((popup: IPopupState) => {
          return (
            <PopupView
              key={popup.id}
              backdrop={popup.backdrop}
              backdropColor={popup.backdropColor}
              backdropOpacity={popup.backdropOpacity}>
              {popup.children}
            </PopupView>
          );
        })}
    </PopupContext.Provider>
  );
};
