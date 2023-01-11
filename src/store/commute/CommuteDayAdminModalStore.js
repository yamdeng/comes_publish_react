/* global reactPageType */

import { observable, action, runInAction, computed, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import CommuteDayUpdateModalStore from './CommuteDayUpdateModalStore';
import moment from 'moment';
import Constant from 'config/Constant';

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
    this.getTargetDeptList();
  }

  // 다음일
  @action
  nextDay() {
    this.searchDate = moment(this.searchDate).add(1, 'days').toDate();
    this.getTargetDeptList();
  }

  // 이전일
  @action
  prevDay() {
    this.searchDate = moment(this.searchDate).subtract(1, 'days').toDate();
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
    this.getCommuteDeptDetailInfo();
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
    this.getCommuteDeptDetailInfo();
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
    this.getCommuteDeptDetailInfo();
    this.search();
  }

  // 모달 오픈 : 조회 일 기준으로
  @action
  openModal(searchDate, rowClickDeptId) {
    this.searchDate = searchDate;
    this.visibleModal = true;
    this.getTargetDeptList(rowClickDeptId);
  }

  // [조회] 공통
  @action
  search(disableRefresh) {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    if (!disableRefresh) {
      this.refreshPage();
    }
    this.updateRows = [];

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

  // 승인
  @action
  approve() {
    const commuteDeptSubmitInfo = this.commuteDeptSubmitInfo;
    const apiParam = {
      baseDateStr: commuteDeptSubmitInfo.baseDateStr,
      deptId: commuteDeptSubmitInfo.deptId,
      commuteSubmitStatusCode: Constant.CODE_COMMUTE_DEPT_STATUS_APPROVE
    };
    ApiService.put('commute-depts/detail/status.do', apiParam).then(
      (response) => {
        let detailInfo = response.data;
        runInAction(() => {
          this.commuteDeptSubmitInfo = detailInfo;
        });
        Helper.toastMessage(
          commuteDeptSubmitInfo.baseDateStr +
            ' ' +
            commuteDeptSubmitInfo.deptName +
            ' 출퇴근 기록을 승인하였습니다.'
        );
      }
    );
  }

  // 반려
  @action
  reject() {
    const commuteDeptSubmitInfo = this.commuteDeptSubmitInfo;
    const apiParam = {
      baseDateStr: commuteDeptSubmitInfo.baseDateStr,
      deptId: commuteDeptSubmitInfo.deptId,
      commuteSubmitStatusCode: Constant.CODE_COMMUTE_DEPT_STATUS_REJECT
    };
    ApiService.put('commute-depts/detail/status.do', apiParam).then(
      (response) => {
        let detailInfo = response.data;
        runInAction(() => {
          this.commuteDeptSubmitInfo = detailInfo;
        });
        Helper.toastMessage(
          commuteDeptSubmitInfo.baseDateStr +
            ' ' +
            commuteDeptSubmitInfo.deptName +
            ' 출퇴근 기록을 반려하였습니다.'
        );
      }
    );
  }

  // 부서_출퇴근 상세 정보 조회
  @action
  getCommuteDeptDetailInfo() {
    const apiParam = {};
    apiParam.baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.deptId = this.currentDeptId;
    ApiService.post('commute-depts/detail.do', apiParam).then((response) => {
      let detailInfo = response.data;
      runInAction(() => {
        this.commuteDeptSubmitInfo = detailInfo;
      });
    });
  }

  // 부서_출퇴든 대상 부서 목록 가져오기
  @action
  getTargetDeptList(rowClickDeptId) {
    const apiParam = {};
    apiParam.searchDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    ApiService.post('commute-depts/list.do', apiParam).then((response) => {
      const data = response.data.list;
      runInAction(() => {
        this.targetDeptList = data || [];
        if (data && data.length) {
          this.currentDeptIndex = 0;
          this.currentDeptId = rowClickDeptId ? rowClickDeptId : data[0].deptId;
          this.getCommuteDeptDetailInfo();
          this.search();
        } else {
          this.commuteDeptSubmitInfo = null;
          this.search();
        }
      });
    });
  }

  @action
  clear() {}
}

export default CommuteDayAdminModalStore;
