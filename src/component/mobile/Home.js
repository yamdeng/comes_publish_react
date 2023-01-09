import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import Helper from 'util/Helper';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'uiStore', 'homeStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.changeInWorkYn = this.changeInWorkYn.bind(this);
    this.startWork = this.startWork.bind(this);
    this.outWork = this.outWork.bind(this);
  }

  changeInWorkYn(inWorkYn) {
    const { homeStore } = this.props;
    homeStore.changeInWorkYn(inWorkYn);
  }

  startWork() {
    const { homeStore } = this.props;
    homeStore.startWork();
  }

  outWork() {
    const { homeStore } = this.props;
    homeStore.outWork();
  }

  init() {
    const { homeStore } = this.props;
    homeStore.getTodayCommuteDayInfo();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { homeStore, uiStore, appStore } = this.props;
    const {
      todayDayTextInfo,
      todayWeekTextInfo,
      currentTime,
      displaySideMenu
    } = uiStore;
    let { profile } = appStore;
    const { userType, user_name, dept_name } = profile;
    let { todayCommuteDayInfo, inWorkYn } = homeStore;
    todayCommuteDayInfo = todayCommuteDayInfo || {};

    const {
      startWorkDate,
      outWorkDate,
      startWorkIp,
      vacationKindCode,
      workStatusCodeName,
      startWorkDeviceType
    } = todayCommuteDayInfo;
    const isAllDayVacation = Helper.getIsAllDayVacation(vacationKindCode);

    return (
      <div class="wrap">
        <div class="m_main_wrap">
          <header>
            <div id="m_header">
              <h1 class="m_logo">
                <img
                  src={`${process.env.RESOURCE_URL}/images/comeslogo_mobile.png`}
                  alt="COMES INTRANET"
                  onClick={() => Helper.goUrl('')}
                />
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
                  <span class="user_name">{user_name}</span>님{' '}
                  <em>좋은 하루 보내세요.</em>
                </p>
              </div>
              <div class="work_area">
                <div class="time_box_wrap">
                  <div class="time_box">
                    <div class="img">
                      <img
                        src={`${process.env.RESOURCE_URL}/images/time_box_img.png`}
                        alt=""
                      />
                    </div>
                    <div>
                      <p class="date">
                        {todayDayTextInfo}
                        <span> ({todayWeekTextInfo})</span>
                      </p>
                      <p class="time">{currentTime}</p>
                    </div>
                  </div>
                  <div class="work_option_wrap flex_sb">
                    <p class="txt">근무 형태를 체크해주세요.</p>
                    <div class="tab-slider--nav">
                      <ul
                        className={classnames('tab-slider--tabs', {
                          slide: inWorkYn === 'N',
                          work_option2: inWorkYn === 'N'
                        })}
                      >
                        <li
                          className={classnames(
                            'tab-slider--trigger',
                            'work-option1',
                            {
                              active: inWorkYn === 'Y'
                            }
                          )}
                          rel="tab1"
                          onClick={() => this.changeInWorkYn('Y')}
                        >
                          업무
                        </li>
                        <li
                          className={classnames(
                            'tab-slider--trigger',
                            'work-option2',
                            {
                              active: inWorkYn === 'N'
                            }
                          )}
                          rel="tab2"
                          onClick={() => this.changeInWorkYn('N')}
                        >
                          재택
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="container">
                  <div
                    class="tab-slider--container"
                    style={{
                      visibility: isAllDayVacation ? 'hidden' : 'visible'
                    }}
                  >
                    <div id="tab1" class="tab-slider--body">
                      <div id="tab01" class="flex_sb">
                        <a
                          href="javascript:void(0);"
                          className={classnames('btn_work', {
                            option1: todayCommuteDayInfo.inWorkYn === 'Y',
                            option2: todayCommuteDayInfo.inWorkYn === 'N',
                            active: startWorkDate ? true : false
                          })}
                          onClick={this.startWork}
                        >
                          <div class="btn_box">
                            <i class="work_on_ico"></i>
                            <p>
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
                            </p>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className={classnames('btn_work', {
                            option1: false,
                            option2: false,
                            active: false
                          })}
                          onClick={this.outWork}
                        >
                          <div class="btn_box">
                            <i class="work_off_ico"></i>
                            <p>
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
