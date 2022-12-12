import AppStore from 'store/AppStore';
import UiStore from 'store/UiStore';
import ModalStore from 'store/ModalStore';
import AlertModalStore from 'store/AlertModalStore';
import BoardListStore from 'store/common/BoardListStore';
import BoardFormStore from 'store/common/BoardFormStore';
import TestStore from 'store/test/TestStore';
import GuideListStore from 'store/test/GuideListStore.js';
import GuideFormStore from 'store/test/GuideFormStore.js';
import OrgSelectModalStore from 'store/modal/OrgSelectModalStore';

/*

  appStore : 전역 data manage store
  uiStore : 전역 ui manage store
  modalStore : 중간, full 모달 manage store
  alertModalStore : alert, confirm 모달 manage store
  boardListStore : 게시판 목록 store
  boardFormStore : 게시판 폼 store


  모달 store
  orgSelectModalStore : 조직 선택 모달 store

  testStore : testStore

*/
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.uiStore = new UiStore(this);
    this.alertModalStore = new AlertModalStore(this);
    this.modalStore = new ModalStore(this);
    this.boardListStore = new BoardListStore(this);
    this.boardFormStore = new BoardFormStore(this);

    // 모달 store
    this.orgSelectModalStore = new OrgSelectModalStore(this);

    // test store
    this.testStore = new TestStore(this);
    this.guideListStore = new GuideListStore(this);
    this.guideFormStore = new GuideFormStore(this);
  }
}

export default new RootStore();
