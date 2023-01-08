import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import VacationSubMenu from 'component/submenu/VacationSubMenu';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Selection
} from 'devextreme-react/data-grid';
import Helper from 'util/Helper';
import moment from 'moment';

@inject('appStore', 'uiStore', 'vacationStore')
@observer
class VacationDeptApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.yearDataGridRef = React.createRef();
    this.detailDataGridRef = React.createRef();

    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.changeSilDept = this.changeSilDept.bind(this);
    this.openYearDatepicker = this.openYearDatepicker.bind(this);
    this.changeSearchYear = this.changeSearchYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.changeSearchUserName = this.changeSearchUserName.bind(this);
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { vacationStore } = this.props;
    vacationStore.changeSearchUserName(value);
  }

  init() {
    const { vacationStore } = this.props;
    vacationStore.initSearchDateAll();
    vacationStore.initYearDataGridComponent(this.yearDataGridRef);
    vacationStore.initDetailDataGridComponent(this.detailDataGridRef);
    vacationStore.search();
  }

  search() {
    const { vacationStore } = this.props;
    vacationStore.search();
  }

  changeSilDept(event) {
    const { vacationStore } = this.props;
    const value = event.target.value;
    vacationStore.changeSilDept(value);
  }

  openYearDatepicker() {
    const { vacationStore } = this.props;
    vacationStore.openYearDatepicker();
  }

  changeSearchYear(date) {
    const { vacationStore } = this.props;
    vacationStore.changeSearchYear(date);
  }

  nextYear() {
    const { vacationStore } = this.props;
    vacationStore.nextYear();
  }

  prevYear() {
    const { vacationStore } = this.props;
    vacationStore.prevYear();
  }

  handleRowClick(e) {
    const { vacationStore } = this.props;
    if (e.data) {
      vacationStore.searchDetailList(e.data.userKey);
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationStore } = this.props;
    const {
      yearDatagridStore,
      detailDatagridStore,
      searchYear,
      yearDatepickerOpend,
      searchUserName
    } = vacationStore;
    return (
      <div id="contents_sub" class="">
        <VacationSubMenu />

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">휴가/휴직</a>&gt;
            <a href="javascript:void(0);">팀원 휴가/휴직</a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="sel_month">
              <a
                href="javascript:void(0);"
                class="prev"
                onClick={this.prevYear}
              >
                이전
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchYear, 'YYYY년')}
              </span>
              <a
                href="javascript:void(0);"
                class="next"
                onClick={this.nextYear}
              >
                다음
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openYearDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
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
              조회
            </a>
          </div>

          <div class="title_area grid_top flex_sb">
            <h3>휴가/휴직 현황</h3>
            <div class="search_right">
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
            </div>
          </div>
          <div class="grid_area">
            <div class="mgtop10">
              <DataGrid
                ref={this.yearDataGridRef}
                dataSource={yearDatagridStore}
                showBorders={true}
                remoteOperations={true}
                cacheEnabled={false}
                noDataText={'휴가 정보가 존재하지 않습니다.'}
                height={250}
                onRowClick={this.handleRowClick}
                hoverStateEnabled={true}
                keyExpr="userId"
              >
                <Selection mode="single" />
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
                  dataField="baseYear"
                  dataType="string"
                  caption="사용기간"
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData && rowData.baseYear) {
                      return (
                        rowData.baseYear +
                        '01-01 ~ ' +
                        rowData.baseYear +
                        '-12-31'
                      );
                    }
                    return '';
                  }}
                />
                <Column
                  dataField="allAnnualCount"
                  dataType="number"
                  caption="총연차"
                  allowSorting={false}
                />
                <Column
                  dataField="usedCount"
                  dataType="number"
                  caption="사용연차"
                  allowSorting={false}
                />
                <Column
                  dataField="restVacationCount"
                  dataType="number"
                  caption="잔여연차"
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
          <div class="hr"></div>
          <div class="title_area">
            <h3>휴가/휴직 신청/사용 내역</h3>
          </div>
          <div class="grid_area">
            <div class="mgtop10">
              <DataGrid
                ref={this.detailDataGridRef}
                dataSource={detailDatagridStore}
                showBorders={true}
                remoteOperations={true}
                cacheEnabled={false}
                noDataText={'휴가 정보가 존재하지 않습니다.'}
                height={350}
              >
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
                  dataField="dutyTitle"
                  dataType="string"
                  caption="직책"
                  allowSorting={false}
                />
                <Column
                  dataField="submitDate"
                  dataType="datetime"
                  caption="신청일"
                  format="yyyy-MM-dd"
                  allowSorting={false}
                />
                <Column
                  dataField="vacationKindCodeName"
                  dataType="string"
                  caption="휴가/휴직 구분"
                  allowSorting={false}
                />
                <Column
                  dataField="vacationStartDateStr"
                  dataType="string"
                  caption="휴가/휴직 기간"
                  format="YYYY-MM-DD"
                  allowSorting={false}
                  calculateCellValue={function (rowData) {
                    if (rowData) {
                      return (
                        moment(rowData.vacationStartDateStr).format(
                          'YYYY-MM-DD'
                        ) +
                        '~' +
                        moment(rowData.vacationEndDateStr).format('YYYY-MM-DD')
                      );
                    }
                    return '';
                  }}
                />
                <Column
                  dataField="useCount"
                  dataType="number"
                  caption="사용연차"
                  allowSorting={false}
                />
                <Column
                  dataField="vacationDescription"
                  dataType="string"
                  caption="휴가/휴직 사유"
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
      </div>
    );
  }
}

export default VacationDeptApp;
