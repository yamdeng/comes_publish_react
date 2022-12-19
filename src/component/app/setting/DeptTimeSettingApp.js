import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Api from 'util/Api';

@inject('appStore', 'uiStore')
@observer
class DeptTimeSettingApp extends Component {
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

export default DeptTimeSettingApp;
