import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import VacationSubMenu from 'component/submenu/VacationSubMenu';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';

@inject('appStore', 'uiStore', 'vacationStore')
@observer
class VacationPrivateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.changeSilDept = this.changeSilDept.bind(this);
    this.openYearDatepicker = this.openYearDatepicker.bind(this);
    this.changeSearchYear = this.changeSearchYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.prevYear = this.prevYear.bind(this);
  }

  init() {
    const { vacationStore } = this.props;
    vacationStore.initSearchDateAll();
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

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationStore } = this.props;
    const {
      yearDatagridStore,
      detailDatagridStore,
      searchYear,
      yearDatepickerOpend
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
            <a href="javascript:void(0);">개인 휴가/휴직</a>
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

          <div class="title_area">
            <h3>휴가/휴직 현황</h3>
          </div>
          <div class="grid_area">
            <div class="mgtop10" style={{ maxWidth: 1650 }}>
              <DataGrid
                dataSource={yearDatagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'휴가 정보가 존재하지 않습니다.'}
                height={250}
              >
                <Column dataField="userName" dataType="string" caption="이름" />
                <Column
                  dataField="positionTitle"
                  dataType="string"
                  caption="직급"
                />
                <Column
                  dataField="basaYear"
                  dataType="string"
                  caption="사용기간"
                />
                <Column
                  dataField="annualCount"
                  dataType="number"
                  caption="총연차"
                />
                <Column
                  dataField="usedCount"
                  dataType="number"
                  caption="사용연차"
                />
                <Column
                  dataField="useableCount"
                  dataType="number"
                  caption="잔여연차"
                />
                <Paging defaultPageSize={10} />
                <Pager showPageSizeSelector={true} />
              </DataGrid>
            </div>
          </div>
          <div class="hr"></div>
          <div class="title_area">
            <h3>휴가/휴직 신청/사용 내역</h3>
          </div>
          <div class="grid_area">
            <div class="mgtop10" style={{ maxWidth: 1650 }}>
              <DataGrid
                dataSource={detailDatagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'휴가 정보가 존재하지 않습니다.'}
                height={350}
              >
                <Column
                  dataField="approveSeq"
                  dataType="number"
                  caption="순번"
                />
                <Column dataField="userName" dataType="string" caption="이름" />
                <Column
                  dataField="positionTitle"
                  dataType="string"
                  caption="직급"
                />
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="부서명"
                />
                <Column
                  dataField="submitDate"
                  dataType="datetime"
                  caption="신청일"
                />
                <Column
                  dataField="vacationKindCodeName"
                  dataType="string"
                  caption="휴가/휴직 구분"
                />
                <Column
                  dataField="vacationStartDateStr"
                  dataType="datetime"
                  caption="휴가/휴직 기간"
                  format="YYYY-MM-DD"
                />
                <Column
                  dataField="useCount"
                  dataType="number"
                  caption="사용연차"
                />
                <Column
                  dataField="vacationDescription"
                  dataType="string"
                  caption="휴가/휴직 사유"
                />
                <Column
                  dataField="vacationDescription"
                  dataType="string"
                  caption="결재상태"
                />
                <Paging defaultPageSize={10} />
                <Pager showPageSizeSelector={true} />
              </DataGrid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationPrivateApp;
