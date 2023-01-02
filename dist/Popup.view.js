import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
export const PopupView = ({ backdrop, backdropColor = '#000000', backdropOpacity = 0.2, children, }) => {
    const show = useSharedValue(false);
    const fadeIn = useAnimatedStyle(() => {
        const opacity = show.value ? 1 : 0;
        return {
            opacity: withTiming(opacity, { duration: 300 }),
        };
    });
    useEffect(() => {
        show.value = true;
        return () => {
            show.value = false;
        };
    }, [show]);
    return (<Animated.View style={[styles.root, fadeIn]}>
      {backdrop && (<View style={[
                styles.backdrop,
                { backgroundColor: backdropColor, opacity: backdropOpacity },
            ]}/>)}
      {children}
    </Animated.View>);
};
const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
    },
    backdrop: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        // backgroundColor: '#000',
        opacity: 1,
    },
});
//# sourceMappingURL=Popup.view.js.map