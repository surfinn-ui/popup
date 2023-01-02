import { forwardRef, useEffect } from 'react';
import { usePopup } from './Popup.context';
export const Popup = forwardRef(({ backdrop = false, backdropColor = '#000000', backdropOpacity = 0.1, children, }, ref) => {
    const { add, remove, open, close } = usePopup();
    useEffect(() => {
        const id = add({ children, backdrop, backdropColor, backdropOpacity });
        ref.current = {
            remove: () => remove(id),
            open: () => open(id),
            close: () => close(id),
        };
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
});
//# sourceMappingURL=Popup.js.map