import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';

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

  // 포탈 관리자 통계 활성화 탭 기준
  @observable
  activeTabIndex = 1;

  // 포탈 관리자 통계 : 전체현황
  @observable
  portalAdminAllStatsList = [];

  // 포탈 관리자 통계 : 출퇴근
  @observable
  portalAdminCommuteStatsList = [];

  // 포탈 관리자 통계 : 업무보고
  @observable
  portalAdminWorkReportStatsList = [];

  // 관리자 전체 연차 현황
  @observable
  vacationDetailList = [];

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

  // 재택, 외근 여부 : Y / N
  @observable
  inWorkYn = 'Y';

  // 가이드 문구 show / hide
  @observable
  visibleGuideText = false;

  // 가이드 문구2 show / hide
  @observable
  visibleGuideText2 = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  initSchedule() {
    this.searchMonth = moment().toDate();
    this.changeSelectedShceduleDate(moment().format('YYYYMMDD'));
    this.getDayListByMonth();
  }

  // 업무 / 재텩 여부 변경
  @action
  changeInWorkYn(inWorkYn) {
    debugger;
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
          if (detailInfo.workStatusCodeName === 'ING_HOME') {
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

    if (todayCommuteDayInfo && todayCommuteDayInfo.startWorkDate) {
      Helper.toastMessage('aaaa', 'bbb');
      return;
    }
    const apiParam = {
      inWorkYn: this.inWorkYn,
      baseDateStr: todayCommuteDayInfo.baseDateStr + '1'
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    ApiService.put('commutes/startWork.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.todayCommuteDayInfo = detailInfo;
      });
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
    ApiService.put('commutes/outWork.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.todayCommuteDayInfo = detailInfo;
      });
    });
  }

  // 선택한 월의 출퇴근 현황 정보 가져오기
  @action
  getPrivateMonthStatsList() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      inWorkYn: this.inWorkYn
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    ApiService.post('commutes/stats/private.do', apiParam).then((response) => {
      runInAction(() => {
        this.privateMonthStatsList = response.data || [];
      });
    });
  }

  // [조회]
  @action
  search() {
    let searchMonth = this.searchMonth;
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      searchMonthStr: Helper.dateToString(searchMonth, 'YYYYMM')
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    const store = new CustomStore({
      load(loadOptions) {
        if (loadOptions) {
          const { skip, take } = loadOptions;
          if (take) {
            apiParam.pageSize = take;
            apiParam.offset = skip;
          }
        }
        return ApiService.post('commutes/list.do', apiParam).then(
          (response) => {
            const data = response.data;
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
  nextMonth() {
    this.searchMonth = moment(this.searchMonth).add(1, 'months');
    // 변경된 달의 1일을 셋팅함
    this.changeSelectedShceduleDate(
      this.searchMonth.startOf('month').format('YYYYMMDD')
    );
    this.getDayListByMonth();
  }

  @action
  prevMonth() {
    this.searchMonth = moment(this.searchMonth).subtract(1, 'months');
    // 변경된 달의 1일을 셋팅함
    this.changeSelectedShceduleDate(
      this.searchMonth.startOf('month').format('YYYYMMDD')
    );
    this.getDayListByMonth();
  }

  @action
  getDayListByMonth() {
    const searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    let apiParam = {};
    apiParam.searchMonthStr = searchMonthStr;
    ApiService.post('portals/basic-schedule.do', apiParam).then((response) => {
      const list = response.data;
      runInAction(() => {
        // calendar
        this.basicCalendarList = getPortalUseBasicScheduleList(list);
      });
    });
  }

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

  @action
  getCommuteDayList() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      baseDateStr: moment().format('YYYYMMDD')
    };
    if (
      profile.userType === Constant.USER_TYPE_PRIVATE ||
      profile.userType === Constant.USER_TYPE_MANAGER
    ) {
      apiParam.deptKey = profile.dept_key;
    } else if (profile.userType === Constant.USER_TYPE_HEADER) {
      let childDeptIdList = profile.childDeptIdList;
      apiParam.childDeptIdList = childDeptIdList;
    }
    ApiService.post('commutes/list.do', apiParam).then((response) => {
      const data = response.data;
      runInAction(() => {
        this.commuteDayList = data.list || [];
      });
    });
  }

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

  @action
  clear() {
    this.datagridStore = null;
    this.searchMonth = null;
    this.monthDatepickerOpend = false;
    this.todayCommuteDayInfo = null;
    this.privateMonthStatsList = [];
    this.inWorkYn = 'Y';
  }
}

export default PortalStore;
