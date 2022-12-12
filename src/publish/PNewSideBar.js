import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import logo from 'resources/images/logo.svg';
import PROFILE from 'resources/images/profile.jpeg';
import PMenu from './PMenu';
import update from 'immutability-helper';
import DeviceUtil from 'util/DeviceUtil';

@withRouter
@inject('appStore', 'uiStore')
@observer
class PNewSideBar extends Component {
  constructor(props) {
    super(props);
    let displaySideMenu = DeviceUtil.isMobile ? false : true;
    this.state = { displaySideMenu: displaySideMenu, menuList: PMenu };

    // 좌측 최상단 메뉴 메뉴 버튼 토글
    this.toggleSideMenu = this.toggleSideMenu.bind(this);

    // 메뉴 토글
    this.toggle1DepthMenu = this.toggle1DepthMenu.bind(this);

    // 메뉴 선택
    this.selectMenu = this.selectMenu.bind(this);

    this.hideMenu = this.hideMenu.bind(this);
  }

  toggleSideMenu() {
    this.setState({ displaySideMenu: !this.state.displaySideMenu });
  }

  toggle1DepthMenu(menuName) {
    let menuList = this.state.menuList;
    let searchIndex = menuList.findIndex((info) => info.name === menuName);
    if (searchIndex !== -1) {
      let selectMenuInfo = menuList[searchIndex];
      let newMenuList = update(menuList, {
        [searchIndex]: {
          isExpend: { $set: !selectMenuInfo.isExpend }
        }
      });
      this.setState({ menuList: newMenuList });
    }
  }

  selectMenu(menuInfo) {
    let { routeUrl } = menuInfo;
    let { uiStore } = this.props;
    uiStore.goPage(routeUrl);
    if (DeviceUtil.isMobile) {
      this.setState({ displaySideMenu: false });
    }
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

  hideMenu() {
    this.setState({ displaySideMenu: false });
  }

  componentDidMount() {}

  render() {
    let { displaySideMenu, menuList } = this.state;
    return (
      <React.Fragment>
        <div className="top_menu_toggle">
          <button className="toggle_btn" onClick={this.toggleSideMenu}>
            <i class="fas fa-bars"></i>
          </button>
          <h1 className="">
            <img src={logo} alt="" />
          </h1>
          <div className="top_members_talk_wrap">
            <div className="arrs">
              <span className="arr_l"></span>
              <span className="arr_r"></span>
            </div>
            <div className="profile">
              <span className="img sm c_ml32">
                <i class="fas fa-user-circle" style={{ display: 'none' }}></i>
                <img src={PROFILE} alt="" />
              </span>
              <span className="txt c_ml8">
                <span>
                  “오늘도 안전한 작업을 위해 작업 전 안전지침을 되새기고 작업에
                  임하겠습니다.”
                </span>
              </span>
            </div>
            <div className="member">
              <span className="">임꺽정 직원 / 대리 산업안전팀</span>
            </div>
          </div>
          <div className="mode_change">
            <div className="profile">
              <span className="txt">
                안용성님 환영합니다<span className="t">산업안전팀</span>
              </span>
              <span className="img">
                <i class="fas fa-user-circle" style={{ display: 'none' }}></i>
                <img src={PROFILE} alt="" />
              </span>
            </div>
            <input
              type="checkbox"
              id="switch"
              name="switch"
              className="input_on_off"
            />
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
                            // dev_2 active 필요
                            <li
                              className=""
                              onClick={() => this.selectMenu(childMenuInfo)}
                            >
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
                        <span>
                          <span className="icon">
                            <span
                              className={firstDepthMenuInfo.iconClass}
                            ></span>
                          </span>
                          {firstDepthMenuInfo.name}
                        </span>
                        {childs.length ? <span className="arr"></span> : null}
                      </p>
                      {childMenuComponent}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <span
          className={displaySideMenu ? 'menu_bg' : 'menu_bg active'}
          onClick={(event) => {
            event.stopPropagation();
            this.hideMenu();
          }}
        >
          &nbsp;
        </span>
      </React.Fragment>
    );
  }
}

export default PNewSideBar;
