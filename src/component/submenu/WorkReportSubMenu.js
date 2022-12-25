/* global reactPageType */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore')
@observer
class WorkReportSubMenu extends Component {
  render() {
    const { appStore } = this.props;
    const { profile } = appStore;
    const { userType } = profile;
    const pageType = reactPageType;
    let isHeadMenuVisible = false;
    let isAdminMenuVisible = false;
    if (userType === Constant.USER_TYPE_HEADER) {
      isHeadMenuVisible = true;
    }
    if (userType === Constant.USER_TYPE_ADMIN) {
      isAdminMenuVisible = true;
    }
    return (
      <div class="sub_lnb">
        <h3>업무보고</h3>
        <ul class="sub_menu">
          <li
            class={pageType === 'WorkReportDeptApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/report-dept.do')}
          >
            <a href="javascript:void(0);">팀 업무보고</a>
          </li>
          <li
            style={{ display: isHeadMenuVisible ? '' : 'none' }}
            class={pageType === 'WorkReportHeadApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/report-head.do')}
          >
            <a href="javascript:void(0);">실 업무보고</a>
          </li>
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'WorkReportAdminApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/report-admin.do')}
          >
            <a href="javascript:void(0);">전체 업무보고</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default WorkReportSubMenu;
