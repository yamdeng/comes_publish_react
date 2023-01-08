import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'uiStore', 'homeStore')
@observer
class CommuteForm extends Component {
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
            <div id="m_header">
              <h1 class="m_title">출퇴근 수정</h1>
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
                  <img
                    src={`${process.env.RESOURCE_URL}/images/btn_save.png`}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </header>
          <div class="m_content_wrap">
            <div class="m_content_box">
              <div>
                <div class="mgtop10">
                  <div>
                    <ul class="work_result_list">
                      <li>
                        <div>
                          <span class="bold">김소영 대리</span>
                        </div>
                        <div class="date">
                          {' '}
                          09:33 AM <em class="block">~ 18:03 PM</em>
                        </div>
                        <div class="disc">
                          업무종료<span class="block">지각</span>
                        </div>
                      </li>
                    </ul>
                    <div>
                      <ul class="work_info">
                        <li>
                          <span class="title">출근아이피</span>
                          <span>(m)61.75.21.210</span>
                        </li>
                        <li>
                          <span class="title">퇴근아이피</span>
                          <span>(m)61.75.21.210</span>
                        </li>
                        <li>
                          <span class="title">외근</span>
                          <span>N</span>
                        </li>
                        <li>
                          <span class="title">기타설명</span>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <table class="tbl_blue mg_t0">
                        <caption>출퇴근 수정 입력</caption>
                        <colgroup>
                          <col style={{ width: 130 }} />
                          <col />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <label for="sel_workmor">출근시간</label>
                            </th>
                            <td>
                              <input
                                type="text"
                                id="sel_workmor"
                                class="time"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workdi">퇴근시간</label>
                            </th>
                            <td>
                              <input type="text" id="sel_workdi" class="time" />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workop">외근여부</label>
                            </th>
                            <td>
                              <select id="sel_workop" name="" class="w100">
                                <option value="">N</option>
                                <option value="">Y</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workop">기타설명</label>
                            </th>
                            <td>
                              <textarea maxlength="100"></textarea>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workop">근태결과</label>
                            </th>
                            <td>
                              <select id="sel_workop" name="" class="w100">
                                <option value="">정상출근</option>
                                <option value="">정상출근(오전반차)</option>
                                <option value="">정상출근(생일)</option>
                                <option value="">지각</option>
                                <option value="">지각(오후반차)</option>
                                <option value="">연차</option>
                                <option value="">경조휴가</option>
                                <option value="">공가</option>
                                <option value="">대체휴가</option>
                                <option value="">출산휴가</option>
                                <option value="">기타</option>
                                <option value="">일반휴직</option>
                                <option value="">육아휴직</option>
                                <option value="">결근</option>
                                <option value="">기타</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default CommuteForm;
