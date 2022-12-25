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
  
  개인 출퇴근 store

*/

class VacationManageStore {
  // 연간 휴가 미리보기 grid store
  @observable
  previewYearDatagridStore = null;

  // 포상 휴가 미리보기 grid store
  @observable
  previewPlusDatagridStore = null;

  // 발생연도
  @observable
  baseYear = '';

  // 연간 발생대상 (전체 : ALL, 휴가발생 데이터 없는 직원 : NOVACATION)
  @observable
  yearApplyTarget = 'ALL';

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

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  changeBaseYear(baseYear) {
    this.baseYear = baseYear;
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

  // 연간 휴가 미리보기 발생대상 변경
  @action
  changeYearApplyTarget(yearApplyTarget) {
    this.yearApplyTarget = yearApplyTarget;
  }

  // 포상 휴가 미리보기 발생대상 변경
  @action
  changePlusApplyTarget(plusApplyTarget) {
    this.plusApplyTarget = plusApplyTarget;
  }

  // [휴가발생] : 연간휴가
  @action
  applyYearVacation() {}

  // [휴가발생] : 포상휴가
  @action
  applyPlusVacation() {}

  // [조회] : 연간휴가 미리보기
  @action
  searchYearPreviewVacation() {
    let apiParam = {};
    apiParam.baseYear = this.baseYear;

    const store = new CustomStore({
      load(loadOptions) {
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
        return ApiService.post('vacation-preview/year/list.do', apiParam).then(
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
    this.previewYearDatagridStore = store;
  }

  // [조회] : 포상휴가 미리보기
  @action
  searchPlusPreviewVacation() {
    let apiParam = {};
    apiParam.baseYear = this.baseYear;

    const store = new CustomStore({
      load(loadOptions) {
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
    this.previewPlusDatagridStore = store;
  }

  @action
  clear() {}
}

export default VacationManageStore;
