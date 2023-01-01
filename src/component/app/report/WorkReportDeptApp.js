import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import WorkReportSubMenu from 'component/submenu/WorkReportSubMenu';
import moment from 'moment';
import WorkReportFormModal from './WorkReportFormModal';

@inject('appStore', 'uiStore', 'workReportStore', 'workReportFormModalStore')
@observer
class WorkReportDeptApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
    this.initSearch = this.initSearch.bind(this);
    this.search = this.search.bind(this);
    this.changeSearchDateType = this.changeSearchDateType.bind(this);

    // 3개 종류 datepicker handler start
    this.changeSearchDate = this.changeSearchDate.bind(this);
    this.openDayDatepicker = this.openDayDatepicker.bind(this);

    this.changeSearchMonth = this.changeSearchMonth.bind(this);
    this.openMonthDatepicker = this.openMonthDatepicker.bind(this);

    this.changeStartDate = this.changeStartDate.bind(this);
    this.openStartDatepicker = this.openStartDatepicker.bind(this);

    this.changeEndDate = this.changeEndDate.bind(this);
    this.openEndDatepicker = this.openEndDatepicker.bind(this);
    // 3개 종류 datepicker handler end

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);

    this.changeSearchDashBoardKind = this.changeSearchDashBoardKind.bind(this);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  init() {
    const { workReportStore } = this.props;
    workReportStore.changeSearchDateType(Constant.SEARCH_DATE_TYPE_MONTH);
    workReportStore.initSearchDateAll();
    this.search();
  }

  initSearch() {
    const { workReportStore } = this.props;
    workReportStore.initSearch();
  }

  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    const { workReportStore } = this.props;
    workReportStore.search();
  }

  changeSearchDateType() {
    const value = event.target.value;
    const { workReportStore } = this.props;
    workReportStore.changeSearchDateType(value);
  }

  changeSearchDate(date) {
    const { workReportStore } = this.props;
    workReportStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { workReportStore } = this.props;
    workReportStore.openDayDatepicker();
  }

  changeSearchMonth(date) {
    const { workReportStore } = this.props;
    workReportStore.changeSearchMonth(date);
  }

  openMonthDatepicker() {
    const { workReportStore } = this.props;
    workReportStore.openMonthDatepicker();
  }

  changeStartDate(date) {
    const { workReportStore } = this.props;
    workReportStore.changeStartDate(date);
  }

  openStartDatepicker() {
    const { workReportStore } = this.props;
    workReportStore.openStartDatepicker();
  }

  changeEndDate(date) {
    const { workReportStore } = this.props;
    workReportStore.changeEndDate(date);
  }

  openEndDatepicker() {
    const { workReportStore } = this.props;
    workReportStore.openEndDatepicker();
  }

  changeSearchDashBoardKind(kind) {
    const { workReportStore } = this.props;
    workReportStore.changeSearchDashBoardKind(kind);
  }

  nextMonth(kind) {
    const { workReportStore } = this.props;
    workReportStore.nextMonth(kind);
  }
  prevMonth(kind) {
    const { workReportStore } = this.props;
    workReportStore.prevMonth(kind);
  }
  nextDay(kind) {
    const { workReportStore } = this.props;
    workReportStore.nextDay(kind);
  }
  prevDay(kind) {
    const { workReportStore } = this.props;
    workReportStore.prevDay(kind);
  }

  handleRowClick(e) {
    const { workReportFormModalStore } = this.props;
    if (e.data) {
      workReportFormModalStore.openModal(e.data);
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { workReportStore } = this.props;

    let {
      searchDateType,
      searchMonth,
      startDate,
      endDate,
      monthDatepickerOpend,
      startDatepickerOpend,
      endDatepickerOpend,
      totalCount,
      statsInfo,
      datagridStore,
      searchDashBoardKind
    } = workReportStore;
    statsInfo = statsInfo || {};
    return (
      <div id="contents_sub" class="">
        <WorkReportSubMenu />

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">업무보고</a>&gt;
            <a href="javascript:void(0);">팁 업무보고</a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="grp_cale_option">
              <ul id="calelist" class="flex_sb">
                <li>
                  <div class="radio">
                    <input
                      type="radio"
                      id="cale_option1"
                      name="cale_option"
                      checked={
                        searchDateType === Constant.SEARCH_DATE_TYPE_MONTH
                      }
                      value={Constant.SEARCH_DATE_TYPE_MONTH}
                      onChange={this.changeSearchDateType}
                    ></input>

                    <label for="cale_option1">월간</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input
                      type="radio"
                      id="cale_option2"
                      name="cale_option"
                      checked={
                        searchDateType === Constant.SEARCH_DATE_TYPE_RANGE
                      }
                      value={Constant.SEARCH_DATE_TYPE_RANGE}
                      onChange={this.changeSearchDateType}
                    ></input>
                    <label for="cale_option2">기간</label>
                  </div>
                </li>
              </ul>
            </div>

            {/* 월 datepicker start */}
            <div
              className={classnames(
                'sel_month',
                'calelist_month',
                'cale_option1',
                {
                  on: searchDateType === Constant.SEARCH_DATE_TYPE_MONTH
                }
              )}
            >
              <a
                href="javascript:void(0);"
                class="prev"
                onClick={this.prevMonth}
              >
                이전 달
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchMonth, 'YYYY년 M월')}
              </span>
              <a
                href="javascript:void(0);"
                class="next"
                onClick={this.nextMonth}
              >
                다음 달
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openMonthDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
              {monthDatepickerOpend && (
                <DatePicker
                  selected={searchMonth}
                  onChange={(date) => this.changeSearchMonth(date)}
                  dateFormat="yyyyMM"
                  showMonthYearPicker
                  inline
                />
              )}
            </div>
            {/* 월 datepicker end */}

            {/* 기간 datepicker start */}
            <div
              className={classnames(
                'sel_month',
                'calelist_month',
                'cale_option2',
                {
                  on: searchDateType === Constant.SEARCH_DATE_TYPE_RANGE
                }
              )}
            >
              <span class="txt_month2">
                {Helper.dateToString(startDate, 'YYYY-MM-DD')}
              </span>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openStartDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="시작일 선택하기"
                />
              </a>
              <span>~</span>
              <span class="txt_month2">
                {Helper.dateToString(endDate, 'YYYY-MM-DD')}
              </span>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openEndDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="종료일 선택하기"
                />
              </a>
              {startDatepickerOpend && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => this.changeStartDate(date)}
                  dateFormat="yyyyMMdd"
                  inline
                />
              )}
              {endDatepickerOpend && (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => this.changeEndDate(date)}
                  dateFormat="yyyyMMdd"
                  inline
                />
              )}
            </div>
            {/* 기간 datepicker end */}

            <a
              href="javascript:void(0);"
              class="btn_right btn_search_big"
              onClick={this.search}
            >
              조회
            </a>
          </div>
          {/* 일간 통계 영역 */}
          {/* <div class="title_area">
            <h3>휴가/휴직 현황</h3>
          </div> */}
          <div class="flex_ul_box_container">
            <ul
              class="flex_ul_box flex_sb scroll-minimum"
              style={{ overflowX: 'scroll' }}
            >
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('')}
              >
                <div className={!searchDashBoardKind ? 'blue' : ''}>
                  <span>업무보고</span>
                  <b>{statsInfo.all}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('NOT_SUBMIT')}
              >
                <div
                  className={searchDashBoardKind === 'NOT_SUBMIT' ? 'blue' : ''}
                >
                  <span>미제출</span>
                  <b>{statsInfo.report_not_submit}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('ISSUE')}
              >
                <div className={searchDashBoardKind === 'ISSUE' ? 'blue' : ''}>
                  <span>이슈</span>
                  <b>{statsInfo.report_issue}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('COMMENT')}
              >
                <div
                  className={searchDashBoardKind === 'COMMENT' ? 'blue' : ''}
                >
                  <span>코멘트</span>
                  <b>{statsInfo.comment}</b>
                </div>
              </li>
            </ul>
          </div>
          <div class="grid_area">
            <div class="mgtop10">
              <DataGrid
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'업무보고 정보가 존재하지 않습니다.'}
                height={450}
                onRowClick={this.handleRowClick}
              >
                <Column
                  dataField="baseDateStr"
                  dataType="string"
                  caption="날짜"
                  calculateCellValue={function (rowData) {
                    if (rowData && rowData.baseDateStr) {
                      return Helper.convertDate(
                        rowData.baseDateStr,
                        'YYYYMMDD',
                        'YYYY-MM-DD'
                      );
                    }
                    return '';
                  }}
                />
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="부서명"
                />
                <Column
                  dataField="reportDate"
                  dataType="datetime"
                  caption="작성일시"
                  format="YYYY-MM-DD HH:mm"
                  calculateCellValue={function (rowData) {
                    if (!rowData || !rowData.reportDate) {
                      return '미제출';
                    }
                    return moment(rowData.reportDate).format('YYYY-MM-DD');
                  }}
                />
                <Column
                  dataField="managerName"
                  dataType="string"
                  caption="작성자"
                />
                <Column dataField="issueYn" dataType="string" caption="이슈" />
                <Column
                  dataField="commentCount"
                  caption="댓글"
                  calculateCellValue={function (rowData) {
                    if (rowData && rowData.commentCount) {
                      return 'Y';
                    }
                    return 'N';
                  }}
                />
                <Paging defaultPageSize={10} />
                <Pager showPageSizeSelector={true} />
              </DataGrid>
            </div>
          </div>
        </div>
        <WorkReportFormModal />
      </div>
    );
  }
}

export default WorkReportDeptApp;
