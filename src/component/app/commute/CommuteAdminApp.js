import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import classnames from 'classnames';
import Helper from 'util/Helper';
import CommuteDayAdminModal from './CommuteDayAdminModal';

@inject('appStore', 'uiStore', 'commuteDeptStore', 'commuteDayAdminModalStore')
@observer
class CommuteAdminApp extends Component {
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
    this.openModal = this.openModal.bind(this);

    this.changeSearchDeptName = this.changeSearchDeptName.bind(this);
  }

  changeSearchDeptName(event) {
    const value = event.target.value;
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeSearchDeptName(value);
  }

  init() {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.initDataGridComponent(this.dataGridRef);
    commuteDeptStore.changeSearchDateType(Constant.SEARCH_DATE_TYPE_DAY);
    commuteDeptStore.initSearchDateAll();
    this.search();
  }

  initSearch() {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.search();
  }

  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    const { commuteDeptStore } = this.props;
    commuteDeptStore.search();
  }

  changeSearchDateType() {
    const value = event.target.value;
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeSearchDateType(value);
  }

  changeSearchDate(date) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.openDayDatepicker();
  }

  changeSearchMonth(date) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeSearchMonth(date);
  }

  openMonthDatepicker() {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.openMonthDatepicker();
  }

  changeStartDate(date) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeStartDate(date);
  }

  openStartDatepicker() {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.openStartDatepicker();
  }

  changeEndDate(date) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeEndDate(date);
  }

  openEndDatepicker() {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.openEndDatepicker();
  }

  changeSearchDashBoardKind(kind) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.changeSearchDashBoardKind(kind);
  }

  nextMonth(kind) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.nextMonth(kind);
  }
  prevMonth(kind) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.prevMonth(kind);
  }
  nextDay(kind) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.nextDay(kind);
  }
  prevDay(kind) {
    const { commuteDeptStore } = this.props;
    commuteDeptStore.prevDay(kind);
  }

  openModal() {
    const { commuteDayAdminModalStore, commuteDeptStore } = this.props;
    const { searchDate } = commuteDeptStore;
    commuteDayAdminModalStore.openModal(searchDate);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { commuteDeptStore } = this.props;
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
      allStatsInfo,
      datagridStore,
      searchDashBoardKind,
      searchDeptName
    } = commuteDeptStore;
    allStatsInfo = allStatsInfo || {};
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
            <a href="javascript:void(0);">전체출퇴근관리</a>
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
          <div class="sub_serch_result">
            <ul
              class="flex_ul_box flex_sb scroll-minimum"
              style={{ overflowX: 'scroll' }}
            >
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind(null)}
              >
                <div className={!searchDashBoardKind ? 'blue' : ''}>
                  <span>전체</span>
                  <b>{allStatsInfo.all}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind('SUBMIT_AND_REJECT')
                }
              >
                <div
                  className={
                    searchDashBoardKind === 'SUBMIT_AND_REJECT' ? 'blue' : ''
                  }
                >
                  <span>제출전 & 반려</span>
                  <b>{allStatsInfo.submit_and_reject}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('BEFORE_APPROVE')}
              >
                <div
                  className={
                    searchDashBoardKind === 'BEFORE_APPROVE' ? 'blue' : ''
                  }
                >
                  <span>승인전</span>
                  <b>{allStatsInfo.before_approve}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() => this.changeSearchDashBoardKind('APPROVE')}
              >
                <div
                  className={searchDashBoardKind === 'APPROVE' ? 'blue' : ''}
                >
                  <span>승인완료</span>
                  <b>{allStatsInfo.approve}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind('START_WORK_COMPLETE')
                }
              >
                <div
                  className={
                    searchDashBoardKind === 'START_WORK_COMPLETE' ? 'blue' : ''
                  }
                >
                  <span>출근완료</span>
                  <b>{allStatsInfo.start_work_complete}</b>
                </div>
              </li>
              <li
                class="flex_center"
                onClick={() =>
                  this.changeSearchDashBoardKind('OUT_WORK_COMPLETE')
                }
              >
                <div
                  className={
                    searchDashBoardKind === 'OUT_WORK_COMPLETE' ? 'blue' : ''
                  }
                >
                  <span>퇴근완료</span>
                  <b>{allStatsInfo.out_work_complete}</b>
                </div>
              </li>
            </ul>
          </div>
          {/* 통계영역 종료 */}
          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div
                class="number"
                onClick={this.openModal}
                style={{
                  visibility:
                    searchDateType === Constant.SEARCH_DATE_TYPE_DAY
                      ? 'visible'
                      : 'hidden'
                }}
              >
                <p>
                  <b class="blue">{totalCount}</b> 팀
                </p>
              </div>
              <input
                type="text"
                class="w100"
                placeholder="부서명을 입력해주세요."
                value={searchDeptName}
                onChange={this.changeSearchDeptName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.search(); // Enter 입력이 되면 클릭 이벤트 실행
                  }
                }}
                style={{ height: 30 }}
              />{' '}
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
                  allowSorting={false}
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
                  allowSorting={false}
                />
                <Column
                  dataField="managerName"
                  dataType="string"
                  caption="팀장명"
                  allowSorting={false}
                />
                <Column
                  dataField="managerMobileTel"
                  dataType="string"
                  caption="연락처"
                  allowSorting={false}
                />

                {/* targetCount startWorkCompleteCount / outWorkCompleteCount */}
                <Column
                  dataField="startWorkCompleteCount"
                  dataType="number"
                  caption="출근"
                  allowSorting={false}
                  calculateDisplayValue={function (rowData) {
                    const {
                      targetCount,
                      startWorkCompleteCount,
                      outWorkCompleteCount
                    } = rowData;
                    let resultText = '';
                    if (targetCount === startWorkCompleteCount) {
                      resultText =
                        '완료(' +
                        startWorkCompleteCount +
                        '/' +
                        targetCount +
                        ')';
                    } else {
                      resultText =
                        '미완료(' +
                        startWorkCompleteCount +
                        '/' +
                        targetCount +
                        ')';
                    }
                    return resultText;
                  }}
                />
                <Column
                  dataField="outWorkCompleteCount"
                  dataType="number"
                  caption="퇴근"
                  allowSorting={false}
                  calculateDisplayValue={function (rowData) {
                    const { targetCount, outWorkCompleteCount } = rowData;
                    let resultText = '';
                    if (targetCount === outWorkCompleteCount) {
                      resultText =
                        '완료(' +
                        outWorkCompleteCount +
                        '/' +
                        targetCount +
                        ')';
                    } else {
                      resultText =
                        '미완료(' +
                        outWorkCompleteCount +
                        '/' +
                        targetCount +
                        ')';
                    }
                    return resultText;
                  }}
                />
                <Column
                  dataField="modYn"
                  dataType="string"
                  caption="수정"
                  allowSorting={false}
                />
                <Column
                  dataField="tardyYn"
                  dataType="string"
                  caption="지각"
                  allowSorting={false}
                />
                <Column
                  dataField="commuteSubmitStatusCodeName"
                  dataType="string"
                  caption="상태"
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
          </div>
        </div>
        <CommuteDayAdminModal />
      </div>
    );
  }
}

export default CommuteAdminApp;
