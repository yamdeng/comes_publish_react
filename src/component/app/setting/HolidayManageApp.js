import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import moment from 'moment';
import SettingSubMenu from 'component/submenu/SettingSubMenu';

@inject('appStore', 'uiStore', 'holidayManageStore')
@observer
class HolidayManageApp extends Component {
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
  }

  init() {
    const { holidayManageStore } = this.props;
    holidayManageStore.initSearchDateAll();
    holidayManageStore.initDataGridComponent(this.dataGridRef);
    holidayManageStore.search();
  }

  search() {
    const { holidayManageStore } = this.props;
    holidayManageStore.search();
  }

  openYearDatepicker() {
    const { holidayManageStore } = this.props;
    holidayManageStore.openYearDatepicker();
  }

  changeSearchYear(date) {
    const { holidayManageStore } = this.props;
    holidayManageStore.changeSearchYear(date);
  }

  nextYear() {
    const { holidayManageStore } = this.props;
    holidayManageStore.nextYear();
  }

  prevYear() {
    const { holidayManageStore } = this.props;
    holidayManageStore.prevYear();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { holidayManageStore } = this.props;
    const { datagridStore, searchYear, yearDatepickerOpend, totalCount } =
      holidayManageStore;
    const searchYearStr = Helper.dateToString(searchYear, 'YYYY');
    let searchYearBeforeStr = '';
    return (
      <div id="contents_sub" class="">
        <SettingSubMenu />

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">설정</a>&gt;
            <a href="javascript:void(0);">공휴일 관리</a>
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

          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>
                  <b class="blue">{totalCount}</b>
                </p>
              </div>
            </div>
            <div class="mgtop10">
              <DataGrid
                ref={this.dataGridRef}
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'공휴일 정보가 존재하지 않습니다.'}
                height={450}
              >
                <Column
                  dataField="holiDateStr"
                  dataType="string"
                  caption="날짜"
                  calculateCellValue={function (rowData) {
                    if (rowData && rowData.holiDateStr) {
                      return Helper.convertDate(
                        rowData.holiDateStr,
                        'YYYYMMDD',
                        'YYYY-MM-DD'
                      );
                    }
                    return '';
                  }}
                />
                <Column dataField="name" dataType="string" caption="명칭" />
                <Column
                  dataField="weekdayCodeName"
                  dataType="string"
                  caption="요일 구분"
                />
                <Column
                  dataField="weekendCodeName"
                  dataType="string"
                  caption="주중/주말 구분"
                />
                <Column
                  dataField="regDate"
                  dataType="datetime"
                  caption="등록일"
                  format="yyyy-MM-dd hh:mm"
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

export default HolidayManageApp;
