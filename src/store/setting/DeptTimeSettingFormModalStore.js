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

class DeptTimeSettingFormModalStore {
  // 근무시간 폼 팝업 오픈 여부
  @observable
  isFormPopupOpen = false;

  // 폼 등록 / 수정 유형 : ADD, EDIT
  @observable
  formType = 'ADD';

  // 선택한 deptId 정보
  @observable
  currentDeptId = null;

  // 출근시간 적용 부서 목록
  @observable
  commuteDeptTargetList = [];

  // 이하는 input 정보
  @observable
  timeName = '';
  @observable
  workLocation = '';
  @observable
  timeDescription = '';
  @observable
  workStartTime = '09:00';
  @observable
  workEndTime = '18:00';
  @observable
  lunchStartTime = '12:00';
  @observable
  lunchEndTime = '13:00';
  @observable
  applyStartDate = null;
  @observable
  applyEndDate = null;
  @observable
  endNotLimitYn = 'N';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  changeInput(inputName, value) {
    this[inputName] = value;
  }

  @action
  changeEndNotLimitYn(endNotLimitYn) {
    this.endNotLimitYn = endNotLimitYn;
    if (endNotLimitYn === 'Y') {
      this.applyEndDate = null;
    }
  }

  @action
  changeApplyStartDate(applyStartDate) {
    this.applyStartDate = applyStartDate;
  }

  @action
  changeApplyEndDate(applyEndDate) {
    this.applyEndDate = applyEndDate;
  }

  @action
  changeCurrentDeptId(currentDeptId) {
    this.currentDeptId = currentDeptId;
  }

  @action
  validateForm() {
    if (!this.currentDeptId) {
      alert('부서를 선택해주세요.');
      return false;
    }
    if (!this.timeName) {
      alert('근무시간명을 입력해주세요.');
      return false;
    }
    if (!this.applyStartDate) {
      alert('적용기간 시작일을 선택해주세요.');
      return false;
    }
    if (this.endNotLimitYn === 'N') {
      if (!this.applyEndDate) {
        alert('적용기간 종료일을 선택해주세요.');
        return false;
      }
    }
    if (this.applyStartDate && this.applyEndDate) {
      const dateValidateSuccess = Helper.validteRangeDate(
        moment(this.applyStartDate),
        moment(this.applyEndDate)
      );
      if (!dateValidateSuccess) {
        alert('종료일은 시작일 보다 클 수 없습니다.');
        return false;
      }
    }
    if (
      moment(this.workStartTime, 'hh:mm').diff(
        moment(this.workEndTime, 'hh:mm')
      ) > 0
    ) {
      alert('근무시작 시간이 근무종료 시간 보다 클 수 없습니다.');
      return false;
    }

    if (
      moment(this.lunchStartTime, 'hh:mm').diff(
        moment(this.lunchEndTime, 'hh:mm')
      ) > 0
    ) {
      alert('점심시작 시간이 점심종료 시간 보다 클 수 없습니다.');
      return false;
    }
    return true;
  }

  // 팝업 오픈
  @action
  openFormPopup(formType, currentDeptId) {
    this.isFormPopupOpen = true;
    this.formType = formType;
    this.currentDeptId = currentDeptId;
    this.getCommuteDeptTargetList();
    if (formType === 'EDIT') {
      this.getDeptTimeWorkSettingInfo(currentDeptId);
    } else {
      this.clear();
    }
  }

  // 팝업 종료
  @action
  closeFormPopup() {
    this.isFormPopupOpen = false;
  }

  // 부서 적용 타겟 대상 가져오기
  @action
  getCommuteDeptTargetList() {
    const formType = this.formType;
    ApiService.post('work-time-settings/list.do', {
      pageSize: null,
      offset: null
    }).then((response) => {
      const data = response.data;
      const alreadyList = data.list || [];
      ApiService.post('commute-depts/dept-target-list.do').then((response) => {
        const list = response.data || [];
        let filterList = list;
        if (formType === 'ADD') {
          filterList = list.filter((listInfo) => {
            const searchIndex = alreadyList.findIndex(
              (info) => info.deptId === listInfo.deptKey
            );
            return searchIndex !== -1 ? false : true;
          });
          filterList = [
            { deptName: '부서를 선택해주세요', deptKey: '' }
          ].concat(filterList);
        }
        runInAction(() => {
          this.commuteDeptTargetList = filterList;
        });
      });
    });
  }

  // 근무시간 설정 정보 가져오기
  @action
  getDeptTimeWorkSettingInfo(currentDeptId) {
    // 기존 상세 정보 로드
    const apiParam = { deptId: currentDeptId };
    ApiService.post('work-time-settings/detail.do', apiParam).then(
      (response) => {
        const detailInfo = response.data;
        const {
          deptId,
          timeName,
          workLocation,
          timeDescription,
          workStartTime,
          workEndTime,
          lunchStartTime,
          lunchEndTime,
          applyStartDateStr,
          applyEndDateStr
        } = detailInfo;
        runInAction(() => {
          this.currentDeptId = deptId;
          this.timeName = timeName;
          this.workLocation = workLocation;
          this.timeDescription = timeDescription;
          this.workStartTime = workStartTime;
          this.workEndTime = workEndTime;
          this.lunchStartTime = lunchStartTime;
          this.lunchEndTime = lunchEndTime;
          this.timeName = timeName;
          if (applyStartDateStr) {
            this.applyStartDate = moment(applyStartDateStr).toDate();
          }
          if (applyEndDateStr) {
            this.applyEndDate = moment(applyEndDateStr).toDate();
            this.endNotLimitYn = 'N';
          } else {
            this.endNotLimitYn = 'Y';
          }
        });
      }
    );
  }

  // 저장
  @action
  save() {
    if (!this.validateForm()) {
      return;
    }
    const timeName = this.timeName;
    const workLocation = this.workLocation;
    const timeDescription = this.timeDescription;
    const workStartTime = this.workStartTime;
    const workEndTime = this.workEndTime;
    const lunchStartTime = this.lunchStartTime;
    const lunchEndTime = this.lunchEndTime;
    const applyStartDate = this.applyStartDate;
    const applyEndDate = this.applyEndDate;
    const formType = this.formType;
    const deptId = this.currentDeptId;

    const apiParam = {
      timeName,
      workLocation,
      timeDescription,
      workStartTime,
      workEndTime,
      lunchStartTime,
      lunchEndTime,
      deptId
    };
    apiParam.applyStartDateStr = moment(applyStartDate).format('YYYYMMDD');
    if (applyEndDate) {
      apiParam.applyEndDateStr = moment(applyEndDate).format('YYYYMMDD');
    } else {
      apiParam.applyEndDateStr = '';
    }
    let apiUrl = 'work-time-settings/add.do';
    if (formType === 'EDIT') {
      apiUrl = 'work-time-settings/update.do';
    }
    ApiService.post(apiUrl, apiParam).then((response) => {
      Helper.toastMessage('근무시간이 저장되었습니다.');
      this.rootStore.deptTimeSettingStore.search();
    });
  }

  @action
  clear() {
    this.currentDeptId = null;
    this.commuteDeptTargetList = [];
    this.timeName = '';
    this.workLocation = '';
    this.timeDescription = '';
    this.workStartTime = '09:00';
    this.workEndTime = '18:00';
    this.lunchStartTime = '12:00';
    this.lunchEndTime = '13:00';
    this.applyStartDate = moment().toDate();
    this.applyEndDate = moment().toDate();
    this.endNotLimitYn = 'N';
  }
}

export default DeptTimeSettingFormModalStore;
