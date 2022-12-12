import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'fast-text-encoding/text';
import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import moment from 'moment';
import 'moment/locale/ko';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import rootStore from 'store/RootStore';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

import App from './App';
import AppHistory from 'util/AppHistory';
import Helper from 'util/Helper';
import ko from 'date-fns/locale/ko';
import 'resources/css/import.scss';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'AppEditor.css';
registerLocale('ko', ko);
setDefaultLocale('ko');

// moment 전역 locale 설정
moment.locale('ko');

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: 'always'
});

// queryString 처리
let isError = Helper.getQueryStringValue(AppHistory.location.search, 'isError');
if (isError) {
  rootStore.appStore.changeIsError(true);
}

ReactDOM.render(
  <Provider {...rootStore}>
    <Router history={AppHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
