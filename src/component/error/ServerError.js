import React, { Component } from 'react';

class ServerError extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <div className="" style={{ marginTop: '100px' }}>
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
    );
  }
}

export default ServerError;
