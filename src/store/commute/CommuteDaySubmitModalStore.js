/* global reactPageType */

import { observable, action, runInAction, computed } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import CommuteDayUpdateModalStore from './CommuteDayUpdateModalStore';

/*
  
  개인 출퇴근 store

*/

class CommuteDaySubmitModalStore extends CommuteDayUpdateModalStore {
  constructor(rootStore) {
    super();
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

  // [조회] 공통
  @action
  search(disableRefresh) {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    if (!disableRefresh) {
      this.refreshPage();
    }

    const profile = this.rootStore.appStore.profile;
    const apiParam = {};
    apiParam.baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.deptKey = profile.dept_key;

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

  @action
  clear() {}
}

export default CommuteDaySubmitModalStore;
