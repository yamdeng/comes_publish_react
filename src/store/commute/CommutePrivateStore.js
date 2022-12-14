/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import ModalService from 'service/ModalService';

/*
  
  개인 출퇴근 store

*/

class CommutePrivateStore {
  // datagridRef
  dataGridRef = null;

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

  // 대시보드 검색 유형 : 상태코드, 지각여부(tardyYn), 휴가여부(vacationYn), 출근미체크(notStartWorkYn), 퇴근미체크(notOutWorkYn)
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

  // 오늘 일일 출퇴근 정보
  @observable
  todayCommuteDayInfo = null;

  // 해당 월의 출퇴근 현황 : 개인 통계
  @observable
  privateMonthStatsList = [];

  // 회사안 업무 여부 : Y / N
  @observable
  inWorkYn = 'Y';

  // 가이드 문구 show / hide
  @observable
  visibleGuideText = false;

  // 가이드 문구2 show / hide
  @observable
  visibleGuideText2 = false;

  // totalCount
  @observable
  totalCount = 0;

  // 해당 일의 출퇴근 현황 : 팀원 통계 (팀장 사용)
  @observable
  manageDayStatsInfo = null;

  // 해당 월의 팀원 출퇴근 현황(월, 기간 2개 모두 사용) 사용자(LIST) : 팀원 통계 (팀장 사용)
  @observable
  managerMonthStatsUserList = [];

  // 하위 실 선택 정보
  @observable
  selectedSilDeptKey = 'ALL';

  // 실원 간단 통계(월, 기간 2개 모두 사용
  @observable
  headSimpleStatsInfo = null;

  // 해당 월의 실원 출퇴근 현황(월, 기간 2개 모두 사용) 사용자(LIST) : 실원 통계 (실장 사용)
  @observable
  headMonthStatsUserList = [];

  // 조건 검색
  @observable
  workTimeKind = '';

  // 공휴일 여부 : 검색시 사용
  @observable
  searchHolidayYn = 'N';

  // 근무결과 : 검색시 사용
  @observable
  searchWorkResultCode = '';

  // 사용자 이름
  @observable
  searchUserName = '';

  // 부서명 이름
  @observable
  searchDeptName = '';

  @action
  changeSearchDeptName(searchDeptName) {
    this.searchDeptName = searchDeptName;
  }

  @action
  changeSearchHolidayYn(searchHolidayYn) {
    this.searchHolidayYn = searchHolidayYn;
  }

  @action
  changeSearchWorkResultCode(searchWorkResultCode) {
    this.searchWorkResultCode = searchWorkResultCode;
    this.search();
  }

