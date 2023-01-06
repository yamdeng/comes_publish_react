/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import VacationManageStore from './VacationManageStore';
import Helper from 'util/Helper';

/*
  
  개인 출퇴근 store

*/

class VacationManagePlusStore extends VacationManageStore {
  // 포상휴가 발생대상 (조건 : CONDITION, 직원 선택 : SELECT)
  @observable
  plusApplyTarget = 'ALL';

  // 포상휴가 발생대상 조건 상세 : 1YEAR(1년 이상인 직원), 10YEAR(10년 이상인 직원)
  @observable
  plusTargetConditionValue = '1YEAR';

  // 포상휴가 이름
  @observable
  plusVacationName = '';

  // 포상 휴가 일수
  @observable
  plusVacationCount = 1;

  // 선택한 row 정보
  @observable
  selectedRows = [];

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  // 선택한 row 정보 변경
  @action
  changeSelectedRows(selectedRows) {
    this.selectedRows = selectedRows;
  }

  // 포상 휴가 미리보기 발생대상 변경
  @action
  changePlusApplyTarget(plusApplyTarget) {
    this.plusApplyTarget = plusApplyTarget;
  }

  // 포상휴가 발생대상 조건 상세 변경
  @action
  changePlusTargetConditionValue(plusTargetConditionValue) {
    this.plusTargetConditionValue = plusTargetConditionValue;
  }

  // 포상휴가 이름 변경
  @action
  changePlusVacationName(plusVacationName) {
    this.plusVacationName = plusVacationName;
  }

  // 포상 휴가 일수 변경
  @action
  changePlusVacationCount(plusVacationCount) {
    this.plusVacationCount = plusVacationCount;
  }

  // [휴가발생] : 포상휴가
  @action
  applyPlusVacation() {
    const baseYear = this.baseYear;
    let apiParam = {
      baseYear: baseYear
    };
    // TODO
    ApiService.post('', apiParam).then((response) => {
      runInAction((resoponse) => {
        Helper.toastMessage('휴가가 발생되었습니다.');
      });
    });
  }

  // [조회] : 포상휴가 미리보기
  @action
  searchPlusPreviewVacation() {
    let apiParam = {};
    apiParam.baseYear = this.baseYear;
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
        return ApiService.post('vacation-preview/plus/list.do', apiParam).then(
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

  // 선택삭제
  @action
  deleteSelect() {
    const baseYear = this.baseYear;
    const selectedRows = this.selectedRows;
    let apiParam = {
      baseYear: baseYear,
      deletePlusVacationList: selectedRows
    };
    // TODO
    ApiService.post('', apiParam).then((response) => {
      Helper.toastMessage('조건발생 휴가가 삭제되었습니다.');
    });
  }

  // 전체삭제
  @action
  deleteAll() {
    const baseYear = this.baseYear;
    let apiParam = {
      baseYear: baseYear
    };
    // TODO
    ApiService.post('', apiParam).then((response) => {
      Helper.toastMessage('조건발생 휴가가 삭제되었습니다.');
    });
  }

  @action
  clear() {}
}

export default VacationManagePlusStore;
