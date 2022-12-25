import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';

@inject('appStore', 'uiStore', 'commutePrivateStore')
@observer
class CommuteStatsTabMonth extends Component {
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
  }

  init() {
    const { commutePrivateStore } = this.props;
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

  componentDidMount() {
    this.init();
  }

  render() {
    let { commutePrivateStore, visible } = this.props;

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

    return (
      <div style={{ display: visible ? '' : 'none' }}>
        <div class="sub_top" e={{ zIndex: 1, overflow: 'visible' }}>
          <div class="grp_sel_option">
            <label for="sel_option" class="blind">
              실 선택
            </label>
            <select id="sel_option3" class="w90">
              <option>주간</option>
              <option>월간(주별)</option>
              <option>월간(휴일)</option>
            </select>
          </div>

          <div class="sel_month">
            <a href="javascript:void(0);" class="prev">
              이전 달
            </a>
            <span class="txt_month2">2022-06-01</span>
            <span>~</span>
            <span class="txt_month2">2022-06-15</span>
            <a href="javascript:void(0);" class="next">
              다음 달
            </a>
          </div>
          <a href="javascript:void(0);" class="btn_right btn_search_big">
            조회
          </a>
        </div>
      </div>
    );
  }
}

export default CommuteStatsTabMonth;
