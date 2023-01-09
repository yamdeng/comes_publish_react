import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Constant from 'config/Constant';
import Helper from 'util/Helper';

// import logo from 'resources/images/ktLogo.png';
// import PROFILE from 'resources/images/profile.jpeg';

/*

  좌측 메뉴

*/
@withRouter
@inject('appStore', 'uiStore')
@observer
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // 좌측 최상단 메뉴 메뉴 버튼 토글
    this.toggleSideMenu = this.toggleSideMenu.bind(this);

    // 메뉴 토글
    this.toggle1DepthMenu = this.toggle1DepthMenu.bind(this);

    // 메뉴 선택
    this.selectMenu = this.selectMenu.bind(this);
  }

  toggleSideMenu() {
    let { uiStore } = this.props;
    uiStore.toggleSideMenu();
  }

  toggle1DepthMenu(menuName) {
    let { uiStore } = this.props;
    uiStore.toggle1DepthMenu(menuName);
  }

  selectMenu(menuInfo) {
    let { uiStore } = this.props;
    uiStore.selectMenu(menuInfo);
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
    let { uiStore, appStore } = this.props;
    let { profile } = appStore;
    const { userType, user_name, dept_name } = profile;
    let { displaySideMenu } = uiStore;
    return (
      <div
        class="mobile_nav_wrap"
        style={{ display: displaySideMenu ? '' : 'none' }}
      >
        <div id="mobile_nav">
          <div class="nav_box">
            <div class="login_box">
              <div class="u_photo">
                <img
                  class="profile"
                  alt="로그인 유저 사진"
                  src={`${process.env.RESOURCE_URL}/images/no_image.png`}
                />
              </div>
              <div class="u_info">
                <p>{dept_name}</p>
                <p>
                  <span class="u_name">{user_name}</span>님
                </p>
              </div>
            </div>

            <nav>
              <div class="nav">
                <ul class="m_nav">
                  <li
                    data-id="con1"
                    class="nav_menu1"
                    onClick={() => uiStore.selectMenu('home')}
                  >
                    <div>
                      <i class="nav_ico"></i>
                      <p>출퇴근 체크</p>
                    </div>
                  </li>
                  <li
                    data-id="con2"
                    class="nav_menu2"
                    style={{
                      display:
                        userType === Constant.USER_TYPE_MANAGER ? '' : 'none'
                    }}
                    onClick={() => uiStore.selectMenu('reports')}
                  >
                    <div>
                      <i class="nav_ico"></i>
                      <p>업무보고</p>
                    </div>
                  </li>
                  <li
                    data-id="con3"
                    class="nav_menu3"
                    style={{
                      display:
                        userType === Constant.USER_TYPE_MANAGER ? '' : 'none'
                    }}
                    onClick={() => uiStore.selectMenu('commute-depts')}
                  >
                    <div>
                      <i class="nav_ico"></i>
                      <p>출퇴근 제출</p>
                    </div>
                  </li>
                  <li
                    data-id="con4"
                    class="nav_menu4"
                    onClick={() => Helper.goUrl('logout.do?mobileyn=Y')}
                  >
                    <div>
                      <i class="nav_ico"></i>
                      <p>로그아웃</p>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <div class="logout_wrap">
              <a
                href="javascript:void(0);"
                class="m_btn_logout"
                onClick={() => Helper.goUrl('por/main/index.do')}
              >
                <i class="ico_pc"></i>PC 버전 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
