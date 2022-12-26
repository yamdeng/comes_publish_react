/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';

/*
  
  개인 출퇴근 store

*/

class WorkReportStore {
  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = null;

  // 검색 기간 유형
  @observable
  searchDateType = '';

  // 검색 월
  @observable
  searchMonth = '';

  // 검색 일
  @observable
  searchDate = '';

  // 기간 검색 시작일
  @observable
  startDate = '';

  // 기간 검색 종료일
  @observable
  endDate = '';

  // 대시보드 검색 유형 : 업무보고(''), 제출(SUBMIT), 미제출(NOT_SUBMIT), 이슈(ISSUE), 코멘트(COMMENT)
  @observable
  searchDashBoardKind = '';

  // 일 datepicker 오픈 여부
  @observable
  dayDatepickerOpend = false;

  // 월 datepicker 오픈 여부
  @observable
  monthDatepickerOpend = false;

  // 기간 시작일 datepicker 오픈 여부
  @observable
  startDatepickerOpend = false;

  // 기간 종료일 datepicker 오픈 여부
  @observable
  endDatepickerOpend = false;

  // 가이드 문구 show / hide
  @observable
  visibleGuideText = false;

  // totalCount
  @observable
  totalCount = 0;

  // 통계현황
  @observable
  statsInfo = null;

  // 하위 실 선택 정보
  @observable
  selectedSilDeptKey = 'ALL';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datepicker 종류 변경
  @action
  changeSearchDateType(searchDateType) {
    // 최초 진입시 init에서 호출해줘야 함
    this.searchDateType = searchDateType;
    this.dayDatepickerOpend = false;
    this.monthDatepickerOpend = false;
    this.startDatepickerOpend = false;
    this.endDatepickerOpend = false;
    this.search();
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchMonth = moment().toDate();
    this.searchDate = moment().toDate();
    this.endDate = moment().toDate();
    this.startDate = moment().subtract(1, 'months').toDate();
  }

  // [조회] 공통
  @action
  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    this.getStatsSearch();
    const searchDateType = this.searchDateType;
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const searchDashBoardKind = this.searchDashBoardKind;
    const selectedSilDeptKey = this.selectedSilDeptKey;

    const apiParam = {};

    // 페이지 타입에 따라 기본 파라미터값 적용
    if (reactPageType === 'WorkReportDeptApp') {
      // 팀원 출퇴근
      apiParam.deptId = profile.dept_key;
    } else if (reactPageType === 'WorkReportHeadApp') {
      // 실원 출퇴근
      const selectedChildDeptIdList =
        appStore.getChildDeptListByUpperKey(selectedSilDeptKey);
      apiParam.childDeptIdList = selectedChildDeptIdList.map(
        (deptInfo) => deptInfo.deptKey
      ) || ['xxx'];
    }

    // 날짜 유형에 따른 검색 조건 처리
    if (searchDateType === Constant.SEARCH_DATE_TYPE_DAY) {
      apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      apiParam.startDateStr = Helper.dateToString(this.startDate, 'YYYYMMDD');
      apiParam.endDateStr = Helper.dateToString(this.endDate, 'YYYYMMDD');
    }

    // 대시보드 통계 선택시 검색 조건 처리
    if (searchDashBoardKind) {
      apiParam.searchKind = searchDashBoardKind;
    }

