/*

  모달 타입

*/

const ModalType = {};

// 공통 alert 모달 : AlertModal
ModalType.ALERT_MODAL = 'alert-modal';

// 공통 confirm 모달 : ConfirmModal
ModalType.CONFRIM_MODAL = 'confirm-modal';

// 조직 선택 모달 : OrgSelectModal
ModalType.ORG_SELECT_MODAL = 'org-select-modal';

// 사원 선택 모달 : MemberSelectModal
ModalType.MEMBER_SELECT_MODAL = 'member-select-modal';

// 조직 폼 모달 : ORG_SIMPLE_FORM_MODAL
ModalType.ORG_SIMPLE_FORM_MODAL = 'org-simple-form-modal';

// 사원 폼 모달 : MEMBER_SIMPLE_FORM_MODAL
ModalType.MEMBER_SIMPLE_FORM_MODAL = 'member-simple-form-modal';

// 댓글 목록 모달 : BoardCommentListModal
ModalType.BOARD_COMMENT_LIST_MODAL = 'board-comment-list-modal';

// 권한 수정 모달 : MemberRoleFormModal
ModalType.MEMBER_ROLE_FORM_MODAL = 'member-role-form-modal';

// 점검 항목 폼 모달 : CheckItemFormModal
ModalType.CHECK_ITEM_FORM_MODAL = 'check-item-form-modal';

// 점검 항목 분류 폼 모달 : CheckItemTypeFormModal
ModalType.CHECK_ITEM_TYPE_FORM_MODAL = 'check-item-type-form-modal';

// 작업 지시 요청 이력 모달 : WORK_ORDER_STATUS_HISTORY_MODAL
ModalType.WORK_ORDER_STATUS_HISTORY_MODAL = 'work-order-status-history-modal';

// 지도 모달 : CommonMapModal
ModalType.COMMON_MAP_MODAL = 'common-map-modal';

// 에디터 모달 : CommonMapModal
ModalType.COMMON_EDITOR_MODAL = 'common-editor-modal';

// 결재 모달 : CommonSignModal
ModalType.COMMON_SIGN_MODAL = 'common-sign-modal';

// 작업 지시서 목록 모달 : WorkOrderListModal
ModalType.WORK_ORDER_LIST_MODAL = 'work-order-list-modal';

// 안전 서류 템플릿 폼 모달 : SafeDocTemplateFormModal
ModalType.SAFE_DOC_TEMPLATE_FORM_MODAL = 'safe-doc-template-form-modal';

// 템플릿 적용 폼 모달 : SafeDocTemplateApplyFormModal
ModalType.SAFE_DOC_TEMPLATE_APPLY_FORM_MODAL =
  'safe-doc-template-apply-form-modal';

// 등록 공사 찾기 모달 : SubjectSearchModal
ModalType.SUBJECT_SEARCH_MODAL = 'subject-search-modal';

// 공사 편성 모달 : SubjectOrganizeModal
ModalType.SUBJECT_ORGANIZE_MODAL = 'subject-organize-modal';

// 유예 사유 모달(공통 모달) : CommonTextAreaModal
ModalType.COMMON_TEXTAREA_MODAL = 'common-textarea-modal';

// 등록 서류 검색 모달 : SafeDocSearchModal
ModalType.SAFE_DOC_SEARCH_MODAL = 'safe-doc-search-modal';

// 보호구 지급 대장 폼 모달 : SafeClothSupplyFormModal
ModalType.EQUIPMENT_SUPPLY_FORM_MODAL = 'equipment-supply-form-modal';

export default ModalType;
