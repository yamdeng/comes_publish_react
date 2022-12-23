import rootStore from '../store/RootStore';
import ModalType from '../config/ModalType';
import { confirm } from 'devextreme/ui/dialog';

class ModalService {
  // AlertModal 모달 오픈
  alert(modalData) {
    rootStore.alertModalStore.showModal(ModalType.ALERT_MODAL, modalData);
  }

  // ConfirmModal 모달 오픈
  confirm(modalData) {
    const { title, content, ok, cancel } = modalData;
    // let result = confirm(title, content);
    // result.then((dialogResult) => {
    //   if (dialogResult) {
    //     if (ok) {
    //       ok();
    //     }
    //   } else {
    //     if (cancel) {
    //       cancel();
    //     }
    //   }
    // });

    if (window.confirm(content)) {
      if (ok) {
        ok();
      }
    }
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