    const store = new CustomStore({
      load(loadOptions) {
        if (loadOptions) {
          const { skip, take } = loadOptions;
          if (take) {
            apiParam.pageSize = take;
            apiParam.offset = skip;
          } else {
            apiParam.pageSize = 10;
            apiParam.offset = 0;
          }
        }
        return ApiService.post('work-reports/list.do', apiParam).then(
          (response) => {
            const data = response.data;
            runInAction(() => {
              this.totalCount = data.totalCount;
            });
            return {
              data: data.list,
              totalCount: data.totalCount
            };
          }
        );
      }
    });
    this.datagridStore = store;
  }

  // 통계 공통 조회
  @action
  getStatsSearch() {
    const apiParam = {};

    const searchDateType = this.searchDateType;
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const selectedSilDeptKey = this.selectedSilDeptKey;

    // 페이지 타입에 따라 기본 파라미터값 적용
    if (reactPageType === 'WorkReportDeptApp') {
      // 팀원 출퇴근
      apiParam.deptId = profile.dept_key;
    } else if (reactPageType === 'WorkReportHeadApp') {
      // 실원 출퇴근
      const selectedChildDeptIdList =
        appStore.getChildDeptListByUpperKey(selectedSilDeptKey);
      apiParam.childDeptIdList = selectedChildDeptIdList.map(
        (deptInfo) => deptInfo.deptKey
      ) || ['xxx'];
    }

    // 날짜 유형에 따른 검색 조건 처리
    if (searchDateType === Constant.SEARCH_DATE_TYPE_DAY) {
      apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      apiParam.startDateStr = Helper.dateToString(this.startDate, 'YYYYMMDD');
      apiParam.endDateStr = Helper.dateToString(this.endDate, 'YYYYMMDD');
    }

    ApiService.post('work-reports/stats.do', apiParam).then((response) => {
      const statsList = response.data || [];
      runInAction(() => {
        const statsInfo = {};
        statsInfo.all = _.find(statsList, { kind: 'all' }).aggCount;
        statsInfo.submit = _.find(statsList, {
          kind: 'submit'
        }).aggCount;
        statsInfo.report_not_submit = _.find(statsList, {
          kind: 'report_not_submit'
        }).aggCount;
        statsInfo.report_issue = _.find(statsList, {
          kind: 'report_issue'
        }).aggCount;
        statsInfo.comment = _.find(statsList, { kind: 'comment' }).aggCount;
        this.statsInfo = statsInfo;
      });
    });
  }

  // 초기화해서 조회
  @action
  initSearch() {
    // 전체 조회
    this.searchDashBoardKind = '';
    this.search();
  }

  // 대시보드 선택시 바로 조회되게끔
  @action
  changeSearchDashBoardKind(searchDashBoardKind) {
    if (this.searchDashBoardKind === searchDashBoardKind) {
      this.searchDashBoardKind = '';
    } else {
      this.searchDashBoardKind = searchDashBoardKind;
    }
    this.search();
  }

  @action
  toggleVisibleGuideText() {
    if (this.visibleGuideText) {
      this.visibleGuideText = false;
    } else {
      this.visibleGuideText = true;
    }
  }

  @action
  hideVisibleGuideText() {
    this.visibleGuideText = false;
  }

  /* 월 datepicker 처리 start */
  // 월 datepicker 오픈
  @action
  openMonthDatepicker() {
    this.monthDatepickerOpend = true;
  }

  // 월 datepicker 닫기
  @action
  closeMonthDatepicker() {
    this.monthDatepickerOpend = false;
  }

  // 월 datepicker 변경
  @action
  changeSearchMonth(searchMonth) {
    this.searchMonth = searchMonth;
    this.monthDatepickerOpend = false;
  }

  // 다음월
  @action
  nextMonth() {
    this.searchMonth = moment(this.searchMonth).add(1, 'months').toDate();
    this.search();
  }

  // 이전월
  @action
  prevMonth() {
    this.searchMonth = moment(this.searchMonth).subtract(1, 'months').toDate();
    this.search();
  }
  /* 월 datepicker 처리 end */

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
  }

  // 다음일
  @action
  nextDay() {
    this.searchDate = moment(this.searchDate).add(1, 'days').toDate();
    this.search();
  }

  // 이전일
  @action
  prevDay() {
    this.searchDate = moment(this.searchDate).subtract(1, 'days').toDate();
    this.search();
  }
  /* 일 datepicker 처리 end */

  /* 시작일 datepicker 처리 start */
  // 시작일 datepicker 오픈
  @action
  openStartDatepicker() {
    this.startDatepickerOpend = true;
    this.endDatepickerOpend = false;
  }

  // 시작일 datepicker 닫기
  @action
  closeStartDatepicker() {
    this.startDatepickerOpend = false;
  }

  // 시작일 datepicker 변경
  @action
  changeStartDate(startDate) {
    this.startDate = startDate;
    let startDiffDays = moment(moment(startDate).format('YYYYMMDD')).diff(
      moment(moment(this.endDate).format('YYYYMMDD')),
      'days'
    );
    if (startDiffDays > 0) {
      this.endDate = startDate;
    }
    // 종료일이 시작일보다 작으면 시작일로 변경
    this.startDatepickerOpend = false;
  }
  /* 시작일 datepicker 처리 end */

  /* 종료일 datepicker 처리 start */
  // 종료일 datepicker 오픈
  @action
  openEndDatepicker() {
    this.endDatepickerOpend = true;
    this.startDatepickerOpend = false;
  }

  // 종료일 datepicker 닫기
  @action
  closeEndDatepicker() {
    this.endDatepickerOpend = false;
  }

  // 종료일 datepicker 변경
  @action
  changeEndDate(endDate) {
    this.endDate = endDate;
    let endDiffDays = moment(moment(endDate).format('YYYYMMDD')).diff(
      moment(moment(this.startDate).format('YYYYMMDD')),
      'days'
    );
    if (endDiffDays < 0) {
      this.startDate = endDate;
    }
    this.endDatepickerOpend = false;
  }
  /* 종료일 datepicker 처리 end */

  // 하위실 콤보 변경
  @action
  changeSilDept(silDeptKey) {
    this.selectedSilDeptKey = silDeptKey;
    this.search();
  }

  @action
  clear() {}
}

export default WorkReportStore;
