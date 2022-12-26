import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import Code from 'config/Code';

@inject('appStore', 'uiStore', 'commuteStatsDayStore')
@observer
class CommuteStatsTabDay extends Component {
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

    this.changeWorkTimeKind = this.changeWorkTimeKind.bind(this);
  }

  init() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchDateType(Constant.SEARCH_DATE_TYPE_DAY);
    commuteStatsDayStore.initSearchDateAll();
    this.search();
  }

  initSearch() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.initSearch();
  }

  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.search();
  }

  changeSearchDateType(event) {
    const value = event.target.value;
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchDateType(value);
  }

  changeSearchDate(date) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.openDayDatepicker();
  }

  changeSearchMonth(date) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchMonth(date);
  }

  openMonthDatepicker() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.openMonthDatepicker();
  }

  changeStartDate(date) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeStartDate(date);
  }

  openStartDatepicker() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.openStartDatepicker();
  }

  changeEndDate(date) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeEndDate(date);
  }

  openEndDatepicker() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.openEndDatepicker();
  }

  changeSearchDashBoardKind(kind) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchDashBoardKind(kind);
  }

  nextMonth(kind) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.nextMonth(kind);
  }
  prevMonth(kind) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.prevMonth(kind);
  }
  nextDay(kind) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.nextDay(kind);
  }
  prevDay(kind) {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.prevDay(kind);
  }

  changeWorkTimeKind(event) {
    let value = event.target.value;
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeWorkTimeKind(value);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { commuteStatsDayStore, visible } = this.props;

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
      statsInfo,
      datagridStore,
      workTimeKind,
      searchDashBoardKind
    } = commuteStatsDayStore;
    statsInfo = statsInfo || {};

    return (
      <div style={{ display: visible ? '' : 'none' }}>
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
                    checked={searchDateType === Constant.SEARCH_DATE_TYPE_RANGE}
                    value={Constant.SEARCH_DATE_TYPE_RANGE}
                    onChange={this.changeSearchDateType}
                  ></input>
                  <label for="cale_option2">기간</label>
                </div>
              </li>
            </ul>
          </div>
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
          <a
            href="javascript:void(0);"
            class="btn_right btn_search_big"
            onClick={this.initSearch}
          >
            조회
          </a>
        </div>

        <div class="sub_serch_result half_box">
          <ul class="flex_ul_box flex_sb">
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
                <b>{statsInfo.ing}</b>
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
                <b>{statsInfo.home_ing}</b>
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
                <b>{statsInfo.vacation_morning}</b>
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
                <b>{statsInfo.vacation_afternoon}</b>
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
                <b>{statsInfo.end}</b>
              </div>
            </li>
            <li
              class="flex_center"
              onClick={() => this.changeSearchDashBoardKind('tardyYn')}
            >
              <div className={searchDashBoardKind === 'tardyYn' ? 'blue' : ''}>
                <span>지각</span>
                <b>{statsInfo.tardy}</b>
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
                <b>{statsInfo.vacation}</b>
              </div>
            </li>
            <li
              class="flex_center"
              onClick={() => this.changeSearchDashBoardKind('notStartWorkYn')}
            >
              <div
                className={
                  searchDashBoardKind === 'notStartWorkYn' ? 'blue' : ''
                }
              >
                <span>출근 미체크</span>
                <b>{statsInfo.not_start_work}</b>
              </div>
            </li>
            <li
              class="flex_center"
              onClick={() => this.changeSearchDashBoardKind('notOutWorkYn')}
            >
              <div
                className={searchDashBoardKind === 'notOutWorkYn' ? 'blue' : ''}
              >
                <span>퇴근 미체크</span>
                <b>{statsInfo.not_out_work}</b>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div class="grid_top flex_sb mgtop20">
            <div>
              <label for="search_option" class="blind">
                검색조건
              </label>
              <select
                id="search_option"
                value={workTimeKind}
                onChange={this.changeWorkTimeKind}
              >
                {Code.dayWorkTimeCodeList.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
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
              noDataText={'출근 정보가 존재하지 않습니다.'}
              height={450}
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
              <Column dataField="deptName" dataType="string" caption="부서명" />
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
              <Pager showPageSizeSelector={true} />
            </DataGrid>
          </div>
        </div>
      </div>
    );
  }
}

export default CommuteStatsTabDay;
