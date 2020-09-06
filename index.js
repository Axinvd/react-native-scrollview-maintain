import {useEffect, useRef} from 'react';
import {NativeModules, ScrollView, findNodeHandle, Platform, ScrollViewProps} from 'react-native';

const {enableMaintainVisibleContentPosition, disableMaintainVisibleContentPosition} = NativeModules.ScrollViewMagic;

export {enableMaintainVisibleContentPosition, disableMaintainVisibleContentPosition};

export function enableMaintain() {
    const isAndroid = Platform.OS === 'android';
    const _ScrollView = ScrollView;
    const ScrollViewRender = _ScrollView.render;
    _ScrollView.render = function (props, ref) {
        let scrollView;
        if (isAndroid) {
            const listRef = useRef();
            useEffect(() => {
                let cleanupPromise;
                if (props.maintainVisibleContentPosition) {
                    const viewTag = findNodeHandle(listRef.current);
                    if (viewTag != null && !cleanupPromise) {
                        cleanupPromise = enableMaintainVisibleContentPosition(viewTag, props.maintainVisibleContentPosition.minIndexForVisible);
                    }
                } else {
                    cleanupPromise?.then((handle) => disableMaintainVisibleContentPosition(handle));
                    cleanupPromise = null;
                }

                return () => {
                    cleanupPromise?.then((handle) => disableMaintainVisibleContentPosition(handle));
                };
            }, []);

            scrollView = ScrollViewRender(props, (r) => {
                ref(r);
                listRef.current = r;
            });
        } else {
            scrollView = ScrollViewRender(props, ref);
        }

        return scrollView;
    };
}