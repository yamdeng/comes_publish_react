import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import Code from 'config/Code';
import ReactHelper from 'util/ReactHelper';

@inject('appStore', 'uiStore', 'commuteStatsDayStore')
@observer
class CommuteStatsTabDay extends Component {
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

    this.changeWorkTimeKind = this.changeWorkTimeKind.bind(this);

    // 검색 추가

    this.changeSearchHolidayYn = this.changeSearchHolidayYn.bind(this);
    this.changeSearchWorkResultCode =
      this.changeSearchWorkResultCode.bind(this);
    this.changeSearchUserName = this.changeSearchUserName.bind(this);

    this.downloadExcel = this.downloadExcel.bind(this);
  }

  downloadExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('일간');

    exportDataGrid({
      component: this.dataGridRef.current.instance,
      worksheet: worksheet
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          '전체출퇴근통계-일간.xlsx'
        );
      });
    });
  }

  changeSearchHolidayYn(event) {
    let value = event.target.checked;
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchHolidayYn(value ? 'Y' : 'N');
  }

  changeSearchWorkResultCode(event) {
    const value = event.target.value;
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchWorkResultCode(value);
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.changeSearchUserName(value);
  }

  init() {
    const { commuteStatsDayStore } = this.props;
    commuteStatsDayStore.initDataGridComponent(this.dataGridRef);
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
      searchDashBoardKind,
      searchHolidayYn,
      searchWorkResultCode,
      searchUserName
    } = commuteStatsDayStore;
    statsInfo = statsInfo || {};
    let workResultCodeList = [{ name: '전체', value: '' }].concat(
      Code.workResultCodeList
    );
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
              <input
                type="checkbox"
                id="holidayYn"
                checked={searchHolidayYn === 'Y' ? true : false}
                onChange={this.changeSearchHolidayYn}
              />
              <label for="holidayYn" class="mglt10">
                공휴일
              </label>{' '}
              <label for="search_option" class="blind">
                검색조건
              </label>
              <select
                id="search_option"
                value={searchWorkResultCode}
                onChange={this.changeSearchWorkResultCode}
              >
                {workResultCodeList.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>{' '}
              <input
                type="text"
                class="w100"
                placeholder="사용자이름을 입력해주세요."
                value={searchUserName}
                onChange={this.changeSearchUserName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.search(); // Enter 입력이 되면 클릭 이벤트 실행
                  }
                }}
                style={{ height: 30 }}
              />{' '}
              <a
                href="javascript:void(0);"
                class="btn_ico"
                onClick={this.downloadExcel}
              >
                <i class="ico_download"></i>엑셀다운로드
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
              onRowPrepared={ReactHelper.onRowPreparedCommuteDayUpdate}
            >
              <Column
                dataField="baseDateStr"
                dataType="string"
                caption="날짜"
                allowSorting={false}
                cellRender={ReactHelper.baseDateStrColumDisplayValue}
              />
              <Column
                dataField="deptName"
                dataType="string"
                caption="부서명"
                allowSorting={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="이름"
                allowSorting={false}
              />
              <Column
                dataField="positionTitle"
                dataType="string"
                caption="직급"
                allowSorting={false}
              />
              <Column
                dataField="startWorkIp"
                dataType="string"
                caption="출근아이피"
                allowSorting={false}
                calculateDisplayValue={ReactHelper.startWorkIpColumDisplayValue}
              />
              <Column
                dataField="finalStartWorkDate"
                dataType="datetime"
                caption="출근시간"
                format="HH:mm"
                allowSorting={false}
                calculateDisplayValue={
                  ReactHelper.finalStartWorkDateColumDisplayValue
                }
              />
              <Column
                dataField="outWorkIp"
                dataType="string"
                caption="퇴근아이피"
                allowSorting={false}
                calculateDisplayValue={ReactHelper.outWorkIpColumDisplayValue}
              />
              <Column
                dataField="finalOutWorkDate"
                dataType="datetime"
                caption="퇴근시간"
                format="HH:mm"
                allowSorting={false}
                cellRender={ReactHelper.finalOutWorkDateColumDisplayValue}
              />
              <Column
                dataField="workedTimeValue"
                dataType="number"
                caption="근무시간"
                allowSorting={false}
              />
              <Column
                dataField="outsideWorkYn"
                dataType="string"
                caption="외근여부"
                allowSorting={false}
              />
              <Column
                dataField="etcDescription"
                dataType="string"
                caption="기타설명"
                allowSorting={false}
              />
              <Column
                dataField="workStatusCodeName"
                dataType="string"
                caption="근무상태"
                allowSorting={false}
              />
              <Column
                dataField="workResultCodeName"
                dataType="string"
                caption="근무결과"
                allowSorting={false}
                calculateDisplayValue={
                  ReactHelper.workResultcodeColumDisplayValue
                }
              />
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 'all']}
                showNavigationButtons={true}
                showInfo={true}
                infoText="{0} 페이지 / 전체 {1}"
              />
            </DataGrid>
          </div>
        </div>
      </div>
    );
  }
}

export default CommuteStatsTabDay;
