import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import ModalService from 'service/ModalService';
import _ from 'lodash';

/*
  
  포탈 전체 store

*/

const getPortalUseBasicScheduleList = function (basicScheduleList) {
  let result = [];
  // 0 ~ 6 : 일 ~ 토
  let weekDayList = [null, null, null, null, null, null, null];
  // for : 1~31일 반복함
  for (let index = 0; index < basicScheduleList.length; index++) {
    // 해당 일에 요일 정보를 가져옴 : 일 ~ 토
    let dayInfo = basicScheduleList[index];
    let dateStr = dayInfo.dateStr;
    let day = moment(dateStr).date();
    dayInfo.day = day;
    // 요일정보를 가져옴 : 0(일) ~ 6(토)
    let dayWeekNumber = moment(dateStr).weekday();
    weekDayList[dayWeekNumber] = dayInfo;
    // 토요일이면 초기화 넣고 초기화
    if (dayWeekNumber === 6 || index === basicScheduleList.length - 1) {
      result.push(weekDayList);
      // 마지막일이 아닌 경우만 변수 초기화 셋팅
      if (index !== basicScheduleList.length - 1) {
        weekDayList = [null, null, null, null, null, null, null];
      }
    }
  }
  return result;
};

class PortalStore {
  // 오늘 일일 출퇴근 정보
  @observable
  todayCommuteDayInfo = null;

  // 휴가/휴직 현황
  @observable
  todayVacationYearInfo = null;

  // 일일 근무 목록
  @observable
  commuteDayList = [];

  // 결재현황
  @observable
  approveList = [];

  // 공지사항
  @observable
  noticeList = [];

  // 업무보고 목록
  @observable
  workReportList = [];

  // 포탈 실장 통계 목록 : @comuted로 처리할 필요성이 있음
  @observable
  portalHeadStatsList = [];

  // 실장 통계 탭 활성화 정보 : ALL 또는 상위키
  @observable
  selectedHeadStatsTab = 'ALL';

  // 포탈 관리자 통계 탭 index
  @observable
  selectedAdminStatsTabIndex = 1;

  // 포탈 관리자 통계 : 전체현황
  @observable
  portalAdminAllStatsInfo = [];

  // 포탈 관리자 통계 : 출퇴근
  @observable
  portalAdminCommuteStatsInfo = [];

  // 포탈 관리자 통계 : 업무보고
  @observable
  portalAdminWorkReportStatsInfo = [];

  // 관리자 전체 연차 현황(일단위 히스토리 조회)
  @observable
  vacationDayHistoryList = [];

  // 월의 기본 요일 정보
  @observable
  basicCalendarList = [];

  // 일정 상세정보 정보
  @observable
  scheduleList = [];

  // 일정 날짜 기준 검색 기준(월)
  @observable
  searchMonth = '';

  // 회사일정 날짜 기준 검색 기준
  @observable
  selectedShceduleDate = '';

  // 회사안 업무 여부 : Y / N
  @observable
  inWorkYn = 'Y';

  // 가이드 문구 show / hide
  @observable
  visibleGuideText = false;

  // 가이드 문구2 show / hide
  @observable
  visibleGuideText2 = false;

  // 업무보고 현황 7일 기간 text
  @observable
  workReport7RangeText = '';

  // 부서_출퇴근 제출 list
  @observable
  commuteDeptList = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 일정 기본 정보 초기화시키기 : 관리자만 사용
  @action
  initSchedule() {
    this.searchMonth = moment().toDate();
    this.changeSelectedShceduleDate(moment().format('YYYYMMDD'));
    this.getDayListByMonth();
  }

  // 업무 / 재텩 여부 변경
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
        if (detailInfo) {
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
    const apiParam = {
      inWorkYn: this.inWorkYn,
      baseDateStr: todayCommuteDayInfo.baseDateStr
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }

    if (todayCommuteDayInfo && todayCommuteDayInfo.startWorkDate) {
      Helper.toastMessage('이미 출근 체크를 진행하였습니다.', '', 'warning');
      return;
    }

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
      inWorkYn: this.inWorkYn,
      baseDateStr: todayCommuteDayInfo.baseDateStr
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }

