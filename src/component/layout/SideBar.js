import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import logo from 'resources/images/ktLogo.png';
import PROFILE from 'resources/images/profile.jpeg';

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
    let { uiStore } = this.props;
    let { menuList, displaySideMenu } = uiStore;
    return (
      <React.Fragment>
        <div className="top_menu_toggle">
          <button className="toggle_btn" onClick={this.toggleSideMenu}>
            <i class="fas fa-bars"></i>
          </button>
          <h1 className="">
            <img src={logo} alt="" />
            <span>SAFETY-DOC</span>
          </h1>
          <div className="mode_change">
            <div className="profile">
              <span className="img">
                <i class="fas fa-user-circle" style={{ display: 'none' }}></i>
                <img src={PROFILE} alt="" />
              </span>
              <span className="txt">안용성님 환영합니다</span>
            </div>
            <input
              type="checkbox"
              id="switch"
              name="switch"
              className="input_on_off"
            />
            {/* <label for="switch" className="label_on_off">
              <span className="marble"></span> <span className="on">dark</span>
              <span class="off">light</span>
            </label> */}
          </div>
        </div>
        <div className={displaySideMenu ? 'menu_side' : 'menu_side hide'}>
          <div className="menu_area">
            <div className="menu_wrap">
              <ul className="dep_1">
                {menuList.map((firstDepthMenuInfo) => {
                  let childs = firstDepthMenuInfo.childs || [];
                  let childMenuComponent = null;
                  if (childs.length) {
                    childMenuComponent = (
                      <ul class="dep_2">
                        {childs.map((childMenuInfo) => {
                          return (
                            <li onClick={() => this.selectMenu(childMenuInfo)}>
                              <p>{childMenuInfo.name}</p>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  return (
                    <li className={firstDepthMenuInfo.isExpend ? 'active' : ''}>
                      <p
                        onClick={() =>
                          this.toggle1DepthMenu(firstDepthMenuInfo.name)
                        }
                      >
                        <span className="icon ablc">
                          <i class={firstDepthMenuInfo.iconClass}></i>
                        </span>
                        {firstDepthMenuInfo.name}
                        {childs.length ? (
                          <span className="abrc">
                            <i class="fas fa-chevron-right"></i>
                          </span>
                        ) : null}
                      </p>
                      {childMenuComponent}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <span className={displaySideMenu ? 'menu_bg' : 'menu_bg active'}>
          &nbsp;
        </span>
      </React.Fragment>
    );
  }
}

export default SideBar;
