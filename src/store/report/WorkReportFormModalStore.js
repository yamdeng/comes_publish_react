/* global reactPageType, XFE */

import { observable, action, runInAction, computed } from 'mobx';
import 'devextreme/data/odata/store';
import moment from 'moment';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

/*
  
  개인 출퇴근 store

*/

class WorkReportFormModalStore {
  // 에디터
  xfe = null;

  // 현재 날짜
  @observable
  searchDate = null;

  // 일 datepicker 오픈 여부
  @observable
  dayDatepickerOpend = false;

  // 모달 visible 여부
  @observable
  visibleModal = false;

  // 상세정보
  @observable
  reportDetailInfo = null;

  // 댓글 정보 : 작성자명, 내용
  @observable
  commentDetailInfo = null;

  // 이슈여부 : Y/N
  @observable
  issueYn = 'N';

  // 업무보고 타겟 대상 부서 목록
  @observable
  targetDeptList = [];

  // 현재 조회중인 부서 index : 0부터 시작
  @observable
  currentDeptIndex = 0;

  // 현재 부서키
  @observable
  currentDeptId = null;

  // 댓글 내용
  @observable
  commentContent = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 저장
  @action
  saveReport(editerContent) {
    const profile = this.rootStore.appStore.profile;
    const issueYn = this.issueYn;
    const baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    const apiParam = {
      reportContent: editerContent,
      issueYn: issueYn,
      baseDateStr: baseDateStr,
      deptId: profile.dept_key
    };
    ApiService.put('work-reports/update.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.reportDetailInfo = detailInfo;
      });
      Helper.toastMessage('등록이 완료되었습니다');
    });
  }

  // 모달 오픈 : 조회 일 기준으로
  @action
  openModal(detailInfo) {
    const { baseDateStr, deptId } = detailInfo;
    this.searchDate = moment(baseDateStr).toDate();
    this.currentDeptId = deptId;
    this.visibleModal = true;

    setTimeout(() => {
      this.xfe = new XFE({
        basePath: Constant.EDITOR_BASE_PATH,
        width: '100%',
        height: '430px',
        onLoad: () => {}
      });
      this.xfe.render('reactEditor');
      this.getReportDetailInfo();
    }, 100);
  }

  @action
  changeIssueYn(issueYn) {
    this.issueYn = issueYn;
  }

  @action
  closeModal() {
    this.visibleModal = false;
  }

  /* 일 datepicker 처리 start */
  // 일 datepicker 오픈
  @action
  openDayDatepicker() {
    this.dayDatepickerOpend = true;
  }

  // 일 datepicker 닫기
  @action
  closeDayDatepicker() {
    this.dayDatepickerOpend = false;
  }

  // 일 datepicker 변경
  @action
  changeSearchDate(searchDate) {
    this.searchDate = searchDate;
    this.dayDatepickerOpend = false;
    this.getReportDetailInfo();
  }

  // 다음일
  @action
  nextDay() {
    this.searchDate = moment(this.searchDate).add(1, 'days').toDate();
    this.getReportDetailInfo();
  }

  // 이전일
  @action
  prevDay() {
    this.searchDate = moment(this.searchDate).subtract(1, 'days').toDate();
    this.getReportDetailInfo();
  }
  /* 일 datepicker 처리 end */

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
          // this.xfe.setBodyValue(detailInfo.reportContent);
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

  @action
  clear() {}
}

export default WorkReportFormModalStore;
