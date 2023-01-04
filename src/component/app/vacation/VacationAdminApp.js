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

    this.dataGridRef = React.createRef();

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
    vacationStatsStore.initDataGridComponent(this.dataGridRef);
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
                ref={this.dataGridRef}
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                cacheEnabled={false}
                noDataText={'통계 정보가 존재하지 않습니다.'}
                columnResizingMode={true}
                columnAutoWidth={true}
                width={1650}
                height={650}
              >
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="부서"
                  allowSorting={false}
                />
                <Column
                  dataField="positionTitle"
                  dataType="string"
                  caption="직급"
                  allowSorting={false}
                />
                <Column
                  dataField="userName"
                  dataType="string"
                  caption="성명"
                  allowSorting={false}
                />
                <Column
                  dataField="joinDate"
                  dataType="datetime"
                  caption="입사일"
                  format="yyyy-MM-dd"
                  allowSorting={false}
                />
                <Column
                  dataField="outWorkIp"
                  dataType="string"
                  caption="회계년수"
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData && rowData.joinDate) {
                      return (
                        Number(rowData.baseYear) -
                        Number(moment(rowData.joinDate).format('YYYY')) -
                        1
                      );
                    }
                    return 0;
                  }}
                />
                <Column
                  dataField="outWorkDate"
                  caption="초년월수"
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    return 0;
                  }}
                />
                <Column
                  dataField="annualCount"
                  caption="발생연차"
                  allowSorting={false}
                />
                <Column
                  dataField="monthCount"
                  caption="금년월차"
                  allowSorting={false}
                />
                <Column caption="과년월차">
                  <Column
                    dataField="monthCount"
                    caption="발생"
                    allowSorting={false}
                    calculateCellValue={function (rowData) {
                      return 0;
                    }}
                  />
                  <Column
                    dataField="monthCount"
                    caption="사용"
                    allowSorting={false}
                    calculateCellValue={function (rowData) {
                      return 0;
                    }}
                  />
                </Column>
                <Column
                  dataField="annualCount"
                  caption={searchYearStr + '년 발생일수'}
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData) {
                      return rowData.annualCount + rowData.plusVacationCount;
                    }
                    return 0;
                  }}
                />
                <Column
                  dataField="usedCount"
                  caption={searchYearBeforeStr + '년 사용일수'}
                  allowSorting={false}
                />
                <Column
                  dataField="usedCount"
                  caption={searchYearStr + '년 가능일수'}
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData) {
                      return rowData.annualCount + rowData.plusVacationCount;
                    }
                    return 0;
                  }}
                />

                <Column caption={searchYearStr + '년 연차휴가 사용 일수'}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthIndex) => {
                    return (
                      <Column
                        dataField={'use' + monthIndex + 'monthCount'}
                        caption={monthIndex}
                        allowSorting={false}
                      />
                    );
                  })}
                  <Column
                    dataField="sumUseMonthCount"
                    caption="합계"
                    allowSorting={false}
                  />
                </Column>
                <Column
                  dataField="plusVacationCount"
                  caption={'창립기념 포상휴가'}
                  allowSorting={false}
                />
                <Column
                  dataField="useableCount"
                  caption={searchYearStr + '년 잔여일수'}
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData) {
                      return rowData.annualCount - rowData.usedCount;
                    }
                    return 0;
                  }}
                  cellRender={(columnInfo) => {
                    return <span class="red">{columnInfo.value}</span>;
                  }}
                />
                <Paging defaultPageSize={15} />
                <Pager
                  visible={true}
                  showPageSizeSelector={true}
                  allowedPageSizes={[5, 10, 'all']}
                />
              </DataGrid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationAdminApp;
