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

class DeptTimeSettingStore {
  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = null;

  // 근무시간 폼 팝업 오픈 여부
  @observable
  isFormPopupOpen = false;

  // 폼 등록 / 수정 유형 : ADD, EDIT
  @observable
  formType = 'ADD';

  /*

    아래부터 form input
     1.근무시간지명
     2.근무지
     3.근무시간설명
     4.근무시간
      4-1.시작
      4-2.종료
     5.점심시간
      5-1.시작
      5-2.종료
     6.적용기간
      6-1.적용 시작기간
      6-2.적용 종료기간
     7.종료일 미정 선택 여부
     8.적용부서 선택

  */

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 팝업 오픈
  @action
  openFormPopup() {
    this.isFormPopupOpen = true;
  }

  // 팝업 종료
  @action
  closeFormPopup() {
    this.isFormPopupOpen = false;
  }

  // 근무시간 등록 팝업 오픈
  @action
  handleAddButton() {}

  // [조회] 공통
  @action
  search() {
    const apiParam = {};

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
        return ApiService.post('work-time-settings/list.do', apiParam).then(
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

export default DeptTimeSettingStore;
