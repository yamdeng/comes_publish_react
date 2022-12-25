import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import SettingSubMenu from 'component/submenu/SettingSubMenu';

@inject('appStore', 'uiStore', 'vacationManageStore')
@observer
class VacationManageConditionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
  }

  init() {}

  search() {}

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationManageStore, visible } = this.props;
    const { datagridStore } = vacationManageStore;
    return (
      <div id="tab02" style={{ display: visible ? '' : 'none' }}>
        <div class="">
          <ul class="search_area">
            <li>
              <div class="title">발생 연도</div>
              <div class="con">
                <input type="text" value="2022년" disabled class="w90" />
              </div>
            </li>
            <li>
              <div class="title">발생 대상</div>
              <div class="con">
                <ul class="con_flex">
                  <li>
                    <div class="radio">
                      <input type="radio" id="option1" name="option" checked />
                      <label for="option1">전직원</label>
                    </div>
                  </li>
                  <li>
                    <div class="radio">
                      <input type="radio" id="option2" name="option" />
                      <label for="option2">
                        휴가 발생 데이터 없는 직원 선택
                      </label>
                    </div>
                    <label for="sel_option" class="blind">
                      실 선택
                    </label>
                    <select id="sel_option">
                      <option>------------------------------------</option>
                      <option>------------------------------------</option>
                      <option>------------------------------------</option>
                      <option>------------------------------------</option>
                    </select>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="title">휴가발생</div>
              <div class="con">
                <label for="vacation_option1" class="mgrg20">
                  휴가이름
                </label>
                <input type="text" id="vacation_option1" />
                <label for="vacation_option2" class="mgrg20">
                  휴가일수
                </label>
                <input type="text" id="vacation_option2" class="w90" />
                <a href="javascript:void(0);" class="btn_normal btn_blue">
                  적용
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default VacationManageConditionTab;
