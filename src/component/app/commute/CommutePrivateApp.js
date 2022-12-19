import React, { Component } from 'react';
import Api from 'util/Api';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';

const store = new CustomStore({
  key: 'OrderNumber',
  load(loadOptions) {
    let params = {};
    return ApiService.get('commutes/list.do', params).then((response) => {
      const data = response.data;
      return {
        data: data.list,
        totalCount: data.totalCount
      };
    });
  }
});

class CommutePrivateApp extends Component {
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
            <div class="sel_month">
              <a href="#" class="prev">
                이전 달
              </a>
              <span class="txt_month">2022년 09월</span>
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
            <a href="javascript:void(0);" class="btn_right btn_search_big">
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
                  <p class="black">기업부설 연구소업부설 연구소</p>
                  <p>
                    <span>홍길동</span> 님
                  </p>
                </div>
              </div>
            </div>
            <div class="grp_work">
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
                <div class="wo_con2 flex_center">
                  <p>접속 IP : (P) 61.75.21.224 </p>
                  <div>
                    <ul class="flex_sb mgtop40">
                      <li>
                        <a href="javascript:void(0);" class="activate2">
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

                <div class="work_result relative">
                  <h3>
                    <span>9</span>월 출퇴근 현황{' '}
                    <a
                      href="#"
                      onclick="showID('toggle_tip')"
                      class="btn_right"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/btn_info.png`}
                      />
                    </a>
                  </h3>

                  <div
                    id="toggle_tip"
                    class="tip_box"
                    style={{ display: 'none' }}
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
        </div>
      </div>
    );
  }
}

export default CommutePrivateApp;
