/*

  상수 정보

*/

const Constant = {};
// 라벨
Constant.LABEL_MODAL_OK = '확인';
Constant.LABEL_MODAL_CANCEL = '취소';

// error type
Constant.ERROR_TYPE_CORE = 'core';
Constant.ERROR_TYPE_REACT = 'react';

// form type
Constant.FORM_TYPE_ADD = 'add';
Constant.FORM_TYPE_UPDATE = 'update';

// form new id
Constant.FORM_ADD_ID = 'new';

// modalType
Constant.MODAL_TYPE_ALERT = 'alert';
Constant.MODAL_TYPE_FULL = 'full';

// 파일 업로드 상태
Constant.FILE_UPLOAD_STATUS_NEW = 'new';
Constant.FILE_UPLOAD_STATUS_ORI = 'ori';

Constant.GRID_NO_DATE_MESSAGE = '데이터가 존재하지 않습니다.';

// 사용자 유형
Constant.USER_TYPE_PRIVATE = 'PRIVATE';
Constant.USER_TYPE_MANAGER = 'MANAGER';
Constant.USER_TYPE_HEADER = 'HEADER';
Constant.USER_TYPE_ADMIN = 'ADMIN';
Constant.USER_TYPE_SYSTEM = 'SYSTEM';

// 공지사항 게시판 key
Constant.NOTICE_BOARD_KEY = 'KIBKAXFG02';

// 통계 kind 구분 map
Constant.STATS_KIND_LABEL_MAP = {
  user: '실 구성원',
  tardy: '지각',
  vacation: '휴가/휴직',
  dept_commute_not_submit: '출퇴근 미제출',
  report_issue: '업무보고 이슈',
  report_not_submit: '업무보고 미제출'
};

export default Constant;
