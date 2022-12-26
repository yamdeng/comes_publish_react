import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Helper from 'util/Helper';
import classnames from 'classnames';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore', 'portalStore')
@observer
class PortalAdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.changeSelectedShceduleDate.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.changeSelectedAdminStatsTabIndex =
      this.changeSelectedAdminStatsTabIndex.bind(this);

    this.changeInWorkYn = this.changeInWorkYn.bind(this);
    this.startWork = this.startWork.bind(this);
    this.outWork = this.outWork.bind(this);
  }

  init() {
    /*

      1.금일 일일_출퇴근 정보 조회
      2.전체 부서_출퇴근 정보 조회
      3.공지사항 조회
      4.월 단위 기본 달력정보와 오늘 일정 조회
      5.관리자용 통계 조회
      6.전체 연차 현황 조회

    */
    const { portalStore } = this.props;
    portalStore.getTodayCommuteDayInfo();
    portalStore.getCommuteDeptList();
    portalStore.getNoticeList();
    portalStore.initSchedule();
    portalStore.getAdminStats();
    portalStore.getVacationDayHistory();
  }

  changeSelectedShceduleDate(dateStr) {
    const { portalStore } = this.props;
    portalStore.changeSelectedShceduleDate(dateStr);
  }

  nextMonth() {
    const { portalStore } = this.props;
    portalStore.nextMonth();
  }

  prevMonth() {
    const { portalStore } = this.props;
    portalStore.prevMonth();
  }

  changeSelectedAdminStatsTabIndex(tabIndex) {
    const { portalStore } = this.props;
    portalStore.changeSelectedAdminStatsTabIndex(tabIndex);
  }

  changeInWorkYn(event) {
    const value = event.target.value;
    const { portalStore } = this.props;
    portalStore.changeInWorkYn(value);
  }

  startWork() {
    const { portalStore } = this.props;
    portalStore.startWork();
  }

  outWork() {
    const { portalStore } = this.props;
    portalStore.outWork();
  }

  changeSelectedHeadStatsTab(deptKey) {
    const { portalStore } = this.props;
    portalStore.changeSelectedHeadStatsTab(deptKey);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { portalStore, uiStore, appStore } = this.props;
    const { todayDayTextInfo, todayWeekTextInfo, currentTime } = uiStore;
    const { profile } = appStore;
    const { user_name } = profile;
    let {
      todayCommuteDayInfo,
      commuteDeptList,
      noticeList,
      inWorkYn,
      searchMonth,
      selectedShceduleDate,
      basicCalendarList,
      scheduleList,
      portalAdminAllStatsInfo,
      portalAdminCommuteStatsInfo,
      portalAdminWorkReportStatsInfo,
      selectedAdminStatsTabIndex,
      vacationDayHistoryList
    } = portalStore;
    todayCommuteDayInfo = todayCommuteDayInfo || {};
    portalAdminAllStatsInfo = portalAdminAllStatsInfo || {};
    portalAdminCommuteStatsInfo = portalAdminCommuteStatsInfo || {};
    portalAdminWorkReportStatsInfo = portalAdminWorkReportStatsInfo || {};
    const {
      userId,
      startWorkDate,
      outWorkDate,
      startWorkIp,
      workStatusCodeName,
      startWorkDeviceType
    } = todayCommuteDayInfo;

    let startWorkDeviceTypeText = '';
    if (startWorkDeviceType) {
      startWorkDeviceTypeText = '(' + startWorkDeviceType + ')';
    }

    let scheduleListComponent = <p>일정 없음</p>;
    if (scheduleList.length) {
      scheduleListComponent = scheduleList.map((scheduleInfo) => {
        return <p>{scheduleInfo.title}</p>;
      });
    }

    let noticeListComponent = null;
    if (noticeList.length) {
      noticeListComponent = noticeList.map((noticeArticleInfo) => {
        const {
          article_num,
          article_title,
          user_name,
          reg_date,
          article_view_count,
          article_id
        } = noticeArticleInfo;
        return (
          <tr>
            <td>{article_num}</td>
            <td
              class="subject"
              onClick={() =>
                Helper.goUrl(
                  'bbs/comes/board/detail.do?boardKey=' +
                    Constant.NOTICE_BOARD_KEY +
                    '&article_id=' +
                    article_id
                )
              }
            >
              <a href="javascript:void(0);">{article_title}</a>
            </td>
            <td>{user_name}</td>
            <td>{reg_date}</td>
            <td>{article_view_count}</td>
          </tr>
        );
      });
    } else {
      noticeListComponent = (
        <tr>
          <td style={{ textAlign: 'center' }} colSpan={5}>
            등록된 공지사항이 존재하지 않습니다.
          </td>
        </tr>
      );
    }

    let commuteDeptListComponent = null;
    if (commuteDeptList.length) {
      commuteDeptListComponent = commuteDeptList.map((commuteDeptInfo) => {
        const {
          deptName,
          managerName,
          managerMobileTel,
          commuteSubmitStatusCodeName
        } = commuteDeptInfo;
        return (
          <tr>
            <td>{deptName}</td>
            <td>{managerName}</td>
            <td>{managerMobileTel}</td>
            <td>{commuteSubmitStatusCodeName}</td>
          </tr>
        );
      });
    } else {
      commuteDeptListComponent = (
        <tr>
          <td style={{ textAlign: 'center' }} colSpan={4}>
            부서 출퇴근 제출 정보가 존재하지 않습니다.
          </td>
        </tr>
      );
    }

    let vacationDayHistoryListComponent = null;
    if (vacationDayHistoryList.length) {
      vacationDayHistoryListComponent = vacationDayHistoryList.map(
        (vacationDetailInfo) => {
          const { userName, vacationKindCodeName, vacationKindCode } =
            vacationDetailInfo;
          return (
            <tr>
              <td>{userName}</td>
              <td>{vacationKindCodeName}</td>
              <td>{'전일'}</td>
            </tr>
          );
        }
      );
    } else {
      vacationDayHistoryListComponent = (
        <tr>
          <td style={{ textAlign: 'center' }} colSpan={3}>
            휴가/휴직 정보가 존재하지 않습니다.
          </td>
        </tr>
      );
    }

    return (
      <div id="contents_main" class="">
        <div class="flex_sb mf_to_row1">
          <div class="row_item grid3">
            <h3
              onClick={() => Helper.goUrl('newoffice/view/commute-private.do')}
            >
              <i class="ico1"></i>근무
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="con_work border_box flex_sb">
              <div class="wo_con1 bg">
                <p class="bold30">
                  {todayDayTextInfo}
                  <span> ({todayWeekTextInfo})</span>
                </p>
                <p>{currentTime}</p>
                <ul
                  class="flex_sb mgtop40"
                  style={{ display: startWorkDate ? 'none' : '' }}
                >
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="work_option1"
                        name="work_option"
                        value="Y"
                        checked={inWorkYn === 'Y'}
                        onChange={this.changeInWorkYn}
                        disabled={startWorkDate ? true : false}
                      />
                      <label for="work_option1">업무</label>
                    </div>
                  </li>
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="work_option2"
                        name="work_option"
                        value="N"
                        checked={inWorkYn === 'N'}
                        onChange={this.changeInWorkYn}
                        disabled={startWorkDate ? true : false}
                      />
                      <label for="work_option2">재택</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="wo_con2">
                <p>
                  <span class="user">{user_name} </span> 님
                  {workStatusCodeName ? '(' + workStatusCodeName + ')' : ''}
                </p>
                <p>
                  접속 IP : {startWorkDate ? startWorkDeviceTypeText : ''}
                  {Helper.convertEmptyValue(startWorkIp)}{' '}
                </p>
                <div>
                  <ul class="flex_sb mgtop40">
                    <li onClick={this.startWork}>
                      <a
                        href="javascript:void(0);"
                        class={
                          startWorkDate ? 'activate1' : userId ? 'disabled' : ''
                        }
                      >
                        출근{' '}
                        <span>
                          {startWorkDate
                            ? Helper.convertDate(
                                startWorkDate,
                                'YYYY-MM-DD HH:mm:ss',
                                'H:mm'
                              )
                            : '미체크'}
                        </span>
                      </a>
                    </li>
                    <li onClick={this.outWork}>
                      <a
                        href="javascript:void(0);"
                        class={
                          outWorkDate ? 'activate2' : userId ? 'disabled' : ''
                        }
                      >
                        퇴근{' '}
                        <span>
                          {outWorkDate
                            ? Helper.convertDate(
                                outWorkDate,
                                'YYYY-MM-DD HH:mm:ss',
                                'H:mm'
                              )
                            : '미체크'}
                        </span>
                      </a>{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row_item grid3">
            <div class="tab">
              <ul class="tabnav">
                <li onClick={() => this.changeSelectedAdminStatsTabIndex(1)}>
                  <a
                    href="#tab01"
                    className={selectedAdminStatsTabIndex === 1 ? 'active' : ''}
                  >
                    전체
                  </a>
                </li>
                <li onClick={() => this.changeSelectedAdminStatsTabIndex(2)}>
                  <a
                    href="#tab02"
                    className={selectedAdminStatsTabIndex === 2 ? 'active' : ''}
                  >
                    출퇴근 제출
                  </a>
                </li>
                <li onClick={() => this.changeSelectedAdminStatsTabIndex(3)}>
                  <a
                    href="#tab03"
                    className={selectedAdminStatsTabIndex === 3 ? 'active' : ''}
                  >
                    업무보고
                  </a>
                </li>
              </ul>
              <div class="tabcontent">
                <div
                  id="tab01"
                  style={{
                    display: selectedAdminStatsTabIndex === 1 ? '' : 'none'
                  }}
                >
                  <div class="border_box">
                    <div class="con_vaca flex_ar">
                      <div
                        class="flex_center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('org/center/org_main/index.do')
                        }
                      >
                        <p>
                          구성원
                          <span>
                            {portalAdminAllStatsInfo.user} /{' '}
                            {portalAdminAllStatsInfo.dept}
                          </span>
                        </p>
                      </div>
                      <div
                        class="flex_center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/commute-admin.do')
                        }
                      >
                        <p>
                          지각/출퇴근 미제출
                          <span>
                            {portalAdminAllStatsInfo.tardy} /{' '}
                            {portalAdminAllStatsInfo.dept_commute_not_submit}
                          </span>
                        </p>
                      </div>
                      <div
                        class="flex_center relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/report-admin.do')
                        }
                      >
                        <p>
                          업무보고 등록
                          <span>{portalAdminAllStatsInfo.report_submit}</span>
                        </p>
                      </div>
                      <div
                        class="flex_center relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() => Helper.goUrl('gsign/docbox/index.do')}
                      >
                        <p>
                          미결재
                          <span>{portalAdminAllStatsInfo.not_approve}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 출퇴근제출 탭 */}
                <div
                  id="tab02"
                  style={{
                    display: selectedAdminStatsTabIndex === 2 ? '' : 'none'
                  }}
                >
                  <div class="border_box">
                    <div class="con_vaca flex_ar">
                      <div
                        class="flex_center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/commute-admin.do')
                        }
                      >
                        <p>
                          제출
                          <span>
                            {portalAdminCommuteStatsInfo.before_submit}
                          </span>
                        </p>
                      </div>
                      <div
                        class="flex_center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/commute-admin.do')
                        }
                      >
                        <p>
                          반려
                          <span>{portalAdminCommuteStatsInfo.reject}</span>
                        </p>
                      </div>
                      <div
                        class="flex_center relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/commute-admin.do')
                        }
                      >
                        <p>
                          승인전
                          <span>{portalAdminCommuteStatsInfo.submit}</span>
                        </p>
                      </div>
                      <div
                        class="flex_center relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/commute-admin.do')
                        }
                      >
                        <p>
                          승인완료
                          <span>
                            {portalAdminCommuteStatsInfo.approve_complete}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 업무보고 탭 */}
                <div
                  id="tab03"
                  style={{
                    display: selectedAdminStatsTabIndex === 3 ? '' : 'none'
                  }}
                >
                  <div class="border_box">
                    <div class="con_vaca flex_ar">
                      <div
                        class="flex_center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/report-admin.do')
                        }
                      >
                        <p>
                          등록
                          <span>{portalAdminWorkReportStatsInfo.regist}</span>
                        </p>
                      </div>
                      <div
                        class="flex_center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/report-admin.do')
                        }
                      >
                        <p>
                          미제출
                          <span>{portalAdminWorkReportStatsInfo.regist}</span>
                        </p>
                      </div>
                      <div
                        class="flex_center relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/report-admin.do')
                        }
                      >
                        <p>
                          이슈
                          <span>{portalAdminWorkReportStatsInfo.issue}</span>
                        </p>
                      </div>
                      <div
                        class="flex_center relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          Helper.goUrl('newoffice/view/report-admin.do')
                        }
                      >
                        <p>
                          댓글
                          <span>{portalAdminWorkReportStatsInfo.comment}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row_item grid3">
            <h3 onClick={() => Helper.goUrl('sch/center/index.do')}>
              <i class="ico2"></i>회사 일정
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="border_box con_calendar flex_sb">
              <div class="cal_con1 ">
                <div class="con_calendar_xd">
                  <div class="date">
                    <a
                      href="javascript:void(0);"
                      class="left"
                      onClick={this.prevMonth}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/btn_calen_prev.png`}
                        alt="이전 달"
                      />
                    </a>
                    {Helper.dateToString(searchMonth, 'YYYY년 MM월')}
                    <a
                      href="javascript:void(0);"
                      class="right"
                      onClick={this.nextMonth}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/btn_calen_next.png`}
                        alt="다음 달"
                      />
                    </a>
                  </div>

                  <table class="calendar">
                    <colgroup>
                      <col style={{ width: 'calc(100% / 7)' }} />
                      <col style={{ width: 'calc(100% / 7)' }} />
                      <col style={{ width: 'calc(100% / 7)' }} />
                      <col style={{ width: 'calc(100% / 7)' }} />
                      <col style={{ width: 'calc(100% / 7)' }} />
                      <col style={{ width: 'calc(100% / 7)' }} />
                      <col style={{ width: 'calc(100% / 7)' }} />
                    </colgroup>
                    <thead>
                      <th scope="col" class="cal_red">
                        일
                      </th>
                      <th scope="col">월</th>
                      <th scope="col">화</th>
                      <th scope="col">수</th>
                      <th scope="col">목</th>
                      <th scope="col">금</th>
                      <th scope="col" class="cal_blue">
                        토
                      </th>
                    </thead>
                    <tbody>
                      {basicCalendarList.map((weetList) => {
                        return (
                          <tr>
                            {weetList.map((weekInfo) => {
                              let childComponent = <td></td>;
                              if (weekInfo) {
                                const checkSelected =
                                  Helper.dateToString(
                                    selectedShceduleDate,
                                    'YYYYMMDD'
                                  ) === weekInfo.dateStr;
                                if (weekInfo.holiday) {
                                  childComponent = (
                                    <td
                                      class={classnames('cal_red', {
                                        cell_pick: checkSelected
                                      })}
                                      onClick={() =>
                                        this.changeSelectedShceduleDate(
                                          weekInfo.dateStr
                                        )
                                      }
                                    >
                                      {checkSelected ? (
                                        <span class="pick">{weekInfo.day}</span>
                                      ) : (
                                        weekInfo.day
                                      )}
                                    </td>
                                  );
                                } else if (weekInfo.saturday) {
                                  childComponent = (
                                    <td
                                      class={classnames('cal_blue', {
                                        cell_pick: checkSelected
                                      })}
                                      onClick={() =>
                                        this.changeSelectedShceduleDate(
                                          weekInfo.dateStr
                                        )
                                      }
                                    >
                                      {checkSelected ? (
                                        <span class="pick">{weekInfo.day}</span>
                                      ) : (
                                        weekInfo.day
                                      )}
                                    </td>
                                  );
                                } else {
                                  childComponent = (
                                    <td
                                      class={classnames({
                                        cell_pick: checkSelected
                                      })}
                                      onClick={() =>
                                        this.changeSelectedShceduleDate(
                                          weekInfo.dateStr
                                        )
                                      }
                                    >
                                      {checkSelected ? (
                                        <span class="pick">{weekInfo.day}</span>
                                      ) : (
                                        weekInfo.day
                                      )}
                                    </td>
                                  );
                                }
                              }
                              return childComponent;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="cal_con2 bg">
                <div class="flex_center">
                  <p class="day">
                    {Helper.dateToString(
                      selectedShceduleDate,
                      'YYYY년 M월 DD일'
                    )}
                  </p>
                  {scheduleListComponent}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mf_to_row1 flex_sb mgtop40">
          <div class="row_item grid2">
            <h3
              onClick={() =>
                Helper.goUrl(
                  'bbs/comes/board/list.do?boardKey=' +
                    Constant.NOTICE_BOARD_KEY
                )
              }
            >
              공지사항
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="">
              <table class="board-list">
                <caption>공지사항 리스트</caption>
                <colgroup>
                  <col style={{ width: 20 }} />
                  <col />
                  <col style={{ width: 40 }} />
                  <col style={{ width: 60 }} />
                  <col style={{ width: 40 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">작성일</th>
                    <th scope="col">조회수</th>
                  </tr>
                </thead>
                <tbody>{noticeListComponent}</tbody>
              </table>
            </div>
          </div>
          <div class="row_item grid2">
            <h3 onClick={() => Helper.goUrl('newoffice/view/commute-admin.do')}>
              전체 출퇴근 현황
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="border_bottom box_fix">
              <table class="board-list">
                <caption>전체 출퇴근 현황 리스트</caption>
                <colgroup>
                  <col style={{ width: 60 }} />
                  <col style={{ width: 100 }} />
                  <col />
                  <col style={{ width: 100 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">부서명</th>
                    <th scope="col">팀장명</th>
                    <th scope="col">연락처</th>
                    <th scope="col">상태</th>
                  </tr>
                </thead>
                <tbody>{commuteDeptListComponent}</tbody>
              </table>
            </div>
          </div>
          <div class="row_item grid2">
            <h3
              onClick={() => Helper.goUrl('newoffice/view/vacation-admin.do')}
            >
              전체 연차 현황
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="border_bottom box_fix">
              <table class="board-list">
                <caption>전체 연차 현황 리스트</caption>
                <colgroup>
                  <col style={{ width: 200 }} />
                  <col />
                  <col style={{ width: 130 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">이름</th>
                    <th scope="col">휴가/휴직 구분</th>
                    <th scope="col">전일/반일</th>
                  </tr>
                </thead>
                <tbody>{vacationDayHistoryListComponent}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortalAdminApp;
