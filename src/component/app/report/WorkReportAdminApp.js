import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Api from 'util/Api';

@inject('appStore', 'uiStore')
@observer
class WorkReportAdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="contents_sub" class="">
        <div class="sub_lnb">
          <h3>출퇴근</h3>
          <ul class="sub_menu">
            <li class="on">
              <a href="javascript:void(0);">개인출퇴근</a>
            </li>
            <li>
              <a href="javascript:void(0);">팀원출퇴근</a>
            </li>
            <li>
              <a href="javascript:void(0);">실원출퇴근</a>
            </li>
            <li>
              <a href="javascript:void(0);">전체출퇴근관리</a>
            </li>
            <li>
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
            <div class="grp_cale_option">
              <ul id="calelist" class="flex_sb">
                <li>
                  <div class="radio">
                    <input
                      type="radio"
                      id="cale_option1"
                      name="cale_option"
                      checked
                    />
                    <label for="cale_option1">하루</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input type="radio" id="cale_option2" name="cale_option" />
                    <label for="cale_option2">월간</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input type="radio" id="cale_option3" name="cale_option" />
                    <label for="cale_option3">기간</label>
                  </div>
                </li>
              </ul>
            </div>
            <div class="sel_month calelist_month cale_option1 on">
              <a href="#" class="prev">
                이전 일
              </a>
              <span class="txt_month">6월 15일(수)</span>
              <a href="#" class="next">
                다음 일
              </a>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
            </div>
            <div class="sel_month calelist_month cale_option2">
              <a href="#" class="prev">
                이전 달
              </a>
              <span class="txt_month">2022년 6월</span>
              <a href="#" class="next">
                다음 달
              </a>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
            </div>
            <div class="sel_month calelist_month cale_option3">
              <a href="#" class="prev">
                이전 달
              </a>
              <span class="txt_month2">2022-06-01</span>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
              <span>~</span>
              <span class="txt_month2">2022-06-15</span>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
              <a href="#" class="next">
                다음 달
              </a>
            </div>
            <a href="javascript:void(0);" class="btn_right btn_search_big">
              조회
            </a>
          </div>

          <div class="sub_serch_result">
            <ul class="flex_ul_box flex_sb">
              <li class="flex_center">
                <div>
                  <span>업무 중</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>재택 중</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>오전반차</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>오후반차</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>업무종료</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>지각</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>휴가/휴직</span>
                  <b>6</b>
                </div>
              </li>
            </ul>
          </div>

          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>
                  <b class="blue">6</b> 명
                </p>
              </div>
              <div class="search_right">
                <a href="javascript:void(0);" class="btn_normal">
                  수정
                </a>
                <a href="javascript:void(0);" class="btn_normal btn_blue">
                  제출
                </a>
              </div>
            </div>
            <div class="mgtop10">
              <p
                style={{
                  border: '1px solid #d6d6d6',
                  height: 700,
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

export default WorkReportAdminApp;
