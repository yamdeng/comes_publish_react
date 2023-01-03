import { observable, action, computed } from 'mobx';
import ModalService from 'service/ModalService';
import Helper from 'util/Helper';
import Logger from 'util/Logger';

/*
  
  전역 data manage store

*/
class AppStore {
  // 로그인 회원 정보
  @observable
  profile = null;

  // 사용자유형
  @observable
  userType = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 로그인 회원 정보 / 서버 인증 토큰 최신화
  @action
  setLoginInfo(profile, token) {
    this.profile = profile;
    Helper.saveInfoToLocalStorage('profile', profile);
  }

  // 로그아웃
  @action
  logout() {
    this.profile = null;
    this.token = '';
    Helper.removeInfoToLocalStorage('profile');
    const { uiStore } = this.rootStore;
    uiStore.goPage('/');
  }

  // 400 status code 에러 처리
  handleRequestInputFieldError(httpError) {
    let modalData = { body: '입력 필드를 다시 확인해주세요.' };
    ModalService.alert(modalData);
  }

  // 인증오류 : http status 401 error
  @action
  handleUnauthorizedError(httpError) {
    // status 401 에러 처리(인증 오류)
    let modalData = {
      body: '인증정보가 없어 로그아웃 됩니다.',
      ok: () => {
        this.logout();
      }
    };
    ModalService.alert(modalData);
  }

  // 404 status code 에러 처리
  handle404StatusError(url) {
    let errorMessage =
      '올바르지 않은 url 입니다.(' + url + ')<br/>관리자에게 문의해주세요';
    ModalService.alert({ body: errorMessage });
  }

  // 503 status code 에러 처리
  handle503StatusError(httpError) {
    let response = httpError.response;
    let data = (response && response.data) || null;
    let errorMessage = '서버 재시작 중입니다.';
    if (data && data.message) {
      errorMessage = data.message;
    }
    ModalService.alert({ body: errorMessage });
  }

  // 그외 서버 공통 에러 처리
  handleServerCommonError(httpError) {
    let response = httpError.response;
    let data = response.data || {};
    let serverErrorMessage = data.message || '알수없는 서버 오류입니다';
    if (serverErrorMessage) {
      serverErrorMessage = serverErrorMessage.replace(/\\n/g, '<br/>');
    }
    let modalData = {
      body: serverErrorMessage
    };
    ModalService.alert(modalData);
    Logger.error(serverErrorMessage, response.status);
  }

  getUserType() {
    let userType = '';
    if (this.profile) {
      return this.profile.userType;
    }
    return userType;
  }

  getChildDeptListByUpperKey(upperKey) {
    const profile = this.profile;
    const childDeptList = profile.childDeptList || [];
    if (upperKey === 'ALL') {
      return childDeptList;
    } else {
      return childDeptList.filter((info) => info.upperDeptKey === upperKey);
    }
  }

  // 관리자인 경우
  @computed
  get isAdmin() {
    let success = false;
    let profile = this.profile;
    if (profile) {
      if (profile.userType === 'ADMIN') {
        success = true;
      }
    }
    return success;
  }

  // 팀장인 경우
  @computed
  get isManager() {
    let success = false;
    let profile = this.profile;
    if (profile) {
      if (profile.userType === 'MANAGER') {
        success = true;
      }
    }
    return success;
  }

  @computed
  get childDeptIdList() {
    let profile = this.profile;
    let childDeptList = profile.childDeptList;
    let childDeptIdList = [];
    if (childDeptList || childDeptList.length) {
      childDeptIdList = childDeptList.map((deptInfo) => deptInfo.deptKey);
    }
    return childDeptIdList;
  }

  @action
  clear() {
    this.profile = null;
  }
}

export default AppStore;
