import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import LoadingBarContainer from 'component/layout/LoadingBarContainer';
import AlertModalContainer from 'component/layout/AlertModalContainer';
import ModalContainer from 'component/layout/ModalContainer';
import NotLogin from 'component/NotLogin';
import ErrorPage from 'component/ErrorPage';
import Main from 'component/layout/Main';
import ErrorBoundary from 'component/layout/ErrorBoundary';
import AppHistory from 'util/AppHistory';
import Helper from 'util/Helper';
import Logger from 'util/Logger';
import Config from 'config/Config';
import ModalSerivce from 'service/ModalService';

/*

    이름 : 메인 App

    store
     -appStore, uiStore

*/
@withRouter
@inject('appStore', 'uiStore')
@observer
class App extends Component {
  // history block 이벤트 핸들러 변수(clear 용도)
  historyUnblockHandler = null;

  constructor(props) {
    super(props);
    this.state = {};
  }

  init() {
    const { uiStore } = this.props;

    Logger.log('App init call');
    Logger.log('process.env : ' + JSON.stringify(process.env));
    Logger.log('version : ' + Config.version);

    window.onerror = Helper.handleGlobalError;

    // url block 핸들러 등록
    this.historyUnblockHandler = AppHistory.block((location, action) => {
      let currentRouteUrl = location.pathname;
      let beforeRouteUrl = uiStore.beforeRouteUrl;
      Logger.log('history change ' + action + ' : ' + currentRouteUrl);
      Logger.log('currentRouteUrl : ' + currentRouteUrl);
      Logger.log('beforeRouteUrl : ' + beforeRouteUrl);
      if (beforeRouteUrl && currentRouteUrl !== beforeRouteUrl) {
        ModalSerivce.closeAllModal();
      }
      uiStore.changeCurrentRouteUrl(currentRouteUrl);
      return true;
    });
  }

  componentDidMount() {
    const { appStore } = this.props;
    const { token } = appStore;
    if (token) {
      appStore.getProfile();
    }
    this.init();
  }

  componentWillUnmount() {
    if (this.historyUnblockHandler) {
      this.historyUnblockHandler();
    }
  }

  render() {
    const { appStore } = this.props;
    const { profile, isError } = appStore;
    let mainComponent = null;
    if (isError) {
      // 에러인 경우
      mainComponent = <ErrorPage />;
    } else if (profile) {
      // 로그인 성공인 경우
      mainComponent = <Main />;
    } else {
      // 로그인 않되어 있는 경우
      mainComponent = <NotLogin />;
    }
    return (
      <ErrorBoundary>
        <div>
          {mainComponent}
          <LoadingBarContainer />
          <AlertModalContainer />
          <ModalContainer />
          <ReactTooltip />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
