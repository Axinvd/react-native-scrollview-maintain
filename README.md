# react-native-scrollview-maintain

install yarn add react-native-scrollview-maintain

## usage

call enableMaintain before use scroll component

```bash
//index.js

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import {enableMaintain} from 'react-native-scrollview-maintain';

enableMaintain();

AppRegistry.registerComponent(appName, () => App);
```

or

```bash
import {enableMaintainVisibleContentPosition, disableMaintainVisibleContentPosition} from 'react-native-scrollview-maintain';

...

// `ref` is the ref to your ScrollView / FlatList
useEffect(() => {
    let cleanupPromise: Promise<number> | undefined;
    if (Constants.isAndroid) {
        const viewTag = findNodeHandle(ref.current);
        cleanupPromise = enableMaintainVisibleContentPosition(viewTag, 0);
    }
    return () => {
        void cleanupPromise?.then((handle) => {
        void disableMaintainVisibleContentPosition(handle);
    };
}, [ref]);
```

## License

React native screens library is licensed under [The MIT License](LICENSE).

## Credits

Module for those who need maintainVisibleContentPosition on Android now but don't want to maintain your own RN fork [RNPullRequest](https://github.com/facebook/react-native/pull/29466)

Thans for workaround [Stackie Jia](https://github.com/stackia) and [Maxime Bertheau](https://github.com/maxoumime)