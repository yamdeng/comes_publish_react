/* global reactPageType */

import { observable, action, runInAction, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import VacationManageStore from './VacationManageStore';
import Helper from 'util/Helper';
import ModalService from 'service/ModalService';

/*
  
  개인 출퇴근 store

*/

class VacationManagePlusStore extends VacationManageStore {
  // 포상휴가 발생대상 (조건 : CONDITION, 직원 선택 : SELECT)
  @observable
  plusApplyTarget = 'CONDITION';

  // 포상휴가 발생대상 조건 상세 : 1YEAR(1년 이상인 직원), 10YEAR(10년 이상인 직원)
  @observable
  plusTargetConditionValue = '1YEAR';
  // 포상휴가 이름
  @observable
  plusVacationName = '포상휴가';

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
    ModalService.confirm({
      content:
        '[휴가발생]을 통해 반영된 포상휴가는 삭제할 수 없습니다.\n휴가발생을 하시겠습니까?(미리보기 발생대상 전체)',
      ok: () => {
        ApiService.post('vacation-preview/plus/apply.do', apiParam).then(
          (response) => {
            runInAction(() => {
              Helper.toastMessage('포상휴가가 발생되었습니다.');
              this.search();
            });
          }
        );
      }
    });
  }

  // [미리보기생성]
  @action
  createPreview() {
    const baseYear = this.baseYear;
    const searchKind = this.plusTargetConditionValue;
    const vacationName = this.plusVacationName;
    const vacationCount = this.plusVacationCount;
    if (!vacationName) {
      alert('휴가명은 필수값입니다.');
      return;
    }
    if (!vacationCount) {
      alert('휴가일수는 필수값입니다.');
      return;
    }
    let apiParam = {
      baseYear: baseYear,
      searchKind: searchKind,
      vacationName,
      vacationCount: Number(vacationCount)
    };
    const searchKindName = searchKind === '1YEAR' ? '1년이상' : '10년이상';
    ModalService.confirm({
      content: `${searchKindName} 조건의 ${vacationName}(${vacationCount})를 생성하시겠습니까?`,
      ok: () => {
        ApiService.post(
          'vacation-preview/plus/create-preview-search-kind.do',
          apiParam
        ).then((response) => {
          Helper.toastMessage('포상휴가 미리보기가 생성되었습니다.');
          this.search();
        });
      }
    });
  }

  // [조회] : 포상휴가 미리보기
  @action
  search() {
    this.refreshPage();
    const userName = this.searchUserName;
    const baseYear = this.baseYear;
    let apiParam = { baseYear: baseYear, userName: userName ? userName : null };
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
    const selectedRows = toJS(this.selectedRows);
    let apiParam = {
      baseYear: baseYear
    };
    apiParam.previewIdList = selectedRows.map((info) => info.previewId);
    ModalService.confirm({
      content: `선택한 포상휴가 미리보기를 삭제하시겠습니까?`,
      ok: () => {
        ApiService.post('vacation-preview/plus/delete.do', apiParam).then(
          (response) => {
            Helper.toastMessage('삭제되었습니다.');
            this.search();
          }
        );
      }
    });
  }

  // 전체삭제
  @action
  deleteAll() {
    const baseYear = this.baseYear;
    let apiParam = {
      baseYear: baseYear
    };
    ModalService.confirm({
      content: `포상휴가 미리보기를 전체 삭제하시겠습니까?`,
      ok: () => {
        ApiService.post('vacation-preview/plus/delete.do', apiParam).then(
          (response) => {
            Helper.toastMessage('삭제되었습니다.');
            this.search();
          }
        );
      }
    });
  }

  @action
  clear() {}
}

export default VacationManagePlusStore;
