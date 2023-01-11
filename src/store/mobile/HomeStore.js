/* global */

import { observable, action, runInAction } from 'mobx';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';
import Constant from 'config/Constant';
import _ from 'lodash';
import moment from 'moment';
import ModalService from 'service/ModalService';

class HomeStore {
  // 오늘 일일 출퇴근 정보
  @observable
  todayCommuteDayInfo = null;

  // 회사안 업무 여부 : Y / N
  @observable
  inWorkYn = 'Y';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 업무 / 재텩 여부 변경
  @action
  changeInWorkYn(inWorkYn) {
    this.inWorkYn = inWorkYn;
  }

  // 오늘 근무정보 가져오기
  @action
  getTodayCommuteDayInfo() {
    const profile = this.rootStore.appStore.profile;
    const apiParam = {
      baseDateStr: moment().format('YYYYMMDD')
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }
    ApiService.post('commutes/detail.do', apiParam).then((response) => {
      const detailInfo = response.data;
      runInAction(() => {
        this.todayCommuteDayInfo = detailInfo;
        if (detailInfo.inWorkYn) {
          this.inWorkYn = detailInfo.inWorkYn;
        }
      });
    });
  }

  // [출근] 액션
  @action
  startWork() {
    const profile = this.rootStore.appStore.profile;
    const todayCommuteDayInfo = this.todayCommuteDayInfo;
    const inWorkYn = this.inWorkYn;

    if (todayCommuteDayInfo && todayCommuteDayInfo.startWorkDate) {
      // Helper.toastMessage('이미 출근 체크를 진행하였습니다.', '', 'warning');
      return;
    }

    let baseDateStr = Helper.getTodayString();
    if (todayCommuteDayInfo) {
      baseDateStr = todayCommuteDayInfo.baseDateStr;
    }

    const apiParam = {
      inWorkYn: inWorkYn,
      baseDateStr: baseDateStr,
      userId: profile.user_key
    };

    let confirmMessage =
      '출근 체크를 하시겠습니까?' +
      (this.inWorkYn === 'Y' ? '(업무)' : '(재택)');

    ModalService.confirm({
      content: confirmMessage,
      ok: () => {
        ApiService.put('commutes/startWork.do', apiParam).then((response) => {
          const detailInfo = response.data;
          Helper.toastMessage('출근 체크를 완료하였습니다.');
          runInAction(() => {
            this.todayCommuteDayInfo = detailInfo;
          });
        });
      }
    });
  }

  // [퇴근] 액션
  @action
  outWork() {
    const profile = this.rootStore.appStore.profile;
    const todayCommuteDayInfo = this.todayCommuteDayInfo;
    const apiParam = {
      inWorkYn: this.inWorkYn,
      baseDateStr: todayCommuteDayInfo.baseDateStr
    };
    if (profile) {
      apiParam.userId = profile.user_key;
    }

    if (todayCommuteDayInfo && todayCommuteDayInfo.outWorkDate) {
      // Helper.toastMessage('이미 퇴근 체크를 진행하였습니다.', '', 'warning');
      return;
    }
    if (!todayCommuteDayInfo || !todayCommuteDayInfo.startWorkDate) {
      Helper.toastMessage(
        '퇴근은 체크는 출근을 먼저 체크해야합니다.',
        '',
        'warning'
      );
      return;
    }
    let confirmMessage = '퇴근 체크를 하시겠습니까?';
    ModalService.confirm({
      content: confirmMessage,
      ok: () => {
        ApiService.put('commutes/outWork.do', apiParam).then((response) => {
          const detailInfo = response.data;
          Helper.toastMessage('퇴근 체크를 완료하였습니다.');
          runInAction(() => {
            this.todayCommuteDayInfo = detailInfo;
          });
        });
      }
    });
  }

  @action
  clear() {}
}

export default HomeStore;
