import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Helper from 'util/Helper';
import SettingSubMenu from 'component/submenu/SettingSubMenu';
import moment from 'moment';

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
    this.openFormModal = this.openFormModal.bind(this);
    this.closeFormModal = this.closeFormModal.bind(this);
    this.saveHolidate = this.saveHolidate.bind(this);
    this.delete = this.delete.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeHoliDate = this.changeHoliDate.bind(this);
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

  openFormModal() {
    const { holidayManageStore } = this.props;
    holidayManageStore.openFormModal();
  }

  closeFormModal() {
    const { holidayManageStore } = this.props;
    holidayManageStore.closeFormModal();
  }

  saveHolidate() {
    const { holidayManageStore } = this.props;
    holidayManageStore.saveHolidate();
  }

  delete(holiDateStr) {
    const { holidayManageStore } = this.props;
    holidayManageStore.delete(holiDateStr);
  }

  changeName(event) {
    const value = event.target.value;
    const { holidayManageStore } = this.props;
    holidayManageStore.changeName(value);
  }

  changeHoliDate(holiDate) {
    const { holidayManageStore } = this.props;
    holidayManageStore.changeHoliDate(holiDate);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { holidayManageStore } = this.props;
    const {
      datagridStore,
      searchYear,
      yearDatepickerOpend,
      totalCount,
      visibleModal,
      name,
      holiDate
    } = holidayManageStore;
    let minDate = null;
    let maxDate = null;
    if (searchYear) {
      const searchYearStr = moment(searchYear).format('YYYY');
      maxDate = moment(searchYearStr + '1231').toDate();
      minDate = moment(searchYearStr + '0101').toDate();
    }
    return (
      <div id="contents_sub" class="">
        <SettingSubMenu />

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
              onClick={() =>
                Helper.goUrl('siteadmin/config/setting-holiday.adm')
              }
            >
              ??????
            </a>
            &gt;
            <a
              href="javascript:void(0);"
              onClick={() =>
                Helper.goUrl('siteadmin/config/setting-holiday.adm')
              }
            >
              ????????? ??????
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

          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>
                  <b class="blue">{totalCount}???</b>
                </p>
              </div>
              <div class="search_right">
                <a
                  href="javascript:void(0);"
                  class="btn_normal btn_blue"
                  onClick={this.openFormModal}
                >
                  ????????? ??????
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
                noDataText={'????????? ????????? ???????????? ????????????.'}
                height={450}
              >
                <Column
                  dataField="holiDateStr"
                  dataType="string"
                  caption="??????"
                  allowSorting={false}
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
                <Column
                  dataField="name"
                  dataType="string"
                  caption="??????"
                  allowSorting={false}
                />
                <Column
                  dataField="weekdayCodeName"
                  dataType="string"
                  caption="?????? ??????"
                  allowSorting={false}
                  calculateDisplayValue={function (rowData) {
                    if (rowData && rowData.holiDateStr) {
                      return moment(rowData.holiDateStr).format('dddd');
                    }
                    return '';
                  }}
                />
                <Column
                  dataField="weekendCodeName"
                  dataType="string"
                  caption="??????/?????? ??????"
                  allowSorting={false}
                  calculateDisplayValue={function (rowData) {
                    if (rowData && rowData.holiDateStr) {
                      const weekday = moment(rowData.holiDateStr).isoWeekday();
                      return weekday === 6 || weekday === 7 ? '??????' : '??????';
                    }
                    return '';
                  }}
                />
                <Column
                  dataField="regDate"
                  dataType="datetime"
                  caption="?????????"
                  format="yyyy-MM-dd hh:mm"
                  allowSorting={false}
                />
                <Column
                  dataField="deptId"
                  dataType="string"
                  caption="??????"
                  allowSorting={false}
                  width={80}
                  alignment="center"
                  cellRender={(columnInfo) => {
                    const { data } = columnInfo;
                    const { holiDateStr } = data;
                    return (
                      <a
                        href="javascript:void(0);"
                        class="btn_normal btn_blue"
                        onClick={() => this.delete(holiDateStr)}
                      >
                        ??????
                      </a>
                    );
                  }}
                />
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
        <Modal isOpen={visibleModal} className={'modal_box modal_box_450'}>
          <ModalHeader
            className="popup_head"
            close={
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeFormModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            }
          >
            ????????? ??????
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="flex_sb">
                <p class="con_title2">????????? ??????</p>
                <div class="con_box2">
                  <input
                    type="text"
                    class="w100p"
                    style={{ width: 200 }}
                    placeholder="???????????? ??????????????????."
                    value={name}
                    onChange={this.changeName}
                  />
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">??????</p>
                <div class="con_box2">
                  <div style={{ display: 'inline-block' }}>
                    <DatePicker
                      selected={holiDate}
                      onChange={this.changeHoliDate}
                      dateFormat="yyyy-MM-dd"
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>{' '}
                  <a href="javascript:void(0);" class="btn_calen">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/calen_sel_ico.png`}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={this.closeFormModal}
            >
              ??????
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.saveHolidate}
            >
              ??????
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HolidayManageApp;
