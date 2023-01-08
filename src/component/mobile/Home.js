import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import classnames from 'classnames';

@inject('appStore', 'uiStore', 'homeStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
  }

  init() {}

  render() {
    let { homeStore, uiStore } = this.props;
    let { menuList, displaySideMenu } = uiStore;
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
        <div class="m_main_wrap">
          <header>
            <div id="m_header">
              <h1 class="m_logo">
                <img src="images/comeslogo_mobile.png" alt="COMES INTRANET" />
              </h1>

              <a
                className={classnames('hamburger_menu', {
                  active: displaySideMenu ? true : false
                })}
                href="javascript:void(0);"
                onClick={() => uiStore.toggleSideMenu()}
              >
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </a>
            </div>
          </header>
          <div id="main">
            <div class="main_content">
              <div class="login_user">
                <p>
                  <span class="user_name">조강래</span>님{' '}
                  <em>좋은 하루 보내세요.</em>
                </p>
              </div>
              <div class="work_area">
                <div class="time_box_wrap">
                  <div class="time_box">
                    <div class="img">
                      <img src="images/time_box_img.png" />
                    </div>
                    <div>
                      <p class="date">
                        09.02<span>(수)</span>
                      </p>
                      <p class="time">13:22:18</p>
                    </div>
                  </div>
                  <div class="work_option_wrap flex_sb">
                    <p class="txt">근무 형태를 체크해주세요.</p>
                    <div class="tab-slider--nav">
                      <ul class="tab-slider--tabs">
                        <li
                          class="tab-slider--trigger work-option1 active"
                          rel="tab1"
                        >
                          업무
                        </li>
                        <li class="tab-slider--trigger work-option2" rel="tab2">
                          재택
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="container">
                  <div class="tab-slider--container">
                    <div id="tab1" class="tab-slider--body">
                      <div id="tab01" class="flex_sb">
                        <a href="#" class="btn_work option1">
                          <div class="btn_box">
                            <i class="work_on_ico"></i>
                            <p>
                              출근 <span>08:50</span>
                            </p>
                          </div>
                        </a>
                        <a href="#" class="btn_work option1 active">
                          <div class="btn_box">
                            <i class="work_off_ico"></i>
                            <p>
                              퇴근 <span>18:10</span>
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div id="tab2" class="tab-slider--body">
                      <div id="tab02" class="flex_sb">
                        <a href="#" class="btn_work option2 active">
                          <div class="btn_box">
                            <i class="work_on_ico"></i>
                            <p>
                              출근 <span>08:50</span>
                            </p>
                          </div>
                        </a>
                        <a href="#" class="btn_work">
                          <div class="btn_box">
                            <i class="work_off_ico"></i>
                            <p>
                              퇴근 <span>미체크</span>
                            </p>
                          </div>
                        </a>
                      </div>
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

export default Home;
