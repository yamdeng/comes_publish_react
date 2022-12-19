import React, { Component } from 'react';
import Api from 'util/Api';

class VacationPrivateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="contents_sub" class="">
        <div class="sub_lnb">
          <h3>휴가/휴직</h3>
          <ul class="sub_menu">
            <li class="on">
              <a href="javascript:void(0);">개인 휴가/휴직</a>
            </li>
            <li>
              <a href="javascript:void(0);">팀원 휴가/휴직</a>
            </li>
            <li>
              <a href="javascript:void(0);">실원 휴가/휴직</a>
            </li>
            <li>
              <a href="javascript:void(0);">전체 휴가관리</a>
            </li>
          </ul>
        </div>

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">출퇴근</a>&gt;
            <a href="javascript:void(0);">개인출퇴근</a>
          </div>

          <div class="sub_top">
            <div class="grp_sel_option">
              <label for="sel_option" class="blind">
                실 선택
              </label>
              <select id="sel_option" class="w90">
                <option>전체</option>
                <option>1실</option>
                <option>2실</option>
                <option>3실</option>
              </select>
            </div>

            <div class="sel_month">
              <a href="#" class="prev">
                이전
              </a>
              <span class="txt_month">2022년</span>
              <a href="#" class="next">
                다음
              </a>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
            </div>

            <a href="javascript:void(0);" class="btn_right btn_search_big">
              조회
            </a>
          </div>

          <div class="title_area">
            <h3>휴가/휴직 현황</h3>
          </div>
          <div class="flex_ul_box_container">
            <ul class="flex_ul_box flex_sb">
              <li class="flex_center">
                <div>
                  <span>업무보고</span>
                  <b>2</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>미제출</span>
                  <b>0</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>이슈</span>
                  <b>0</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>코멘트</span>
                  <b>7</b>
                </div>
              </li>
            </ul>
          </div>
          <div class="grid_area">
            <div class="mgtop10">
              <p
                style={{
                  border: '1px solid #d6d6d6',
                  height: 400,
                  fontSize: 15,
                  lineHeight: 300,
                  textAlign: 'center'
                }}
              >
                그리드 영역 표시 임으로 삭제하고 넣으시면 됩니다.
              </p>
            </div>
          </div>
          <div class="hr"></div>
          <div class="title_area">
            <h3>휴가/휴직 신청/사용 내역</h3>
          </div>
          <div class="grid_area">
            <div class="mgtop10">
              <p
                style={{
                  border: '1px solid #d6d6d6',
                  height: 400,
                  fontSize: 15,
                  lineHeight: 300,
                  textAlign: 'center'
                }}
              >
                그리드 영역 표시 임으로 삭제하고 넣으시면 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationPrivateApp;
