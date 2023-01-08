import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'uiStore', 'homeStore')
@observer
class CommuteList extends Component {
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
        <div class="m_sub_wrap">
          <header>
            <div id="m_header">
              <h1 class="m_title">출퇴근 제출</h1>
              <a
                className={classnames('hamburger_menu', {
                  active: displaySideMenu ? true : false
                })}
                onClick={() => uiStore.toggleSideMenu()}
                href="javascript:void(0);"
              >
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </a>
            </div>
          </header>
          <div class="m_content_wrap">
            <div class="m_content_box">
              <div>
                <div class="searchwrap">
                  <h4>SQ01</h4>
                  <div class="search flex_sb">
                    <div>
                      <p class="date">
                        <span class="block">2022년</span>7월 28일
                      </p>
                      <a href="#" class="btn_calendar">
                        <img
                          src={`${process.env.RESOURCE_URL}/images/btn_modify_month.png`}
                          alt="월 선택하기"
                        />
                      </a>
                    </div>
                    <a href="#" class="com_btn btn_blue mglt10">
                      제출 전
                    </a>
                  </div>
                </div>

                <div class="mgtop10">
                  <div>
                    <ul class="work_result_list">
                      <li>
                        <div>
                          <span class="blue">업무</span>
                          <span class="block">김소영 대리</span>
                        </div>
                        <div class="date">
                          {' '}
                          09:33 AM <em class="block">~ 18:03 PM</em>
                        </div>
                        <div class="disc">
                          업무종료<span class="block">지각</span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span class="blue">업무</span>
                          <span class="block">박정수 대리</span>
                        </div>
                        <div class="date">
                          {' '}
                          13:57 AM <em class="block">~ 18:03 PM</em>
                        </div>
                        <div class="disc">
                          업무종료<span class="block">정상출근(오전반차)</span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span class="blue">업무</span>
                          <span class="block">백희망 대리</span>
                        </div>
                        <div class="date">
                          {' '}
                          08:52 AM <em class="block">~ 18:03 PM</em>
                        </div>
                        <div class="disc">
                          업무종료<span class="block">정상출근</span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span class="blue">업무</span>
                          <span class="block">신동우 대리</span>
                        </div>
                        <div class="date">
                          {' '}
                          08:57 AM <em class="block">~ 14:03 PM</em>
                        </div>
                        <div class="disc">
                          업무종료<span class="block">정상출근(오후반차)</span>
                        </div>
                      </li>
                      <li>
                        <div>
                          <span class="orange">재택</span>
                          <span class="block">안지수 대리</span>
                        </div>
                        <div class="date">
                          {' '}
                          08:57 AM <em class="block">~ 18:03 PM</em>
                        </div>
                        <div class="disc">
                          업무종료<span class="block">정상출근</span>
                        </div>
                      </li>
                    </ul>
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

export default CommuteList;
