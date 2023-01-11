/* global reactPageType */

import { observable, action, runInAction, computed, toJS } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import ModalService from 'service/ModalService';
import { Modal } from 'reactstrap';

/*
  
  개인 출퇴근 store

*/

class CommuteDayUpdateModalStore {
  // datagridRef
  dataGridRef = null;

  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = null;

  // 변경된 grid row
  @observable
  updateRows = [];

  // 검색 일
  @observable
  searchDate = '';

  // 일 datepicker 오픈 여부
  @observable
  dayDatepickerOpend = false;

  // totalCount
  @observable
  totalCount = 0;

  // 모달 visible 여부
  @observable
  visibleModal = false;

  // 현재 부서_출퇴근 제출 정보
  @observable
  commuteDeptSubmitInfo = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datagrid 컴포넌트 셋팅
  @action
  initDataGridComponent(dataGridRef) {
    this.dataGridRef = dataGridRef;
  }

  // pageIndex 초기화
  @action
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

  @action
  changeUpdateRows(changes) {
    this.updateRows = changes;
  }

  // 모달 오픈 : 조회 일 기준으로
  @action
  openModal(searchDate) {
    this.searchDate = searchDate;
    this.visibleModal = true;
    this.getCommuteDeptDetailInfo();
    this.search();
  }

  // 모달 닫기
  @action
  closeModal() {
    this.visibleModal = false;
    if (this.rootStore.commutePrivateStore) {
      this.rootStore.commutePrivateStore.search();
    }
  }

  // 부서_출퇴근 상세 정보 조회
  @action
  getCommuteDeptDetailInfo() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {};
    apiParam.baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.deptId = profile.dept_key;
    ApiService.post('commute-depts/detail.do', apiParam).then((response) => {
      let detailInfo = response.data;
      runInAction(() => {
        this.commuteDeptSubmitInfo = detailInfo;
      });
    });
  }

  // [조회] 공통
  @action
  search(disableRefresh) {
    // 초기화 조회시 모든 경우에 통계 정보 재조회
    if (!disableRefresh) {
      this.refreshPage();
    }
    this.updateRows = [];

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

  /* 일 datepicker 처리 start */
  // 일 datepicker 오픈
  @action
  openDayDatepicker() {
    this.dayDatepickerOpend = true;
  }

  // 일 datepicker 닫기
  @action
  closeDayDatepicker() {
    this.dayDatepickerOpend = false;
  }

  // 일 datepicker 변경
  @action
  changeSearchDate(searchDate) {
    this.searchDate = searchDate;
    this.dayDatepickerOpend = false;
    this.getCommuteDeptDetailInfo();
    this.search();
  }

  // 다음일
  @action
  nextDay() {
    this.searchDate = moment(this.searchDate).add(1, 'days').toDate();
    this.getCommuteDeptDetailInfo();
    this.search();
  }

  // 이전일
  @action
  prevDay() {
    this.searchDate = moment(this.searchDate).subtract(1, 'days').toDate();
    this.getCommuteDeptDetailInfo();
    this.search();
  }
  /* 일 datepicker 처리 end */

  // 수정
  @action
  updateBatch() {
    const profile = this.rootStore.appStore.profile;
    const deptId = profile.dept_key;
    const updateRows = toJS(this.updateRows);

    if (updateRows.length) {
      ModalService.confirm({
        content: '출퇴근을 수정 하시겠습니까?',
        ok: () => {
          const baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
          let dayList = updateRows.map((rowInfo) => {
            const info = rowInfo.data;
            info.deptKey = deptId;
            info.baseDateStr = baseDateStr;
            info.userId = rowInfo.key;
            if (info.finalStartWorkDate) {
              info.finalStartWorkDate = moment(info.finalStartWorkDate).format(
                'YYYY-MM-DD HH:mm:ss'
              );
            }
            if (info.finalOutWorkDate) {
              info.finalOutWorkDate = moment(info.finalOutWorkDate).format(
                'YYYY-MM-DD HH:mm:ss'
              );
            }
            if (info.startWorkDate) {
              delete info.startWorkDate;
            }
            if (info.outWorkDate) {
              delete info.outWorkDate;
            }
            return info;
          });
          ApiService.put('commutes/update.do', { dayList: dayList }).then(
            (response) => {
              runInAction(() => {
                this.search();
                this.getCommuteDeptDetailInfo();
                this.updateRows = [];
              });
            }
          );
        }
      });
    } else {
      // 수정한 이력이 없으면 메시지
      Helper.toastMessage('수정된 출근 정보가 없습니다.', '', 'warning');
      return Promise.resolve();
    }
  }

  // 수정 가능 여부
  @computed
  get isUpdateAvailable() {
    let available = false;
    const totalCount = this.totalCount;
    const commuteDeptSubmitInfo = this.commuteDeptSubmitInfo;
    if (!commuteDeptSubmitInfo) {
      // 출퇴근 정보가 존재하지 않으면 수정 가능
      available = true;
    } else {
      const { commuteSubmitStatusCode } = commuteDeptSubmitInfo;
      if (commuteSubmitStatusCode) {
        // 상태가 존재하고 반려인 경우만 수정 가능
        if (
          commuteSubmitStatusCode === Constant.CODE_COMMUTE_DEPT_STATUS_REJECT
        ) {
          available = true;
        }
      } else {
        // 상태 자체가 존재하지 않으면 수정 가능
        available = true;
      }
    }
    if (!totalCount) {
      available = false;
    }
    return available;
  }

  // 제출 가능 여부
  @computed
  get isSubmitAvailable() {
    let available = false;
    const totalCount = this.totalCount;
    const commuteDeptSubmitInfo = this.commuteDeptSubmitInfo;
    if (!commuteDeptSubmitInfo) {
      // 출퇴근 정보가 존재하지 않으면 제출 가능
      available = true;
    } else {
      const { commuteSubmitStatusCode } = commuteDeptSubmitInfo;
      if (commuteSubmitStatusCode) {
        // 상태가 존재하고 반려인 경우만 제출 가능
        if (
          commuteSubmitStatusCode === Constant.CODE_COMMUTE_DEPT_STATUS_REJECT
        ) {
          available = true;
        }
      } else {
        // 상태 자체가 존재하지 않으면 제출 가능
        available = true;
      }
    }
    if (!totalCount) {
      available = false;
    }
    return available;
  }

  @action
  clear() {}
}

export default CommuteDayUpdateModalStore;
