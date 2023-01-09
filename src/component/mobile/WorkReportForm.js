import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Switch from 'react-switch';

@withRouter
@inject('appStore', 'uiStore', 'workReportFormStore')
@observer
class WorkReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.changeIssueYn = this.changeIssueYn.bind(this);
    this.saveReport = this.saveReport.bind(this);
  }

  changeIssueYn(value) {
    const { workReportFormStore } = this.props;
    workReportFormStore.changeIssueYn(value ? 'Y' : 'N');
  }

  saveReport() {
    const { workReportFormStore } = this.props;
    workReportFormStore.saveReport();
  }

  init() {}

  componentDidMount() {
    let baseDateStr = this.props.match.params.baseDateStr;
    let deptId = this.props.match.params.deptId;
    const { workReportFormStore } = this.props;
    workReportFormStore.loadEditor(baseDateStr, deptId);
  }

  render() {
    let { workReportFormStore, uiStore } = this.props;
    let { reportDetailInfo, issueYn } = workReportFormStore;
    reportDetailInfo = reportDetailInfo || {};
    let {
      deptId,
      baseDateStr,
      reportContent,
      commentCount,
      reportDate,
      reportSubmitStatusCode
    } = reportDetailInfo;

    const baseYear = moment(baseDateStr).format('YYYY');
    const postFixDateStr = moment(baseDateStr).format('MM-DD(ddd)');
    let reportSubmitStatusCodeResultComponent = '-';
    let reportBaseYear = '';
    if (!reportDate && reportSubmitStatusCode === 'NOT_SUBMIT') {
      reportSubmitStatusCodeResultComponent = '미제출';
    } else if (reportDate) {
      reportBaseYear = moment(reportDate).format('YYYY');
      reportSubmitStatusCodeResultComponent = (
        <>
          <span class="block">{reportBaseYear}-</span>
          {moment(reportDate).format('MM-DD HH:mm')}
        </>
      );
    }

    return (
      <div class="wrap">
        <div class="m_sub_wrap">
          <header>
            <div id="m_header" class="flex_sb">
              <h1 class="m_title">업무보고 작성</h1>
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
                <p>이슈</p>
                <div class="wrapper">
                  <Switch
                    onChange={this.changeIssueYn}
                    checked={issueYn === 'Y'}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </div>
                {/* <a href="javascript:void(0);" class="btn_ico">
                  <img
                    src={`${process.env.RESOURCE_URL}/images/btn_list.png`}
                    alt=""
                  />
                </a> */}
                <a
                  href="javascript:void(0);"
                  class="btn_ico"
                  onClick={this.saveReport}
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
                <div class="m_sub_top flex_sb">
                  <h4>
                    <span class="block">{baseYear}-</span>
                    {postFixDateStr}
                  </h4>
                  <p class="result">{reportSubmitStatusCodeResultComponent}</p>
                </div>

                <div class="border-top mgtop10">
                  <div id="reactEditor"></div>
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
