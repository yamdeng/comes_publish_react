import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import Code from 'config/Code';
import moment from 'moment';

@inject('appStore', 'uiStore', 'commuteStatsMonthStore')
@observer
class CommuteStatsTabMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.initSearch = this.initSearch.bind(this);
    this.search = this.search.bind(this);
    this.changeCommuteStatsSearchType =
      this.changeCommuteStatsSearchType.bind(this);

    //  datepicker handler start
    this.changeMondayStartDate = this.changeMondayStartDate.bind(this);

    this.changeSearchMonth = this.changeSearchMonth.bind(this);
    this.openMonthDatepicker = this.openMonthDatepicker.bind(this);
    // datepicker handler end

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMondayStartDate = this.nextMondayStartDate.bind(this);
    this.prevMondayStartDate = this.prevMondayStartDate.bind(this);

    this.changeWorkWeekTimeKind = this.changeWorkWeekTimeKind.bind(this);
  }

  init() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.initSearchDateAll();
    this.search();
  }

  initSearch() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.initSearch();
  }

  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.search();
  }

  changeCommuteStatsSearchType(event) {
    const value = event.target.value;
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.changeCommuteStatsSearchType(value);
  }

  changeWorkWeekTimeKind(event) {
    const value = event.target.value;
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.changeWorkWeekTimeKind(value);
  }

  changeMondayStartDate(date) {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.changeMondayStartDate(date);
  }

  changeSearchMonth(date) {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.changeSearchMonth(date);
  }

  openMonthDatepicker() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.openMonthDatepicker();
  }

  nextMonth() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.nextMonth();
  }
  prevMonth(dte) {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.prevMonth();
  }
  nextMondayStartDate() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.nextMondayStartDate();
  }
  prevMondayStartDate() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.prevMondayStartDate();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { commuteStatsMonthStore, visible } = this.props;

    let {
      weekDatagridStore,
      monthWorkDatagridStore,
      monthHolidyDatagridStore,
      commuteStatsSearchType,
      mondayStartDate,
      searchMonth,
      monthDatepickerOpend,
      workWeekTimeKind,
      weekGridLabelList,
      monthHolidayGridLabelList
    } = commuteStatsMonthStore;

    return (
      <div style={{ display: visible ? '' : 'none' }}>
        <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
          <div class="grp_sel_option">
            <label for="sel_option" class="blind">
              통계 종류 선택
            </label>
            <select
              id="sel_option3"
              class="w90"
              value={commuteStatsSearchType}
              onChange={this.changeCommuteStatsSearchType}
            >
              {Code.commuteStatsSearchTypeCodeList.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div
            className={classnames(
              'sel_month',
              'calelist_month',
              'cale_option1',
              {
                on:
                  commuteStatsSearchType !==
                  Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK
              }
            )}
          >
            <a href="javascript:void(0);" class="prev" onClick={this.prevMonth}>
              이전 달
            </a>
            <span class="txt_month">
              {Helper.dateToString(searchMonth, 'YYYY년 M월')}
            </span>
            <a href="javascript:void(0);" class="next" onClick={this.nextMonth}>
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
          <div
            class="sel_month calelist_month cale_option2 on"
            className={classnames(
              'sel_month',
              'calelist_month',
              'cale_option2',
              {
                on:
                  commuteStatsSearchType ===
                  Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK
              }
            )}
          >
            <a
              href="javascript:void(0);"
              class="prev"
              onClick={this.prevMondayStartDate}
            >
              이전 주
            </a>
            <span class="txt_month2">
              {Helper.dateToString(mondayStartDate, 'YYYY-MM-DD')}
            </span>
            <span>~</span>
            <span class="txt_month2">
              {mondayStartDate
                ? moment(mondayStartDate).add(6, 'days').format('YYYY-MM-DD')
                : ''}
            </span>
            <a
              href="javascript:void(0);"
              class="next"
              onClick={this.nextMondayStartDate}
            >
              다음 주
            </a>
          </div>
          <a
            href="javascript:void(0);"
            class="btn_right btn_search_big"
            onClick={this.search}
          >
            조회
          </a>
        </div>
        <div>
          <div class="grid_top flex_sb mgtop20">
            <div
              style={{
                display:
                  commuteStatsSearchType ===
                  Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_HOLIDAY
                    ? 'none'
                    : ''
              }}
            >
              <label for="search_option2" class="blind">
                검색조건
              </label>
              <select
                id="search_option2"
                value={workWeekTimeKind}
                onChange={this.changeWorkWeekTimeKind}
              >
                {Code.weekWorkTimeCodeList.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div></div>
            <div class="search_right">
              <a href="javascript:void(0);" class="btn_ico">
                <i class="ico_download"></i>엑셀다운로드
              </a>
              <a href="javascript:void(0);" class="btn_ico">
                <i class="ico_refresh"></i>새로고침
              </a>
            </div>
          </div>
          {/* 주간 통계  */}
          <div
            class="mgtop10"
            style={{
              maxWidth: 1650,
              display:
                commuteStatsSearchType ===
                Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK
                  ? ''
                  : 'none'
            }}
          >
            <DataGrid
              dataSource={weekDatagridStore}
              showBorders={true}
              remoteOperations={true}
              noDataText={'통계 정보가 존재하지 않습니다.'}
              height={450}
            >
              <Column dataField="deptName" dataType="string" caption="부서명" />
              <Column dataField="userName" dataType="string" caption="이름" />
              <Column
                dataField="poisitionTitle"
                dataType="string"
                caption="직급"
              />
              <Column
                dataField="sumWorkTimeValue"
                dataType="date"
                caption="누적근무시간"
              />
              {weekGridLabelList.map((weekGridLabelInfo, index) => {
                const { dateStr, holiday, saturday } = weekGridLabelInfo;
                let dateField = 'monWorkTimeValue';
                if (index === 0) {
                  dateField = 'monWorkTimeValue';
                } else if (index === 1) {
                  dateField = 'tueWorkTimeValue';
                } else if (index === 2) {
                  dateField = 'wedWorkTimeValue';
                } else if (index === 3) {
                  dateField = 'thuWorkTimeValue';
                } else if (index === 4) {
                  dateField = 'firWorkTimeValue';
                } else if (index === 5) {
                  dateField = 'satWorkTimeValue';
                } else if (index === 6) {
                  dateField = 'sunWorkTimeValue';
                }
                return (
                  <Column
                    dataField={dateField}
                    dataType="number"
                    caption={moment(dateStr).format('D일(ddd)')}
                    headerCellRender={() => {
                      return (
                        <span
                          className={classnames({
                            red: holiday,
                            blue: saturday
                          })}
                        >
                          {moment(dateStr).format('D일(ddd)')}
                        </span>
                      );
                    }}
                  />
                );
              })}
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} />
            </DataGrid>
          </div>
          {/* 월간(주별))  */}
          <div
            class="mgtop10"
            style={{
              maxWidth: 1650,
              display:
                commuteStatsSearchType ===
                Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_WORKDAY
                  ? ''
                  : 'none'
            }}
          >
            <DataGrid
              dataSource={monthWorkDatagridStore}
              showBorders={true}
              remoteOperations={true}
              noDataText={'통계 정보가 존재하지 않습니다.'}
              height={450}
            >
              <Column dataField="deptName" dataType="string" caption="부서명" />
              <Column dataField="userName" dataType="string" caption="이름" />
              <Column
                dataField="poisitionTitle"
                dataType="string"
                caption="직급"
              />
              <Column
                dataField="sumWorkTimeValue"
                dataType="date"
                caption="누적근무시간"
              />
              {[1, 2, 3, 4, 5, 6].map((weekIndex) => {
                let dateField = 'monWorkTimeValue';
                if (weekIndex === 1) {
                  dateField = 'firstWeekTimeValue';
                } else if (weekIndex === 2) {
                  dateField = 'secondWeekTimeValue';
                } else if (weekIndex === 3) {
                  dateField = 'threeWeekTimeValue';
                } else if (weekIndex === 4) {
                  dateField = 'fourWeekTimeValue';
                } else if (weekIndex === 5) {
                  dateField = 'fiveWeekTimeValue';
                } else if (weekIndex === 6) {
                  dateField = 'sixWeekTimeValue';
                }
                return (
                  <Column
                    dataField={dateField}
                    dataType="number"
                    caption={weekIndex + '주'}
                  />
                );
              })}
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} />
            </DataGrid>
          </div>
          {/* 월간(휴일) 통계 */}
          <div
            class="mgtop10"
            style={{
              maxWidth: 1650,
              display:
                commuteStatsSearchType ===
                Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_HOLIDAY
                  ? ''
                  : 'none'
            }}
          >
            {/* datagrid */}
            <DataGrid
              dataSource={monthHolidyDatagridStore}
              showBorders={true}
              remoteOperations={true}
              noDataText={'통계 정보가 존재하지 않습니다.'}
              height={450}
            >
              <Column dataField="deptName" dataType="string" caption="부서명" />
              <Column dataField="userName" dataType="string" caption="이름" />
              <Column
                dataField="poisitionTitle"
                dataType="string"
                caption="직급"
              />
              <Column
                dataField="sumWorkTimeValue"
                dataType="date"
                caption="누적근무시간"
              />
              {monthHolidayGridLabelList.map(
                (monthHolidayGridLabelInfo, index) => {
                  const { dateStr, holiday, saturday } =
                    monthHolidayGridLabelInfo;
                  const dateField = 'hd' + (index + 1) + 'WorkTimeValue';
                  return (
                    <Column
                      dataField={dateField}
                      dataType="number"
                      caption={moment(dateStr).format('D일(ddd)')}
                      headerCellRender={() => {
                        return (
                          <span
                            className={classnames({
                              red: holiday,
                              blue: saturday
                            })}
                          >
                            {moment(dateStr).format('D일(ddd)')}
                          </span>
                        );
                      }}
                    />
                  );
                }
              )}
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} />
            </DataGrid>
          </div>
        </div>
      </div>
    );
  }
}

export default CommuteStatsTabMonth;