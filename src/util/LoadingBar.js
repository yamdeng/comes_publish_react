import rootStore from 'store/RootStore';

/*

  로딩바 display 인터페이스

*/

// 로딩바 show
const show = () => {
  $('#loading-bar').show();
};

// 로딩바 hide
const hide = () => {
  $('#loading-bar').hide();
};

const LoadingBar = { show, hide };

export default LoadingBar;
