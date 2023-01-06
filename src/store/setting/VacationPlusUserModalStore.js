/* global reactPageType */

import { observable, action, runInAction, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import VacationNotApplyUserModalStore from './VacationNotApplyUserModalStore';
import ModalService from 'service/ModalService';

/*
  
  개인 출퇴근 store

*/

class VacationPlusUserModalStore extends VacationNotApplyUserModalStore {
  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  // [미리보기] 생성
  @action
  createPreviewVacation() {
    const vacationManagePlusStore = this.rootStore.vacationManagePlusStore;
    const { plusVacationName, plusVacationCount } = vacationManagePlusStore;
    if (!plusVacationCount) {
      alert('휴가일수는 필수값입니다.');
      return;
    }
    const selectedRows = toJS(this.selectedRows);
    const baseYear = this.baseYear;
    let apiParam = { baseYear };
    apiParam.vacationName = plusVacationName;
    apiParam.vacationCount = plusVacationCount;
    apiParam.userIdList = selectedRows.map((info) => info.userKey);
    ModalService.confirm({
      content: `선택한 직원의 ${plusVacationName}(${plusVacationCount})를 생성하시겠습니까?`,
      ok: () => {
        ApiService.post(
          'vacation-preview/plus/create-preview-select-user.do',
          apiParam
        ).then((response) => {
          Helper.toastMessage('미리보기가 생성되었습니다.');
          runInAction(() => {
            this.search();
            this.rootStore.vacationManagePlusStore.search();
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

export default VacationPlusUserModalStore;
