/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import CommutePrivateStore from './CommutePrivateStore';

/*
  
  부서_출퇴근 store

*/

class CommuteDeptStore extends CommutePrivateStore {
  // 전체 출퇴근 통계현황 정보
  @observable
  allStatsInfo = null;

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  @action
  search() {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    this.getStatsSearch();

    const searchDateType = this.searchDateType;
    const searchDashBoardKind = this.searchDashBoardKind;

    const apiParam = {};
    apiParam.searchKind = searchDashBoardKind;
    // TODO : all 처리를 어떻게 할지 체크

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
            apiParam.pageSize = 10;
            apiParam.offset = 0;
          }
        }
        return ApiService.post('commute-depts/list.do', apiParam).then(
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

  // 통계현황 조회
  @action
  getStatsSearch() {
    const searchDateType = this.searchDateType;

    const apiParam = {};

    // 날짜 유형에 따른 검색 조건 처리
    if (searchDateType === Constant.SEARCH_DATE_TYPE_DAY) {
      apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_MONTH) {
      apiParam.searchMonthStr = Helper.dateToString(this.searchMonth, 'YYYYMM');
    } else if (searchDateType === Constant.SEARCH_DATE_TYPE_RANGE) {
      apiParam.startDateStr = Helper.dateToString(this.startDate, 'YYYYMMDD');
      apiParam.endDateStr = Helper.dateToString(this.endDate, 'YYYYMMDD');
    }

    ApiService.post('commute-depts/stats/admin.do', apiParam).then(
      (response) => {
        const statsList = response.data || [];
        runInAction(() => {
          const allStatsInfo = {};
          allStatsInfo.all = _.find(statsList, { kind: 'all' }).aggCount;
          allStatsInfo.submit_and_reject = _.find(statsList, {
            kind: 'submit_and_reject'
          }).aggCount;
          allStatsInfo.before_approve = _.find(statsList, {
            kind: 'before_approve'
          }).aggCount;
          allStatsInfo.approve = _.find(statsList, {
            kind: 'approve'
          }).aggCount;
          allStatsInfo.start_work_complete = _.find(statsList, {
            kind: 'start_work_complete'
          }).aggCount;
          allStatsInfo.out_work_complete = _.find(statsList, {
            kind: 'out_work_complete'
          }).aggCount;
          this.allStatsInfo = allStatsInfo;
        });
      }
    );
  }

  @action
  clear() {}
}

export default CommuteDeptStore;
