import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import SettingSubMenu from 'component/submenu/SettingSubMenu';

@inject('appStore', 'uiStore', 'vacationManagePlusStore')
@observer
class VacationManageConditionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
  }

  init() {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.initDataGridComponent(this.dataGridRef);
  }

  search() {}

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationManagePlusStore, visible } = this.props;
    const { datagridStore } = vacationManagePlusStore;
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
                      <input
                        type="radio"
                        id="plusoption1"
                        name="option"
                        checked
                      />
                      <label for="plusoption1">전직원</label>
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
                      <input type="radio" id="plusoption2" name="option" />
                      <label for="plusoption2">직원 선택</label>
                    </div>
                    <a class="btn_normal btn_blue" href="javascript:void(0);">
                      직원선택
                    </a>
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
          <DataGrid
            ref={this.dataGridRef}
            dataSource={datagridStore}
            showBorders={true}
            remoteOperations={true}
            noDataText={'출근 정보가 존재하지 않습니다.'}
            height={450}
            cacheEnabled={false}
          >
            <Column
              dataField="userName"
              dataType="string"
              caption="이름"
              allowSorting={false}
            />
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              showPageSizeSelector={true}
              allowedPageSizes={[5, 10, 'all']}
            />
          </DataGrid>
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

export default VacationManageConditionTab;
