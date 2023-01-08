/* global reactPageType */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore')
@observer
class VacationSubMenu extends Component {
  render() {
    const { appStore } = this.props;
    const { profile, isManager } = appStore;
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
        <h3>휴가/휴직</h3>
        <ul class="sub_menu">
          <li
            class={pageType === 'VacationPrivateApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/vacation-private.do')}
          >
            <a href="javascript:void(0);">개인 휴가/휴직</a>
          </li>
          <li
            class={pageType === 'VacationDeptApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/vacation-dept.do')}
            style={{ display: isManager ? '' : 'none' }}
          >
            <a href="javascript:void(0);">팀원 휴가/휴직</a>
          </li>
          <li
            style={{ display: isHeadMenuVisible ? '' : 'none' }}
            class={pageType === 'VacationHeadApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/vacation-head.do')}
          >
            <a href="javascript:void(0);">실원 휴가/휴직</a>
          </li>
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'VacationAdminApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/vacation-admin.do')}
          >
            <a href="javascript:void(0);">전체 휴가관리</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default VacationSubMenu;
