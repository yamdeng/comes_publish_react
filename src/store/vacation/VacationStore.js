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

class VacationStore {
  // 년간 휴가/휴직 현황 grid ref
  yearDatagridRef = null;

  // 휴가 신청/사용 내역 grid ref
  detailDatagridRef = null;

  // 년간 휴가/휴직 현황
  @observable
  yearDatagridStore = null;

  // 휴가 신청/사용 내역
  @observable
  detailDatagridStore = null;

  // 검색 년
  @observable
  searchYear = moment().toDate();

  // 년 datepicker 오픈 여부
  @observable
  yearDatepickerOpend = false;

  // 하위 실 선택 정보
  @observable
  selectedSilDeptKey = 'ALL';

  // 사용자 이름
  @observable
  searchUserName = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  changeSearchUserName(searchUserName) {
    this.searchUserName = searchUserName;
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchYear = moment().toDate();
  }

  // 년간 datagrid 컴포넌트 셋팅
  initYearDataGridComponent(yearDatagridRef) {
    this.yearDatagridRef = yearDatagridRef;
  }

  // 년간 pageIndex 초기화
  refreshPageYear() {
    if (
      this.yearDatagridRef &&
      this.yearDatagridRef.current &&
      this.yearDatagridRef.current.instance &&
      this.yearDatagridRef.current.instance.pageIndex
    ) {
      this.yearDatagridRef.current.instance.pageIndex(0);
    }
  }

  // 상세내역 datagrid 컴포넌트 셋팅
  initDetailDataGridComponent(detailDatagridRef) {
    this.detailDatagridRef = detailDatagridRef;
  }

  // 상세내역 pageIndex 초기화
  refreshPageDetail() {
    if (
      this.detailDatagridRef &&
      this.detailDatagridRef.current &&
      this.detailDatagridRef.current.instance &&
      this.detailDatagridRef.current.instance.pageIndex
    ) {
      this.detailDatagridRef.current.instance.pageIndex(0);
    }
  }

  // 하위실 콤보 변경
  @action
  changeSilDept(silDeptKey) {
    this.selectedSilDeptKey = silDeptKey;
    this.search();
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

  // [조회] 공통
  @action
  search() {
    this.searchYearList();
  }

  // 연간 휴가 조회
  @action
  searchYearList() {
    this.refreshPageYear();
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const selectedSilDeptKey = this.selectedSilDeptKey;
    const userName = this.searchUserName;
    let apiParam = {
      userName: userName ? userName : null
    };

    apiParam.baseYear = Helper.dateToString(this.searchYear, 'YYYY');
    // 페이지 타입에 따라 기본 파라미터값 적용
    if (reactPageType === 'VacationPrivateApp') {
      // 개인 출퇴근
      apiParam.userId = profile.user_key;
    } else if (reactPageType === 'VacationDeptApp') {
      // 팀원 출퇴근
      apiParam.deptKey = profile.dept_key;
    } else if (reactPageType === 'VacationHeadApp') {
      // 실원 출퇴근
      const selectedChildDeptIdList =
        appStore.getChildDeptListByUpperKey(selectedSilDeptKey);
      apiParam.childDeptIdList = selectedChildDeptIdList.map(
        (deptInfo) => deptInfo.deptKey
      ) || ['xxx'];
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
        return ApiService.post('vacations/year/list.do', apiParam).then(
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
    this.yearDatagridStore = store;
  }

  // 연간 휴가 조회
  @action
  searchDetailList(detailUserId) {
    this.refreshPageDetail();
    let apiParam = {};
    apiParam.baseYear = Helper.dateToString(this.searchYear, 'YYYY');
    apiParam.userId = detailUserId;
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const selectedSilDeptKey = this.selectedSilDeptKey;
    // 페이지 타입에 따라 기본 파라미터값 적용
    if (reactPageType === 'VacationPrivateApp') {
      // 개인 출퇴근
      apiParam.userId = profile.user_key;
    } else if (reactPageType === 'VacationDeptApp') {
      // 팀원 출퇴근
      apiParam.deptKey = profile.dept_key;
    } else if (reactPageType === 'VacationHeadApp') {
      // 실원 출퇴근
      const selectedChildDeptIdList =
        appStore.getChildDeptListByUpperKey(selectedSilDeptKey);
      apiParam.childDeptIdList = selectedChildDeptIdList.map(
        (deptInfo) => deptInfo.deptKey
      ) || ['xxx'];
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
        return ApiService.post('vacations/detail/list.do', apiParam).then(
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
    this.detailDatagridStore = store;
  }

  @action
  clear() {}
}

export default VacationStore;
