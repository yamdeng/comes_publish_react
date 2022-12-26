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
class VacationManageBatchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
  }

  init() {}

  search() {
    const { vacationManageStore } = this.props;
    this.search();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationManageStore, visible } = this.props;
    const { datagridStore } = vacationManageStore;
    return (
      <div id="tab01" style={{ display: visible ? '' : 'none' }}>
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
                    <label for="sel_option1" class="blind">
                      선택
                    </label>
                    <select id="sel_option1" class="mgrg40">
                      <option>------------------</option>
                      <option>------------------</option>
                      <option>------------------</option>
                      <option>------------------</option>
                    </select>
                  </li>
                  <li>
                    <div class="radio">
                      <input type="radio" id="option2" name="option" />
                      <label for="option2">
                        휴가 발생 데이터 없는 직원 선택
                      </label>
                    </div>
                    <label for="sel_option2" class="blind">
                      선택
                    </label>
                    <select id="sel_option2">
                      <option>------------------------------------</option>
                      <option>------------------------------------</option>
                      <option>------------------------------------</option>
                      <option>------------------------------------</option>
                    </select>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div class="grid_top flex_sb mgtop20">
            <div class="number">
              <p>
                발생대상 미리보기/수정( <b class="blue">228</b> )명
              </p>
            </div>
            <div class="search_right">
              <a href="javascript:void(0);" class="btn_ico">
                <i class="ico_download"></i>엑셀다운로드
              </a>
              <a href="javascript:void(0);" class="btn_ico">
                <i class="ico_copyfile"></i>복사
              </a>
            </div>
          </div>
          <p
            style={{
              border: '1px solid #d6d6d6',
              height: 300,
              fontSize: 15,
              lineHeight: 300,
              textAlign: 'center',
              width: 1650
            }}
          ></p>
        </div>
        <div class="btn_area relative mgtop10">
          <div class="btn_right">
            <a class="btn_normal btn_blue" href="javascript:void(0);">
              휴가발생
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationManageBatchTab;
