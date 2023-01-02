import React, { createContext, useCallback, useContext, useMemo, useReducer, } from 'react';
import { PopupView } from './Popup.view';
import uuid from 'surfinn-uuid';
let order = 0;
const initialStates = [];
const reducer = (state, action) => {
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
            return state.filter((_Popup) => _Popup.id !== action.id);
        case 'OPEN':
            Popup = state.find((_Popup) => _Popup.id === action.id);
            if (Popup) {
                return [
                    ...state.filter((_Popup) => _Popup.id !== action.id),
                    {
                        // @ts-ignore
                        ...Popup,
                        show: true,
                        order: order++,
                    },
                ];
            }
            else {
                return state;
            }
        case 'CLOSE':
            Popup = state.find((_Popup) => _Popup.id === action.id);
            if (Popup) {
                return [
                    ...state.filter((_Popup) => _Popup.id !== action.id),
                    {
                        // @ts-ignore
                        ...Popup,
                        show: false,
                    },
                ];
            }
            else {
                return state;
            }
        default:
            return state;
    }
};
export const PopupContext = createContext(null);
export const usePopup = () => useContext(PopupContext);
export const PopupProvider = ({ children }) => {
    const [states, dispatch] = useReducer(reducer, initialStates);
    const add = useCallback((state) => {
        const id = uuid.v4();
        dispatch({ type: 'ADD', ...state, id });
        return id;
    }, []);
    const remove = useCallback((id) => {
        dispatch({ type: 'REMOVE', id });
    }, []);
    const open = useCallback((id) => {
        dispatch({ type: 'OPEN', id });
    }, []);
    const close = useCallback((id) => {
        dispatch({ type: 'CLOSE', id });
    }, []);
    const context = useMemo(() => ({
        add,
        remove,
        open,
        close,
    }), [add, remove, open, close]);
    return (<PopupContext.Provider value={context}>
      {children}
      {states
            .filter((popup) => popup.show)
            .sort((a, b) => a.order - b.order)
            .map((popup) => {
            return (<PopupView key={popup.id} backdrop={popup.backdrop} backdropColor={popup.backdropColor} backdropOpacity={popup.backdropOpacity}>
              {popup.children}
            </PopupView>);
        })}
    </PopupContext.Provider>);
};
//# sourceMappingURL=Popup.context.js.map