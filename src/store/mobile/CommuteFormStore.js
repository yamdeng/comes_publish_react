/* global */

import { observable, action, runInAction, computed } from 'mobx';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import moment from 'moment';
import ModalService from 'service/ModalService';

class CommuteFormStore {
  baseDateStr = null;
  userId = null;

  @observable
  commuteDetailInfo = null;

  @observable
  commuteDeptSubmitInfo = null;

  // 출근시간, 퇴근시간 관련 속성
  @observable
  isStartWorkDateChange = false;
  @observable
  isOutWorkDateChange = false;
  @observable
  finalStartWorkDate = null;
  @observable
  finalOutWorkDate = null;

  // 외근여부
  @observable
  outsideWorkYn = 'N';

  // 기타설명
  @observable
  etcDescription = '';

  // 근태결과
  @observable
  workResultCode = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 일일출퇴근 정보 가져오기
  @action
  getCommuteDetailInfo(baseDateStr, userId) {
    this.baseDateStr = baseDateStr;
    this.userId = userId;
    const apiParam = { baseDateStr, userId };
    this.getCommuteDeptDetailInfo();
    ApiService.post('commutes/detail.do', apiParam).then((response) => {
      const data = response.data;
      runInAction(() => {
        let {
          startWorkDate,
          finalStartWorkDate,
          outWorkDate,
          finalOutWorkDate,
          etcDescription,
          outsideWorkYn,
          workResultCode
        } = data;
        this.etcDescription = etcDescription;
        this.workResultCode = workResultCode;
        this.outsideWorkYn = outsideWorkYn;
        if (finalStartWorkDate) {
          this.finalStartWorkDate = moment(finalStartWorkDate).toDate();
        } else if (startWorkDate) {
          this.finalStartWorkDate = moment(startWorkDate).toDate();
        }

        if (finalOutWorkDate) {
          this.finalOutWorkDate = moment(finalOutWorkDate).toDate();
        } else if (outWorkDate) {
          this.finalOutWorkDate = moment(outWorkDate).toDate();
        }
        this.commuteDetailInfo = data;
      });
    });
  }

  // 출근시간 변경
  @action
  changeFinalStartWorkDate(finalStartWorkDate) {
    this.isStartWorkDateChange = true;
    this.finalStartWorkDate = finalStartWorkDate;
  }

  // 퇴근시간 변경
  @action
  changeFinalOutWorkDate(finalOutWorkDate) {
    this.isOutWorkDateChange = true;
    this.finalOutWorkDate = finalOutWorkDate;
  }

  // 외근여부 변경
  @action
  changeOutsideWorkYn(outsideWorkYn) {
    this.outsideWorkYn = outsideWorkYn;
  }

  // 기타설명 변경
  @action
  changeEtcDescription(etcDescription) {
    this.etcDescription = etcDescription;
  }

  // 근태결과
  @observable
  changeWorkResultCode(workResultCode) {
    this.workResultCode = workResultCode;
  }

  // 수정
  @action
  save() {
    if (!this.isUpdateAvailable) {
      Helper.toastMessage('수정가능한 상태가 아닙니다.', '', 'warning');
      return;
    }
    const profile = this.rootStore.appStore.profile;
    const deptId = profile.dept_key;
    const baseDateStr = this.baseDateStr;
    const userId = this.userId;
    const finalStartWorkDate = this.finalStartWorkDate;
    const finalOutWorkDate = this.finalOutWorkDate;
    const outsideWorkYn = this.outsideWorkYn;
    const etcDescription = this.etcDescription;
    const workResultCode = this.workResultCode;
    ModalService.confirm({
      content: '출퇴근을 수정 하시겠습니까?',
      ok: () => {
        const apiParamInfo = {};
        apiParamInfo.deptKey = deptId;
        apiParamInfo.baseDateStr = baseDateStr;
        apiParamInfo.userId = userId;
        if (this.isStartWorkDateChange) {
          if (finalStartWorkDate) {
            apiParamInfo.finalStartWorkDate = moment(finalStartWorkDate).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          }
        }
        if (this.isOutWorkDateChange) {
          if (finalOutWorkDate) {
            apiParamInfo.finalOutWorkDate = moment(finalOutWorkDate).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          }
        }

        apiParamInfo.outsideWorkYn = outsideWorkYn;
        apiParamInfo.etcDescription = etcDescription;
        apiParamInfo.workResultCode = workResultCode;
        ApiService.put('commutes/update.do', {
          dayList: [apiParamInfo]
        }).then((response) => {
          runInAction(() => {
            Helper.toastMessage('출퇴근 기록이 수정되었습니다.');
          });
        });
      }
    });
  }

  // 부서_출퇴근 상세 정보 조회
  @action
  getCommuteDeptDetailInfo() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {};
    apiParam.baseDateStr = this.baseDateStr;
    apiParam.deptId = profile.dept_key;
    ApiService.post('commute-depts/detail.do', apiParam).then((response) => {
      let detailInfo = response.data;
      runInAction(() => {
        this.commuteDeptSubmitInfo = detailInfo;
      });
    });
  }

  // 수정 가능 여부
  @computed
  get isUpdateAvailable() {
    let available = false;
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
    return available;
  }

  @action
  clear() {}
}

export default CommuteFormStore;
