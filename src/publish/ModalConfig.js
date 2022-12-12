import ModalType from 'config/ModalType';

const ModalConfig = {};

const list = [
  {
    title: 'alert 모달',
    fileName: 'PAlertModal.js',
    pageCount: 'X',
    success: true,
    modalType: ModalType.ALERT_MODAL,
    isAlert: true,
    isMobileFull: false,
    description:
      '1.비활성화 스타일 필요\n2.우측 상단에 [X] 버튼이 있어야 하는지 검토\n3.title이 존재하는 경우와 존재하지 않는 경우가 존재(confirm도 마찬가지)'
  },
  {
    title: 'confirm 모달',
    fileName: 'PConfirmModal.js',
    pageCount: 'X',
    success: true,
    modalType: ModalType.CONFRIM_MODAL,
    isAlert: true,
    isMobileFull: false,
    description:
      '1.[취소],[확인] 버튼 스타일 다르게\n2.모든 모달 하단 버튼 레이아웃은 우측 정렬(가운데 정렬 방법 가이드도 필요)\n3.[취소], [확인] 버튼 순으로 정의'
  },
  {
    title: '조직 선택 모달',
    fileName: 'POrgSelectModal.js',
    pageCount: '1',
    success: true,
    modalType: ModalType.ORG_SELECT_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.트리 컴포넌트는 스타일을 별도로 지원해주셔야 될 것 같애요. 개발 붙여놓으면 함 봐주세요\n2.완전 작은 모달이 아니면 모바일에서는 풀 모달 형식으로 보여져야 됩니다(공통사항) : isMobileFull 속성으로 표기함\n3.모바엘에서는 왼쪽 트리가 않보여야 합니다(루트 조직 구조로 검색만 가능합니다)\n4.페이징이 있는 UI입니다'
  },
  {
    title: '사원 선택 모달',
    fileName: 'PMemberSelectModal.js',
    pageCount: '2',
    success: true,
    modalType: ModalType.MEMBER_SELECT_MODAL,
    isAlert: false,
    isMobileFull: true,
    description: '1.조직 선택 모달과 거의 동일한 UI 입니다'
  },
  {
    title: '조직 폼 모달',
    fileName: 'POrgSimpleFormModal.js',
    pageCount: '3',
    success: true,
    modalType: ModalType.ORG_SIMPLE_FORM_MODAL,
    isAlert: false,
    isMobileFull: false,
    description: ''
  },
  {
    title: '사원 폼 모달',
    fileName: 'PMemberSimpleFormModal.js',
    pageCount: '3',
    success: true,
    modalType: ModalType.MEMBER_SIMPLE_FORM_MODAL,
    isAlert: false,
    isMobileFull: false,
    description: '1.조직 폼 모달과 동일한 UI임(input 필드 갯수만 틀림)'
  },
  {
    title: '권한 수정 모달',
    fileName: 'PMemberRoleUpdateModal.js',
    pageCount: '4',
    success: true,
    modalType: ModalType.MEMBER_ROLE_FORM_MODAL,
    isAlert: false,
    isMobileFull: false,
    description:
      '1.캡쳐된 화면은 권한이 하나지만 권한은 여러개가 될 수 있고 모바일에서는 스크롤이 될 수 있음(페이징은 고려하지 않아도 됨)\n2.캡쳐된 화면 처럼 스위치로 할지 일반 체크박스로 할지 2가지 가이드가 있으면 좋을 것 같습니당'
  },
  {
    title: '댓글 목록 모달',
    fileName: 'PBoardCommentListModal.js',
    pageCount: '5',
    success: true,
    modalType: ModalType.BOARD_COMMENT_LIST_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.컴포넌트 배치를 고민 부탁드립니다. 모바일에서 완벽하게 보이기는 쉽지 않아보여서 잘리거나 겹치지 않게끔 고려 부탁드려요'
  },
  {
    title: '안전 서류 템플릿 폼 모달',
    fileName: 'PSafeDocTemplateFormModal.js',
    pageCount: '6',
    success: true,
    modalType: ModalType.SAFE_DOC_TEMPLATE_FORM_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.템플릿 양식 우측에 [x] 버튼이 있는데 초기화 아이콘이 있으면 좋을 것 같습니다(싱글 첨부는 삭제 개념이 없어서!)\n2.최초 등록시에는 상단은 존재하지 않습니다(템플릿ID, 등록자/일시). 대충 기획서 이런 패턴으로 되어있습니다'
  },
  {
    title: '템플릿 적용 모달',
    fileName: 'PTemplateApplyModal.js',
    pageCount: '7',
    success: true,
    modalType: ModalType.SAFE_DOC_TEMPLATE_APPLY_FORM_MODAL,
    isAlert: false,
    isMobileFull: true,
    description: ''
  },
  {
    title: '공사 편성 모달',
    fileName: 'PSubjectOrganizeModal.js',
    pageCount: '8',
    success: true,
    modalType: ModalType.SUBJECT_ORGANIZE_MODAL,
    isAlert: false,
    isMobileFull: false,
    description: ''
  },
  {
    title: '유예 사유 모달(공통 모달)',
    fileName: 'PCommonSimpleDescriptionModal.js',
    pageCount: '9',
    success: true,
    modalType: ModalType.COMMON_TEXTAREA_MODAL,
    isAlert: false,
    isMobileFull: false,
    description: ''
  },
  {
    title: '보호구 지급 대장 폼 모달',
    fileName: 'PSafeClothSupplyFormModal.js',
    pageCount: '10',
    success: true,
    modalType: ModalType.EQUIPMENT_SUPPLY_FORM_MODAL,
    isAlert: false,
    isMobileFull: true,
    description: ''
  },
  {
    title: '점검 항목 폼 모달',
    fileName: 'PCheckItemFormModal.js',
    pageCount: '11',
    success: true,
    modalType: ModalType.CHECK_ITEM_FORM_MODAL,
    isAlert: false,
    isMobileFull: true,
    description: ''
  },
  {
    title: '작업 지시서 목록 모달',
    fileName: 'PWorkDirectionListModal.js',
    pageCount: '12',
    success: true,
    modalType: ModalType.WORK_ORDER_LIST_MODAL,
    isAlert: false,
    isMobileFull: false,
    description: ''
  },
  {
    title: '등록 서류 검색 모달',
    fileName: 'PDocSearchModal.js',
    pageCount: '13',
    success: true,
    modalType: ModalType.SAFE_DOC_SEARCH_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.검색 조건 필드가 많아서 배치하기가 쉽지 않아보입니다. 요곳도 잘 부탁드릴게요!'
  },
  {
    title: '공통 에디터 모달',
    fileName: 'PCommonEditorModal.js',
    pageCount: '14',
    success: false,
    modalType: ModalType.COMMON_EDITOR_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.HTML 에디터를 모달 형태로 보여주는 형식입니다. 이건 와꾸나오면 지원해주시면 될 것 같애요(공간만 잡아주시고 그안에 풀로 넣는 구조입니다. 별거 아니지만 필요시 요청 드릴게요)'
  },
  {
    title: '공통 결재 모달',
    fileName: 'PCommonSignModal.js',
    pageCount: '15',
    success: true,
    modalType: ModalType.COMMON_SIGN_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.기획서는 사인 2개를 수평구조라 나열했는데 탭으로 구성하는 UI입니다(예전 safescg 할때 싸인했을때와 비슷한 구조입니다'
  },
  {
    title: '공통 지도 모달',
    fileName: 'PCommonMapModal.js',
    pageCount: 'X',
    success: false,
    modalType: ModalType.COMMON_MAP_MODAL,
    isAlert: false,
    isMobileFull: true,
    description:
      '1.이건 와꾸나오면 지원해주시면 될 것 같애요! 아직 KT 지도 라이브러리 붙이기전입니다(공간만 잡아주시고 그안에 풀로 넣는 구조입니다. 별거 아니지만 필요시 요청 드릴게요)'
  }
];

ModalConfig.list = list;

export default ModalConfig;
