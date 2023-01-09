import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Code from 'config/Code';
import Helper from 'util/Helper';

@withRouter
@inject('appStore', 'uiStore', 'commuteFormStore')
@observer
class CommuteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.changeFinalStartWorkDate = this.changeFinalStartWorkDate.bind(this);
    this.changeFinalOutWorkDate = this.changeFinalOutWorkDate.bind(this);
    this.changeOutsideWorkYn = this.changeOutsideWorkYn.bind(this);
    this.changeEtcDescription = this.changeEtcDescription.bind(this);
    this.changeWorkResultCode = this.changeWorkResultCode.bind(this);
    this.save = this.save.bind(this);
  }

  changeFinalStartWorkDate(finalStartWorkDate) {
    const { commuteFormStore } = this.props;
    commuteFormStore.changeFinalStartWorkDate(finalStartWorkDate);
  }

  changeFinalOutWorkDate(finalOutWorkDate) {
    const { commuteFormStore } = this.props;
    commuteFormStore.changeFinalOutWorkDate(finalOutWorkDate);
  }

  changeOutsideWorkYn(event) {
    const value = event.target.value;
    const { commuteFormStore } = this.props;
    commuteFormStore.changeOutsideWorkYn(value);
  }

  changeEtcDescription(event) {
    const value = event.target.value;
    const { commuteFormStore } = this.props;
    commuteFormStore.changeEtcDescription(value);
  }

  changeWorkResultCode(event) {
    const value = event.target.value;
    const { commuteFormStore } = this.props;
    commuteFormStore.changeWorkResultCode(value);
  }

  save() {
    const { commuteFormStore } = this.props;
    commuteFormStore.save();
  }

  init() {}

  componentDidMount() {
    let baseDateStr = this.props.match.params.baseDateStr;
    let userId = this.props.match.params.userId;
    const { commuteFormStore } = this.props;
    commuteFormStore.getCommuteDetailInfo(baseDateStr, userId);
  }

  render() {
    let { commuteFormStore, uiStore } = this.props;
    let {
      commuteDetailInfo,
      finalStartWorkDate,
      finalOutWorkDate,
      outsideWorkYn,
      etcDescription,
      workResultCode,
      startWorkIp,
      outWorkIp
    } = commuteFormStore;

    commuteDetailInfo = commuteDetailInfo || {};

    const { userName, positionTitle, workStatusCodeName, workResultCodeName } =
      commuteDetailInfo;

    const startWorkDateCellResult =
      Helper.getStartWorkDateByDetailInfo(commuteDetailInfo);

    const outWorkDateCellResult =
      Helper.getOutWorkDateByDetailInfo(commuteDetailInfo);

    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
      <input
        type="text"
        id="sel_workmor"
        class="time"
        value={value}
        onClick={onClick}
        ref={ref}
      />
    ));

    return (
      <div class="wrap">
        <div class="m_sub_wrap">
          <header>
            <div id="m_header" class="flex_sb">
              <h1 class="m_title">출퇴근 수정</h1>
              <a
                class="hamburger_menu active black"
                href="javascript:void(0);"
                onClick={() => uiStore.back()}
              >
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
              </a>
              <div class="right_area flex">
                <a
                  href="javascript:void(0);"
                  class="btn_ico"
                  onClick={this.save}
                >
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
                          <span class="bold">
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
                          <span>{commuteDetailInfo.outsideWorkYn}</span>
                        </li>
                        <li>
                          <span class="title">기타설명</span>
                          <span>{commuteDetailInfo.etcDescription}</span>
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
                              <DatePicker
                                selected={finalOutWorkDate}
                                onChange={this.changeFinalOutWorkDate}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={5}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                customInput={<ExampleCustomInput />}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workdi">퇴근시간</label>
                            </th>
                            <td>
                              <DatePicker
                                selected={finalStartWorkDate}
                                onChange={this.changeFinalStartWorkDate}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={5}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                customInput={<ExampleCustomInput />}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workop">외근여부</label>
                            </th>
                            <td>
                              <select
                                id="sel_workop"
                                name=""
                                class="w100"
                                onChange={this.changeOutsideWorkYn}
                                value={outsideWorkYn}
                              >
                                {Code.outsideWorkYnCodeList.map((info) => (
                                  <option value={info.value}>
                                    {info.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workop">기타설명</label>
                            </th>
                            <td>
                              <textarea
                                maxlength="100"
                                value={etcDescription}
                                onChange={this.changeEtcDescription}
                              ></textarea>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <label for="sel_workop">근태결과</label>
                            </th>
                            <td>
                              <select
                                id="sel_workop"
                                name=""
                                class="w100"
                                value={workResultCode}
                                onChange={this.changeWorkResultCode}
                              >
                                {Code.workResultCodeList.map((info) => (
                                  <option value={info.value}>
                                    {info.name}
                                  </option>
                                ))}
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
