import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import VacationSubMenu from 'component/submenu/VacationSubMenu';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import moment from 'moment';

@inject('appStore', 'uiStore', 'vacationStatsStore')
@observer
class VacationAdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.openYearDatepicker = this.openYearDatepicker.bind(this);
    this.changeSearchYear = this.changeSearchYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
  }

  init() {
    const { vacationStatsStore } = this.props;
    vacationStatsStore.initSearchDateAll();
    vacationStatsStore.search();
  }

  search() {
    const { vacationStatsStore } = this.props;
    vacationStatsStore.search();
  }

  openYearDatepicker() {
    const { vacationStatsStore } = this.props;
    vacationStatsStore.openYearDatepicker();
  }

  changeSearchYear(date) {
    const { vacationStatsStore } = this.props;
    vacationStatsStore.changeSearchYear(date);
  }

  nextYear() {
    const { vacationStatsStore } = this.props;
    vacationStatsStore.nextYear();
  }

  prevYear() {
    const { vacationStatsStore } = this.props;
    vacationStatsStore.prevYear();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationStatsStore } = this.props;
    const { datagridStore, searchYear, yearDatepickerOpend } =
      vacationStatsStore;
    const searchYearStr = Helper.dateToString(searchYear, 'YYYY');
    let searchYearBeforeStr = '';
    if (searchYear) {
      searchYearBeforeStr = moment(searchYearStr)
        .subtract(1, 'years')
        .format('YYYY');
    }
    return (
      <div id="contents_sub" class="">
        <VacationSubMenu />

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">휴가/휴직</a>&gt;
            <a href="javascript:void(0);">전체 휴가관리</a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="sel_month">
              <a
                href="javascript:void(0);"
                class="prev"
                onClick={this.prevYear}
              >
                이전
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchYear, 'YYYY년')}
              </span>
              <a
                href="javascript:void(0);"
                class="next"
                onClick={this.nextYear}
              >
                다음
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openYearDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
              {yearDatepickerOpend && (
                <DatePicker
                  selected={searchYear}
                  onChange={(date) => this.changeSearchYear(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  inline
                />
              )}
            </div>

            <a
              href="javascript:void(0);"
              class="btn_right btn_search_big"
              onClick={this.search}
            >
              조회
            </a>
          </div>
          <div class="grid_area">
            <div class="grid_top flex_sb mgtop20">
              <div>
                <label for="search_option" class="blind">
                  검색조건
                </label>
              </div>
              <div class="search_right">
                <a href="javascript:void(0);" class="btn_ico">
                  <i class="ico_download"></i>엑셀다운로드
                </a>
                <a
                  href="javascript:void(0);"
                  class="btn_ico"
                  onClick={this.search}
                >
                  <i class="ico_refresh"></i>새로고침
                </a>
              </div>
            </div>
            <div class="mgtop10">
              <DataGrid
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'통계 정보가 존재하지 않습니다.'}
                columnAutoWidth={true}
                height={650}
              >
                <Column dataField="deptName" dataType="string" caption="직급" />
                <Column
                  dataField="startWorkIp"
                  dataType="string"
                  caption="성명"
                />
                <Column
                  dataField="startWorkDate"
                  dataType="datetime"
                  caption="입사일"
                  format="HH:mm"
                />
                <Column
                  dataField="outWorkIp"
                  dataType="string"
                  caption="회계년수"
                />
                <Column
                  dataField="outWorkDate"
                  dataType="datetime"
                  caption="초년월수"
                  format="HH:mm"
                />
                <Column
                  dataField="workStatusCodeName"
                  dataType="date"
                  caption="발생연차"
                />
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption="금년월차"
                />
                <Column caption="과년월차">
                  <Column
                    dataField="Population_Total"
                    caption="발생"
                    format="fixedPoint"
                  />
                  <Column
                    dataField="Population_Urban"
                    caption="사용"
                    format="percent"
                  />
                </Column>
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption={searchYearStr + '년 발생일수'}
                />
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption={searchYearBeforeStr + '년 사용일수'}
                />
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption={searchYearStr + '년 가능일수'}
                />

                <Column caption={searchYearStr + '년 연차휴가 사용 일수'}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthIndex) => {
                    return (
                      <Column
                        dataField="Population_Total"
                        caption={monthIndex}
                        format="fixedPoint"
                      />
                    );
                  })}
                  <Column
                    dataField="Population_Total"
                    caption="합계"
                    format="fixedPoint"
                  />
                </Column>
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption={'창립기념 포상휴가'}
                />
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption={searchYearStr + '년 잔여일수'}
                />
                <Paging defaultPageSize={10} />
                <Pager showPageSizeSelector={true} />
              </DataGrid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationAdminApp;
