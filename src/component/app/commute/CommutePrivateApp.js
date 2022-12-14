import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Helper from 'util/Helper';
import DatePicker from 'react-datepicker';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import moment from 'moment';
import Code from 'config/Code';
import ReactHelper from 'util/ReactHelper';

@inject('appStore', 'uiStore', 'commutePrivateStore')
@observer
class CommutePrivateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.openMonthDatepicker = this.openMonthDatepicker.bind(this);
    this.changeSearchMonth = this.changeSearchMonth.bind(this);
    this.changeInWorkYn = this.changeInWorkYn.bind(this);
    this.startWork = this.startWork.bind(this);
    this.outWork = this.outWork.bind(this);
    this.search = this.search.bind(this);
    this.toggleVisibleGuideText = this.toggleVisibleGuideText.bind(this);
    this.clickOuter = this.clickOuter.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.workOutNextDay = this.workOutNextDay.bind(this);

    this.changeSearchHolidayYn = this.changeSearchHolidayYn.bind(this);
    this.changeSearchWorkResultCode =
      this.changeSearchWorkResultCode.bind(this);
    this.changeSearchUserName = this.changeSearchUserName.bind(this);
  }

  changeSearchHolidayYn(event) {
    let value = event.target.checked;
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchHolidayYn(value ? 'Y' : 'N');
  }

  changeSearchWorkResultCode(event) {
    const value = event.target.value;
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchWorkResultCode(value);
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchUserName(value);
  }

  init() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.initDataGridComponent(this.dataGridRef);
    commutePrivateStore.getTodayCommuteDayInfo();
    commutePrivateStore.changeSearchDateType(Constant.SEARCH_DATE_TYPE_MONTH);
    commutePrivateStore.initSearchDateAll();
    commutePrivateStore.search();
  }

  nextMonth() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.nextMonth();
  }

  prevMonth() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.prevMonth();
  }

  openMonthDatepicker() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.openMonthDatepicker();
  }

  changeSearchMonth(date) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeSearchMonth(date);
    commutePrivateStore.closeMonthDatepicker();
  }

  changeInWorkYn(event) {
    const value = event.target.value;
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeInWorkYn(value);
  }

  startWork() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.startWork();
  }

  outWork() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.outWork();
  }

  search() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.search();
    commutePrivateStore.getPrivateMonthStatsList();
  }

  toggleVisibleGuideText(event) {
    event.stopPropagation();
    const { commutePrivateStore } = this.props;
    commutePrivateStore.toggleVisibleGuideText();
  }

  clickOuter(event) {
    event.stopPropagation();
    const { commutePrivateStore } = this.props;
    commutePrivateStore.hideVisibleGuideText();
  }

  workOutNextDay(commuteDayInfo) {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.workOutNextDay(commuteDayInfo);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const that = this;
    const { commutePrivateStore, uiStore, appStore } = this.props;
    let {
      datagridStore,
      searchMonth,
      monthDatepickerOpend,
      todayCommuteDayInfo,
      privateMonthStatsList,
      inWorkYn,
      visibleGuideText,
      totalCount,
      searchHolidayYn,
      searchWorkResultCode,
      searchUserName
    } = commutePrivateStore;
    todayCommuteDayInfo = todayCommuteDayInfo || {};

    const {
      startWorkDate,
      outWorkDate,
      startWorkIp,
      vacationKindCode,
      workStatusCodeName,
      startWorkDeviceType
    } = todayCommuteDayInfo;
    const isAllDayVacation = Helper.getIsAllDayVacation(vacationKindCode);

    let tardyFilterList = privateMonthStatsList.filter(
      (info) => info.kind === 'tardy'
    );
    let notStartWorkFilterList = privateMonthStatsList.filter(
      (info) => info.kind === 'not_start_work'
    );
    let notOutWorkFilterList = privateMonthStatsList.filter(
      (info) => info.kind === 'not_out_work'
    );
    const tardyCount = tardyFilterList.length ? tardyFilterList[0].aggCount : 0;
    const notStartWorkCount = notStartWorkFilterList.length
      ? notStartWorkFilterList[0].aggCount
      : 0;
    const notOutWorkCount = notOutWorkFilterList.length
      ? notOutWorkFilterList[0].aggCount
      : 0;

    let startWorkDeviceTypeText = '';
    if (startWorkDeviceType) {
      startWorkDeviceTypeText = '(' + startWorkDeviceType + ')';
    }

    const { todayDayTextInfo, todayWeekTextInfo, currentTime } = uiStore;

    const { profile } = appStore;
    const { dept_name, user_name } = profile;

    let workResultCodeList = [{ name: '??????', value: '' }].concat(
      Code.workResultCodeList
    );
    return (
      <div
        id="contents_sub"
        class=""
        onClick={(event) => this.clickOuter(event)}
      >
        <CommuteSubMenu />
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
              onClick={() => Helper.goUrl('newoffice/view/commute.do')}
            >
              ?????????
            </a>
            &gt;
            <a
              href="javascript:void(0);"
              onClick={() => Helper.goUrl('newoffice/view/commute-private.do')}
            >
              ???????????????
            </a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="sel_month">
              <a
                href="javascript:void(0);"
                class="prev"
                onClick={this.prevMonth}
              >
                ?????? ???
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchMonth, 'YYYY??? MM???')}
              </span>
              <a
                href="javascript:void(0);"
                class="next"
                onClick={this.nextMonth}
              >
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
            <a
              href="javascript:void(0);"
              class="btn_right btn_search_big"
              onClick={this.search}
            >
              ??????
            </a>
          </div>

          <div class="flex_sb sub_serch_result">
            <div class="grp_info">
              <div class="log_info">
                <div class="user_photo">
                  <img
                    class="profile"
                    src={`${process.env.PUBLIC_URL}/images/no_image.png`}
                    alt="????????? ?????? ??????"
                  />
                </div>
                <div class="user_info">
                  <p class="black">{dept_name}</p>
                  <p>
                    <span>{user_name}</span> ???
                  </p>
                </div>
              </div>
            </div>
            <div class="grp_work">
              <div class="con_work border_box flex_sb">
                <div class="wo_con1 bg">
                  <p class="bold30">
                    {todayDayTextInfo}
                    <span> ({todayWeekTextInfo})</span>
                  </p>
                  <p>{currentTime}</p>
                  <ul class="flex_sb mgtop40">
                    <li>
                      <div class="radio">
                        <input
                          type="radio"
                          value="Y"
                          id="work_option1"
                          name="work_option"
                          checked={inWorkYn === 'Y'}
                          onChange={this.changeInWorkYn}
                        />
                        <label for="work_option1">??????</label>
                      </div>
                    </li>
                    <li>
                      <div class="radio">
                        <input
                          type="radio"
                          value="N"
                          id="work_option2"
                          name="work_option"
                          checked={inWorkYn === 'N'}
                          onChange={this.changeInWorkYn}
                        />
                        <label for="work_option2">??????</label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="wo_con2 flex_center">
                  <p>
                    <span class="user">{user_name}</span> ???{' '}
                    {workStatusCodeName ? '(' + workStatusCodeName + ')' : ''}
                  </p>
                  <p>
                    ?????? IP : {startWorkDate ? startWorkDeviceTypeText : ''}
                    {Helper.convertEmptyValue(startWorkIp)}{' '}
                  </p>
                  <div>
                    <ul class="flex_sb mgtop40">
                      <li
                        onClick={this.startWork}
                        style={{
                          visibility: isAllDayVacation ? 'hidden' : 'visible'
                        }}
                      >
                        <a
                          href="javascript:void(0);"
                          className={classnames({
                            activate1: startWorkDate ? true : false,
                            disabled: startWorkDate ? false : true
                          })}
                        >
                          ??????{' '}
                          <span>
                            {startWorkDate
                              ? Helper.convertDate(
                                  startWorkDate,
                                  'YYYY-MM-DD HH:mm:ss',
                                  'HH:mm'
                                )
                              : '?????????'}
                          </span>
                        </a>
                      </li>
                      <li
                        onClick={this.outWork}
                        style={{
                          visibility: isAllDayVacation ? 'hidden' : 'visible'
                        }}
                      >
                        <a
                          href="javascript:void(0);"
                          className={classnames({
                            activate2: outWorkDate ? true : false,
                            disabled: outWorkDate ? false : true
                          })}
                        >
                          ??????{' '}
                          <span>
                            {startWorkDate
                              ? Helper.convertDate(
                                  outWorkDate,
                                  'YYYY-MM-DD HH:mm:ss',
                                  'HH:mm'
                                )
                              : '?????????'}
                          </span>
                        </a>{' '}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="work_result relative">
                  <h3>
                    <span>{Helper.dateToString(searchMonth, 'M')}</span>???
                    ????????? ??????{' '}
                    <a
                      href="javascript:void(0);"
                      onclick="showID('toggle_tip')"
                      class="btn_right"
                      onClick={(event) => this.toggleVisibleGuideText(event)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/btn_info.png`}
                        alt="???????????????"
                      />
                    </a>
                  </h3>

                  <div
                    id="toggle_tip"
                    class="tip_box"
                    style={{ display: visibleGuideText ? '' : 'none' }}
                  >
                    {' '}
                    [??????] ?????? ?????? ?????? 10?????? ???????????? ?????? ????????? ??????
                    <br />
                    [???/?????? ?????????] ?????? ????????? ???/?????? ????????? ??????
                  </div>
                  <div class="flex_center bg">
                    <div class="result">
                      <h4>??????</h4>
                      <p class="blue">{tardyCount}</p>
                    </div>
                    <div class="result">
                      <h4>???/?????? ?????????</h4>
                      <p class="blue">
                        {notStartWorkCount} / {notOutWorkCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>{/* <b class="blue">{totalCount}</b> ??? */}</p>
              </div>
              <div class="search_right">
                <input
                  type="checkbox"
                  id="holidayYn"
                  checked={searchHolidayYn === 'Y' ? true : false}
                  onChange={this.changeSearchHolidayYn}
                />
                <label for="holidayYn" class="mglt10">
                  ?????????
                </label>{' '}
                <label for="search_option" class="blind">
                  ????????????
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
                </select>
              </div>
            </div>
            <div class="mgtop10">
              <DataGrid
                ref={this.dataGridRef}
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'?????? ????????? ???????????? ????????????.'}
                height={450}
                cacheEnabled={false}
                onRowPrepared={ReactHelper.onRowPreparedCommuteDayUpdate}
              >
                <Column
                  dataField="baseDateStr"
                  dataType="string"
                  caption="??????"
                  allowSorting={false}
                  cellRender={ReactHelper.baseDateStrColumDisplayValue}
                />
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="?????????"
                  allowSorting={false}
                />
                <Column
                  dataField="startWorkIp"
                  dataType="string"
                  caption="???????????????"
                  allowSorting={false}
                  calculateDisplayValue={
                    ReactHelper.startWorkIpColumDisplayValue
                  }
                />
                <Column
                  dataField="finalStartWorkDate"
                  dataType="datetime"
                  caption="????????????"
                  format="HH:mm"
                  allowSorting={false}
                  calculateDisplayValue={
                    ReactHelper.finalStartWorkDateColumDisplayValue
                  }
                />
                <Column
                  dataField="outWorkIp"
                  dataType="string"
                  caption="???????????????"
                  allowSorting={false}
                  calculateDisplayValue={ReactHelper.outWorkIpColumDisplayValue}
                />
                <Column
                  dataField="finalOutWorkDate"
                  dataType="datetime"
                  caption="????????????"
                  format="HH:mm"
                  allowSorting={false}
                  cellRender={function (columnInfo) {
                    const { data } = columnInfo;
                    const {
                      baseDateStr,
                      startWorkDate,
                      outWorkDate,
                      finalOutWorkDate
                    } = data;
                    // ???????????? ????????? ????????? ???????????? ?????? format??? ??????????????? ???
                    let outWorkDateFormat = 'HH:mm';
                    let finalOutWorkDateFormat = 'HH:mm';
                    if (outWorkDate) {
                      if (
                        moment(baseDateStr).diff(moment(outWorkDate), 'days') <
                        0
                      ) {
                        outWorkDateFormat = 'M/D/YYYY H:mm a';
                      }
                    }

                    if (finalOutWorkDate) {
                      if (
                        moment(baseDateStr).diff(
                          moment(finalOutWorkDate),
                          'days'
                        ) < 0
                      ) {
                        finalOutWorkDateFormat = 'M/D/YYYY H:mm a';
                      }
                    }
                    // ???????????? ???????????? ?????????????????? ?????????????????? ??????
                    let isNextDay = false;
                    if (
                      moment(baseDateStr).diff(
                        moment(moment().format('YYYYMMDD')),
                        'days'
                      ) < 0
                    ) {
                      isNextDay = true;
                    }

                    let outWorkDateCellResult = '';
                    // ????????? ??????????????? ?????? ???????????? ?????? ???????????? ??????
                    if (!outWorkDate && !finalOutWorkDate) {
                      //????????? ?????? ?????? ?????? : ????????? ??????????????? ????????? ????????? ??????
                      if (isNextDay && startWorkDate) {
                        outWorkDateCellResult = (
                          <a
                            href="javascript:void(0);"
                            class="btn_normal btn_blue"
                            onClick={() =>
                              commutePrivateStore.workOutNextDay(data)
                            }
                          >
                            ??????
                          </a>
                        );
                      } else {
                        return '';
                      }
                    } else if (outWorkDate) {
                      // ????????? ??????????????? ????????????
                      if (finalOutWorkDate) {
                        // ?????? ??????????????? ???????????? ??????
                        outWorkDateCellResult =
                          moment(finalOutWorkDate).format(
                            finalOutWorkDateFormat
                          ) +
                          '(' +
                          moment(outWorkDate).format(outWorkDateFormat) +
                          ')';
                      } else {
                        // ????????? ??????????????? ???????????? ??????
                        outWorkDateCellResult =
                          moment(outWorkDate).format(outWorkDateFormat);
                      }
                    } else if (finalOutWorkDate) {
                      // ?????? ??????????????? ???????????? ??????
                      outWorkDateCellResult =
                        moment(finalOutWorkDate).format(
                          finalOutWorkDateFormat
                        ) + '()';
                    }
                    return outWorkDateCellResult;
                  }}
                />
                <Column
                  dataField="workStatusCodeName"
                  dataType="string"
                  caption="????????????"
                  allowSorting={false}
                />
                <Column
                  dataField="workResultCodeName"
                  dataType="string"
                  caption="????????????"
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
                />
              </DataGrid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommutePrivateApp;
