/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import _ from 'lodash';

/*
  
  개인 출퇴근 store

*/

class VacationStatsStore {
  // datagridRef
  dataGridRef = null;

  // 전체 휴가관리 grid store
  @observable
  datagridStore = null;

  // 검색 년
  @observable
  searchYear = '';

  // 년 datepicker 오픈 여부
  @observable
  yearDatepickerOpend = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchYear = moment().toDate();
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

  /* 년 datepicker 처리 start */
  // 년 datepicker 오픈
  @action
  openYearDatepicker() {
    this.yearDatepickerOpend = true;
  }

  // 년 datepicker 닫기
  @action
  closeYearDatepicker() {
    this.yearDatepickerOpend = false;
  }

  // 년 datepicker 변경
  @action
  changeSearchYear(searchYear) {
    this.searchYear = searchYear;
    this.yearDatepickerOpend = false;
    this.search();
  }

  // 다음년
  @action
  nextYear() {
    this.searchYear = moment(this.searchYear).add(1, 'years').toDate();
    this.search();
  }

  // 이전년
  @action
  prevYear() {
    this.searchYear = moment(this.searchYear).subtract(1, 'years').toDate();
    this.search();
  }
  /* 년 datepicker 처리 end */

  // [조회]
  @action
  search() {
    this.refreshPage();

    let apiParam = {};
    apiParam.baseYear = Helper.dateToString(this.searchYear, 'YYYY');

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
        return ApiService.post(
          'vacations/year/all-month-list.do',
          apiParam
        ).then((response) => {
          const data = response.data;
          runInAction(() => {
            this.totalCount = data.totalCount;
          });
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
  clear() {}
}

export default VacationStatsStore;
