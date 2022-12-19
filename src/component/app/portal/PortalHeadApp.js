import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Api from 'util/Api';

@inject('appStore', 'uiStore')
@observer
class PortalHeadApp extends Component {
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
                  <a href="#tab01">전체</a>
                </li>
                <li>
                  <a href="#tab02">1실</a>
                </li>
                <li>
                  <a href="#tab03">2실</a>
                </li>
                <li>
                  <a href="#tab04">3실</a>
                </li>
              </ul>
              <div class="tabcontent">
                <div id="tab01">
                  <div class="border_box">
                    <div class="con_vaca2 flex_ar">
                      <div class="flex_center">
                        <p>
                          실 구성원<span>217 / 31</span>
                        </p>
                      </div>
                      <div class="flex_center">
                        <p>
                          지각<span>7</span>
                        </p>
                      </div>
                      <div class="flex_center">
                        <p>
                          휴가/휴직<span>13</span>
                        </p>
                      </div>
                      <div class="flex_center">
                        <p>
                          출퇴근 미제출<span>5</span>
                        </p>
                      </div>
                      <div class="flex_center">
                        <p>
                          업무보고 이슈<span class="blue">3</span>
                        </p>
                      </div>
                      <div class="flex_center">
                        <p>
                          업무보고 미제출<span class="red">13</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tab02"> 1실 content</div>
                <div id="tab03"> 2실 content</div>
                <div id="tab04"> 3실 content</div>
              </div>
            </div>
          </div>
          <div class="row_item grid3">
            <h3>
              <i class="ico2"></i>실원 근무/출퇴근 현황
              <a href="" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="box_fix">
              <table class="board-list">
                <caption>실원 근무/출퇴근 현황</caption>
                <colgroup>
                  <col style={{ width: 60 }} />
                  <col style={{ width: 60 }} />
                  <col style={{ width: 60 }} />
                  <col />
                  <col style={{ width: 100 }} />
                  <col style={{ width: 100 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">부서명</th>
                    <th scope="col">이름</th>
                    <th scope="col">직급</th>
                    <th scope="col">근무상태</th>
                    <th scope="col">출근</th>
                    <th scope="col">퇴근</th>
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
                    <td>대리</td>
                    <td>연차</td>
                    <td>09:22</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>김회원</td>
                    <td>대리</td>
                    <td>오전반차</td>
                    <td>09:22</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>안하름</td>
                    <td>과장</td>
                    <td>업무 중</td>
                    <td>09:22</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>김회원</td>
                    <td>대리</td>
                    <td>연차</td>
                    <td>09:22</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>안하름</td>
                    <td>과장</td>
                    <td>업무 중</td>
                    <td>09:22</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>김회원</td>
                    <td>대리</td>
                    <td>연차</td>
                    <td>09:22</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
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
              결재 현황
              <a href="" class="btn_more">
                더보기
              </a>{' '}
              <span>(요청/반려)</span>
            </h3>
            <div class="border_bottom box_fix">
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
                <tbody>
                  <tr>
                    <td>2022.10.10</td>
                    <td>휴가신청서</td>
                    <td class="subject">
                      <a href="#">휴가를 신청하오니 결재 요청드립니다.</a>
                    </td>
                    <td>김회원</td>
                    <td>
                      <p class="red">결재요청</p>
                    </td>
                  </tr>
                  <tr>
                    <td>2022.09.21</td>
                    <td>휴가신청서</td>
                    <td class="subject">
                      <a href="#">휴가신청서</a>
                    </td>
                    <td>안하름</td>
                    <td>결재완료</td>
                  </tr>
                  <tr>
                    <td>2022.09.10</td>
                    <td>휴가신청서</td>
                    <td class="subject">
                      <a href="#">휴가신청서</a>
                    </td>
                    <td>김회원</td>
                    <td>결재완료</td>
                  </tr>
                  <tr>
                    <td>2022.07.01</td>
                    <td>휴가신청서</td>
                    <td class="subject">
                      <a href="#">
                        휴가를 신청하오니 결재 요청드립니다. 체육대회 관련
                        안내드립니다.
                      </a>
                    </td>
                    <td>안하름</td>
                    <td>결재완료</td>
                  </tr>
                  <tr>
                    <td>2022.06.10</td>
                    <td>휴가신청서</td>
                    <td class="subject">
                      <a href="#">휴가를 신청하오니 결재 요청드립니다.</a>
                    </td>
                    <td>김회원</td>
                    <td>결재완료</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row_item grid2">
            <h3>
              팀 업무 보고 현황
              <a href="" class="btn_more">
                더보기
              </a>
            </h3>
            <div class="border_bottom box_fix">
              <table class="board-list">
                <caption>팀 업무 보고 현황 리스트</caption>
                <colgroup>
                  <col style={{ width: 60 }} />
                  <col />
                  <col style={{ width: 60 }} />
                  <col style={{ width: 60 }} />
                  <col style={{ width: 60 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">부서명</th>
                    <th scope="col">보고일</th>
                    <th scope="col">작성상태</th>
                    <th scope="col">이슈</th>
                    <th scope="col">코멘트</th>
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
                    <td class="search">
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>2022-05-31(화) </td>
                    <td>Y</td>
                    <td>N</td>
                    <td>N</td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>2022-05-31(화) </td>
                    <td>Y</td>
                    <td>N</td>
                    <td>N</td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>2022-05-31(화) </td>
                    <td>Y</td>
                    <td>N</td>
                    <td>N</td>
                  </tr>
                  <tr>
                    <td>SQ01</td>
                    <td>2022-05-31(화) </td>
                    <td>Y</td>
                    <td>N</td>
                    <td>N</td>
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

export default PortalHeadApp;
