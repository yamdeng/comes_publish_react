/* global pageType */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ErrorBoundary from 'component/layout/ErrorBoundary';
import Api from 'util/Api';
import AppHistory from 'util/AppHistory';
import Helper from 'util/Helper';
import Logger from 'util/Logger';
import Config from 'config/Config';
import PortalPrivateApp from 'component/app/portal/PortalPrivateApp';
import PortalDeptApp from 'component/app/portal/PortalDeptApp';
import PortalHeadApp from 'component/app/portal/PortalHeadApp';
import PortalAdminApp from 'component/app/portal/PortalAdminApp';
import CommutePrivateApp from 'component/app/commute/CommutePrivateApp';
import CommuteDeptApp from 'component/app/commute/CommuteDeptApp';
import CommuteHeadApp from 'component/app/commute/CommuteHeadApp';
import CommuteAdminApp from 'component/app/commute/CommuteAdminApp';
import CommuteStatsApp from 'component/app/commute/CommuteStatsApp';
import VacationPrivateApp from 'component/app/vacation/VacationPrivateApp';
import VacationDeptApp from 'component/app/vacation/VacationDeptApp';
import VacationHeadApp from 'component/app/vacation/VacationHeadApp';
import VacationAdminApp from 'component/app/vacation/VacationAdminApp';
import WorkReportDeptApp from 'component/app/report/WorkReportDeptApp';
import WorkReportHeadApp from 'component/app/report/WorkReportHeadApp';
import WorkReportAdminApp from 'component/app/report/WorkReportAdminApp';

import DeptTimeSettingApp from 'component/app/setting/DeptTimeSettingApp';
import VacationManageApp from 'component/app/setting/VacationManageApp';
import HolidayManageApp from 'component/app/setting/HolidayManageApp';

/*

  1.개인 포탈 : PortalPrivateApp
  2.팀장 포탈 : PortalDeptApp
  3.실장 포탈 : PortalHeadApp
  4.관리자 포탈 : PortalAdminApp
  
  1.개인 출퇴근 : CommutePrivateApp
  2.팀원 출퇴근 : CommuteDeptApp
  3.실원 출퇴근 : CommuteHeadApp
  4.전체 출퇴근 관리 : CommuteAdminApp
  5.전체 출퇴근 통계 : CommuteStatsApp

  1.개인 휴가/휴직 : VacationPrivateApp
  2.팀원 휴가/휴직 : VacationDeptApp
  3.실원 휴가/휴직 : VacationHeadApp
  4.전체 휴가 관리 : VacationAdminApp

  1.팀 업무보고 : WorkReportDeptApp
  2.실 업무보고 : WorkReportHeadApp
  3.전체 업무보고 : WorkReportAdminApp

  1.근무시간관리 : DeptTimeSettingApp
  2.휴가발생관리 : VacationManageApp
  3.공휴일관리 : HolidayManageApp


*/

const getAppComponent = function () {
  const pageType = 'CommutePrivateApp';
  if (pageType === 'PortalPrivateApp') {
    return <PortalPrivateApp />;
  } else if (pageType === 'PortalPrivateApp') {
    return <PortalPrivateApp />;
  } else if (pageType === 'PortalDeptApp') {
    return <PortalDeptApp />;
  } else if (pageType === 'PortalHeadApp') {
    return <PortalHeadApp />;
  } else if (pageType === 'PortalAdminApp') {
    return <PortalAdminApp />;
  } else if (pageType === 'CommutePrivateApp') {
    return <CommutePrivateApp />;
  } else if (pageType === 'CommuteDeptApp') {
    return <CommuteDeptApp />;
  } else if (pageType === 'CommuteHeadApp') {
    return <CommuteHeadApp />;
  } else if (pageType === 'CommuteAdminApp') {
    return <CommuteAdminApp />;
  } else if (pageType === 'CommuteStatsApp') {
    return <CommuteStatsApp />;
  } else if (pageType === 'VacationPrivateApp') {
    return <VacationPrivateApp />;
  } else if (pageType === 'VacationDeptApp') {
    return <VacationDeptApp />;
  } else if (pageType === 'VacationHeadApp') {
    return <VacationHeadApp />;
  } else if (pageType === 'VacationAdminApp') {
    return <VacationAdminApp />;
  } else if (pageType === 'WorkReportDeptApp') {
    return <WorkReportDeptApp />;
  } else if (pageType === 'WorkReportHeadApp') {
    return <WorkReportHeadApp />;
  } else if (pageType === 'WorkReportAdminApp') {
    return <WorkReportAdminApp />;
  } else if (pageType === 'DeptTimeSettingApp') {
    return <DeptTimeSettingApp />;
  } else if (pageType === 'VacationManageApp') {
    return <VacationManageApp />;
  } else if (pageType === 'HolidayManageApp') {
    return <HolidayManageApp />;
  }
  return null;
};

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

    uiStore.init();
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
    const { profile } = appStore;
    let mainComponent = getAppComponent();
    return (
      <ErrorBoundary>
        <div>{mainComponent}</div>
      </ErrorBoundary>
    );
  }
}

export default App;
