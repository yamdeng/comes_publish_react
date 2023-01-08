/* global reactPageType */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore')
@observer
class CommuteSubMenu extends Component {
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
        <h3>출퇴근</h3>
        <ul class="sub_menu">
          <li
            class={pageType === 'CommutePrivateApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/commute-private.do')}
          >
            <a href="javascript:void(0);">개인출퇴근</a>
          </li>
          <li
            class={pageType === 'CommuteDeptApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/commute-dept.do')}
            style={{ display: isManager ? '' : 'none' }}
          >
            <a href="javascript:void(0);">팀원출퇴근</a>
          </li>
          <li
            style={{ display: isHeadMenuVisible ? '' : 'none' }}
            class={pageType === 'CommuteHeadApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/commute-head.do')}
          >
            <a href="javascript:void(0);">실원출퇴근</a>
          </li>
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'CommuteAdminApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/commute-admin.do')}
          >
            <a href="javascript:void(0);">전체출퇴근관리</a>
          </li>
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'CommuteStatsApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('newoffice/view/commute-stats.do')}
          >
            <a href="javascript:void(0);">전체출퇴근통계</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default CommuteSubMenu;
