import { observable, action } from 'mobx';

/*

  중간, full 모달 manage store

*/
class ModalStore {
  // 모달 타입 : ModalType.js 참고
  @observable modalType = '';

  // 각 모달 마다 전달되는 data {}
  @observable modalData = {};

  // 모달 display 여부 : ModalContainer.js 참고
  @observable displayModal = false;

  // 이중 모달을 위한 modal data history []
  @observable historyModalData = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // disableHistory 속성값이 true이면 모달 history 비우고 초기화시킨다
  @action
  showModal(modalType, modalData, disableHistory = false) {
    this.modalType = modalType;
    modalData = modalData || {};
    modalData.modalType = modalType;
    this.modalData = modalData;
    this.displayModal = true;
    if (disableHistory) {
      this.historyModalData = [modalData];
    } else {
      this.historyModalData.push(modalData);
    }
  }

  // 모달 hide(마지막 모달만)
  @action
  hideModal() {
    // 히스토리가 1개이거나 없을 경우 초기화
    if (!this.historyModalData.length || this.historyModalData.length === 1) {
      this.modalType = '';
      this.modalData = {};
      this.displayModal = false;
      this.historyModalData = [];
    } else {
      // 2개 이상일 경우 이전 modalData를 추출하고 이력([])에서 마지막 요소를 빼냄
      let modalData = null;
      modalData = this.historyModalData[this.historyModalData.length - 2];
      this.historyModalData = this.historyModalData.slice(
        0,
        this.historyModalData.length - 1
      );
      this.modalData = modalData;
      this.modalType = modalData.modalType;
      this.displayModal = true;
    }
  }

  // 모달 hide(전체)
  @action
  hideAllModal() {
    this.modalType = '';
    this.modalData = {};
    this.displayModal = false;
    this.historyModalData = [];
  }
}

export default ModalStore;
