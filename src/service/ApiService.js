import Api from 'util/Api';

/*

  ajax 서버 api 요청 공통 인터페이스
   : config는 axios에 전달되는 정보
    (headers, timeout, disableLoadingBar, disableServerErrorHandle, disableServerCommonErrorHandle)

*/

class ApiService {
  // http get method 요청
  get(apiUrl, params, config) {
    config = config || {};
    config.params = params;
    return Api.get(apiUrl, config);
  }

  // http post method 요청
  post(apiUrl, body, config) {
    body = body || {};
    return Api.post(apiUrl, body, config);
  }

  // http put method 요청
  put(apiUrl, body, config) {
    body = body || {};
    return Api.put(apiUrl, body, config);
  }

  // http delete method 요청
  delete(apiUrl, config) {
    return Api.delete(apiUrl, config);
  }
}

export default new ApiService();
