import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

@withRouter
@inject('appStore', 'uiStore', 'commuteListStore')
@observer
class CommuteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.changeSearchDate = this.changeSearchDate.bind(this);
    this.submit = this.submit.bind(this);
  }

  init() {
    const { commuteListStore } = this.props;
    commuteListStore.search();
  }

  changeSearchDate(searchDate) {
    const { commuteListStore } = this.props;
    commuteListStore.changeSearchDate(searchDate);
  }

  submit() {
    const { commuteListStore } = this.props;
    commuteListStore.submit();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    let { commuteListStore, uiStore, appStore } = this.props;
    const { profile } = appStore;
    const { dept_name } = profile;
    let { displaySideMenu } = uiStore;
    let { list, searchDate, commuteDeptSubmitInfo } = commuteListStore;

    list = toJS(list);

    commuteDeptSubmitInfo = commuteDeptSubmitInfo || {};
    let { commuteSubmitStatusCode, commuteSubmitStatusCodeName } =
      commuteDeptSubmitInfo;

    let listComponent = (
      <li style={{ textAlign: 'center' }}>
        {' '}
        일일출퇴근 정보가 존재하지않습니다.
      </li>
    );
    if (list.length) {
      listComponent = list.map((listInfo) => {
        const {
          userName,
          positionTitle,
          workStatusCodeName,
          workResultCodeName,
          startWorkDate,
          finalStartWorkDate,
          outWorkDate,
          finalOutWorkDate,
          baseDateStr,
          userId,
          inWorkYn
        } = listInfo;

        // 출근시작시간 추출
        let startWorkDateCellResult = '';
        if (!startWorkDate && !finalStartWorkDate) {
          startWorkDateCellResult = '';
        } else if (startWorkDate) {
          if (finalStartWorkDate) {
            startWorkDateCellResult =
              moment(finalStartWorkDate).format('HH:mm') +
              '(' +
              moment(startWorkDate).format('HH:mm') +
              ')';
          } else {
            startWorkDateCellResult = moment(startWorkDate).format('HH:mm');
          }
        } else if (finalStartWorkDate) {
          startWorkDateCellResult =
            moment(finalStartWorkDate).format('HH:mm') + '()';
        }

        // 퇴근종료시간 추출
        let outWorkDateCellResult = '';
        if (!outWorkDate && !finalOutWorkDate) {
          outWorkDateCellResult = '';
        } else if (outWorkDate) {
          if (finalOutWorkDate) {
            outWorkDateCellResult =
              moment(finalOutWorkDate).format('HH:mm') +
              '(' +
              moment(outWorkDate).format('HH:mm') +
              ')';
          } else {
            outWorkDateCellResult = moment(outWorkDate).format('HH:mm');
          }
        } else if (finalOutWorkDate) {
          outWorkDateCellResult =
            moment(finalOutWorkDate).format('HH:mm') + '()';
        }

        let inWorkYnComponent = '';
        if (inWorkYn) {
          if (inWorkYn === 'Y') {
            inWorkYnComponent = <span class="blue">업무</span>;
          } else if (inWorkYn === 'N') {
            inWorkYnComponent = <span class="orange">재택</span>;
          }
        }
        return (
          <li
            onClick={() =>
              uiStore.goPage(`commute-depts/${baseDateStr}/${userId}/form`)
            }
          >
            <div>
              {inWorkYnComponent}
              <span class="block">
                {userName} {positionTitle}
              </span>
            </div>
            <div class="date">
              {' '}
              {startWorkDateCellResult}{' '}
              <em class="block">~ {outWorkDateCellResult}</em>
            </div>
            <div class="disc">
              {workStatusCodeName}
              <span class="block">{workResultCodeName}</span>
            </div>
          </li>
        );
      });
    }
    if (!commuteSubmitStatusCode) {
      commuteSubmitStatusCodeName = '제출전';
    }

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
                  <h4>{dept_name}</h4>
                  <div class="search flex_sb">
                    <div>
                      <p class="date">
                        <div style={{ display: 'inline-block' }}>
                          <DatePicker
                            selected={searchDate}
                            onChange={this.changeSearchDate}
                            className="wd150"
                            dateFormat="yyyy년 M월 dd일"
                          />
                        </div>{' '}
                        {/* <span class="block">2022년</span>7월 28일 */}
                      </p>
                      <a href="javascript:void(0);" class="btn_calendar">
                        <img
                          src={`${process.env.RESOURCE_URL}/images/btn_modify_month.png`}
                          alt="월 선택하기"
                        />
                      </a>
                    </div>
                    <a
                      href="javascript:void(0);"
                      class="com_btn btn_blue mglt10"
                      onClick={this.submit}
                    >
                      {commuteSubmitStatusCodeName}
                    </a>
                  </div>
                </div>

                <div class="mgtop10">
                  <div>
                    <ul class="work_result_list">{listComponent}</ul>
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
