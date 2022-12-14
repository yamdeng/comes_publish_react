import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import VacationSubMenu from 'component/submenu/VacationSubMenu';
import 'devextreme/data/odata/store';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
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
    this.changeSearchUserName = this.changeSearchUserName.bind(this);
    this.changeSearchDeptName = this.changeSearchDeptName.bind(this);

    this.downloadExcel = this.downloadExcel.bind(this);
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { vacationStatsStore } = this.props;
    vacationStatsStore.changeSearchUserName(value);
  }

  changeSearchDeptName(event) {
    const value = event.target.value;
    const { vacationStatsStore } = this.props;
    vacationStatsStore.changeSearchDeptName(value);
  }

  downloadExcel() {
    const { vacationStatsStore } = this.props;
    const { searchYear } = vacationStatsStore;
    const searchYearStr = Helper.dateToString(searchYear, 'YYYY');
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
      component: this.dataGridRef.current.instance,
      worksheet: worksheet
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx'
        );
      });
    });
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
    const {
      datagridStore,
      searchYear,
      yearDatepickerOpend,
      searchUserName,
      searchDeptName
    } = vacationStatsStore;
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
                alt="????????? ??????"
                onClick={() => Helper.goUrl('')}
              />
            </a>
            &gt;
            <a
              href="javascript:void(0);"
              onClick={() => Helper.goUrl('newoffice/view/vacation-admin.do')}
            >
              ??????/??????
            </a>
            &gt;
            <a
              href="javascript:void(0);"
              onClick={() => Helper.goUrl('newoffice/view/vacation-admin.do')}
            >
              ?????? ????????????
            </a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="sel_month">
              <a
                href="javascript:void(0);"
                class="prev"
                onClick={this.prevYear}
              >
                ??????
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchYear, 'YYYY???')}
              </span>
              <a
                href="javascript:void(0);"
                class="next"
                onClick={this.nextYear}
              >
                ??????
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openYearDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="??? ????????????"
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
              ??????
            </a>
          </div>
          <div class="grid_area">
            <div class="grid_top flex_sb mgtop20">
              <div>
                <label for="search_option" class="blind">
                  ????????????
                </label>
              </div>
              <div class="search_right">
                <input
                  type="text"
                  class="w100"
                  placeholder="???????????? ??????????????????."
                  value={searchDeptName}
                  onChange={this.changeSearchDeptName}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      this.search(); // Enter ????????? ?????? ?????? ????????? ??????
                    }
                  }}
                  style={{ height: 30 }}
                />{' '}
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
            <div class="mgtop10">
              <DataGrid
                ref={this.dataGridRef}
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                cacheEnabled={false}
                noDataText={'?????? ????????? ???????????? ????????????.'}
                columnResizingMode={true}
                columnAutoWidth={true}
                width={1650}
                height={650}
              >
                <Column
                  dataField="deptName"
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
                  dataField="userName"
                  dataType="string"
                  caption="??????"
                  allowSorting={false}
                />
                <Column
                  dataField="joinDate"
                  dataType="datetime"
                  caption="?????????"
                  format="yyyy-MM-dd"
                  allowSorting={false}
                />
                <Column
                  dataField="outWorkIp"
                  dataType="string"
                  caption="????????????"
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
                  dataField="firstYear"
                  dataType="number"
                  caption="????????????"
                  allowSorting={false}
                  allowEditing={false}
                />
                <Column
                  dataField="annualCount"
                  dataType="number"
                  caption="????????????"
                  allowSorting={false}
                />
                <Column
                  dataField="monthCount"
                  dataType="number"
                  caption="????????????"
                  allowSorting={false}
                />
                <Column caption="????????????">
                  <Column
                    dataField="pastOccurCount"
                    caption="??????"
                    allowSorting={false}
                    allowEditing={true}
                  />
                  <Column
                    dataField="pastUseCount"
                    caption="??????"
                    allowSorting={false}
                    allowEditing={false}
                  />
                </Column>
                <Column
                  dataField="occurVacationCount"
                  caption={searchYearStr + '??? ????????????'}
                  allowSorting={false}
                />
                <Column
                  dataField="beforeYearUsedCount"
                  caption={searchYearBeforeStr + '??? ????????????'}
                  allowSorting={false}
                />
                <Column
                  dataField="baseYearUseableCount"
                  caption={searchYearStr + '??? ????????????'}
                  allowSorting={false}
                />

                <Column caption={searchYearStr + '??? ???????????? ?????? ??????'}>
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
                    caption="??????"
                    allowSorting={false}
                  />
                </Column>
                <Column
                  dataField="plusVacationCount"
                  caption={'???????????? ????????????'}
                  allowSorting={false}
                />
                <Column
                  dataField="restVacationCount"
                  caption={searchYearStr + '??? ????????????'}
                  allowSorting={false}
                  cellRender={(columnInfo) => {
                    return <span class="red">{columnInfo.value}</span>;
                  }}
                />
                <Paging defaultPageSize={15} />
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
      </div>
    );
  }
}

export default VacationAdminApp;
