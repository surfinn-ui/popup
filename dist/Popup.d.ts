import { ReactNode } from 'react';
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
export declare const Popup: import("react").ForwardRefExoticComponent<IPopupProps & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=Popup.d.ts.map