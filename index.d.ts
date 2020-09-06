import {ScrollViewProps} from 'react-native';

declare module 'react-native' {
    interface ScrollViewProps {
        maintainVisibleContentPosition?: {
            minIndexForVisible: number;
            autoscrollToTopThreshold?: number;
        }
    }
}

declare module 'react-native-scrollview-maintain' {
    export function enableMaintain(): void;
    export function enableMaintainVisibleContentPosition(viewTag: number, minIndexForVisible: number): Promise<number>;
    export function enableMaintain(handle: number): Promise<void>;
}