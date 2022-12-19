import { observable, action, runInAction } from 'mobx';
import FormStore from 'store/ui/FormStore';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';

/*
  
  개인 출퇴근 store

*/

class CommutePrivateStore {
  @observable
  datagridStore = null;

  // 날짜 변경
  @observable
  searchDate = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // TODO : 오늘 근무정보 가져오기

  // 출근 액션

  // 퇴근 액션

  // 선택한 월의 출퇴근 현황

  // [조회]
  search() {
    const store = new CustomStore({
      load(loadOptions) {
        return ApiService.get('commutes/list.do', { searchDateStr: '' }).then(
          (response) => {
            const data = response.data;
            return {
              data: data.list,
              totalCount: data.totalCount
            };
          }
        );
      }
    });

    runInAction(() => {
      this.datagridStore = store;
    });
  }

  @action
  clear() {}
}

export default CommutePrivateStore;
