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
