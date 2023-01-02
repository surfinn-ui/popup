import {forwardRef, ReactNode, useEffect} from 'react';
import {usePopup} from './Popup.context';

export interface TPopupRef {
  open: () => void;
  close: () => void;
  remove: () => void;
}
export interface IPopupProps {
  children: ReactNode;
  backdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
}

export const Popup = forwardRef(
  (
    {
      backdrop = false,
      backdropColor = '#000000',
      backdropOpacity = 0.1,
      children,
    }: IPopupProps,
    ref: any,
  ) => {
    const {add, remove, open, close} = usePopup()!;

    useEffect(() => {
      const id = add({children, backdrop, backdropColor, backdropOpacity});
      ref.current = {
        remove: () => remove(id),
        open: () => open(id),
        close: () => close(id),
      } as TPopupRef;

      return () => {
        remove(id);
      };
    }, [
      children,
      ref,
      add,
      remove,
      open,
      close,
      backdrop,
      backdropColor,
      backdropOpacity,
    ]);

    return null;
  },
);
