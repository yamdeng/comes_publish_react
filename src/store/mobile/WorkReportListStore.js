/* global */

import { observable, action, runInAction } from 'mobx';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import moment from 'moment';

class WorkReportListStore {
  // 업무보고 목록
  @observable
  list = [];

  // 검색일자
  @observable
  searchDate = moment().toDate();

  // 일 datepicker 오픈 여부
  @observable
  dayDatepickerOpend = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchDate = moment().toDate();
  }

  // 일 datepicker 변경
  @action
  changeSearchDate(searchDate) {
    this.searchDate = searchDate;
    this.dayDatepickerOpend = false;
    this.search();
  }
  @action
  openDayDatepicker() {
    this.dayDatepickerOpend = true;
  }

  // 일 datepicker 닫기
  @action
  closeDayDatepicker() {
    this.dayDatepickerOpend = false;
  }

  // 상세 페이지로 이동시키기
  @action
  goDetailPage(reportInfo) {
    const { baesDateStr, deptId } = reportInfo;
  }

  @action
  search() {
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const apiParam = {};
    apiParam.deptId = profile.dept_key;
    apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    ApiService.post('work-reports/list.do', apiParam).then((response) => {
      const data = response.data;
      runInAction(() => {
        this.list = data.list;
      });
    });
  }

  @action
  clear() {}
}

export default WorkReportListStore;
