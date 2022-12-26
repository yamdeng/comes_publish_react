import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore', 'portalStore')
@observer
class PortalDeptApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
    this.changeInWorkYn = this.changeInWorkYn.bind(this);
    this.startWork = this.startWork.bind(this);
    this.outWork = this.outWork.bind(this);
  }

  init() {
    /*

      1.금일 일일_출퇴근 정보 조회
      2.올해 휴가 사용정보 조회
      3.팀원의 일일_출퇴근 정보 조회
      4.공지사항 조회
      5.결재정보 조회
      6.업무보고 조회

    */
    const { portalStore } = this.props;
    portalStore.getTodayCommuteDayInfo();
    portalStore.getTodayVacationYearInfo();
    portalStore.getCommuteDayList();
    portalStore.getNoticeList();
    portalStore.getApproveList();
    portalStore.getWorkReportList();
    portalStore.initWorkReport7RangeText();
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

  componentDidMount() {
    this.init();
  }

  render() {
    const { portalStore, uiStore, appStore } = this.props;
    const { profile } = appStore;
    const { user_name } = profile;
    let {
      todayCommuteDayInfo,
      todayVacationYearInfo,
      commuteDayList,
      noticeList,
      inWorkYn,
      approveList,
      workReportList,
      workReport7RangeText
    } = portalStore;
    todayCommuteDayInfo = todayCommuteDayInfo || {};
    todayVacationYearInfo = todayVacationYearInfo || {};
    const { todayDayTextInfo, todayWeekTextInfo, currentTime } = uiStore;
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

    const { annualCount, plusVacationCount, usedCount } = todayVacationYearInfo;
    const restVacationCount = annualCount + plusVacationCount - usedCount;

    let commuteDayListComponent = null;
    if (commuteDayList.length) {
      commuteDayListComponent = commuteDayList.map((info) => {
        const {
          positionTitle,
          userName,
          workStatusCodeName,
          startWorkDate,
          outWorkDate
        } = info;
        return (
          <tr>
            <td>{userName}</td>
            <td>{positionTitle}</td>
            <td>{workStatusCodeName}</td>
            <td>
              {Helper.convertDate(startWorkDate, 'YYYY-MM-DD HH:mm:ss', 'H:mm')}
            </td>
            <td>
              {Helper.convertDate(outWorkDate, 'YYYY-MM-DD HH:mm:ss', 'H:mm')}
            </td>
          </tr>
        );
      });
    } else {
      commuteDayListComponent = (
        <tr>
          <td style={{ textAlign: 'center' }} colSpan={5}>
            팀원 출퇴근 정보가 존재하지 않습니다.
          </td>
        </tr>
      );
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

    let approveListComponent = null;
    if (approveList.length) {
      approveListComponent = approveList.map((approveInfo) => {
        const { fld_date, fld_title, code_name, fld_writer } = approveInfo;
        return (
          <tr>
            <td>{Helper.convertDate(fld_date, 'YYYY-MM-DD', 'YYYY.MM.DD')}</td>
            <td>{code_name}</td>
            <td
              class="subject"
              onClick={() => Helper.goUrl('gsign/docbox/index.do')}
            >
              <a href="javascript:void(0);">{fld_title}</a>
            </td>
            <td>{fld_writer}</td>
            <td>
              <p class="red">결재요청</p>
            </td>
          </tr>
        );
      });
    } else {
      approveListComponent = (
        <tr>
          <td style={{ textAlign: 'center' }} colSpan={5}>
            등록된 결재가 존재하지 않습니다.
          </td>
        </tr>
      );
    }

    let workReportListComponent = null;
    if (workReportList.length) {
      workReportListComponent = workReportList.map((workReportInfo) => {
        const { baseDateStr, reportDate, commentCount, holiday } =
          workReportInfo;
        return (
          <tr>
            <td style={{ color: holiday ? '#ed4747' : '' }}>
              {Helper.convertDate(baseDateStr, 'YYYYMMDD', 'YYYY-MM-DD(ddd)')}
            </td>
            <td>
              {Helper.convertDate(
                reportDate,
                'YYYY-MM-DD HH:mm:ss',
                'YYYY-MM-DD'
              )}
            </td>
            <td>{commentCount ? 'Y' : 'N'}</td>
          </tr>
        );
      });
    } else {
      workReportListComponent = (
        <tr>
          <td style={{ textAlign: 'center' }} colSpan={3}>
            업무보고가 존재하지 않습니다.
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
                  <span>({todayWeekTextInfo})</span>
                </p>
                <p>{currentTime}</p>
                <ul
                  class="flex_sb mgtop40"
                  style={{ visibility: startWorkDate ? 'hidden' : 'visible' }}
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
            <h3
              onClick={() => Helper.goUrl('newoffice/view/vacation-private.do')}
            >
              <i class="ico2"></i>휴가/휴직 현황
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="border_box">
              <div class="con_vaca flex_ar">
                <div class="flex_center">
                  <p>
                    총 연차
                    <span>
                      {!todayVacationYearInfo.userId
                        ? '-'
                        : annualCount + plusVacationCount}
                    </span>
                  </p>
                </div>
                <div class="flex_center">
                  <p>
                    사용 연차
                    <span>
                      {!todayVacationYearInfo.userId ? '-' : usedCount}
                    </span>
                  </p>
                </div>
                <div class="flex_center relative">
                  <p>
                    잔여 연차
                    <span class="blue">
                      {!todayVacationYearInfo.userId ? '-' : restVacationCount}
                    </span>
                  </p>
                  <a
                    class="btn_vaca"
                    href="javascript:void(0);"
                    onClick={() => Helper.goUrl('gsign/docbox/index.do')}
                    style={{ display: restVacationCount > 0 ? '' : 'none' }}
                  >
                    휴가 신청
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row_item grid3">
            <h3 onClick={() => Helper.goUrl('newoffice/view/commute-dept.do')}>
              <i class="ico3"></i>팀원 근무/출퇴근 현황
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="box_fix scroll-minimum">
              <table class="board-list">
                <caption>팀원 근무/출퇴근 현황</caption>
                <colgroup>
                  <col style={{ width: 60 }} />
                  <col style={{ width: 60 }} />
                  <col />
                  <col style={{ width: 100 }} />
                  <col style={{ width: 100 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">이름</th>
                    <th scope="col">직급</th>
                    <th scope="col">근무상태</th>
                    <th scope="col">출근</th>
                    <th scope="col">퇴근</th>
                  </tr>
                </thead>
                <tbody>{commuteDayListComponent}</tbody>
              </table>
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
            <div class="box_fix scroll-minimum">
              <table class="board-list">
                <caption>공지사항 리스트</caption>
                <colgroup>
                  <col style={{ width: 20 }} />
                  <col />
                  <col style={{ width: 60 }} />
                  <col style={{ width: 80 }} />
                  <col style={{ width: 60 }} />
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
            <h3 onClick={() => Helper.goUrl('gsign/docbox/index.do')}>
              결재 현황
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>{' '}
              <span>(요청/반려)</span>
            </h3>
            <div class="box_fix scroll-minimum">
              <table class="board-list">
                <caption>결재 현황 리스트</caption>
                <colgroup>
                  <col style={{ width: 60 }} />
                  <col style={{ width: 100 }} />
                  <col />
                  <col style={{ width: 100 }} />
                  <col style={{ width: 100 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">기안일</th>
                    <th scope="col">결재양식</th>
                    <th scope="col">제목</th>
                    <th scope="col">기안자</th>
                    <th scope="col">결재상태</th>
                  </tr>
                </thead>
                <tbody>{approveListComponent}</tbody>
              </table>
            </div>
          </div>
          <div class="row_item grid2">
            <h3 onClick={() => Helper.goUrl('newoffice/view/report-dept.do')}>
              업무 보고 현황
              <a href="javascript:void(0);" class="btn_more">
                더보기
              </a>
              <span>{workReport7RangeText}</span>
            </h3>
            <div class="box_fix scroll-minimum">
              <table class="board-list">
                <caption>업무 보고 현황 리스트</caption>
                <colgroup>
                  <col style={{ width: 200 }} />
                  <col />
                  <col style={{ width: 160 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">보고일</th>
                    <th scope="col">작성일</th>
                    <th scope="col">코멘트</th>
                  </tr>
                </thead>
                <tbody>{workReportListComponent}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortalDeptApp;
