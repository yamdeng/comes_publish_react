/* global context_path */

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

// 검색 유형
Constant.SEARCH_DATE_TYPE_DAY = 'DAY'; // 하루 단위 조회
Constant.SEARCH_DATE_TYPE_MONTH = 'MONTH'; // 월 단위 조회
Constant.SEARCH_DATE_TYPE_RANGE = 'RANGE'; // 기간 단위 조회
Constant.SEARCH_DATE_TYPE_YEAR = 'YEAR'; // 년 단위 조회

// 근무 상태
Constant.CODE_WORK_STATUS_ING = 'ING'; /* 업무중 */
Constant.CODE_WORK_STATUS_HOME_ING = 'HOME_ING'; /* 재택중 */
Constant.CODE_WORK_STATUS_END = 'END'; /* 업무종료 */
Constant.CODE_WORK_STATUS_VACATION_YEAR = 'VACATION_YEAR'; /* 연차 */
Constant.CODE_WORK_STATUS_VACATION_MORNING = 'VACATION_MORNING'; /* 오전반차 */
Constant.CODE_WORK_STATUS_VACATION_AFTERNOON =
  'VACATION_AFTERNOON'; /* 오후반차 */
Constant.CODE_WORK_STATUS_VACATION_NATION = 'VACATION_NATION'; /* 공가 */
Constant.CODE_WORK_STATUS_VACATION_REPLACE = 'VACATION_REPLACE'; /* 대체휴가 */
Constant.CODE_WORK_STATUS_VACATION_CON = 'VACATION_CON'; /* 경조휴가 */
Constant.CODE_WORK_STATUS_VACATION_PRIZE = 'VACATION_PRIZE'; /* 포상휴가 */
Constant.CODE_WORK_STATUS_VACATION_BABY = 'VACATION_BABY'; /* 출산휴가 */
Constant.CODE_WORK_STATUS_VACATION_CARE = 'VACATION_CARE'; /* 육아휴직 */
Constant.CODE_WORK_STATUS_VACATION_NORMAL = 'VACATION_NORMAL'; /* 일반휴직 */
Constant.CODE_WORK_STATUS_VACATION_ETC = 'VACATION_ETC'; /* 기타휴가 */

// 출퇴근 통계 검색 유형
Constant.COMMUTE_STATS_SEARCH_TYPE_WEEK = 'WEEK'; /* 주간 */
Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_WORKDAY =
  'MONTH_WORKDAY'; /* 월간(주별)) */
Constant.COMMUTE_STATS_SEARCH_TYPE_MONTH_HOLIDAY =
  'MONTH_HOLIDAY'; /* 월간(휴일)) */

// LESS, GREATER
Constant.SEARCH_TIME_LESS = 'LESS';
Constant.SEARCH_TIME_GREATER = 'GREATER';

Constant.CODE_VACATION_KIND_VACATION_YEAR = 'VACATION_YEAR'; /* 연차 */
Constant.CODE_VACATION_KIND_VACATION_MORNING =
  'VACATION_MORNING'; /* 오전반차 */
Constant.CODE_VACATION_KIND_VACATION_AFTERNOON =
  'VACATION_AFTERNOON'; /* 오후반차 */
Constant.CODE_VACATION_KIND_VACATION_NATION = 'VACATION_NATION'; /* 공가 */
Constant.CODE_VACATION_KIND_VACATION_REPLACE =
  'VACATION_REPLACE'; /* 대체휴가 */
Constant.CODE_VACATION_KIND_VACATION_CON = 'VACATION_CON'; /* 경조휴가 */
Constant.CODE_VACATION_KIND_VACATION_PRIZE = 'VACATION_PRIZE'; /* 포상휴가 */
Constant.CODE_VACATION_KIND_VACATION_BABY = 'VACATION_BABY'; /* 출산휴가 */
Constant.CODE_VACATION_KIND_VACATION_BIRTHDAY = 'VACATION_BIRTHDAY'; /* 생일 */
Constant.CODE_VACATION_KIND_VACATION_CARE = 'VACATION_CARE'; /* 육아휴직 */
Constant.CODE_VACATION_KIND_VACATION_NORMAL = 'VACATION_NORMAL'; /* 일반휴직 */
Constant.CODE_VACATION_KIND_ETC = 'VACATION_ETC'; /* 기타휴가 */

Constant.ALL_DAY_VACATION_CODE_LIST = [
  'VACATION_YEAR',
  'VACATION_NATION',
  'VACATION_REPLACE',
  'VACATION_CON',
  'VACATION_PRIZE',
  'VACATION_BABY',
  'VACATION_CARE',
  'VACATION_NORMAL',
  'VACATION_ETC'
];

Constant.CODE_COMMUTE_DEPT_STATUS_SUBMIT = 'SUBMIT'; /* 제출 */
Constant.CODE_COMMUTE_DEPT_STATUS_NOT_SUBMIT = 'NOT_SUBMIT'; /* 미제출 */
Constant.CODE_COMMUTE_DEPT_STATUS_APPROVE = 'APPROVE'; /* 승인 */
Constant.CODE_COMMUTE_DEPT_STATUS_REJECT = 'REJECT'; /* 반려 */
Constant.CODE_REPORT_STATUS_SUBMIT = 'SUBMIT'; /* 제출 */
Constant.CODE_REPORT_STATUS_NOT_SUBMIT = 'NOT_SUBMIT'; /* 미제출 */
Constant.CODE_REPORT_STATUS_APPROVE = 'APPROVE'; /* 승인 */
Constant.CODE_REPORT_STATUS_REJECT = 'REJECT'; /* 반려 */

Constant.EDITOR_BASE_PATH = context_path + 'engine/we/xfree';

export default Constant;
