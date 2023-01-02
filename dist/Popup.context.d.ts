import React, { ReactNode } from 'react';
type TPopupId = string;
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
export declare const PopupContext: React.Context<IPopupContext | null>;
export declare const usePopup: () => IPopupContext | null;
export interface IPopupProviderProps {
    children: ReactNode;
}
export declare const PopupProvider: ({ children }: IPopupProviderProps) => JSX.Element;
export {};
//# sourceMappingURL=Popup.context.d.ts.map