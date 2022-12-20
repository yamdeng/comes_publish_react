import { observable, action, runInAction } from 'mobx';
import FormStore from 'store/ui/FormStore';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Api from 'util/Api';
import moment from 'moment';
import Helper from 'util/Helper';

/*
  
  개인 출퇴근 store

*/

class CommutePrivateStore {
  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = '';

  // 날짜 변경
  @observable
  searchMonth = '';

  // 일 datepicker 오픈 여부
  @observable
  monthDatepickerOpend = false;

  // 오늘 일일 출퇴근 정보
  @observable
  todayCommuteDayInfo = null;

  // 해당 월의 출퇴근 현황
  @observable
  privateMonthStatsList = [];

  // 재택, 외근 여부 : Y / N
  @observable
  inWorkYn = 'Y';

  // 가이드 문구 show / hide
  @observable
  visibleGuideText = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  init() {
    this.searchMonth = moment().toDate();
  }

  // 월 datepicker 오픈
  @action
  openMonthDatepicker() {
    this.monthDatepickerOpend = true;
  }

  // 월 datepicker 오픈
  @action
  closeMonthDatepicker() {
    this.monthDatepickerOpend = false;
  }

  // 월 datepicker 변경
  @action
  changeSearchMonth(searchMonth) {
    this.searchMonth = searchMonth;
  }

  @action
  changeInWornYn(inWorkYn) {
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
    ApiService.get('commutes/detail.do', apiParam).then((response) => {
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
    ApiService.get('commutes/stats/private.do', apiParam).then((response) => {
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
        return ApiService.get('commutes/list.do', apiParam).then((response) => {
          const data = response.data;
          return {
            data: data.list,
            totalCount: data.totalCount
          };
        });
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
  }

  @action
  prevMonth() {
    this.searchMonth = moment(this.searchMonth).subtract(1, 'months');
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

export default CommutePrivateStore;
