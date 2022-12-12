import rootStore from '../store/RootStore';
import ModalType from '../config/ModalType';

class ModalService {
  // AlertModal 모달 오픈
  alert(modalData) {
    rootStore.alertModalStore.showModal(ModalType.ALERT_MODAL, modalData);
  }

  // ConfirmModal 모달 오픈
  confirm(modalData) {
    rootStore.alertModalStore.showModal(ModalType.CONFRIM_MODAL, modalData);
  }

  // ModalContainer에 정의한 모달 오픈
  openModal(modalType, modalData) {
    rootStore.modalStore.showModal(modalType, modalData);
  }

  // AlertModalContainer에 정의한 모달 닫기
  closeAlertModal() {
    rootStore.alertModalStore.hideModal();
  }

  // ModalContainer에 정의한 모달 닫기
  closeModal() {
    rootStore.modalStore.hideModal();
  }

  // 모달 전체 종료
  closeAllModal() {
    rootStore.alertModalStore.hideModal();
    rootStore.modalStore.hideAllModal();
  }
}

export default new ModalService();
