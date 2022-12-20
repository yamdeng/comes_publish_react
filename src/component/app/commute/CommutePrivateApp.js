import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Api from 'util/Api';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import DatePicker from 'react-datepicker';

@inject('appStore', 'uiStore', 'commutePrivateStore')
@observer
class CommutePrivateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openMonthDatepicker = this.openMonthDatepicker.bind(this);
    this.changeSearchMonth = this.changeSearchMonth.bind(this);
    this.changeInWornYn = this.changeInWornYn.bind(this);
    this.startWork = this.startWork.bind(this);
    this.outWork = this.outWork.bind(this);
    this.search = this.search.bind(this);
    this.toggleVisibleGuideText = this.toggleVisibleGuideText.bind(this);
    this.clickOuter = this.clickOuter.bind(this);
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

  changeInWornYn(event) {
    const value = event.target.value;
    const { commutePrivateStore } = this.props;
    commutePrivateStore.changeInWornYn(value);
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

  componentDidMount() {
    const { commutePrivateStore } = this.props;
    commutePrivateStore.getTodayCommuteDayInfo();
    commutePrivateStore.init();
  }

  render() {
    const { commutePrivateStore, uiStore, appStore } = this.props;
    let {
      datagridStore,
      searchMonth,
      monthDatepickerOpend,
      todayCommuteDayInfo,
      privateMonthStatsList,
      inWorkYn,
      visibleGuideText
    } = commutePrivateStore;
    todayCommuteDayInfo = todayCommuteDayInfo || {};

    const {
      userId,
      startWorkDate,
      outWorkDate,
      startWorkIp,
      workStatusCodeName
    } = todayCommuteDayInfo;

    const { todayDayTextInfo, todayWeekTextInfo, currentTime } = uiStore;

    const { profile } = appStore;
    const { dept_name, user_name } = profile;
    return (
      <div
        id="contents_sub"
        class=""
        onClick={(event) => this.clickOuter(event)}
      >
        <div class="sub_lnb">
          <h3>출퇴근</h3>
          <ul class="sub_menu">
            <li
              class="on"
              onClick={() => Helper.goUrl('newoffice/view/commute-private.do')}
            >
              <a href="javascript:void(0);">개인출퇴근</a>
            </li>
            <li onClick={() => Helper.goUrl('newoffice/view/commute-dept.do')}>
              <a href="javascript:void(0);">팀원출퇴근</a>
            </li>
            <li onClick={() => Helper.goUrl('newoffice/view/commute-head.do')}>
              <a href="javascript:void(0);">실원출퇴근</a>
            </li>
            <li onClick={() => Helper.goUrl('newoffice/view/commute-admin.do')}>
              <a href="javascript:void(0);">전체출퇴근관리</a>
            </li>
            <li onClick={() => Helper.goUrl('newoffice/view/commute-admin.do')}>
              <a href="javascript:void(0);">전체출퇴근통계</a>
            </li>
          </ul>
        </div>
        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
                onClick={() => Helper.goUrl('')}
              />
            </a>
            &gt;<a href="javascript:void(0);">출퇴근</a>&gt;
            <a href="javascript:void(0);">개인출퇴근</a>
          </div>

          <div class="sub_top" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="sel_month">
              <a href="#" class="prev">
                이전 달
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchMonth, 'YYYY년 MM월')}
              </span>
              <a href="#" class="next">
                다음 달
              </a>
              <a href="#" class="month" onClick={this.openMonthDatepicker}>
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
                  portalId="root-portal"
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
              조회
            </a>
          </div>

          <div class="flex_sb sub_serch_result">
            <div class="grp_info">
              <div class="log_info">
                <div class="user_photo">
                  <img
                    class="profile"
                    src={`${process.env.PUBLIC_URL}/images/no_image.png`}
                    alt="로그인 유저 사진"
                  />
                </div>
                <div class="user_info">
                  <p class="black">{dept_name}</p>
                  <p>
                    <span>{user_name}</span> 님
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
                          onChange={this.changeInWornYn}
                          disabled={startWorkDate ? true : false}
                        />
                        <label for="work_option1">업무</label>
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
                          onChange={this.changeInWornYn}
                          disabled={startWorkDate ? true : false}
                        />
                        <label for="work_option2">재택</label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="wo_con2 flex_center">
                  <p>접속 IP : (-) {Helper.convertEmptyValue(startWorkIp)} </p>
                  <div>
                    <ul class="flex_sb mgtop40">
                      <li>
                        <a
                          href="javascript:void(0);"
                          class={
                            startWorkDate
                              ? 'activate1'
                              : userId
                              ? 'disabled'
                              : ''
                          }
                        >
                          출근{' '}
                          <span>
                            {startWorkDate
                              ? Helper.convertDate(
                                  startWorkDate,
                                  'YYYY-MM-DD Hhmmss',
                                  'HH:mm'
                                )
                              : '미체크'}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          class={
                            outWorkDate ? 'activate2' : userId ? 'disabled' : ''
                          }
                        >
                          퇴근{' '}
                          <span>
                            {startWorkDate
                              ? Helper.convertDate(
                                  outWorkDate,
                                  'YYYY-MM-DD Hhmmss',
                                  'HH:mm'
                                )
                              : '미체크'}
                          </span>
                        </a>{' '}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="work_result relative">
                  <h3>
                    <span>{Helper.dateToString(searchMonth, 'M')}</span>월
                    출퇴근 현황{' '}
                    <a
                      href="#"
                      onclick="showID('toggle_tip')"
                      class="btn_right"
                      onClick={(event) => this.toggleVisibleGuideText(event)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/btn_info.png`}
                      />
                    </a>
                  </h3>

                  <div
                    id="toggle_tip"
                    class="tip_box"
                    style={{ display: visibleGuideText ? '' : 'none' }}
                  >
                    {' '}
                    [지각] 근무 시작 시간 10분을 초과하여 출근 체크한 건수
                    <br />
                    [출/퇴근 미체크] 조회 기간의 출/퇴근 미체크 건수
                  </div>
                  <div class="flex_center bg">
                    <div class="result">
                      <h4>지각</h4>
                      <p class="blue">0</p>
                    </div>
                    <div class="result">
                      <h4>출/퇴근 미체크</h4>
                      <p class="blue">0 / 0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <div class="mgtop10">
              <p
                style={{
                  height: 700,
                  fontSize: 15,
                  // lineHeight: 300,
                  textAlign: 'center',
                  maxWidth: 1600
                }}
              >
                <DataGrid
                  maxWidth="100%"
                  dataSource={datagridStore}
                  showBorders={true}
                  remoteOperations={true}
                >
                  <Column
                    dataField="baseDateStr"
                    dataType="string"
                    caption="날짜"
                  />
                  <Column
                    dataField="deptName"
                    dataType="string"
                    caption="부서명"
                  />
                  <Column
                    dataField="startWorkIp"
                    dataType="string"
                    caption="출근아이피"
                  />
                  <Column
                    dataField="startWorkDate"
                    dataType="date"
                    caption="출근시간"
                  />
                  <Column
                    dataField="outWorkIp"
                    dataType="string"
                    caption="퇴근아이피"
                  />
                  <Column
                    dataField="outWorkDate"
                    dataType="date"
                    caption="퇴근시간"
                  />
                  <Column
                    dataField="workStatusCodeName"
                    dataType="date"
                    caption="근무상태"
                  />
                  <Column
                    dataField="workResultCodeName"
                    dataType="date"
                    caption="근무결과"
                  />
                  <Paging defaultPageSize={10} />
                  <Pager showPageSizeSelector={true} />
                </DataGrid>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommutePrivateApp;
