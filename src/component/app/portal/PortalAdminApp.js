import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Api from 'util/Api';

@inject('appStore', 'uiStore')
@observer
class PortalAdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="contents_main" class="">
        <div class="flex_sb mf_to_row1">
          <div class="row_item grid3">
            <h3>
              <i class="ico1"></i>근무
            </h3>
            <div class="con_work border_box flex_sb">
              <div class="wo_con1 bg">
                <p class="bold30">
                  09.28<span> (수)</span>
                </p>
                <p>08:55:21</p>
                <ul class="flex_sb mgtop40">
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="work_option1"
                        name="work_option"
                        checked
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
                      />
                      <label for="work_option2">재택</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="wo_con2">
                <p>
                  <span class="user">조강래 </span> 님
                </p>
                <p>접속 IP : (P) 61.75.21.224 </p>
                <div>
                  <ul class="flex_sb mgtop40">
                    <li>
                      <a href="javascript:void(0);" class="activate1">
                        출근 <span>08:55</span>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" class="disabled">
                        퇴근 <span>미체크</span>
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
                <li>
                  <a href="#tab01" class="active">
                    전체
                  </a>
                </li>
                <li>
                  <a href="#tab02">출퇴근 제출</a>
                </li>
                <li>
                  <a href="#tab03">업무보고</a>
                </li>
              </ul>
              <div class="tabcontent">
                <div id="tab01">
                  <div class="border_box">
                    <div class="con_vaca flex_ar">
                      <div class="flex_center">
                        <p>
                          구성원<span>217 / 31</span>
                        </p>
                      </div>
                      <div class="flex_center">
                        <p>
                          지각/출퇴근 미제출<span>7 / 3</span>
                        </p>
                      </div>
                      <div class="flex_center relative">
                        <p>
                          업무보고 등록<span>13</span>
                        </p>
                      </div>
                      <div class="flex_center relative">
                        <p>
                          미결재<span>3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tab02"> 출퇴근 제출 content</div>
                <div id="tab03"> 업무보고 content</div>
              </div>
            </div>
          </div>
          <div class="row_item grid3">
            <h3>
              <i class="ico2"></i>회사 일정
              <a href="" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="border_box con_calendar flex_sb">
              <div class="cal_con1 ">
                <div class="con_calendar_xd">
                  <div class="date">
                    <a href="javascript:void(0);" class="left">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/btn_calen_prev.png`}
                        alt="이전 달"
                      />
                    </a>
                    2022년 9월
                    <a href="javascript:void(0);" class="right">
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
                      <tr>
                        <td class="cal_red"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>1</td>
                        <td>2</td>
                        <td class="cal_blue">3</td>
                      </tr>
                      <tr>
                        <td class="cal_red">4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                        <td>8</td>
                        <td>
                          <span class="cal_red">9</span>
                        </td>
                        <td class="cal_blue">
                          <span class="cal_red">10</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="cal_red">11</td>
                        <td>
                          <span class="cal_red">12</span>
                        </td>
                        <td>13</td>
                        <td>14</td>
                        <td>15</td>
                        <td class="pick_cel">16</td>
                        <td class="cal_blue">17</td>
                      </tr>
                      <tr>
                        <td class="cal_red">18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                        <td>22</td>
                        <td>23</td>
                        <td class="cal_blue">24</td>
                      </tr>
                      <tr>
                        <td class="cal_red">25</td>
                        <td>26</td>
                        <td>27</td>
                        <td class="cell_pick">
                          <span class="pick">28</span>
                        </td>
                        <td>29</td>
                        <td>30</td>
                        <td class="cal_blue"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="cal_con2 bg">
                <div class="flex_center">
                  <p class="day">2022년 9월 28일</p>
                  <p>일정 없음</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mf_to_row1 flex_sb mgtop40">
          <div class="row_item grid2">
            <h3>
              공지사항
              <a href="" class="btn_more">
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
                <tbody>
                  <tr>
                    <td>1</td>
                    <td class="subject">
                      <a href="#">
                        [공지] 취업규칙 변경신고 관련 안내드립니다.취업규칙
                        변경신고 관련 안내드립니다.
                      </a>
                    </td>
                    <td>김회원</td>
                    <td>2022.10.10</td>
                    <td>176</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td class="subject">
                      <a href="#">[공지] 2022.1Q 컴즈 뉴스레터_ #1 창간호</a>
                    </td>
                    <td>안하름</td>
                    <td>2022.09.21</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td class="subject">
                      <a href="#">[공지] 2022년도 건강검진 실시 안내</a>
                    </td>
                    <td>김회원</td>
                    <td>2022.09.10</td>
                    <td>176</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td class="subject">
                      <a href="#">[공지] 사내 체육대회 관련 안내드립니다.</a>
                    </td>
                    <td>안하름</td>
                    <td>2022.07.01</td>
                    <td>94</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td class="subject">
                      <a href="#">
                        [공지] 결재 전자시스템 오류로 인한 점검 안내드립니다.
                      </a>
                    </td>
                    <td>김회원</td>
                    <td>2022.06.10</td>
                    <td>176</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row_item grid2">
            <h3>
              전체 출퇴근 현황
              <a href="" class="btn_more">
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
                <tbody>
                  <tr>
                    <td class="search">
                      <input type="text" />
                    </td>
                    <td class="search">
                      <input type="text" />
                    </td>
                    <td class="search">
                      <input type="text" />
                    </td>
                    <td class="search">
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>안하름</td>
                    <td>010-1234-5678</td>
                    <td>승인전</td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>김회원</td>
                    <td>010-1234-5678</td>
                    <td>승인전</td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>안하름</td>
                    <td>010-1234-5678</td>
                    <td>승인전</td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>김회원</td>
                    <td>010-1234-5678</td>
                    <td>승인전</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row_item grid2">
            <h3>
              전체 연차 현황
              <a href="" class="btn_more">
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
                <tbody>
                  <tr>
                    <td>김회원</td>
                    <td>휴가/휴직 (연차)</td>
                    <td>전일</td>
                  </tr>
                  <tr>
                    <td>안하름</td>
                    <td>휴가/휴직 (연차)</td>
                    <td>오후반차</td>
                  </tr>
                  <tr>
                    <td>김회원</td>
                    <td>휴가/휴직 (연차)</td>
                    <td>오후반차</td>
                  </tr>
                  <tr>
                    <td>안하름</td>
                    <td>휴가/휴직 (연차)</td>
                    <td>전일</td>
                  </tr>
                  <tr>
                    <td>김회원</td>
                    <td>휴가/휴직 (연차)</td>
                    <td>전일</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortalAdminApp;