    if (todayCommuteDayInfo && todayCommuteDayInfo.outWorkDate) {
      Helper.toastMessage('이미 퇴근 체크를 진행하였습니다.', '', 'warning');
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
          });
        });
      }
    });
  }

  // 가이드 문구 toggle (1)
  @action
  toggleVisibleGuideText() {
    if (this.visibleGuideText) {
      this.visibleGuideText = false;
    } else {
      this.visibleGuideText = true;
    }
  }

  // 가이드 문구 hide (1)
  @action
  hideVisibleGuideText() {
    this.visibleGuideText = false;
  }

  // 가이드 문구 toggle (2)
  @action
  toggleVisibleGuideText2() {
    if (this.visibleGuideText2) {
      this.visibleGuideText2 = false;
    } else {
      this.visibleGuideText2 = true;
    }
  }

  // 가이드 문구 hide (2)
  @action
  hideVisibleGuideText2() {
    this.visibleGuideText2 = false;
  }

  // 다음 달로 일정 변경
  @action
  nextMonth() {
    this.searchMonth = moment(this.searchMonth).add(1, 'months');
    // 변경된 달의 1일을 셋팅함
    this.changeSelectedShceduleDate(
      this.searchMonth.startOf('month').format('YYYYMMDD')
    );
    this.getDayListByMonth();
  }

  // 이전 달로 일정 변경
  @action
  prevMonth() {
    this.searchMonth = moment(this.searchMonth).subtract(1, 'months');
    // 변경된 달의 1일을 셋팅함
    this.changeSelectedShceduleDate(
      this.searchMonth.startOf('month').format('YYYYMMDD')
    );
    this.getDayListByMonth();
  }

  // 해당 월의 기본 day 정보를 가져옴(토/일/공휴일)
  @action
  getDayListByMonth() {
    const searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    let apiParam = {};
    apiParam.searchMonthStr = searchMonthStr;
    ApiService.post('portals/basic-schedule.do', apiParam).then((response) => {
      const list = response.data;
      runInAction(() => {
        this.basicCalendarList = getPortalUseBasicScheduleList(list);
      });
    });
  }

  // 달력 선택시 일정 로드해옴
  @action
  changeSelectedShceduleDate(dateStr) {
    this.selectedShceduleDate = moment(dateStr).toDate();
    const apiParam = {
      startDateStr: moment(this.selectedShceduleDate).format('YYYY-MM-DD'),
      endDateStr: moment(this.selectedShceduleDate).format('YYYY-MM-DD')
    };
    ApiService.post('portals/schedule.do', apiParam).then((response) => {
      const list = response.data || [];
      runInAction(() => {
        this.scheduleList = list;
      });
    });
  }

  // 로그인한 사용자의 올해 휴가 정보 가져옴
  @action
  getTodayVacationYearInfo() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      baseYear: moment().format('YYYY')
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    ApiService.post('vacations/year/detail.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.todayVacationYearInfo = detailInfo;
      });
    });
  }

  // 일일_출퇴근 목록 가져옴 : 팀원, 팀장, 실장
  @action
  getCommuteDayList() {
    const appStore = this.rootStore.appStore;
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      searchDateStr: moment().format('YYYYMMDD')
    };
    if (
      profile.userType === Constant.USER_TYPE_PRIVATE ||
      profile.userType === Constant.USER_TYPE_MANAGER
    ) {
      apiParam.deptKey = profile.dept_key;
    } else if (profile.userType === Constant.USER_TYPE_HEADER) {
      const childDeptList = appStore.getChildDeptListByUpperKey(
        this.selectedHeadStatsTab
      );
      apiParam.childDeptIdList = childDeptList.map(
        (deptInfo) => deptInfo.deptKey
      );
    }
    ApiService.post('commutes/list.do', apiParam).then((response) => {
      const data = response.data;
      runInAction(() => {
        this.commuteDayList = data.list || [];
      });
    });
  }

  // 공지사항 목록 load
  @action
  getNoticeList() {
    const apiParam = {
      boardKey: Constant.NOTICE_BOARD_KEY
    };
    ApiService.post('portals/notice.do', apiParam).then((response) => {
      const data = response.data || [];
      runInAction(() => {
        this.noticeList = data;
      });
    });
  }

  // 결재 목록 load
  @action
  getApproveList() {
    const apiParam = {};
    ApiService.post('portals/approve.do', apiParam).then((response) => {
      const data = response.data || [];
      runInAction(() => {
        this.approveList = data;
      });
    });
  }

  // 업무보고 목록 조회
  @action
  getWorkReportList() {
    const appStore = this.rootStore.appStore;
    const apiParam = {};
    const profile = this.rootStore.appStore.profile;
    if (
      profile.userType === Constant.USER_TYPE_MANAGER ||
      profile.userType === Constant.USER_TYPE_PRIVATE
    ) {
      apiParam.startDateStr = moment().subtract(6, 'days').format('YYYYMMDD');
      apiParam.endDateStr = moment().format('YYYYMMDD');
      apiParam.deptId = profile.dept_key;
    } else if (profile.userType === Constant.USER_TYPE_HEADER) {
      const childDeptList = appStore.getChildDeptListByUpperKey(
        this.selectedHeadStatsTab
      );
      apiParam.childDeptIdList = childDeptList.map(
        (deptInfo) => deptInfo.deptKey
      );
      // apiParam.offset = 0;
      // apiParam.pageSize = 5;
      apiParam.searchDateStr = moment().format('YYYYMMDD');
    } else if (profile.userType === Constant.USER_TYPE_ADNIN) {
    }
    ApiService.post('work-reports/list.do', apiParam).then((response) => {
      const data = response.data.list || [];
      runInAction(() => {
        const resultList = _.orderBy(data, ['baseDateStr'], ['desc']);
        this.workReportList = resultList;
      });
    });
  }

  // 업무보고 일주일 기간(시작 ~ 종료) label text 셋팅
  @action
  initWorkReport7RangeText() {
    // 5월 30일(월) ~ 6월 5일(일)
    this.workReport7RangeText =
      moment().subtract(6, 'days').format('M월 DD일') +
      '(' +
      moment().subtract(6, 'days').format('dddd').substring(0, 1) +
      ')' +
      ' ~ ' +
      moment().format('M월 DD일') +
      '(' +
      moment().format('dddd').substring(0, 1) +
      ')';
  }

  // 실장 통계 정보 가지고옴
  @action
  getHeadStats() {
    const apiParam = {};
    const appStore = this.rootStore.appStore;
    const selectedHeadStatsTab = this.selectedHeadStatsTab;
    const childDeptList =
      appStore.getChildDeptListByUpperKey(selectedHeadStatsTab);
    apiParam.searchDateStr = moment().format('YYYYMMDD');
    apiParam.childDeptIdList = childDeptList.map(
      (deptInfo) => deptInfo.deptKey
    );
    ApiService.post('portals/header.do', apiParam).then((response) => {
      const data = response.data || [];
      runInAction(() => {
        this.portalHeadStatsList = data;
      });
    });
  }

  // 포탈 실장일 경우 탭 변경시
  @action
  changeSelectedHeadStatsTab(statsTab) {
    this.selectedHeadStatsTab = statsTab;
    this.getHeadStats();
    this.getCommuteDayList();
    this.getWorkReportList();
  }

  // 포탈 관리자일 경우 탭 변경시
  @action
  changeSelectedAdminStatsTabIndex(tabIndex) {
    this.selectedAdminStatsTabIndex = tabIndex;
    this.getAdminStats();
  }

  // 관리자 통계 조회해오기
  @action
  getAdminStats() {
    let selectedAdminStatsTabIndex = this.selectedAdminStatsTabIndex;
    let apiUrl = 'portals/admin/all.do';
    if (selectedAdminStatsTabIndex === 1) {
      apiUrl = 'portals/admin/all.do';
    } else if (selectedAdminStatsTabIndex === 2) {
      apiUrl = 'portals/admin/commute.do';
    } else if (selectedAdminStatsTabIndex === 3) {
      apiUrl = 'portals/admin/workreport.do';
    }
    const apiParam = {};
    apiParam.searchDateStr = moment().format('YYYYMMDD');
    ApiService.post(apiUrl, apiParam).then((response) => {
      const data = response.data || [];
      const statsSummaryInfo = Helper.convertMapToList(
        data,
        'kind',
        'aggCount'
      );
      runInAction(() => {
        if (selectedAdminStatsTabIndex === 1) {
          this.portalAdminAllStatsInfo = statsSummaryInfo;
        } else if (selectedAdminStatsTabIndex === 2) {
          this.portalAdminCommuteStatsInfo = statsSummaryInfo;
        } else if (selectedAdminStatsTabIndex === 3) {
          this.portalAdminWorkReportStatsInfo = statsSummaryInfo;
        }
      });
    });
  }

  // 휴가 이력 조회
  @action
  getVacationDayHistory() {
    const apiParam = {};
    apiParam.searchDateStr = moment().format('YYYYMMDD');
    ApiService.post('vacations/history/list.do', apiParam).then((response) => {
      const data = response.data.list || [];
      runInAction(() => {
        this.vacationDayHistoryList = data;
      });
    });
  }

  // 부서_출퇴근 제출 정보 조회
  @action
  getCommuteDeptList() {
    const apiParam = {
      searchDateStr: moment().format('YYYYMMDD')
    };
    ApiService.post('commute-depts/list.do', apiParam).then((response) => {
      const data = response.data;
      runInAction(() => {
        this.commuteDeptList = data.list || [];
      });
    });
  }

  @action
  clear() {}
}

export default PortalStore;
