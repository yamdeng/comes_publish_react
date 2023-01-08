import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import classnames from 'classnames';

@inject('appStore', 'uiStore', 'homeStore')
@observer
class WorkReportList extends Component {
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
              <h1 class="m_title">업무보고</h1>
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
                  <div class="search">
                    <p class="date">
                      <span class="block">2022년</span>7월 28일
                    </p>
                    <a href="#" class="btn_calendar">
                      <img
                        src="images/btn_modify_month.png"
                        alt="월 선택하기"
                      />
                    </a>
                  </div>
                </div>

                <div class="mgtop10">
                  <ul class="work_list">
                    <li class="flex_sb">
                      <p class="date">
                        <span class="block">2022-</span>07-28(목)
                      </p>
                      <p class="result">
                        <a href="#">미제출</a>
                      </p>
                      <div class="btn_area">
                        <a class="active btn_is" href="#">
                          이슈
                        </a>
                        <a class="active btn_com" href="#">
                          코멘트
                        </a>
                      </div>
                    </li>
                    <li class="flex_sb">
                      <p class="date">
                        <span class="block">2022-</span>07-27(수)
                      </p>
                      <p class="result">
                        <a href="#">
                          <span class="block">2022-</span>07-28 10:01
                        </a>
                      </p>
                      <div class="btn_area">
                        <a class="btn_is" href="#">
                          이슈
                        </a>
                        <a class="active btn_com" href="#">
                          코멘트
                        </a>
                      </div>
                    </li>
                    <li class="flex_sb">
                      <p class="date">
                        <span class="block">2022-</span>07-26(화)
                      </p>
                      <p class="result">
                        <a href="#">
                          <span class="block">2022-</span>07-28 10:01
                        </a>
                      </p>
                      <div class="btn_area">
                        <a class="active btn_is" href="#">
                          이슈
                        </a>
                        <a class="active btn_com" href="#">
                          코멘트
                        </a>
                      </div>
                    </li>
                    <li class="flex_sb">
                      <p class="date">
                        <span class="block">2022-</span>07-25(월)
                      </p>
                      <p class="result">
                        <a href="#">
                          <span class="block">2022-</span>07-28 10:01
                        </a>
                      </p>
                      <div class="btn_area">
                        <a class="btn_is" href="#">
                          이슈
                        </a>
                        <a class="btn_com" href="#">
                          코멘트
                        </a>
                      </div>
                    </li>
                    <li class="flex_sb">
                      <p class="date red">
                        <span class="block">2022-</span>07-24(일)
                      </p>
                      <p class="result"></p>
                      <div class="btn_area">
                        <a class="btn_is" href="#">
                          이슈
                        </a>
                        <a class="btn_com" href="#">
                          코멘트
                        </a>
                      </div>
                    </li>
                    <li class="flex_sb">
                      <p class="date blue">
                        <span class="block">2022-</span>07-23(토)
                      </p>
                      <p class="result"></p>
                      <div class="btn_area">
                        <a class="btn_is" href="#">
                          이슈
                        </a>
                        <a class="btn_com" href="#">
                          코멘트
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkReportList;
