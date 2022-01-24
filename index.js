import { AppRegistry } from 'react-native';
import Config from 'react-native-config';
import App from './src/App';
import { name as appName } from './app.json';

console.log(Config.REACT_APP_AIRTABLE_BASE_KEY);
AppRegistry.registerComponent(appName, () => App);
