import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import SettingSubMenu from 'component/submenu/SettingSubMenu';
import VacationManageBatchTab from './VacationManageBatchTab';
import VacationManageConditionTab from './VacationManageConditionTab';

@inject('appStore', 'uiStore', 'vacationManageStore')
@observer
class VacationManageApp extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 1 };
    this.init = this.init.bind(this);
    this.changeTabIndex = this.changeTabIndex.bind(this);
  }

  init() {}

  changeTabIndex(tabIndex) {
    this.setState({ tabIndex: tabIndex });
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div id="contents_sub" class="">
        <SettingSubMenu />
        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">설정</a>&gt;
            <a href="javascript:void(0);">휴가발생관리</a>
          </div>

          <div class="tab_sub">
            <ul class="tab_subnav">
              <li onClick={() => this.changeTabIndex(1)}>
                <a
                  href="javascript:void(0);"
                  className={tabIndex === 1 ? 'active' : ''}
                >
                  일괄 발생
                </a>
              </li>
              <li onClick={() => this.changeTabIndex(2)}>
                <a
                  href="javascript:void(0);"
                  className={tabIndex === 2 ? 'active' : ''}
                >
                  조건 발생
                </a>
              </li>
            </ul>
            <div class="tab_subcontent">
              <VacationManageBatchTab visible={tabIndex === 1 ? true : false} />
              <VacationManageConditionTab
                visible={tabIndex === 2 ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationManageApp;
