import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Modal from 'react-modal';
import AlertModal from 'component/modal/AlertModal';
import ConfirmModal from 'component/modal/ConfirmModal';
import ModalType from 'config/ModalType';

/*

    이름 : alert, confirm 모달 컨테이너
    
    store
      -alertModalStore
      
*/
@withRouter
@inject('alertModalStore')
@observer
class AlertModalContainer extends React.Component {
  render() {
    let { alertModalStore } = this.props;
    let modalComponent = null;
    let overlayClassName = '';
    let { modalType, displayModal, modalData } = alertModalStore;
    let contentClassName = '';
    overlayClassName = 'alert-modal-overlay';
    contentClassName = modalType + '-content';
    switch (modalType) {
      case ModalType.ALERT_MODAL:
        modalComponent = <AlertModal modalData={modalData} />;
        break;
      case ModalType.CONFRIM_MODAL:
        modalComponent = <ConfirmModal modalData={modalData} />;
        break;
      default:
        break;
    }
    return (
      <Modal
        shouldCloseOnOverlayClick={false}
        isOpen={displayModal}
        ariaHideApp={false}
        overlayClassName={overlayClassName}
        className={contentClassName}
        onRequestClose={() => {
          alertModalStore.hideModal();
        }}
      >
        {modalComponent}
      </Modal>
    );
  }
}

export default AlertModalContainer;
