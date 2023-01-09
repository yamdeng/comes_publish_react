/* global */

import { observable, action, runInAction, computed } from 'mobx';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import moment from 'moment';
import ModalService from 'service/ModalService';

class CommuteListStore {
  // 업무보고 목록
  @observable
  list = [];

  // 검색일자
  @observable
  searchDate = moment().toDate();

  // 일 datepicker 오픈 여부
  @observable
  dayDatepickerOpend = false;

  // 현재 부서_출퇴근 제출 정보
  @observable
  commuteDeptSubmitInfo = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchDate = moment().toDate();
  }

  // 일 datepicker 변경
  @action
  changeSearchDate(searchDate) {
    this.searchDate = searchDate;
    this.dayDatepickerOpend = false;
    this.search();
  }
  @action
  openDayDatepicker() {
    this.dayDatepickerOpend = true;
  }

  // 일 datepicker 닫기
  @action
  closeDayDatepicker() {
    this.dayDatepickerOpend = false;
  }

  // 제출
  @action
  submit() {
    // 제출가능여부 체크
    if (!this.isSubmitAvailable) {
      Helper.toastMessage('제출가능한 상태가 아닙니다.', '', 'warning');
      return;
    }
    if (!this.list || !this.list.length) {
      Helper.toastMessage('제출대상이 존재하지 않습니다.', '', 'warning');
      return;
    }
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
        } else {
          ModalService.confirm({
            content: '출퇴근을 제출 하시겠습니까?',
            ok: () => {
              ApiService.post('commute-depts/submit.do', apiParam).then(() => {
                Helper.toastMessage('출퇴근 기록을 제출하였습니다.');
              });
            }
          });
        }
      }
    );
  }

  @action
  search() {
    const appStore = this.rootStore.appStore;
    const profile = appStore.profile;
    const apiParam = {};
    apiParam.baseDateStr = Helper.dateToString(this.searchDate, 'YYYYMMDD');
    apiParam.deptKey = profile.dept_key;

    ApiService.post('commutes/list-to-submit.do', apiParam).then((response) => {
      const data = response.data;
      let searchList = data.list || [];
      searchList.forEach((searchInfo) => {
        if (searchInfo.startWorkDate) {
          searchInfo.startWorkDate = moment(searchInfo.startWorkDate).toDate();
        }
        if (searchInfo.outWorkDate) {
          searchInfo.outWorkDate = moment(searchInfo.outWorkDate).toDate();
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
      runInAction(() => {
        this.list = searchList;
      });
    });
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

  // 제출 가능 여부
  @computed
  get isSubmitAvailable() {
    let available = false;
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
    return available;
  }
}

export default CommuteListStore;
