/* global reactPageType */

import { observable, action, runInAction, computed } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import CommuteDayUpdateModalStore from './CommuteDayUpdateModalStore';
import moment from 'moment';
import ModalService from 'service/ModalService';

/*
  
  개인 출퇴근 store

*/

class CommuteDaySubmitModalStore extends CommuteDayUpdateModalStore {
  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
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
            let searchList = data.list || [];
            searchList.forEach((searchInfo) => {
              if (searchInfo.startWorkDate) {
                searchInfo.startWorkDate = moment(
                  searchInfo.startWorkDate
                ).toDate();
              }
              if (searchInfo.outWorkDate) {
                searchInfo.outWorkDate = moment(
                  searchInfo.outWorkDate
                ).toDate();
              }
              if (searchInfo.finalStartWorkDate) {
                searchInfo.finalStartWorkDate = moment(
                  searchInfo.finalStartWorkDate
                ).toDate();
              }
              if (searchInfo.finalOutWorkDate) {
                searchInfo.finalOutWorkDate = moment(
                  searchInfo.finalOutWorkDate
                ).toDate();
              }
            });
            return {
              data: searchList,
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
    const profile = this.rootStore.appStore.profile;
    const apiParam = {};
    apiParam.baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.deptKey = profile.dept_key;
    apiParam.deptId = profile.dept_key;
    ApiService.post('commute-depts/submit-validate-count.do', apiParam).then(
      (response) => {
        const data = response.data;
        if (data > 0) {
          Helper.toastMessage(
            '출근시간 또는 퇴근시간 중 미제출 내역이 있습니다.',
            '',
            'warning'
          );
          alert('출근시간 또는 퇴근시간 중 미제출 내역이 있습니다.');
        } else {
          ModalService.confirm({
            content: '출퇴근을 제출 하시겠습니까?',
            ok: () => {
              ApiService.post('commute-depts/submit.do', apiParam).then(() => {
                Helper.toastMessage('출퇴근 기록을 제출하였습니다.');
                this.getCommuteDeptDetailInfo();
                this.search();
              });
            }
          });
        }
      }
    );
  }

  @action
  clear() {}
}

export default CommuteDaySubmitModalStore;
