import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import WorkReportSubMenu from 'component/submenu/WorkReportSubMenu';
import moment from 'moment';
import WorkReportViewModal from './WorkReportViewModal';

@inject('appStore', 'uiStore', 'workReportStore', 'workReportViewModalStore')
@observer
class WorkReportHeadApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();

    this.init = this.init.bind(this);
    this.initSearch = this.initSearch.bind(this);
    this.search = this.search.bind(this);
    this.changeSilDept = this.changeSilDept.bind(this);
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
    this.openViewModal = this.openViewModal.bind(this);
  }

  init() {
    const { workReportStore } = this.props;
    workReportStore.changeSearchDateType(Constant.SEARCH_DATE_TYPE_DAY);
    workReportStore.initSearchDateAll();
    workReportStore.initDataGridComponent(this.dataGridRef);
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

  changeSilDept(event) {
    const { workReportStore } = this.props;
    const value = event.target.value;
    workReportStore.changeSilDept(value);
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

  openViewModal() {
    const { workReportViewModalStore, workReportStore } = this.props;
    const { searchDate } = workReportStore;
    workReportViewModalStore.openModal(searchDate);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { workReportStore, appStore } = this.props;
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
      searchDashBoardKind,
      selectedSilDeptKey
    } = workReportStore;
    let { profile } = appStore;
    let { silDeptList } = profile;
    let pojoSilDeptList = toJS(silDeptList) || [];
    let silDeptListConvert =
      pojoSilDeptList.length > 1
        ? [{ deptKey: 'ALL', deptName: '전체' }].concat(toJS(pojoSilDeptList))
        : pojoSilDeptList;
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
            <a href="javascript:void(0);">실 업무보고</a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="grp_sel_option">
              <label for="sel_option" class="blind">
                실 선택
              </label>
              <select
                id="sel_option"
                class="w90"
                onChange={this.changeSilDept}
                value={selectedSilDeptKey}
              >
                {silDeptListConvert.map((item) => (
                  <option value={item.deptKey} key={item.deptKey}>
                    {item.deptName}
                  </option>
                ))}
              </select>
            </div>

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
            <div
              class="grid_top flex_sb mgtop20"
              style={{
                display:
                  searchDateType === Constant.SEARCH_DATE_TYPE_DAY ? '' : 'none'
              }}
            >
              <div class="number">
                <p onClick={this.openViewModal}>
                  <b class="blue">{totalCount}</b> 팀
                </p>
              </div>
            </div>
            <div class="mgtop10">
              <DataGrid
                ref={this.dataGridRef}
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                cacheEnabled={false}
                noDataText={'업무보고 정보가 존재하지 않습니다.'}
                height={450}
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
                  dataField="reportDate"
                  dataType="datetime"
                  caption="작성일시"
                  allowSorting={false}
                  format="yyyy-MM-dd HH:mm"
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
                  allowSorting={false}
                />
                <Column dataField="issueYn" dataType="string" caption="이슈" />
                <Column
                  dataField="commentCount"
                  caption="댓글"
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData && rowData.commentCount) {
                      return 'Y';
                    }
                    return 'N';
                  }}
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
        <WorkReportViewModal />
      </div>
    );
  }
}

export default WorkReportHeadApp;
