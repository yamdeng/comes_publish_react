import { observable, action, toJS, runInAction } from 'mobx';
import AppHistory from 'util/AppHistory';
import Menu from 'config/Menu';
import update from 'immutability-helper';
import DeviceUtil from 'util/DeviceUtil';
import moment from 'moment';

/*
  
  전역 ui manage store

*/

class UiStore {
  @observable
  todayDayTextInfo = null;

  @observable
  todayWeekTextInfo = null;

  @observable
  currentTime = null;

  // 로딩바 display 여부
  @observable
  displayLoadingBar = false;

  // top 헤더, 왼쪽 메뉴 display 여부
  @observable
  displaySideMenu = true;

  // Side 메뉴 활성화 기준 이름
  @observable
  currentSideMenuName = '';

  // Side 메뉴 url
  @observable
  currentSideMenuUrl = '';

  // 이전 라우팅 url
  @observable beforeRouteUrl = null;

  // 현재 라우팅 url
  @observable currentRouteUrl = null;

  // 메뉴 목록
  @observable menuList = Menu;

  // 다크 테마 여부
  @observable isDarkTheme = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  init() {
    this.todayDayTextInfo = moment().format('MM.DD');
    this.todayWeekTextInfo = moment().format('dddd').substring(0, 1);
    this.repeateUpdateCurrentTime();
  }

  // 로딩바 show
  @action
  showLoadingBar() {
    this.displayLoadingBar = true;
  }

  // 로딩바 hide
  @action
  hideLoadingBar() {
    this.displayLoadingBar = false;
  }

  // 왼쪽 사이드 메뉴 toggle
  @action
  toggleSideMenu() {
    this.displaySideMenu = !this.displaySideMenu;
  }

  // 왼쪽 1depth 메뉴 toggle
  @action
  toggle1DepthMenu(menuName) {
    let menuList = toJS(this.menuList);
    let searchIndex = menuList.findIndex((info) => info.name === menuName);
    if (searchIndex !== -1) {
      let selectMenuInfo = menuList[searchIndex];
      let newMenuList = update(menuList, {
        [searchIndex]: {
          isExpend: { $set: !selectMenuInfo.isExpend }
        }
      });
      this.menuList = newMenuList;
    }
  }

  // 페이지 이동 : replace가 true이면 이전 history replace
  @action
  goPage(url, replace) {
    if (replace) {
      AppHistory.replace(url);
    } else {
      AppHistory.push(url);
    }
  }

  // 이전 페이지로
  @action
  back() {
    AppHistory.goBack();
  }

  // 현재 route url 수정
  @action
  changeCurrentRouteUrl(currentRouteUrl) {
    if (this.currentRouteUrl) {
      this.beforeRouteUrl = this.currentRouteUrl;
    }
    this.currentRouteUrl = currentRouteUrl;
  }

  // 상담사 메인 왼쪽 메뉴 active 반영
  @action
  selectMenu(menuInfo) {
    let { routeUrl } = menuInfo;
    this.goPage(routeUrl);
    if (DeviceUtil.isMobile) {
      this.displaySideMenu = !this.displaySideMenu;
    }
  }

  // 모달 전체 close
  @action
  closeModal() {
    this.rootStore.modalStore.hideAllModal();
    this.rootStore.alertModalStore.hideModal();
  }

  // 현재 시간을 계속 최신화시킴
  @action
  repeateUpdateCurrentTime() {
    this.intervalId = setInterval(() => {
      runInAction(() => {
        this.currentTime = moment().format('hh:mm:ss');
      });
    }, 1000);
  }

  @action
  clear() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export default UiStore;
