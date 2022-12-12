import axios from 'axios';
import Config from 'config/Config';
import LoadingBar from 'util/LoadingBar';
import rootStore from 'store/RootStore';

/*

  ajax 구현체 중복 처리 구현

*/

const Api = axios.create({
  baseURL: `${process.env.API_URL}/`,
  timeout: Config.apiTimeout,
  headers: { 'Content-Type': 'application/json' },
  disableLoadingBar: false
});

Api.defaults.timeout = Config.apiTimeout;
Api.defaults.headers.post['Content-Type'] = 'application/json';

// 요청 인터셉터
Api.interceptors.request.use(
  function (config) {
    if (!config.disableLoadingBar) {
      LoadingBar.show();
    }
    let token = rootStore.appStore.token;
    config.headers['Authorization'] = token;
    return config;
  },
  function (error) {
    LoadingBar.hide();
    return Promise.reject(error);
  }
);

// 응답 인터셉터
Api.interceptors.response.use(
  function (response) {
    LoadingBar.hide();
    return response;
  },
  function (error) {
    let errorResponse = error.response || {};
    let status = errorResponse.status;
    let requestConfig = error.config;
    if (error && error.response) {
      if (!requestConfig.disableServerErrorHandle) {
        // 항상 체크하는 서버 에러
        if (status === 400) {
          // 입력값 오류는 json 구조가 틀림
          rootStore.appStore.handleRequestInputFieldError(error);
        } else if (status === 401) {
          // 인증 에러
          rootStore.appStore.handleUnauthorizedError(error);
        } else if (status === 404) {
          // 404 not found error
          rootStore.appStore.handle404StatusError(error.config.url);
        } else if (status === 503) {
          // 서버 재시작
          rootStore.appStore.handle503StatusError(error);
        } else {
          if (!requestConfig.disableServerCommonErrorHandle) {
            rootStore.appStore.handleServerCommonError(error);
          }
        }
      }
    } else {
      // error.response가 존재하지 않는 경우 : 서버에서 http option method 오류시 response 값이 없을 수가 있음
      rootStore.appStore.handleNoResponseError(error);
    }
    LoadingBar.hide();
    return Promise.reject(error);
  }
);

export default Api;
