import ModalType from 'config/ModalType';
import ModalService from 'service/ModalService';

class UiCommonService {
  // 조직도 모달 오픈
  openOrgSelectModal(selectHandleFunction) {
    ModalService.openModal(ModalType.ORG_SELECT_MODAL, {
      selectHandler: selectHandleFunction
    });
  }

  // 사원 검색 모달 오픈
  openMemberSelectModal(selectHandleFunction) {
    ModalService.openModal(ModalType.MEMBER_SELECT_MODAL, {
      selectHandler: selectHandleFunction
    });
  }

  // 등록 서류 검색 모달 오픈
  openSafeDocSearchModal(selectHandleFunction) {
    ModalService.openModal(ModalType.SAFE_DOC_SEARCH_MODAL, {
      selectHandler: selectHandleFunction
    });
  }

  // 공사 번호 검색 모달 오픈
  openSubjectSearchModal(selectHandleFunction) {
    ModalService.openModal(ModalType.SUBJECT_SEARCH_MODAL, {
      selectHandler: selectHandleFunction
    });
  }
}

export default new UiCommonService();
