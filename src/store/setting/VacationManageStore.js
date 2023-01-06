/* global reactPageType */

import { observable, action, runInAction, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import ModalService from 'service/ModalService';
import _ from 'lodash';

/*
  
  개인 출퇴근 store

*/

class VacationManageStore {
  // datagridRef
  dataGridRef = null;

  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = null;

  // 발생연도
  @observable
  baseYear = '';

  // 연간 발생대상 (전체 : ALL, 휴가발생 데이터 없는 직원 : NOVACATION)
  @observable
  yearApplyTarget = 'ALL';

  // grid totalCount
  @observable
  totalCount = 0;

  // 변경된 grid row
  @observable
  updateRows = [];

  // 검색 이름
  @observable
  searchUserName = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 이름 변경
  @action
  changeSearchUserName(searchUserName) {
    this.searchUserName = searchUserName;
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

  // 휴가기준 년 조회
  @action
  getVacationBaseYear() {
    ApiService.post('vacation-preview/baseYear.do').then((response) => {
      const baseYear = response.data;
      runInAction(() => {
        this.baseYear = baseYear;
        this.search();
      });
    });
  }

  // 연간 휴가 미리보기 발생대상 변경
  @action
  changeYearApplyTarget(yearApplyTarget) {
    this.yearApplyTarget = yearApplyTarget;
    this.search();
  }

  // grid 변경 내역
  @action
  changeUpdateRows(changes) {
    this.updateRows = changes;
  }

  // [휴가발생] : 연간휴가
  @action
  applyYearVacation() {
    const baseYear = this.baseYear;
    let apiParam = { baseYear };
    ModalService.confirm({
      content: '휴가발생을 하시겠습니까?(미리보기 생성된 전체대상)',
      ok: () => {
        ApiService.post('vacation-preview/year/apply.do', apiParam).then(
          (response) => {
            Helper.toastMessage('휴가가 발생되었습니다.');
            runInAction(() => {
              this.search();
            });
          }
        );
      }
    });
  }

  // [일괄수정]
  @action
  updateBatch() {
    const baseYear = this.baseYear;
    const updateRows = toJS(this.updateRows) || [];
    let updateVacationList = [];
    let apiParam = {
      baseYear: baseYear,
      updateVacationList: updateVacationList
    };
    // TODO
    ApiService.post('', apiParam).then((response) => {
      Helper.toastMessage('미리보기 휴가가 수정정되었습니다');
      this.search();
    });
  }

  // [미리보기생성]
  @action
  createPreview() {
    const baseYear = this.baseYear;
    let apiParam = {
      baseYear: baseYear
    };
    // TODO
    ApiService.post('', apiParam).then((response) => {
      Helper.toastMessage(baseYear + '년 미리보기가 생성되었습니다.');
    });
  }

  // [조회] : 연간휴가 미리보기
  @action
  search() {
    this.refreshPage();
    this.updateRows = [];
    const baseYear = this.baseYear;
    const yearApplyTarget = this.yearApplyTarget;
    let apiParam = {};
    apiParam.baseYear = baseYear;
    if (yearApplyTarget === 'NOVACATION') {
      apiParam.newEmployeeYn = 'Y';
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
    this.datagridStore = store;
  }

  @action
  clear() {}
}

export default VacationManageStore;
