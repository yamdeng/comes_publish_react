/* global reactPageType */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore')
@observer
class SettingSubMenu extends Component {
  render() {
    const { appStore } = this.props;
    const { profile } = appStore;
    const { userType } = profile;
    const pageType = reactPageType;
    let isAdminMenuVisible = false;
    if (userType === Constant.USER_TYPE_ADMIN) {
      isAdminMenuVisible = true;
    }
    return (
      <div class="sub_lnb">
        <h3>설정</h3>
        <ul class="sub_menu">
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'DeptTimeSettingApp' ? 'on' : ''}
            onClick={() =>
              Helper.goUrl('siteadmin/config/setting-depttime.adm')
            }
          >
            <a href="javascript:void(0);">근무시간관리</a>
          </li>
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'VacationManageApp' ? 'on' : ''}
            onClick={() =>
              Helper.goUrl('siteadmin/config/setting-vacation.adm')
            }
          >
            <a href="javascript:void(0);">휴가발생관리</a>
          </li>
          <li
            style={{ display: isAdminMenuVisible ? '' : 'none' }}
            class={pageType === 'HolidayManageApp' ? 'on' : ''}
            onClick={() => Helper.goUrl('siteadmin/config/setting-holiday.adm')}
          >
            <a href="javascript:void(0);">공휴일관리</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SettingSubMenu;
