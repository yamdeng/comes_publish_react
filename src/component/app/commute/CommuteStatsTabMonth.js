import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import Code from 'config/Code';
import moment from 'moment';

const cellRenderWeekTimeValue = function (columnInfo) {
  let value = columnInfo.value;
  if (!value) {
    value = 0;
  } else {
    value = Number(value);
  }
  if (columnInfo.column) {
    if (columnInfo.column.dataField === 'sunWorkTimeValue') {
      return <span class="red">{value.toFixed(1)}</span>;
    } else if (columnInfo.column.dataField === 'satWorkTimeValue') {
      return <span class="blue">{value.toFixed(1)}</span>;
    }
  }
  return value.toFixed(1);
};

@inject('appStore', 'uiStore', 'commuteStatsMonthStore')
@observer
class CommuteStatsTabMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.weekDataGridRef = React.createRef();
    this.monthWorkDatagridRef = React.createRef();
    this.monthHolidyDatagridRef = React.createRef();
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

    this.changeSearchUserName = this.changeSearchUserName.bind(this);

    this.downloadExcel = this.downloadExcel.bind(this);
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.changeSearchUserName(value);
  }

  downloadExcel() {
    const { commuteStatsMonthStore } = this.props;
    const { commuteStatsSearchType } = commuteStatsMonthStore;
    let dataGridRef = null;
    let excelFilePostfixName = '';

    if (commuteStatsSearchType === Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK) {
      dataGridRef = this.weekDataGridRef;
      excelFilePostfixName = '??????';
    } else if (
      commuteStatsSearchType ===
      Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_WORKDAY
    ) {
      dataGridRef = this.monthWorkDatagridRef;
      excelFilePostfixName = '??????(??????)';
    } else if (
      commuteStatsSearchType ===
      Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_HOLIDAY
    ) {
      dataGridRef = this.monthHolidyDatagridRef;
      excelFilePostfixName = '??????(??????)';
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(excelFilePostfixName);

    exportDataGrid({
      component: dataGridRef.current.instance,
      worksheet: worksheet
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          '?????????????????????-' + excelFilePostfixName + '.xlsx'
        );
      });
    });
  }

  init() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.initWeekDataGridComponent(this.weekDataGridRef);
    commuteStatsMonthStore.initMonthWorkDataGridComponent(
      this.monthWorkDatagridRef
    );
    commuteStatsMonthStore.initMonthHolidyDataGridComponent(
      this.monthHolidyDatagridRef
    );
    commuteStatsMonthStore.initSearchDateAll();
    this.search();
  }

  initSearch() {
    const { commuteStatsMonthStore } = this.props;
    commuteStatsMonthStore.initSearch();
  }

  search() {
    // ????????? ????????? ?????? ????????? ?????? ?????? ?????????
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
      monthHolidayGridLabelList,
      searchUserName
    } = commuteStatsMonthStore;

    return (
      <div style={{ display: visible ? '' : 'none' }}>
        <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
          <div class="grp_sel_option">
            <label for="sel_option" class="blind">
              ?????? ?????? ??????
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
              ?????? ???
            </a>
            <span class="txt_month">
              {Helper.dateToString(searchMonth, 'YYYY??? M???')}
            </span>
            <a href="javascript:void(0);" class="next" onClick={this.nextMonth}>
              ?????? ???
            </a>
            <a
              href="javascript:void(0);"
              class="month"
              onClick={this.openMonthDatepicker}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                alt="??? ????????????"
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
              ?????? ???
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
              ?????? ???
            </a>
          </div>
          <a
            href="javascript:void(0);"
            class="btn_right btn_search_big"
            onClick={this.search}
          >
            ??????
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
                ????????????
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
              <input
                type="text"
                class="w100"
                placeholder="?????????????????? ??????????????????."
                value={searchUserName}
                onChange={this.changeSearchUserName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.search(); // Enter ????????? ?????? ?????? ????????? ??????
                  }
                }}
                style={{ height: 30 }}
              />{' '}
              <a
                href="javascript:void(0);"
                class="btn_ico"
                onClick={this.downloadExcel}
              >
                <i class="ico_download"></i>??????????????????
              </a>
            </div>
          </div>
          {/* ?????? ??????  */}
          <div
            class="mgtop10"
            style={{
              display:
                commuteStatsSearchType ===
                Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK
                  ? ''
                  : 'none'
            }}
          >
            <DataGrid
              ref={this.weekDataGridRef}
              dataSource={weekDatagridStore}
              showBorders={true}
              remoteOperations={true}
              cacheEnabled={false}
              noDataText={'?????? ????????? ???????????? ????????????.'}
              height={550}
            >
              <Column
                dataField="deptName"
                dataType="string"
                caption="?????????"
                allowSorting={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="positionTitle"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="sumWorkTimeValue"
                dataType="number"
                caption="??????????????????(h)"
                allowSorting={false}
                format={{
                  type: 'decimal',
                  precision: 0
                }}
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
                  dateField = 'friWorkTimeValue';
                } else if (index === 5) {
                  dateField = 'satWorkTimeValue';
                } else if (index === 6) {
                  dateField = 'sunWorkTimeValue';
                }
                return (
                  <Column
                    dataField={dateField}
                    dataType="number"
                    format={{
                      type: 'decimal',
                      precision: 0
                    }}
                    allowSorting={false}
                    caption={moment(dateStr).format('D???(ddd)')}
                    cellRender={cellRenderWeekTimeValue}
                    headerCellRender={() => {
                      return (
                        <span
                          className={classnames({
                            red: holiday,
                            blue: saturday
                          })}
                        >
                          {moment(dateStr).format('D???(ddd)')}
                        </span>
                      );
                    }}
                  />
                );
              })}
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 'all']}
                showNavigationButtons={true}
                showInfo={true}
                infoText="{0} ????????? / ?????? {1}"
              />
            </DataGrid>
          </div>
          {/* ??????(??????))  */}
          <div
            class="mgtop10"
            style={{
              display:
                commuteStatsSearchType ===
                Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_WORKDAY
                  ? ''
                  : 'none'
            }}
          >
            <DataGrid
              ref={this.monthWorkDatagridRef}
              dataSource={monthWorkDatagridStore}
              showBorders={true}
              remoteOperations={true}
              cacheEnabled={false}
              noDataText={'?????? ????????? ???????????? ????????????.'}
              height={550}
              onRowPrepared={(row) => {
                if (row) {
                  if (row.rowType !== 'header') {
                    if (row.data) {
                      const {
                        firstWeekTimeValue,
                        secondWeekTimeValue,
                        threeWeekTimeValue,
                        fourWeekTimeValue,
                        fiveWeekTimeValue,
                        sixWeekTimeValue
                      } = row.data;
                      let check52TimeWork = false;
                      if (firstWeekTimeValue && firstWeekTimeValue > 52) {
                        check52TimeWork = true;
                      } else if (
                        secondWeekTimeValue &&
                        secondWeekTimeValue > 52
                      ) {
                        check52TimeWork = true;
                      } else if (
                        threeWeekTimeValue &&
                        threeWeekTimeValue > 52
                      ) {
                        check52TimeWork = true;
                      } else if (fourWeekTimeValue && fourWeekTimeValue > 52) {
                        check52TimeWork = true;
                      } else if (fiveWeekTimeValue && fiveWeekTimeValue > 52) {
                        check52TimeWork = true;
                      } else if (sixWeekTimeValue && sixWeekTimeValue > 52) {
                        check52TimeWork = true;
                      }
                      if (check52TimeWork) {
                        row.rowElement.style.backgroundColor = 'yellow';
                      }
                    }
                  }
                }
              }}
            >
              <Column
                dataField="deptName"
                dataType="string"
                caption="?????????"
                allowSorting={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="positionTitle"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="sumWorkTimeValue"
                dataType="number"
                caption="??????????????????(h)"
                allowSorting={false}
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
                    caption={weekIndex + '???'}
                    allowSorting={false}
                  />
                );
              })}
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 'all']}
                showNavigationButtons={true}
                showInfo={true}
                infoText="{0} ????????? / ?????? {1}"
              />
            </DataGrid>
          </div>
          {/* ??????(??????) ?????? */}
          <div
            class="mgtop10"
            style={{
              display:
                commuteStatsSearchType ===
                Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_HOLIDAY
                  ? ''
                  : 'none'
            }}
          >
            {/* datagrid */}
            <DataGrid
              ref={this.monthHolidyDatagridRef}
              dataSource={monthHolidyDatagridStore}
              showBorders={true}
              remoteOperations={true}
              cacheEnabled={false}
              noDataText={'?????? ????????? ???????????? ????????????.'}
              height={550}
            >
              <Column
                dataField="deptName"
                dataType="string"
                caption="?????????"
                allowSorting={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="positionTitle"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="sumWorkTimeValue"
                dataType="number"
                caption="??????????????????(h)"
                allowSorting={false}
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
                      caption={moment(dateStr).format('D???(ddd)')}
                      allowSorting={false}
                      cellRender={(columnInfo) => {
                        if (holiday) {
                          return <span class="red">{columnInfo.value}</span>;
                        } else {
                          return <span class="blue">{columnInfo.value}</span>;
                        }
                      }}
                      headerCellRender={() => {
                        return (
                          <span
                            className={classnames({
                              red: holiday,
                              blue: saturday
                            })}
                          >
                            {moment(dateStr).format('D???(ddd)')}
                          </span>
                        );
                      }}
                    />
                  );
                }
              )}
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 'all']}
                showNavigationButtons={true}
                showInfo={true}
                infoText="{0} ????????? / ?????? {1}"
              />
            </DataGrid>
          </div>
        </div>
      </div>
    );
  }
}

export default CommuteStatsTabMonth;
