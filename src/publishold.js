import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import rootStore from 'store/RootStore';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import PublishAppOld from './PublishAppOld';

import 'resources/css/import.scss';

registerLocale('ko', ko);
setDefaultLocale('ko');

// moment 전역 locale 설정
moment.locale('ko');

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: 'always'
});

ReactDOM.render(
  <Provider {...rootStore}>
    <Router>
      <PublishAppOld />
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
