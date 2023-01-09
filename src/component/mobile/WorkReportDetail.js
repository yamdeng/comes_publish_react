import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import Helper from 'util/Helper';
import Switch from 'react-switch';

@withRouter
@inject('appStore', 'uiStore', 'workReportDetailStore')
@observer
class WorkReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.changeIssueYn = this.changeIssueYn.bind(this);
  }

  init() {}

  onCopy() {
    Helper.toastMessage('업무 보고가 복사되었습니다.');
  }

  changeIssueYn(value) {
    const { workReportDetailStore } = this.props;
    workReportDetailStore.changeIssueYn(value ? 'Y' : 'N');
  }

  componentDidMount() {
    let baseDateStr = this.props.match.params.baseDateStr;
    let deptId = this.props.match.params.deptId;
    const { workReportDetailStore } = this.props;
    workReportDetailStore.getReportDetailInfo(baseDateStr, deptId);
  }

  render() {
    let { workReportDetailStore, uiStore } = this.props;
    let { reportDetailInfo, issueYn } = workReportDetailStore;
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
              <h1 class="m_title">업무보고 보기</h1>
              <a
                class="back"
                href="javascript:void(0);"
                onClick={() => uiStore.goPage('/reports', true)}
              ></a>
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
                <CopyToClipboard onCopy={this.onCopy} text={reportContent}>
                  <a href="javascript:void(0);" class="btn_ico">
                    <img
                      src={`${process.env.RESOURCE_URL}/images/btn_list.png`}
                      alt=""
                    />
                  </a>
                </CopyToClipboard>

                <a
                  href="javascript:void(0);"
                  class="btn_ico"
                  onClick={() =>
                    uiStore.goPage(
                      '/reports/' + baseDateStr + '/' + deptId + '/form'
                    )
                  }
                >
                  <img
                    src={`${process.env.RESOURCE_URL}/images/btn_modify.png`}
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
                  <div>
                    <div class="btn_area">
                      <a
                        className={
                          issueYn === 'Y' ? 'active btn_is' : ' btn_is'
                        }
                        href="javascript:void(0);"
                      >
                        이슈
                      </a>
                      <a
                        href="javascript:void(0);"
                        className={commentCount ? 'active btn_com' : ' btn_com'}
                      >
                        코멘트
                      </a>
                    </div>
                  </div>
                </div>
                <div class="border-top mgtop10">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: reportContent
                    }}
                    style={{
                      height: 500,
                      border: '1px solid #d6d6d6',
                      padding: 5,
                      overflowY: 'scroll'
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkReportDetail;
