/* global reactPageType */

import { observable, action, runInAction, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import ModalService from 'service/ModalService';
import Helper from 'util/Helper';

/*
  
  개인 출퇴근 store

*/

class VacationNotApplyUserModalStore {
  // datagridRef
  dataGridRef = null;

  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = null;

  // 발생연도
  @observable
  baseYear = '';

  // grid totalCount
  @observable
  totalCount = 0;

  // 선택한 row 정보
  @observable
  selectedRows = [];

  // 검색 이름
  @observable
  searchUserName = '';

  // 모달 오픈 여부
  @observable
  visibleModal = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
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

  // 선택한 row 정보 변경
  @action
  changeSelectedRows(selectedRows) {
    this.selectedRows = selectedRows;
  }

  // 팝업 오픈
  @action
  openModal(baseYear) {
    this.visibleModal = true;
    this.baseYear = baseYear;
    this.search();
  }

  // 팝업 종료
  @action
  closeModal() {
    this.visibleModal = false;
    this.clear();
  }

  // 이름 변경
  @action
  changeSearchUserName(searchUserName) {
    this.searchUserName = searchUserName;
  }

  // [미리보기] 생성
  @action
  createPreviewVacation() {
    const selectedRows = toJS(this.selectedRows);
    const baseYear = this.baseYear;
    let apiParam = { baseYear };
    apiParam.userIdList = selectedRows.map((info) => info.userKey);
    ModalService.confirm({
      content: '선택한 직원의 미리보기를 생성하시겠습니까?',
      ok: () => {
        ApiService.post(
          'vacation-preview/year/apply-select-user.do',
          apiParam
        ).then((response) => {
          Helper.toastMessage('미리보기가 생성되었습니다.');
          runInAction(() => {
            this.search();
            this.rootStore.vacationManageStore.search();
          });
        });
      }
    });
  }

  // 조회
  @action
  search() {
    this.refreshPage();
    const baseYear = this.baseYear;
    const userName = this.searchUserName;
    let apiParam = {
      userName: userName ? userName : null
    };
    apiParam.baseYear = baseYear;
    apiParam.newEmployeeYn = 'Y';
    apiParam.onlyVacationTargetYn = 'Y';
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
        return ApiService.post('office-users/list.do', apiParam).then(
          (response) => {
            const data = response.data;
            runInAction(() => {
              this.totalCount = data.totalCount;
              this.selectedRows = [];
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
  clear() {
    this.selectedRows = [];
    this.searchUserName = '';
  }
}

export default VacationNotApplyUserModalStore;
