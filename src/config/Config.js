/*

  전역 설정 정보

*/

const Config = {};

// 앱 버전
Config.version = '1.0';

// api timeout 설정
Config.apiTimeout = 30000;

// date 기본 display format
Config.defaultDateDisplayFormat = 'yyyy년 MM월 dd일';
Config.defaultTimeDisplayFormat = 'HH:mm';

Config.defaultDateValueFormat = 'yyyy-MM-DD';
Config.defaultTimeValueFormat = 'HH:mm';

Config.scrollAnimationTimeout = 500;

// 5MB : 5242880
Config.maxFileUploadSize = 5242880;

// 1페이지에 보여지는 리스트 갯수
Config.defaultPageSize = 10;

// 최대 보여지는 페이징갯수
Config.maxPagingSize = 10;

// 공통 tree root key
Config.treeRootKey = '-1';

export default Config;
