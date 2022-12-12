import rootStore from 'store/RootStore';

/*

  로딩바 display 인터페이스

*/

// 로딩바 show
const show = () => {
  rootStore.uiStore.showLoadingBar();
};

// 로딩바 hide
const hide = () => {
  rootStore.uiStore.hideLoadingBar();
};

const LoadingBar = { show, hide };

export default LoadingBar;
