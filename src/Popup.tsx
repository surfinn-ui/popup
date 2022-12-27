import {forwardRef, ReactNode, useEffect} from 'react';
import {usePopup} from './Popup.context';

export interface PopupReturnType {
  open: () => void;
  close: () => void;
  remove: () => void;
}
export interface IPopupProps {
  children: ReactNode;
  backdrop?: boolean;
  backdropOpacity?: number;
}

export const Popup = forwardRef(
  (
    {backdrop = false, backdropOpacity = 0.1, children}: IPopupProps,
    ref: any,
  ) => {
    const {add, remove, open, close} = usePopup()!;

    useEffect(() => {
      const id = add({children, backdrop, backdropOpacity});
      ref.current = {
        remove: () => remove(id),
        open: () => open(id),
        close: () => close(id),
      } as PopupReturnType;

      return () => {
        remove(id);
      };
    }, [children, ref, add, remove, open, close, backdrop, backdropOpacity]);

    return null;
  },
);
