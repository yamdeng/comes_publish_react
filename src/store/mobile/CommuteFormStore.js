/* global */

import { observable, action, runInAction } from 'mobx';
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
  workResultcode = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 일일출퇴근 정보 가져오기
  @action
  getCommuteDetailInfo(baseDateStr, userId) {
    this.baseDateStr = baseDateStr;
    this.userId = userId;
    const apiParam = { baseDateStr, userId };
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
  changeFinalOuttWorkDate(finalOutWorkDate) {
    this.isOutWorkDateChange = true;
    this.finalOutWorkDate = finalOutWorkDate;
  }

  // 외근여부 변경
  changeOutsideWorkYn(outsideWorkYn) {
    this.outsideWorkYn = outsideWorkYn;
  }

  // 기타설명 변경
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
  updateBatch() {
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

  @action
  clear() {}
}

export default CommuteFormStore;
