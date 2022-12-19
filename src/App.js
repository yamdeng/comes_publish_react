/* global pageType */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from 'component/layout/ErrorBoundary';
import AppHistory from 'util/AppHistory';
import Helper from 'util/Helper';
import Logger from 'util/Logger';
import Config from 'config/Config';
import CommuteAdminApp from 'component/app/commute/CommuteAdminApp';
import CommuteDeptApp from 'component/app/commute/CommuteDeptApp';

const getAppComponent = function () {
  if (pageType === 'CommuteDeptApp') {
    return <CommuteDeptApp />;
  } else if (pageType === 'CommuteAdminApp') {
    return <CommuteAdminApp />;
  }
  return null;
};

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
      uiStore.changeCurrentRouteUrl(currentRouteUrl);
      return true;
    });
  }

  componentDidMount() {
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
    let mainComponent = getAppComponent();
    return (
      <ErrorBoundary>
        <div>{mainComponent}</div>
      </ErrorBoundary>
    );
  }
}

export default App;
