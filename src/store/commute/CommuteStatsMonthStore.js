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
  
  통계 일일 store

*/

class CommuteStatsMonthStore {
  // 주간 목록 grid
  @observable
  weekDatagridStore = null;

  // 월간(주별)
  @observable
  monthWorkDatagridStore = null;

  // 월간(휴일)
  @observable
  monthHolidyDatagridStore = null;

  // 전체 출퇴근 통계현황 정보
  @observable
  commuteStatsSearchType = Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK;

  // 주간일 경우 검색 시작 월요일 날짜
  @observable
  mondayStartDate = '';

  // 주간 월별(주일, 평일) 검색 월
  @observable
  searchMonth = '';

  // 월 datepicker 오픈 여부
  @observable
  monthDatepickerOpend = false;

  // 주단위 근무시간 검색 조건
  @observable
  workWeekTimeKind = '';

  // 주간 통계 상단 날짜 라벨 : 월 ~ 일 grid : label, key, header color
  @observable
  weekGridLabelList = [];

  // 월간(휴일) 통계 상단 날짜 라벨
  @observable
  monthHolidayGridLabelList = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchMonth = moment().toDate();
    this.mondayStartDate = moment().startOf('isoweek').toDate();
  }

  // 통계 검색 유형 변경
  @action
  changeCommuteStatsSearchType(commuteStatsSearchType) {
    this.commuteStatsSearchType = commuteStatsSearchType;
    this.monthDatepickerOpend = false;
    this.search();
  }

  // 주간 근무시간 검색 조건 변경
  @action
  changeWorkWeekTimeKind(workWeekTimeKind) {
    this.workWeekTimeKind = workWeekTimeKind;
    this.search();
  }

  // 주간 통계 기준 월요일 변경
  @action
  changeMondayStartDate(mondayStartDate) {
    this.mondayStartDate = mondayStartDate;
  }

  // 다음 월요일
  @action
  nextMondayStartDate() {
    this.mondayStartDate = moment(this.mondayStartDate).add(7, 'days').toDate();
    this.search();
  }

  // 이전 월요일
  @action
  prevMondayStartDate() {
    this.mondayStartDate = moment(this.mondayStartDate)
      .subtract(7, 'days')
      .toDate();
    this.search();
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

  // [조회] 공통
  @action
  search() {
    const commuteStatsSearchType = this.commuteStatsSearchType;
    if (commuteStatsSearchType === Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK) {
      this.searchWeek();
    } else if (
      commuteStatsSearchType ===
      Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_WORKDAY
    ) {
      this.searchMonthWork();
    } else if (
      commuteStatsSearchType ===
      Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_HOLIDAY
    ) {
      this.searchMonthHolidy();
    }
  }

  // 주간 통계 조회
  @action
  searchWeek() {
    const mondayStartDate = this.mondayStartDate;
    const workWeekTimeKind = this.workWeekTimeKind;
    const apiParam = {};
    apiParam.mondayStartDateStr = Helper.dateToString(
      mondayStartDate,
      'YYYYMMDD'
    );
    if (workWeekTimeKind) {
      apiParam.workWeekTimeKind = workWeekTimeKind;
    }

    ApiService.post('commutes/week-list-apply-holiday.do', {
      startDateStr: Helper.dateToString(mondayStartDate, 'YYYYMMDD'),
      endDateStr: moment(mondayStartDate).add(6, 'days').format('YYYYMMDD')
    }).then((response) => {
      const weekGridLabelList = response.data || [];
      runInAction(() => {
        this.weekGridLabelList = weekGridLabelList;
      });

      const store = new CustomStore({
        load: (loadOptions) => {
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
          return ApiService.post('commute-stats/week.do', apiParam).then(
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
      runInAction(() => {
        this.weekDatagridStore = store;
      });
    });
  }

  // 월간(주별) 통계 조회
  @action
  searchMonthWork() {
    const searchMonth = this.searchMonth;
    const workWeekTimeKind = this.workWeekTimeKind;
    const apiParam = {};
    apiParam.searchMonthStr = Helper.dateToString(searchMonth, 'YYYYMM');
    if (workWeekTimeKind) {
      apiParam.workWeekTimeKind = workWeekTimeKind;
    }
    const store = new CustomStore({
      load: (loadOptions) => {
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
        return ApiService.post('commute-stats/month.do', apiParam).then(
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
    this.monthWorkDatagridStore = store;
  }

  // 월간(휴일) 통계 조회
  @action
  searchMonthHolidy() {
    const searchMonth = this.searchMonth;
    const workWeekTimeKind = this.workWeekTimeKind;
    const apiParam = {};
    const searchMonthStr = Helper.dateToString(searchMonth, 'YYYYMM');
    apiParam.searchMonthStr = searchMonthStr;
    if (workWeekTimeKind) {
      apiParam.workWeekTimeKind = workWeekTimeKind;
    }

    ApiService.post('commutes/holiday-month.do', {
      searchMonthStr: searchMonthStr
    }).then((response) => {
      const monthHolidayGridLabelList = response.data || [];
      runInAction(() => {
        this.monthHolidayGridLabelList = monthHolidayGridLabelList;
      });

      const store = new CustomStore({
        load: (loadOptions) => {
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
          return ApiService.post('commute-stats/holiday.do', apiParam).then(
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
      runInAction(() => {
        this.monthHolidyDatagridStore = store;
      });
    });
  }

  @action
  clear() {}
}

export default CommuteStatsMonthStore;
