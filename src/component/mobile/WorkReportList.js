import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'uiStore', 'workReportListStore')
@observer
class WorkReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.changeSearchMonth = this.changeSearchMonth.bind(this);
    this.openDayDatepicker = this.openDayDatepicker.bind(this);
  }

  changeSearchMonth(searchMonth) {
    const { workReportListStore } = this.props;
    workReportListStore.changeSearchMonth(searchMonth);
  }

  openDayDatepicker() {
    const { workReportListStore } = this.props;
    workReportListStore.openDayDatepicker();
  }

  init() {
    const { workReportListStore } = this.props;
    workReportListStore.search();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { workReportListStore, uiStore, appStore } = this.props;
    const { profile } = appStore;
    const { dept_name } = profile;
    let { displaySideMenu } = uiStore;
    let { list, searchMonth } = workReportListStore;

    let listComponent = (
      <li style={{ textAlign: 'center' }}>
        {' '}
        업무보고 정보가 존재하지않습니다.
      </li>
    );
    if (list.length) {
      listComponent = list.map((listInfo) => {
        const {
          deptId,
          baseDateStr,
          reportDate,
          reportSubmitStatusCode,
          issueYn,
          commentCount
        } = listInfo;
        const baseYear = moment(baseDateStr).format('YYYY');
        const postFixDateStr = moment(baseDateStr).format('MM-DD(ddd)');
        let reportSubmitStatusCodeResult = '-';
        if (!reportDate && reportSubmitStatusCode === 'NOT_SUBMIT') {
          reportSubmitStatusCodeResult = '미제출';
        } else if (reportDate) {
          reportSubmitStatusCodeResult =
            moment(reportDate).format('YYYY-MM-DD HH:mm');
        }
        const weekday = moment(baseDateStr).isoWeekday();
        let dateClass = classnames('date', {
          red: weekday === 7 ? true : false,
          blue: weekday === 6 ? true : false
        });
        return (
          <li
            class="flex_sb"
            onClick={() =>
              uiStore.goPage(`reports/${baseDateStr}/${deptId}/detail`)
            }
          >
            <p class={dateClass}>
              <span class="block">{baseYear}-</span>
              {postFixDateStr}
            </p>
            <p class="result">
              <a href="javascript:void(0);">{reportSubmitStatusCodeResult}</a>
            </p>
            <div class="btn_area">
              <a
                className={issueYn === 'Y' ? 'active btn_is' : ' btn_is'}
                href="javascript:void(0);"
              >
                이슈
              </a>
              <a
                className={commentCount ? 'active btn_com' : ' btn_com'}
                href="javascript:void(0);"
              >
                코멘트
              </a>
            </div>
          </li>
        );
      });
    }
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
                  <h4>{dept_name}</h4>
                  <div class="search">
                    <p class="date">
                      <div style={{ display: 'inline-block' }}>
                        <DatePicker
                          selected={searchMonth}
                          onChange={this.changeSearchMonth}
                          className="wd120"
                          dateFormat="yyyy년 M월"
                          showMonthYearPicker
                        />
                      </div>{' '}
                    </p>
                    <a href="javascript:void(0);" class="btn_calendar">
                      <img
                        src={`${process.env.RESOURCE_URL}/images/btn_modify_month.png`}
                        alt="월 선택하기"
                      />
                    </a>
                  </div>
                </div>

                <div class="mgtop10">
                  <ul class="work_list">{listComponent}</ul>
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
