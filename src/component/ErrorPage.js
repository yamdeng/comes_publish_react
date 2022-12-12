import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 로그인이 않되어있을 경우 가이드 페이지

    route : ROOT

    store
     -appStore

*/
@withRouter
@inject('appStore')
@observer
class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // 로그아웃
    this.logout = this.logout.bind(this);
  }

  logout() {}

  render() {
    return (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="content_area">
          <div className="">
            {/* 실패 */}
            <div className="center">
              <p className="error_txt ">
                <strong className="bold">서비스 장애 안내</strong>
                <br />
                <br /> 현재 서비스 장애로 인해
                <br /> 이용이 제한되고 있습니다.
                <br />
                <br /> 빠른 복구를 위해 최선을 다하겠습니다.
              </p>
              <button
                className="btn_text btn_green c_mt25"
                onClick={() => this.refreshPage()}
              >
                홈으로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
