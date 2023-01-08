/* global */

import { observable, action, runInAction } from 'mobx';
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

  // 상세 페이지로 이동시키기
  @action
  goFormPage(commuteInfo) {
    const { baesDateStr, userId } = commuteInfo;
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
}

export default CommuteListStore;
