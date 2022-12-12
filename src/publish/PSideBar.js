import React, { Component } from 'react';

import logo from 'resources/images/ktLogo.png';

class PSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webToggle: true,
      isDarkTheme: false
    };
    this.webMenuToggle = this.webMenuToggle.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  webMenuToggle() {
    this.setState({
      webToggle: !this.state.webToggle
    });
  }

  toggleTheme() {
    let { isDarkTheme } = this.state;
    if (isDarkTheme) {
      $('body').removeClass('dark-theme');
    } else {
      $('body').addClass('dark-theme');
    }
    this.setState({ isDarkTheme: !isDarkTheme });
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="top_menu_toggle">
          <button className="toggle_btn" onClick={this.webMenuToggle}>
            <i class="fas fa-bars"></i>
          </button>
          <h1 className="">
            <img src={logo} alt="" />
            <span>SAFETY-DOC</span>
          </h1>
          <div className="mode_change">
            <input
              type="checkbox"
              id="switch"
              name="switch"
              className="input_on_off"
            />
            <label for="switch" className="label_on_off">
              <span className="marble"></span> <span className="on">dark</span>
              <span class="off">light</span>
            </label>
          </div>
        </div>
        <div className={this.state.webToggle ? 'menu_side' : 'menu_side hide'}>
          <div className="menu_area">
            <div className="menu_wrap">
              <ul className="dep_1">
                <li className="active">
                  <p>
                    <span className="icon ablc">대</span>대시보드
                    <span className="abrc">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                  </p>
                  <ul class="dep_2">
                    <li className="active">
                      <p>
                        서브 대시보드
                        <span className="abrc">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </p>
                      <ul className="dep_3">
                        <li className="active">
                          <p>서서브 대시보드</p>
                        </li>
                        <li>
                          <p>서서브 대시보드</p>
                        </li>
                        <li>
                          <p>서서브 대시보드</p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>서브 대시보드</p>
                    </li>
                    <li>
                      <p>
                        서브 대시보드
                        <span className="abrc">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </p>
                      <ul class="dep_3">
                        <li>
                          <p>서서브 대시보드</p>
                        </li>
                        <li>
                          <p>서서브 대시보드</p>
                        </li>
                        <li>
                          <p>서서브 대시보드</p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    <span className="icon ablc">대</span>대시보드
                    <span className="abrc">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                  </p>
                  <ul class="dep_2">
                    <li>
                      <p>
                        서브 대시보드
                        <span className="abrc">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </p>
                      <ul class="dep_3">
                        <li>
                          <p>서서브 대시보드</p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    <span className="icon ablc">대</span>대시보드
                    <span className="abrc">
                      <i class="fas fa-chevron-right"></i>
                    </span>
                  </p>
                  <ul class="dep_2">
                    <li>
                      <p>
                        서브 대시보드
                        <span className="abrc">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* <button className="toggle_dark_mode" onClick={this.toggleTheme}>
              다크모드 토글
            </button> */}
          </div>
        </div>
        <span className={this.state.webToggle ? 'menu_bg' : 'menu_bg active'}>
          &nbsp;
        </span>
      </React.Fragment>
    );
  }
}

export default PSideBar;
