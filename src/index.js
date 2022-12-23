import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/ko';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import rootStore from 'store/RootStore';
import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'devextreme/dist/css/dx.light.css';

import Api from 'util/Api';
import ApiService from 'service/ApiService';

import App from './App';
import AppHistory from 'util/AppHistory';
import Helper from 'util/Helper';
import ko from 'date-fns/locale/ko';
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

// ReactDOM.render(
//   <Provider {...rootStore}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

ApiService.get('newoffice/profile.do').then((response) => {
  const profile = response.data;
  rootStore.appStore.setLoginInfo(profile, '');
  ReactDOM.render(
    <Provider {...rootStore}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
