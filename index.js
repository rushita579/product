import { AppRegistry } from 'react-native';
// import { Provider } from 'react-redux';r
import App from './src';
import { name as appName } from './app.json';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const RNRoot = () => {
  return (
    <Provider store={store}>
    <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRoot);
