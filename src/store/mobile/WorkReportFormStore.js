/* global XFE */

import { observable, action, runInAction } from 'mobx';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import ModalService from 'service/ModalService';

class WorkReportFormStore {
  // 에디터
  xfe = null;

  @observable
  reportDetailInfo = null;

  @observable
  commentDetailInfo = null;

  // 이슈여부 : Y/N
  @observable
  issueYn = 'Y';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 에디터 로드
  @action
  loadEditor(baseDateStr, deptId) {
    setTimeout(() => {
      this.xfe = new XFE({
        basePath: Constant.EDITOR_BASE_PATH,
        width: '100%',
        height: '500px',
        onLoad: () => {}
      });
      this.xfe.render('reactEditor');
      this.getReportDetailInfo(baseDateStr, deptId);
    }, 100);
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
        if (this.xfe && this.xfe.setBodyValue) {
          this.xfe.setBodyValue(detailInfo.reportContent);
        }
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

  // 저장
  @action
  saveReport() {
    const reportDetailInfo = this.reportDetailInfo;
    const issueYn = this.issueYn;
    const editerContent = this.xfe.getBodyValue();
    const apiParam = {
      reportContent: editerContent,
      issueYn: issueYn,
      reportId: reportDetailInfo.reportId
    };

    let confirmMessage = '업무보고를 저장하시겠습니까?';
    ModalService.confirm({
      content: confirmMessage,
      ok: () => {
        ApiService.put('work-reports/update.do', apiParam).then((response) => {
          const detailInfo = response.data;
          runInAction(() => {
            this.reportDetailInfo = detailInfo;
          });
          if (reportDetailInfo.reportDate) {
            Helper.toastMessage('업무보고가 수정되었습니다.');
          } else {
            Helper.toastMessage('업무보고가 등록되었습니다.');
          }
        });
      }
    });
  }

  @action
  clear() {
    this.reportDetailInfo = null;
    this.commentDetailInfo = null;
    this.issueYn = 'N';
  }
}

export default WorkReportFormStore;
