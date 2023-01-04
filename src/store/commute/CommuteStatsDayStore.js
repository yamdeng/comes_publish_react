/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import CommutePrivateStore from './CommutePrivateStore';
import moment from 'moment';

/*
  
  통계 일일 store

*/

class CommuteStatsDayStore extends CommutePrivateStore {
  // 전체 출퇴근 통계현황 정보
  @observable
  statsInfo = null;

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  @action
  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재
    this.getStatsSearch();
    const searchDateType = this.searchDateType;
    const searchDashBoardKind = this.searchDashBoardKind;
    const workTimeKind = this.workTimeKind;

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
    if (workTimeKind) {
      apiParam.workTimeKind = workTimeKind;
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

    // 날짜 유형에 따른 검색 조건 처리
    if (searchDateType === Constant.SEARCH_DATE_TYPE_DAY) {
      apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      apiParam.startDateStr = Helper.dateToString(this.startDate, 'YYYYMMDD');
      apiParam.endDateStr = Helper.dateToString(this.endDate, 'YYYYMMDD');
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

  @action
  getStatsSearch() {
    const searchDateType = this.searchDateType;
    const workTimeKind = this.workTimeKind;

    const apiParam = {};
    if (workTimeKind) {
      apiParam.workTimeKind = workTimeKind;
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

    ApiService.post('commutes/stats/admin.do', apiParam).then((response) => {
      const statsList = response.data || [];
      runInAction(() => {
        const statsInfo = {};
        statsInfo.ing = _.find(statsList, { kind: 'ing' }).aggCount;
        statsInfo.home_ing = _.find(statsList, {
          kind: 'home_ing'
        }).aggCount;
        statsInfo.vacation_morning = _.find(statsList, {
          kind: 'vacation_morning'
        }).aggCount;
        statsInfo.vacation_afternoon = _.find(statsList, {
          kind: 'vacation_afternoon'
        }).aggCount;
        statsInfo.end = _.find(statsList, {
          kind: 'end'
        }).aggCount;
        statsInfo.tardy = _.find(statsList, {
          kind: 'tardy'
        }).aggCount;
        statsInfo.vacation = _.find(statsList, {
          kind: 'vacation'
        }).aggCount;
        statsInfo.not_start_work = _.find(statsList, {
          kind: 'not_start_work'
        }).aggCount;
        statsInfo.not_out_work = _.find(statsList, {
          kind: 'not_out_work'
        }).aggCount;
        this.statsInfo = statsInfo;
      });
    });
  }

  @action
  clear() {}
}

export default CommuteStatsDayStore;
