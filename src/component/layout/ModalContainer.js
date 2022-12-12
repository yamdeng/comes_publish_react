import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Modal from 'react-modal';
import AlertModal from 'component/modal/AlertModal';
import ConfirmModal from 'component/modal/ConfirmModal';
import OrgSelectModal from 'component/modal/OrgSelectModal';
import MemberSelectModal from 'component/modal/MemberSelectModal';
import OrgSimpleFormModal from 'component/modal/OrgSimpleFormModal';
import MemberSimpleFormModal from 'component/modal/MemberSimpleFormModal';
import BoardCommentListModal from 'component/modal/BoardCommentListModal';
import MemberRoleFormModal from 'component/modal/MemberRoleFormModal';
import CheckItemFormModal from 'component/modal/CheckItemFormModal';
import CheckItemTypeFormModal from 'component/modal/CheckItemTypeFormModal';
import WorkOrderStatusHistoryModal from 'component/modal/WorkOrderStatusHistoryModal';
import CommonMapModal from 'component/modal/CommonMapModal';
import CommonEditorModal from 'component/modal/CommonEditorModal';
import CommonSignModal from 'component/modal/CommonSignModal';
import WorkOrderListModal from 'component/modal/WorkOrderListModal';
import SafeDocTemplateFormModal from 'component/modal/SafeDocTemplateFormModal';
import SafeDocTemplateApplyFormModal from 'component/modal/SafeDocTemplateApplyFormModal';
import SubjectSearchModal from 'component/modal/SubjectSearchModal';
import SubjectOrganizeModal from 'component/modal/SubjectOrganizeModal';
import CommonTextAreaModal from 'component/modal/CommonTextAreaModal';
import SafeDocSearchModal from 'component/modal/SafeDocSearchModal';
import SafeClothSupplyFormModal from 'component/modal/SafeClothSupplyFormModal';
import ModalType from 'config/ModalType';

/*

    이름 : middle, full 모달 컨테이너
    
    store
      -modalStore
      
*/
@withRouter
@inject('modalStore')
@observer
class ModalContainer extends React.Component {
  render() {
    let { modalStore } = this.props;
    let { historyModalData } = modalStore;
    let resultModalComponent = null;
    resultModalComponent = historyModalData.map((historyData) => {
      let modalComponent = null;
      let overlayClassName = '';
      let contentClassName = '';
      let modalData = historyData;
      let { modalType } = modalData;
      overlayClassName = 'middle-modal-overlay';
      contentClassName = modalType + '-content';
      switch (modalType) {
        case ModalType.ALERT_MODAL:
          modalComponent = <AlertModal modalData={modalData} />;
          break;
        case ModalType.CONFRIM_MODAL:
          modalComponent = <ConfirmModal modalData={modalData} />;
          break;
        case ModalType.ORG_SELECT_MODAL:
          modalComponent = <OrgSelectModal modalData={modalData} />;
          break;
        case ModalType.MEMBER_SELECT_MODAL:
          modalComponent = <MemberSelectModal modalData={modalData} />;
          break;
        case ModalType.ORG_SIMPLE_FORM_MODAL:
          modalComponent = <OrgSimpleFormModal modalData={modalData} />;
          break;
        case ModalType.MEMBER_SIMPLE_FORM_MODAL:
          modalComponent = <MemberSimpleFormModal modalData={modalData} />;
          break;
        case ModalType.BOARD_COMMENT_LIST_MODAL:
          modalComponent = <BoardCommentListModal modalData={modalData} />;
          break;
        case ModalType.MEMBER_ROLE_FORM_MODAL:
          modalComponent = <MemberRoleFormModal modalData={modalData} />;
          break;
        case ModalType.CHECK_ITEM_FORM_MODAL:
          modalComponent = <CheckItemFormModal modalData={modalData} />;
          break;
        case ModalType.CHECK_ITEM_TYPE_FORM_MODAL:
          modalComponent = <CheckItemTypeFormModal modalData={modalData} />;
          break;

        case ModalType.WORK_ORDER_STATUS_HISTORY_MODAL:
          modalComponent = (
            <WorkOrderStatusHistoryModal modalData={modalData} />
          );
          break;
        case ModalType.COMMON_MAP_MODAL:
          modalComponent = <CommonMapModal modalData={modalData} />;
          break;
        case ModalType.COMMON_EDITOR_MODAL:
          modalComponent = <CommonEditorModal modalData={modalData} />;
          break;
        case ModalType.COMMON_SIGN_MODAL:
          modalComponent = <CommonSignModal modalData={modalData} />;
          break;
        case ModalType.WORK_ORDER_LIST_MODAL:
          modalComponent = <WorkOrderListModal modalData={modalData} />;
          break;
        case ModalType.SAFE_DOC_TEMPLATE_FORM_MODAL:
          modalComponent = <SafeDocTemplateFormModal modalData={modalData} />;
          break;
        case ModalType.SAFE_DOC_TEMPLATE_APPLY_FORM_MODAL:
          modalComponent = (
            <SafeDocTemplateApplyFormModal modalData={modalData} />
          );
          break;
        case ModalType.SUBJECT_SEARCH_MODAL:
          modalComponent = <SubjectSearchModal modalData={modalData} />;
          break;
        case ModalType.SUBJECT_ORGANIZE_MODAL:
          modalComponent = <SubjectOrganizeModal modalData={modalData} />;
          break;
        case ModalType.COMMON_TEXTAREA_MODAL:
          modalComponent = <CommonTextAreaModal modalData={modalData} />;
          break;
        case ModalType.SAFE_DOC_SEARCH_MODAL:
          modalComponent = <SafeDocSearchModal modalData={modalData} />;
          break;
        case ModalType.EQUIPMENT_SUPPLY_FORM_MODAL:
          modalComponent = <SafeClothSupplyFormModal modalData={modalData} />;
          break;
        default:
          break;
      }
      return (
        <Modal
          shouldCloseOnOverlayClick={false}
          isOpen={true}
          ariaHideApp={false}
          overlayClassName={overlayClassName}
          className={contentClassName}
          onRequestClose={() => {
            modalStore.hideModal();
          }}
        >
          {modalComponent}
        </Modal>
      );
    });
    return resultModalComponent;
  }
}

export default ModalContainer;
