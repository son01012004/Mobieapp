import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './app.tsx';
import appJson from './app.json';

console.log('Debug: index.js - App imported:', App);
console.log('Debug: index.js - appName from app.json:', appJson.expo.name);

enableScreens(); // Kích hoạt react-native-screens

console.log('Debug: index.js - Before AppRegistry.registerComponent');
AppRegistry.registerComponent('main', () => App);
console.log('Debug: index.js - After AppRegistry.registerComponent');