  @action
  changeSearchUserName(searchUserName) {
    this.searchUserName = searchUserName;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datagrid 컴포넌트 셋팅
  initDataGridComponent(dataGridRef) {
    this.dataGridRef = dataGridRef;
  }

  // pageIndex 초기화
  refreshPage() {
    if (
      this.dataGridRef &&
      this.dataGridRef.current &&
      this.dataGridRef.current.instance &&
      this.dataGridRef.current.instance.pageIndex
    ) {
      this.dataGridRef.current.instance.pageIndex(0);
    }
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
    this.searchDashBoardKind = '';
    this.search();
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchMonth = moment().toDate();
    this.searchDate = moment().toDate();
    this.endDate = moment().toDate();
    this.startDate = moment().subtract(30, 'days').toDate();
  }

  @action
  changeInWorkYn(inWorkYn) {
    this.inWorkYn = inWorkYn;
  }

  // 오늘 근무정보 가져오기
  @action
  getTodayCommuteDayInfo() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      baseDateStr: moment().format('YYYYMMDD')
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    ApiService.post('commutes/detail.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.todayCommuteDayInfo = detailInfo;
        if (detailInfo && detailInfo.workStatusCode) {
          if (detailInfo.workStatusCode === 'ING') {
            this.inWorkYn = 'Y';
          } else {
            this.inWorkYn = 'N';
          }
        }
      });
    });
  }

  // [출근] 액션
  @action
  startWork() {
    const profile = this.rootStore.appStore.profile;
    const todayCommuteDayInfo = this.todayCommuteDayInfo;
    const inWorkYn = this.inWorkYn;

    if (todayCommuteDayInfo && todayCommuteDayInfo.startWorkDate) {
      // Helper.toastMessage('이미 출근 체크를 진행하였습니다.', '', 'warning');
      return;
    }

    let baseDateStr = Helper.getTodayString();
    if (todayCommuteDayInfo) {
      baseDateStr = todayCommuteDayInfo.baseDateStr;
    }

    const apiParam = {
      inWorkYn: inWorkYn,
      baseDateStr: baseDateStr,
      userId: profile.user_key
    };

    let confirmMessage =
      '출근 체크를 하시겠습니까?' +
      (this.inWorkYn === 'Y' ? '(업무)' : '(재택)');

    ModalService.confirm({
      content: confirmMessage,
      ok: () => {
        ApiService.put('commutes/startWork.do', apiParam).then((response) => {
          const detailInfo = response.data;
          Helper.toastMessage('출근 체크를 완료하였습니다.');
          runInAction(() => {
            this.todayCommuteDayInfo = detailInfo;
            this.search();
          });
        });
      }
    });
  }

  // [퇴근] 액션
  @action
  outWork() {
    const profile = this.rootStore.appStore.profile;
    const todayCommuteDayInfo = this.todayCommuteDayInfo;
    const apiParam = {
      baseDateStr: todayCommuteDayInfo.baseDateStr
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    if (todayCommuteDayInfo && todayCommuteDayInfo.outWorkDate) {
      // Helper.toastMessage('이미 퇴근 체크를 진행하였습니다.', '', 'warning');
      return;
    }
    if (!todayCommuteDayInfo || !todayCommuteDayInfo.startWorkDate) {
      Helper.toastMessage(
        '퇴근은 체크는 출근을 먼저 체크해야합니다.',
        '',
        'warning'
      );
      return;
    }
    let confirmMessage = '퇴근 체크를 하시겠습니까?';
    ModalService.confirm({
      content: confirmMessage,
      ok: () => {
        ApiService.put('commutes/outWork.do', apiParam).then((response) => {
          const detailInfo = response.data;
          Helper.toastMessage('퇴근 체크를 완료하였습니다.');
          runInAction(() => {
            this.todayCommuteDayInfo = detailInfo;
            this.search();
          });
        });
      }
    });
  }

  // 철야를 하였을 경우 퇴근 처리
  @action
  workOutNextDay(commuteDayInfo) {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      baseDateStr: commuteDayInfo.baseDateStr
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    if (commuteDayInfo && commuteDayInfo.outWorkDate) {
      Helper.toastMessage('이미 퇴근 체크를 진행하였습니다.', '', 'warning');
      return;
    }
    if (!commuteDayInfo || !commuteDayInfo.startWorkDate) {
      Helper.toastMessage(
        '퇴근은 체크는 출근을 먼저 체크해야합니다.',
        '',
        'warning'
      );
      return;
    }
    let confirmMessage = '퇴근 체크를 하시겠습니까?';
    ModalService.confirm({
      content: confirmMessage,
      ok: () => {
        ApiService.put('commutes/outWork.do', apiParam).then((response) => {
          Helper.toastMessage('퇴근 체크를 완료하였습니다.');
          runInAction(() => {
            this.search();
          });
        });
      }
    });
  }

  // [조회] 공통
  @action
  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    this.refreshPage();
    this.getStatsSearch();
    const searchDateType = this.searchDateType;
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const searchDashBoardKind = this.searchDashBoardKind;
    const selectedSilDeptKey = this.selectedSilDeptKey;
    const holidayYn = this.searchHolidayYn;
    const userName = this.searchUserName;
    const deptName = this.searchDeptName;
    const workResultCode = this.searchWorkResultCode;

    const apiParam = {
      holidayYn: holidayYn,
      userName: userName ? userName : null,
      deptName: deptName ? deptName : null,
      workResultCode: workResultCode ? workResultCode : null
    };

    // 페이지 타입에 따라 기본 파라미터값 적용
    if (reactPageType === 'CommutePrivateApp') {
      // 개인 출퇴근
      apiParam.userId = profile.user_key;
    } else if (reactPageType === 'CommuteDeptApp') {
      // 팀원 출퇴근
      apiParam.deptKey = profile.dept_key;
    } else if (reactPageType === 'CommuteHeadApp') {
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
      if (searchDashBoardKind === 'tardyYn') {
        apiParam.tardyYn = 'Y';
      } else if (searchDashBoardKind === 'vacationYn') {
        apiParam.vacationYn = 'Y';
      } else if (searchDashBoardKind === 'notStartWorkYn') {
        apiParam.notStartWorkYn = 'Y';
      } else if (searchDashBoardKind === 'notOutWorkYn') {
        apiParam.notOutWorkYn = 'Y';
      } else {
        apiParam.workStatusCode = searchDashBoardKind;
      }
    }

    const store = new CustomStore({
      load: (loadOptions) => {
        if (loadOptions) {
          const { skip, take } = loadOptions;
          if (take) {
            apiParam.pageSize = take;
            apiParam.offset = skip;
          } else {
            apiParam.pageSize = null;
            apiParam.offset = null;
          }
        }
        return ApiService.post('commutes/list.do', apiParam).then(
          (response) => {
            const data = response.data;
            runInAction(() => {
              this.totalCount = data.totalCount;
            });
            let searchList = data.list || [];
            searchList.forEach((searchInfo) => {
              if (searchInfo.startWorkDate) {
                searchInfo.startWorkDate = moment(
                  searchInfo.startWorkDate
                ).toDate();
              }
              if (searchInfo.outWorkDate) {
                searchInfo.outWorkDate = moment(
                  searchInfo.outWorkDate
                ).toDate();
              }
              if (searchInfo.finalStartWorkDate) {
                searchInfo.finalStartWorkDate = moment(
                  searchInfo.finalStartWorkDate
                ).toDate();
              }
              if (searchInfo.finalOutWorkDate) {
                searchInfo.finalOutWorkDate = moment(
                  searchInfo.finalOutWorkDate
                ).toDate();
              }
            });
            return {
              data: searchList,
              totalCount: data.totalCount
            };
          }
        );
      }
    });
    this.datagridStore = store;
  }

  // 초기화해서
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

  @action
  toggleVisibleGuideText2() {
    if (this.visibleGuideText2) {
      this.visibleGuideText2 = false;
    } else {
      this.visibleGuideText2 = true;
    }
  }

  @action
  hideVisibleGuideText2() {
    this.visibleGuideText2 = false;
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
    this.search();
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
    this.search();
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
    let startDiffDays = moment(moment(startDate).format('YYYYMMDD')).diff(
      moment(moment(this.endDate).format('YYYYMMDD')),
      'days'
    );
    if (Math.abs(startDiffDays) > 31) {
      alert('조회 기간은 1개월을 초과할 수 없습니다.');
      return;
    }
    this.startDate = startDate;
    // 종료일이 시작일보다 작으면 시작일로 변경
    if (startDiffDays > 0) {
      this.endDate = startDate;
    }
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
    let endDiffDays = moment(moment(endDate).format('YYYYMMDD')).diff(
      moment(moment(this.startDate).format('YYYYMMDD')),
      'days'
    );
    if (Math.abs(endDiffDays) > 31) {
      alert('조회 기간은 1개월을 초과할 수 없습니다.');
      return;
    }
    this.endDate = endDate;
    if (endDiffDays < 0) {
      this.startDate = endDate;
    }
    this.endDatepickerOpend = false;
  }
  /* 종료일 datepicker 처리 end */

  // 통계 공통 조회
  @action
  getStatsSearch() {
    if (reactPageType === 'CommutePrivateApp') {
      this.getPrivateMonthStatsList();
    } else if (reactPageType === 'CommuteDeptApp') {
      this.getManagerStatsSearch();
    } else if (reactPageType === 'CommuteHeadApp') {
      this.getHeadStatsSearch();
    }
  }

  // 선택한 월의 출퇴근 현황 정보 가져오기 : 개인 통계
  @action
  getPrivateMonthStatsList() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      inWorkYn: this.inWorkYn,
      userId: profile.user_key
    };
    apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    ApiService.post('commutes/stats/private.do', apiParam).then((response) => {
      runInAction(() => {
        this.privateMonthStatsList = response.data || [];
      });
    });
  }

  // 팀장의 통계 조회하기
  @action
  getManagerStatsSearch() {
    const searchDateType = this.searchDateType;
    if (searchDateType === Constant.SEARCH_DATE_TYPE_DAY) {
      this.getManagerDayStatsList();
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      this.getManagerMonthStatsList();
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      this.getManagerMonthStatsList();
    }
  }

  // 해당 일의 출퇴근 현황 : 팀원 통계 (팀장, 실장 사용)
  @action
  getManagerDayStatsList() {
    // ing, home_ing, vacation_afternoon, vacation_morning, end, tardy, vacation
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const apiParam = {};
    const selectedSilDeptKey = this.selectedSilDeptKey;
    apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');

    if (reactPageType === 'CommuteDeptApp') {
      // 팀원 출퇴근
      apiParam.deptKey = profile.dept_key;
    } else if (reactPageType === 'CommuteHeadApp') {
      // 실원 출퇴근
      const selectedChildDeptIdList =
        appStore.getChildDeptListByUpperKey(selectedSilDeptKey);
      apiParam.childDeptIdList = selectedChildDeptIdList.map(
        (deptInfo) => deptInfo.deptKey
      ) || ['xxx'];
    }

    ApiService.post('commutes/stats/manager-day.do', apiParam).then(
      (response) => {
        const statsList = response.data || [];
        runInAction(() => {
          const manageDayStatsInfo = {};
          manageDayStatsInfo.ing = _.find(statsList, { kind: 'ing' }).aggCount;
          manageDayStatsInfo.home_ing = _.find(statsList, {
            kind: 'home_ing'
          }).aggCount;
          manageDayStatsInfo.vacation_afternoon = _.find(statsList, {
            kind: 'vacation_afternoon'
          }).aggCount;
          manageDayStatsInfo.vacation_morning = _.find(statsList, {
            kind: 'vacation_morning'
          }).aggCount;
          manageDayStatsInfo.end = _.find(statsList, { kind: 'end' }).aggCount;
          manageDayStatsInfo.tardy = _.find(statsList, {
            kind: 'tardy'
          }).aggCount;
          manageDayStatsInfo.vacation = _.find(statsList, {
            kind: 'vacation'
          }).aggCount;
          this.manageDayStatsInfo = manageDayStatsInfo;
        });
      }
    );
  }

  // 해당 월, 기간의 출퇴근 현황 : 팀원 통계 (팀장 사용)
  @action
  getManagerMonthStatsList() {
    // success_commute_count, tardy_commute_count, vacation_count
    const profile = this.rootStore.appStore.profile;
    const searchDateType = this.searchDateType;
    const apiParam = {};
    apiParam.deptKey = profile.dept_key;
    if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      apiParam.startDateStr = Helper.dateToString(this.startDate, 'YYYYMMDD');
      apiParam.endDateStr = Helper.dateToString(this.endDate, 'YYYYMMDD');
    }
    ApiService.post('commutes/stats/manager-month.do', apiParam).then(
      (response) => {
        const list = response.data || [];
        runInAction(() => {
          this.managerMonthStatsUserList = list;
        });
      }
    );
  }

  // 하위실 콤보 변경
  @action
  changeSilDept(silDeptKey) {
    this.selectedSilDeptKey = silDeptKey;
    this.search();
  }

  // 실원 통계 (실장 사용)
  @action
  getHeadStatsSearch() {
    const searchDateType = this.searchDateType;
    if (searchDateType === Constant.SEARCH_DATE_TYPE_DAY) {
      this.getManagerDayStatsList();
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      this.getHeadMonthStatsList();
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      this.getHeadMonthStatsList();
    }
  }

  @action
  getHeadMonthStatsList() {
    // success_commute_count, tardy_commute_count, vacation_count
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const searchDateType = this.searchDateType;
    const selectedSilDeptKey = this.selectedSilDeptKey;
    const apiParam = {};
    apiParam.deptKey = profile.dept_key;
    if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      apiParam.startDateStr = Helper.dateToString(this.startDate, 'YYYYMMDD');
      apiParam.endDateStr = Helper.dateToString(this.endDate, 'YYYYMMDD');
    }
    const selectedChildDeptIdList =
      appStore.getChildDeptListByUpperKey(selectedSilDeptKey);
    apiParam.childDeptIdList = selectedChildDeptIdList.map(
      (deptInfo) => deptInfo.deptKey
    ) || ['xxx'];

    ApiService.post('commutes/stats/header-month.do', apiParam).then(
      (response) => {
        const list = response.data || [];
        runInAction(() => {
          this.headMonthStatsUserList = list;
        });
      }
    );
    ApiService.post('commutes/stats/header-simple.do', apiParam).then(
      (response) => {
        const statsList = response.data || [];
        runInAction(() => {
          const headSimpleStatsInfo = {};
          headSimpleStatsInfo.tardy = _.find(statsList, {
            kind: 'tardy'
          }).aggCount;
          headSimpleStatsInfo.vacation = _.find(statsList, {
            kind: 'vacation'
          }).aggCount;
          this.headSimpleStatsInfo = headSimpleStatsInfo;
        });
      }
    );
  }

  // 조건 검색 변경
  @action
  changeWorkTimeKind(workTimeKind) {
    this.workTimeKind = workTimeKind;
    this.search();
  }

  @action
  clear() {}
}

export default CommutePrivateStore;
