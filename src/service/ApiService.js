import Api from 'util/Api';

/*

  ajax 서버 api 요청 공통 인터페이스
   : config는 axios에 전달되는 정보
    (headers, timeout, disableLoadingBar, disableServerErrorHandle, disableServerCommonErrorHandle)

*/

const apiPrefixUri = '/api/v1';

class ApiService {
  // http get method 요청
  get(apiUrl, params, config) {
    config = config || {};
    config.params = params;
    return Api.get(apiPrefixUri + '/' + apiUrl, config);
  }

  // http post method 요청
  post(apiUrl, body, config) {
    body = body || {};
    return Api.post(apiPrefixUri + '/' + apiUrl, body, config);
  }

  // http put method 요청
  put(apiUrl, body, config) {
    body = body || {};
    return Api.put(apiPrefixUri + '/' + apiUrl, body, config);
  }

  // http delete method 요청
  delete(apiUrl, config) {
    return Api.delete(apiPrefixUri + '/' + apiUrl, config);
  }
}

export default new ApiService();
