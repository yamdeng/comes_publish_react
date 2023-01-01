/* global reactPageType */

import { observable, action, runInAction, computed, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import CommuteDayUpdateModalStore from './CommuteDayUpdateModalStore';
import moment from 'moment';

/*
  
  개인 출퇴근 store

*/

class CommuteDayAdminModalStore extends CommuteDayUpdateModalStore {
  // 부서_출퇴근 대상 부서 목록
  @observable
  targetDeptList = [];

  // 현재 조회중인 부서 index : 0부터 시작
  @observable
  currentDeptIndex = 0;

  // 현재 부서키
  @observable
  currentDeptId = null;

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  // 일 datepicker 변경
  @action
  changeSearchDate(searchDate) {
    this.searchDate = searchDate;
    this.dayDatepickerOpend = false;
    this.getCommuteDeptDetailInfo();
    this.getTargetDeptList();
  }

  // 다음일
  @action
  nextDay() {
    this.searchDate = moment(this.searchDate).add(1, 'days').toDate();
    this.getCommuteDeptDetailInfo();
    this.getTargetDeptList();
  }

  // 이전일
  @action
  prevDay() {
    this.searchDate = moment(this.searchDate).subtract(1, 'days').toDate();
    this.getCommuteDeptDetailInfo();
    this.getTargetDeptList();
  }
  /* 일 datepicker 처리 end */

  @action
  changeDeptId(deptId) {
    const targetDeptList = toJS(this.targetDeptList);
    const searchIndex = targetDeptList.findIndex(
      (info) => info.deptId === deptId
    );
    this.currentDeptIndex = searchIndex;
    this.currentDeptId = targetDeptList[searchIndex].deptId;
    this.search();
  }

  // 다음 부서
  @action
  nextDept() {
    const targetDeptList = toJS(this.targetDeptList);
    let currentDeptIndex = this.currentDeptIndex;
    if (currentDeptIndex === targetDeptList.length - 1) {
      currentDeptIndex = 0;
    } else {
      currentDeptIndex = currentDeptIndex + 1;
    }
    this.currentDeptIndex = currentDeptIndex;
    this.currentDeptId = targetDeptList[currentDeptIndex].deptId;
    this.search();
  }

  // 이전 부서
  @action
  prevDept() {
    const targetDeptList = toJS(this.targetDeptList);
    let currentDeptIndex = this.currentDeptIndex;
    if (currentDeptIndex === 0) {
      currentDeptIndex = targetDeptList.length - 1;
    } else {
      currentDeptIndex = currentDeptIndex - 1;
    }
    this.currentDeptIndex = currentDeptIndex;
    this.currentDeptId = targetDeptList[currentDeptIndex].deptId;
    this.search();
  }

  // 모달 오픈 : 조회 일 기준으로
  @action
  openModal(searchDate) {
    this.searchDate = searchDate;
    this.visibleModal = true;
    this.getTargetDeptList();
  }

  // [조회] 공통
  @action
  search(disableRefresh) {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    if (!disableRefresh) {
      this.refreshPage();
    }

    const apiParam = {};
    apiParam.baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.deptKey = this.currentDeptId;

    const store = new CustomStore({
      key: 'userKey',
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
        return ApiService.post('commutes/list-to-submit.do', apiParam).then(
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

  // 제출
  @action
  submit() {
    // 제출 이후 다시 부서_출퇴근 정보 조회
  }

  // 승인
  @action
  approve() {}

  // 반려
  @action
  reject() {}

  // 부서_출퇴든 대상 부서 목록 가져오기
  @action
  getTargetDeptList() {
    const apiParam = {};
    apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    ApiService.post('commute-depts/list.do').then((response) => {
      const data = response.data;
      runInAction(() => {
        this.targetDeptList = data;
        if (data.length) {
          this.currentDeptIndex = 0;
          this.currentDeptId = data[0].deptId;
          this.search();
        }
      });
    });
  }

  @action
  clear() {}
}

export default CommuteDayAdminModalStore;
