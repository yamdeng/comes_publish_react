import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import CommuteDayModal from './CommuteDayModal';
import CommuteDaySubmitModal from './CommuteDaySubmitModal';

@inject(
  'appStore',
  'uiStore',
  'commutePrivateStore',
  'commuteDayUpdateModalStore',
  'commuteDaySubmitModalStore'
)
@observer
class CommuteDeptApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.dataGridRef = React.createRef();

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
    this.openUpdateModal = this.openUpdateModal.bind(this);
    this.openSubmitModal = this.openSubmitModal.bind(this);
  }

  init() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.initDataGridComponent(this.dataGridRef);
    commutePrivateStore.changeSearchDateType(Constant.SEARCH_DATE_TYPE_DAY);
    commutePrivateStore.initSearchDateAll();
    this.search();
  }

  initSearch() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.initSearch();
  }

  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    const { commutePrivateStore } = this.props;
    commutePrivateStore.search();
  }

  changeSearchDateType() {
    const value = event.target.value;
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchDateType(value);
  }

  changeSearchDate(date) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.openDayDatepicker();
  }

  changeSearchMonth(date) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchMonth(date);
  }

  openMonthDatepicker() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.openMonthDatepicker();
  }

  changeStartDate(date) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeStartDate(date);
  }

  openStartDatepicker() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.openStartDatepicker();
  }

  changeEndDate(date) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeEndDate(date);
  }

  openEndDatepicker() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.openEndDatepicker();
  }

  changeSearchDashBoardKind(kind) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchDashBoardKind(kind);
  }

  nextMonth(kind) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.nextMonth(kind);
  }
  prevMonth(kind) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.prevMonth(kind);
  }
  nextDay(kind) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.nextDay(kind);
  }
  prevDay(kind) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.prevDay(kind);
  }

  openUpdateModal() {
    const { commutePrivateStore, commuteDayUpdateModalStore } = this.props;
    const { searchDate } = commutePrivateStore;
    commuteDayUpdateModalStore.openModal(searchDate);
  }

  openSubmitModal() {
    const { commutePrivateStore, commuteDaySubmitModalStore } = this.props;
    const { searchDate } = commutePrivateStore;
    commuteDaySubmitModalStore.openModal(searchDate);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { commutePrivateStore } = this.props;

    let {
      searchDateType,
      searchDate,
      searchMonth,
      startDate,
      endDate,
      dayDatepickerOpend,
      monthDatepickerOpend,
      startDatepickerOpend,
      endDatepickerOpend,
      totalCount,
      manageDayStatsInfo,
      datagridStore,
      searchDashBoardKind,
      managerMonthStatsUserList
    } = commutePrivateStore;
    manageDayStatsInfo = manageDayStatsInfo || {};
    let managerMonthStatsUserListComponent = null;
    if (managerMonthStatsUserList.length) {
      managerMonthStatsUserListComponent = (
        <div class="relative">
          <a
            href="javascript:void(0);"
            class="btn_nepr prev"
            style={{
              display: managerMonthStatsUserList.length > 7 ? '' : 'none'
            }}
          >
            <span>이전</span>
          </a>
          <div class="flex_ul_box_container">
            <ul class="flex_ul_box flex_sb">
              {managerMonthStatsUserList.map((managerMonthStatsUserInfo) => {
                const {
                  userName,
                  positionTitle,
                  successCommuteCount,
                  tardyCommuteCount,
                  vacationCount
                } = managerMonthStatsUserInfo;
                return (
                  <li class="flex_center">
                    <div>
                      <span>
                        {userName} {positionTitle}
                      </span>
                      <b>
                        {successCommuteCount} / {tardyCommuteCount} /{' '}
                        {vacationCount}
                      </b>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <a
            href="javascript:void(0);"
            class="btn_nepr next"
            style={{
              display: managerMonthStatsUserList.length > 7 ? '' : 'none'
            }}
          >
            <span>다음</span>
          </a>
        </div>
      );
    } else {
      managerMonthStatsUserListComponent = (
        <div class="relative">팀원이 존재하지 않습니다.</div>
      );
    }
    return (
      <div id="contents_sub" class="">
        <CommuteSubMenu />
        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">출퇴근</a>&gt;
            <a href="javascript:void(0);">팀원출퇴근</a>
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
                      checked={searchDateType === Constant.SEARCH_DATE_TYPE_DAY}
                      value={Constant.SEARCH_DATE_TYPE_DAY}
                      onChange={this.changeSearchDateType}
                    ></input>

                    <label for="cale_option1">하루</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input
                      type="radio"
                      id="cale_option2"
                      name="cale_option"
                      checked={
                        searchDateType === Constant.SEARCH_DATE_TYPE_MONTH
                      }
                      value={Constant.SEARCH_DATE_TYPE_MONTH}
                      onChange={this.changeSearchDateType}
                    ></input>
                    <label for="cale_option2">월간</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input
                      type="radio"
                      id="cale_option3"
                      name="cale_option"
                      checked={
                        searchDateType === Constant.SEARCH_DATE_TYPE_RANGE
                      }
                      value={Constant.SEARCH_DATE_TYPE_RANGE}
                      onChange={this.changeSearchDateType}
                    ></input>
                    <label for="cale_option3">기간</label>
                  </div>
                </li>
              </ul>
            </div>
            {/* 일 datepicker start */}
            <div
              className={classnames(
                'sel_month',
                'calelist_month',
                'cale_option1',
                {
                  on: searchDateType === Constant.SEARCH_DATE_TYPE_DAY
                }
              )}
            >
              <a href="javascript:void(0);" class="prev" onClick={this.prevDay}>
                이전 일
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchDate, 'M월 DD일 (ddd)')}
              </span>
              <a href="javascript:void(0);" class="next" onClick={this.nextDay}>
                다음 일
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openDayDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="일 선택하기"
                />
              </a>
              {dayDatepickerOpend && (
                <DatePicker
                  selected={searchDate}
                  onChange={(date) => this.changeSearchDate(date)}
                  dateFormat="yyyyMMdd"
                  inline
                />
              )}
            </div>
            {/* 일 datepicker end */}
            {/* 월 datepicker start */}
            <div
              className={classnames(
                'sel_month',
                'calelist_month',
                'cale_option2',
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
                'cale_option3',
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
              onClick={this.initSearch}
            >
              조회
            </a>
          </div>
          {/* 일간 통계 영역 */}
          <div
            class="sub_serch_result"
            style={{
              display:
                searchDateType === Constant.SEARCH_DATE_TYPE_DAY ? '' : 'none'
            }}
          >
            <ul
              class="flex_ul_box flex_sb scroll-minimum"
              style={{ overflowX: 'scroll' }}
            >
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind(Constant.CODE_WORK_STATUS_ING)
                }
              >
                <div
                  className={
                    searchDashBoardKind === Constant.CODE_WORK_STATUS_ING
                      ? 'blue'
                      : ''
                  }
                >
                  <span>업무 중</span>
                  <b>{manageDayStatsInfo.ing}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind(
                    Constant.CODE_WORK_STATUS_HOME_ING
                  )
                }
              >
                <div
                  className={
                    searchDashBoardKind === Constant.CODE_WORK_STATUS_HOME_ING
                      ? 'blue'
                      : ''
                  }
                >
                  <span>재택 중</span>
                  <b>{manageDayStatsInfo.home_ing}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind(
                    Constant.CODE_WORK_STATUS_VACATION_MORNING
                  )
                }
              >
                <div
                  className={
                    searchDashBoardKind ===
                    Constant.CODE_WORK_STATUS_VACATION_MORNING
                      ? 'blue'
                      : ''
                  }
                >
                  <span>오전반차</span>
                  <b>{manageDayStatsInfo.vacation_morning}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind(
                    Constant.CODE_WORK_STATUS_VACATION_AFTERNOON
                  )
                }
              >
                <div
                  className={
                    searchDashBoardKind ===
                    Constant.CODE_WORK_STATUS_VACATION_AFTERNOON
                      ? 'blue'
                      : ''
                  }
                >
                  <span>오후반차</span>
                  <b>{manageDayStatsInfo.vacation_afternoon}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind(Constant.CODE_WORK_STATUS_END)
                }
              >
                <div
                  className={
                    searchDashBoardKind === Constant.CODE_WORK_STATUS_END
                      ? 'blue'
                      : ''
                  }
                >
                  <span>업무종료</span>
                  <b>{manageDayStatsInfo.end}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('tardyYn')}
              >
                <div
                  className={searchDashBoardKind === 'tardyYn' ? 'blue' : ''}
                >
                  <span>지각</span>
                  <b>{manageDayStatsInfo.tardy}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('vacationYn')}
              >
                <div
                  className={searchDashBoardKind === 'vacationYn' ? 'blue' : ''}
                >
                  <span>휴가/휴직</span>
                  <b>{manageDayStatsInfo.vacation}</b>
                </div>
              </li>
            </ul>
          </div>
          {/* 월간 / 기간 통계 영역 */}
          <div
            class="sub_serch_result"
            style={{
              display:
                searchDateType === Constant.SEARCH_DATE_TYPE_DAY ? 'none' : ''
            }}
          >
            <div class="relative btn_area mgtopm20">
              <a href="javascript:void(0);" class="btn_tooltip btn_right">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_info.png`}
                  alt="더보기"
                />
              </a>
              <div id="toggle_tip2" class="tip_box" style={{ display: 'none' }}>
                {' '}
                정상출근 / 지각 / 휴가,휴직{' '}
              </div>
            </div>
            {managerMonthStatsUserListComponent}
          </div>
          {/* 통계영역 종료 */}
          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>
                  <b class="blue">{totalCount}</b> 명
                </p>
              </div>
              <div
                class="search_right"
                style={{
                  display:
                    searchDateType === Constant.SEARCH_DATE_TYPE_DAY
                      ? ''
                      : 'none'
                }}
              >
                <a
                  href="javascript:void(0);"
                  class="btn_normal"
                  onClick={this.openUpdateModal}
                >
                  수정
                </a>
                <a
                  href="javascript:void(0);"
                  class="btn_normal btn_blue"
                  onClick={this.openSubmitModal}
                >
                  제출
                </a>
              </div>
            </div>
            <div class="mgtop10">
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
                <Column dataField="userName" dataType="string" caption="이름" />
                <Column
                  dataField="startWorkIp"
                  dataType="string"
                  caption="출근아이피"
                />
                <Column
                  dataField="startWorkDate"
                  dataType="datetime"
                  caption="출근시간"
                  format="HH:mm"
                />
                <Column
                  dataField="outWorkIp"
                  dataType="string"
                  caption="퇴근아이피"
                />
                <Column
                  dataField="outWorkDate"
                  dataType="datetime"
                  caption="퇴근시간"
                  format="HH:mm"
                />
                <Column
                  dataField="workStatusCodeName"
                  dataType="date"
                  caption="근무상태"
                />
                <Column
                  dataField="workResultCodeName"
                  dataType="date"
                  caption="근무결과"
                />
                <Paging defaultPageSize={10} />
                <Pager
                  showPageSizeSelector={true}
                  allowedPageSizes={[5, 10, 'all']}
                />
              </DataGrid>
            </div>
          </div>
        </div>
        <CommuteDayModal />
        <CommuteDaySubmitModal />
      </div>
    );
  }
}

export default CommuteDeptApp;
