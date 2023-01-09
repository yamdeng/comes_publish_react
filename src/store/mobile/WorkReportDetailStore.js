/* global */

import { observable, action, runInAction } from 'mobx';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';

class WorkReportDetailStore {
  @observable
  reportDetailInfo = null;

  @observable
  commentDetailInfo = null;

  @observable
  issueYn = 'N';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 업무보고 상세정보 가지고 오기
  @action
  getReportDetailInfo(baseDateStr, deptId) {
    const apiParam = {};
    apiParam.baseDateStr = baseDateStr;
    apiParam.deptId = deptId;
    ApiService.post('work-reports/detail.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.reportDetailInfo = detailInfo;
        if (detailInfo && detailInfo.issueYn) {
          this.issueYn = detailInfo.issueYn;
        }
      });
      ApiService.post('work-reports/comment/detail.do', {
        reportId: detailInfo.reportId
      }).then((response) => {
        const commentDetailInfo = response.data;
        runInAction(() => {
          this.commentDetailInfo = commentDetailInfo;
        });
      });
    });
  }

  // 이슈변경
  @action
  changeIssueYn(issueYn) {
    this.issueYn = issueYn;
    const reportDetailInfo = this.reportDetailInfo;
    if (reportDetailInfo) {
      const apiParam = {};
      apiParam.reportId = reportDetailInfo.reportId;
      apiParam.issueYn = issueYn;
      ApiService.put('work-reports/update-issue.do', apiParam).then(
        (response) => {
          Helper.toastMessage(`이슈가 ${issueYn} 상태가 되었습니다.`);
          this.getReportDetailInfo(
            reportDetailInfo.baseDateStr,
            reportDetailInfo.deptId
          );
        }
      );
    }
  }

  // 클립보드 복사
  @action
  copyClipBoard() {}

  @action
  clear() {
    this.reportDetailInfo = null;
    this.commentDetailInfo = null;
  }
}

export default WorkReportDetailStore;
