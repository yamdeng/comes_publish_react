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
    const selectedRows = this.selectedRows;
    // TODO
    let apiParam = {};
    ApiService.post('', apiParam).then((response) => {
      runInAction((resoponse) => {
        const data = response.data;
        // this.baseYear = baseYear;
      });
    });
  }

  // 조회
  @action
  search() {
    const baseYear = this.baseYear;
    let apiParam = {};
    apiParam.baseYear = baseYear;
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
