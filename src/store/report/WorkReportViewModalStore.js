/* global reactPageType, XFE */

import { observable, action, runInAction, computed } from 'mobx';
import 'devextreme/data/odata/store';
import moment from 'moment';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import ModalService from 'service/ModalService';
import WorkReportFormModalStore from './WorkReportFormModalStore';

/*
  
  개인 출퇴근 store

*/

class WorkReportViewModalStore extends WorkReportFormModalStore {
  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  // 모달 오픈 : 조회 일 기준으로
  @action
  openModal(searchDate) {
    this.searchDate = searchDate;
    this.visibleModal = true;
    this.getTargetDeptList();
  }

  @action
  getReportDetailInfo() {
    const deptId = this.currentDeptId;
    const apiParam = {};
    const baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.baseDateStr = baseDateStr;
    apiParam.deptId = deptId;
    ApiService.post('work-reports/detail.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.reportDetailInfo = detailInfo;
        if (this.xfe && this.xfe.setBodyValue) {
          this.xfe.setBodyValue(detailInfo.reportContent);
        }
        this.issueYn = detailInfo.issueYn;
      });
      ApiService.post('work-reports/comment/detail.do', {
        reportId: detailInfo.reportId
      }).then((response) => {
        const commentDetailInfo = response.data;
        runInAction(() => {
          this.commentDetailInfo = commentDetailInfo;
          if (commentDetailInfo) {
            this.commentContent = commentDetailInfo.commentContent;
          } else {
            this.commentContent = '';
          }
        });
      });
    });
  }

  // 업무보고 대상 부서 목록 가져오기
  @action
  getTargetDeptList() {
    const appStore = this.rootStore.appStore;
    const apiParam = {};
    apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    if (reactPageType === 'WorkReportHeadApp') {
      // 실원 출퇴근
      const selectedChildDeptIdList =
        appStore.getChildDeptListByUpperKey('ALL');
      apiParam.childDeptIdList = selectedChildDeptIdList.map(
        (deptInfo) => deptInfo.deptKey
      ) || ['xxx'];
    }
    ApiService.post('work-reports/list.do', apiParam).then((response) => {
      const data = response.data.list;
      runInAction(() => {
        this.targetDeptList = data || [];
        if (data && data.length) {
          this.currentDeptIndex = 0;
          this.currentDeptId = data[0].deptId;
          this.getReportDetailInfo();
        } else {
          this.currentDeptIndex = 0;
          this.currentDeptId = null;
          this.reportDetailInfo = null;
        }
      });
    });
  }

  @action
  saveComment() {
    const workReportStore = this.rootStore.workReportStore;
    const commentDetailInfo = this.commentDetailInfo;
    const reportDetailInfo = this.reportDetailInfo;
    const commentContent = this.commentContent;
    const issueYn = this.issueYn;
    if (commentDetailInfo) {
      // 존재하는 경우는 update
      // 이슈 여부는 항상 저장
      ApiService.put('work-reports/update-issue.do', {
        reportId: reportDetailInfo.reportId,
        issueYn: issueYn
      }).then(() => {
        ApiService.put('work-reports/comment/update.do', {
          commentId: commentDetailInfo.commentId,
          commentContent: commentContent
        }).then(() => {
          Helper.toastMessage('댓글이 저장되었습니다.');
          this.closeModal();
          workReportStore.search();
        });
      });
    } else {
      // 존재 X insert
      ApiService.put('work-reports/update-issue.do', {
        reportId: reportDetailInfo.reportId,
        issueYn: issueYn
      }).then(() => {
        ApiService.post('work-reports/comment/add.do', {
          reportId: reportDetailInfo.reportId,
          commentContent: commentContent
        }).then(() => {
          Helper.toastMessage('댓글이 저장되었습니다.');
          this.closeModal();
          workReportStore.search();
        });
      });
    }
  }

  @action
  clear() {}
}

export default WorkReportViewModalStore;
