import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';

@inject('appStore', 'uiStore', 'homeStore')
@observer
class WorkReportForm extends Component {
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
              <h1 class="m_title">업무보고 작성</h1>
              <a class="hamburger_menu active black" href="javascript:void(0);">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </a>
              <div class="right_area flex">
                <p>이슈</p>
                <div class="wrapper">
                  <input type="checkbox" id="switch" />
                  <label for="switch" class="switch_label">
                    <span class="onf_btn"></span>
                  </label>
                </div>
                <a href="javascript:void(0);" class="btn_ico">
                  <img src="images/btn_list.png" />
                </a>
                <a href="javascript:void(0);" class="btn_ico">
                  <img src="images/btn_save.png" />
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
                    웹 에디터 영역
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

export default WorkReportForm;
