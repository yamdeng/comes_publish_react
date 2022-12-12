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

  // 서버 인증 토큰
  @observable
  token = '';

  // 에러
  @observable
  isError = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    // this.profile = Helper.getByLocalStorage('profile') || null;
    // this.token = Helper.getByLocalStorage('token') || '';
    this.profile = { name: '이홍석', deptName: '개발팀', positionName: '과장' };
    this.token = 'test-token';
  }

  // 프로필 정보 가져오기
  @action
  getProfile() {
    // ApiService.get('auth/profile').then(({ data }) => {
    //   this.setLoginInfo(data);
    // });
  }

  // 로그인 회원 정보 / 서버 인증 토큰 최신화
  @action
  setLoginInfo(profile, token) {
    this.profile = profile;
    if (token) {
      this.token = token;
      Helper.saveInfoToLocalStorage('token', token);
    }
    Helper.saveInfoToLocalStorage('profile', profile);
  }

  // 로그아웃
  @action
  logout() {
    this.profile = null;
    this.token = '';
    Helper.removeInfoToLocalStorage('profile');
    Helper.removeInfoToLocalStorage('token');
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

  // 웹뷰 reload
  reloadApp() {
    document.location.href = '/' + process.env.PUBLIC_URL;
  }

  // 관리자인 경우
  @computed
  get isAdmin() {
    let success = false;
    let profile = this.profile;
    if (profile) {
      if (profile.isAdmin) {
        success = true;
      }
    }
    return success;
  }

  @action
  changeIsError(isError) {
    this.isError = isError;
  }

  @action
  clear() {
    this.profile = null;
    this.token = '';
    this.isError = false;
  }
}

export default AppStore;
