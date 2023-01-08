import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore', 'homeStore')
@observer
class WorkReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
  }

  init() {}

  render() {
    let { homeStore } = this.props;
    let {
      searchDateType,
      searchMonth,
      startDate,
      endDate,
      monthDatepickerOpend,
      startDatepickerOpend,
      endDatepickerOpend,
      totalCount,
      statsInfo,
      datagridStore,
      searchDashBoardKind
    } = homeStore;
    statsInfo = statsInfo || {};
    return (
      <div class="wrap">
        <div class="m_sub_wrap">
          <header>
            <div id="m_header" class="flex_sb">
              <h1 class="m_title">업무보고 보기</h1>
              <a class="back" href="javascript:void(0);"></a>
              <div class="right_area flex">
                <p>이슈</p>
                <div class="wrapper">
                  <input type="checkbox" id="switch" />
                  <label for="switch" class="switch_label">
                    <span class="onf_btn"></span>
                  </label>
                </div>
                <a href="javascript:void(0);" class="btn_ico">
                  <img src="images/btn_copy.png" />
                </a>
                <a href="javascript:void(0);" class="btn_ico">
                  <img src="images/btn_modify.png" />
                </a>
              </div>
            </div>
          </header>
          <div class="m_content_wrap">
            <div class="m_content_box">
              <div>
                <div class="m_sub_top flex_sb">
                  <h4>
                    <span class="block">2022-</span>07-27(수)
                  </h4>
                  <p class="result">
                    <span class="block">2022-</span>07-28 10:01
                  </p>
                  <div>
                    <div class="btn_area">
                      <a class="active btn_is" href="#">
                        이슈
                      </a>
                      <a class="active btn_com" href="#">
                        코멘트
                      </a>
                    </div>
                  </div>
                </div>

                <div class="border-top mgtop10">
                  <p
                    style={{
                      height: 300,
                      fontSize: 15,
                      lineHeight: 300,
                      textAlign: 'center'
                    }}
                  >
                    팀장 일일 업무 보고 작성 내용 출력 영역
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkReportDetail;
