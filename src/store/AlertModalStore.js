import { observable, action } from 'mobx';

/*

  small 모달 manage store

*/
class AlertModalStore {
  // 모달 타입 : ModalType.js 참고
  @observable modalType = '';

  // 각 모달 마다 전달되는 data {}
  @observable modalData = {};

  // 모달 display 여부 : AlertModalContainer.js 참고
  @observable displayModal = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 모달 show
  @action
  showModal(modalType, modalData) {
    this.modalType = modalType;
    this.modalData = modalData || {};
    this.displayModal = true;
  }

  // 모달 hide
  @action
  hideModal() {
    this.modalType = '';
    this.displayModal = false;
  }
}

export default AlertModalStore;
