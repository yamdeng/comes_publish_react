import PLayoutSample from 'publish/page/PLayoutSample';
import PDeptMemberList from 'publish/page/PDeptMemberList';
import PTable1 from 'publish/page/PTable1';
import PTable2 from 'publish/page/PTable2';
import PTabTable1 from 'publish/page/PTabTable1';
import PBoardForm from 'publish/page/PBoardForm';
import PBoardDetail from 'publish/page/PBoardDetail';
import PWorkDetail1 from 'publish/page/PWorkDetail1';
import PWorkDetail2 from 'publish/page/PWorkDetail2';
import PWorkForm1 from 'publish/page/PWorkForm1';
import PWorkForm2 from 'publish/page/PWorkForm2';
import PWorkForm3 from 'publish/page/PWorkForm3';
import PWorkForm4 from 'publish/page/PWorkForm4';
import PWorkForm5 from 'publish/page/PWorkForm5';
import PWorkForm6 from 'publish/page/PWorkForm6';
import PWorkForm7 from 'publish/page/PWorkForm7';
import PWorkForm8 from 'publish/page/PWorkForm8';
import PWorkForm9 from 'publish/page/PWorkForm9';
import PWorkForm10 from 'publish/page/PWorkForm10';
import PWorkDirectionList from 'publish/page/PWorkDirectionList';
import PWorkDirectionForm1 from 'publish/page/PWorkDirectionForm1';
import PWorkDirectionForm2 from 'publish/page/PWorkDirectionForm2';
import PConfinedSpaceForm1 from 'publish/page/PConfinedSpaceForm1';
import PConfinedSpaceForm2 from 'publish/page/PConfinedSpaceForm2';
import PConfinedSpaceForm3 from 'publish/page/PConfinedSpaceForm3';
import PCheckResultList from 'publish/page/PCheckResultList';
import PCheckResultForm from 'publish/page/PCheckResultForm';
import PSafeCheckList from 'publish/page/PSafeCheckList';
import PWorkReportList from 'publish/page/PWorkReportList';
import PComponentsGuide from 'publish/page/PComponentsGuide';

const PageConfig = {};

const list = [
  {
    title: '레이아웃 샘플',
    fileName: 'PLayoutSample.js',
    component: PLayoutSample,
    url: '/layout-sample',
    pageCount: '1',
    success: true,
    useIcon: true,
    description:
      '1.이 페이지는 PSideBar, PTopHeader 포함하고 있지 않은 레이아웃 테스트용 페이지로 가운데 내용은 무관한 페이지입니다.\n2.최상단, 좌측 메뉴를 반응형으로 확인하기 위한 페이지입니다.\n3.캡쳐된 화면은 최상단 좌측 메뉴(=) 아이콘을 클릭해서 접히는 방식으로 구성되어있는데 모바일 화면일 경우에는 왼쪽 메뉴는 사라지고 최상단 좌측에 메뉴 아이콘를 누르면 메뉴가 아래로 펼쳐지는 구조로 가는게 어떨까 합니다.이건 우선 순위가 낮습니다. 작업하실때 같이 고민하는게 좋을 것 같아서 설명으로 남겨요\n4.메뉴는 3단을 max라고 가정할게요(이것도 당장 고민이 너무 많이 들어가면 2단계로 해주시고 차후에 좀 봐주세요. 스크립트는 필요없고 현재 메뉴가 펼쳐져 있는 않펼쳐져 있는지를 구분하기 위한 아이콘이 필요해 보여요.\n5.캡쳐화면에는 존재하는데 기획서에는 표기가 않되어있어서 현재 페이지를 식별할 수 있는 라벨 영역이 필요함(캡쳐화면에는 최상단 text가 바뀌는 구조로 되어있음)\n6.기본 레이아웃 페이지라는 가정하에 로고 이미지, 다크모드 on/off 아이콘(화이트/블랙 테마 변경), 로그아웃 메뉴(=), 사이드 각 메뉴가 펼쳐졌는지 접혔는지 여부 : 5개의 아이콘 필요'
  },
  {
    title: '사외 조직/사원 등록',
    fileName: 'PDeptMemberList.js',
    component: PDeptMemberList,
    url: '/dept-member-list',
    pageCount: '2',
    success: true,
    useIcon: true,
    description:
      '1.테이블이 수평으로 2중으로 구성되어있는데 모바일로 보여질 경우 조회만 고려해서 수직 구조로만 내려주시면 될 것 같습니다\n2.그것도 애매하면 그냥 가로 스크롤되서 화면만 확인할 수 있께끔 해주시면 됩니다\n3.검색 input 필드에 좌측은 검색 아이콘, 인풋 필드에 내용이 존재하면 우측에 x 버튼\n4.테이블의 건수 정보는 테이블의 좌측 상단으로 통일(모바일 화면에서는 않보여주는게 나아보임)\n5.페이징이 필요없는 UI\n6.아이콘은 검색, 검색 내용 삭제(알파벳 x로 해도 됩니다), 편집, 삭제 아이콘 : 4개의 아이콘 필요'
  },
  {
    title: '테이블 1',
    fileName: 'PTable1.js',
    component: PTable1,
    url: '/table1',
    pageCount: '3',
    success: true,
    useIcon: true,
    description:
      '1.상단 검색 조건중 공사번호 input 필드는 disabled인 상태, 등록자의 이름, 조직도 input 필드도 disabled인 상태(폼에서도 동일한 경우가 존재합니다)\n2.셀에 대한 기본 정렬은 center이고 left, right 정렬 방법 주는 가이드 필요\n3.페이징이 존재하는 테이블이고 모바일도 PC와 동일한 방법으로 페이징 처리(혹시 차후에 테이블 모바일 디자인이 필요하면 별도로 비용잡아서 도와주시는걸로)\n4.input 필드에 포커싱되었을때 border 다르게(폼에서도 동일한 경우가 존재합니다)\n5.검색 조건 필드가 많은데 반응형으로 이상하지 않게 나오게끔 부탁드려요!\n6.테이블 영역의 반응형 스타일은 가로 스크롤이 나오는 경우와 테이블의 최대 넒이가 디바이스 넓이로 처리하는 방법\n7.각 테이블의 검색 최종 액션인 [조회] 버튼은 조건 영역 마지막 우측 하단에 놓습니다(위에 놓으면 반응형시에 중간에 버튼에 위치하거나 다른 방법을 사용해야될 것으로 판단되는데 별도의 좋은 방법이 존재할 경우 가이드해주셔도 됩니다\n8.페이지가 존재하지 않을 경우 공통 스타일 가이드 필요\n9.각 행의 댓글 카운트를 선택하면 모달이 오픈되므로 식별할 수 있는 스타일이 필요\n10.등록, 다운로드, 선택한 목록 삭제를 위한 아이콘(휴지통), 상세화면 이동을 위한 아이콘, 테이블 열 정렬을 위한 아이콘, 공사번호 input 필드 우측에 [찾기] 버튼이 있는데 검색 아이콘으로 대체할 수도 있어서 대체용 아이콘 : 6개의 아이콘 필요'
  },
  {
    title: '테이블 2',
    fileName: 'PTable2.js',
    component: PTable2,
    url: '/table2',
    pageCount: '4',
    success: true,
    useIcon: true,
    description: '1.첫번째 컬럼에 체크박스 반영(테이블 행 선택을 위한)'
  },
  {
    title: '탭 + 테이블이 수직으로 2개 있는 경우',
    fileName: 'PTabTable1.js',
    component: PTabTable1,
    url: '/tab-table1',
    pageCount: '5',
    success: true,
    useIcon: false,
    description:
      '1.탭은 선택, 선택이 아닌 경우, 비활성화 이렇게 3개의 경우로 스타일 반영(3가지가 애매하면 선택/선택아닌 상태2가지로)\n2.모바일에서는 각 테이블의 상단 영역만 반응형으로 나오게끔 해주시면 됩니다. 상단 테이블에는 "페이징" 존재하는 걸로 판단됩니다(기획 누락)\n3.마지막 컬럼에 sort 이미지가 필요할듯(셀이 위/아래 아이콘이 동시에 있어야 됩니다. 정렬을 바꿔줘야 될 것 같애요)'
  },
  {
    title: '게시판 폼',
    fileName: 'PBoardForm.js',
    component: PBoardForm,
    url: '/board-form',
    pageCount: '6',
    success: true,
    useIcon: true,
    description:
      '1.input 필드 필수 컬럼 여부 표기 필요\n2.validation 실패시 input border 스타일과 input 하단에 경고 메시지 보여주는 스타일 가이드 필요\n3.공개 기간은 단순 input filed로 해주시고 필드 우측에 캘린더 아이콘 넣어주시면 됩니다(YYYY-MM-DD HH:mm) 공백포함 알파벳 16자리가 max로 들어갈 공간이면 됩니다\n4.우측 상단의 [조회] 버튼은 필요없거나 등록자 input 필드 바로옆에 붙여주시면 됩니다\n5.첨부영역은 단순 파일 첨부입니다.첨부 파일을 추가하는 UI와 삭제하는 UI가 필요합니다. 캡쳐화면은 무시하시는게 좋을 것 같애요\n6.폼 화면의 반응형은 기존에 material-ui로 만들어서 해당 링크 참고해주셔도 됩니다 https://material-ui.com/components/text-fields (원래 하셨던 반응형 작업 경험 그대로 가져가면 될 것 같애요)\n7.첨부 파일 등록 버튼은 아이콘으로 할지 단순 버튼으로 할지 결정해주시면 되고 가이드해주시는데로 가져갈게요. 각 첨부된 삭제 버튼도 일관성 유지되게 가이드해주시면 됩니다'
  },
  {
    title: '게시판 상세',
    fileName: 'PBoardDetail.js',
    component: PBoardDetail,
    url: '/board-detail',
    pageCount: '7',
    success: true,
    useIcon: false,
    description:
      '1.첨부 파일 목록의 삭제 버튼은 불필요합니다\n2.하단 댓글의 내용은 컬럼은 한줄로 표기해주시고 벗어나면 "..."으로 표기해주시면 됩니다. 클릭하면 모달 형태로 보여주거나 툴팁으로 보여주거 둘중 하나로 할 예정입니다(이후 액션은 고려X)'
  },
  {
    title: '공사 상세 보기(안전 선임자 탭)',
    fileName: 'PWorkDetail1.js',
    component: PWorkDetail1,
    url: '/work-detail1',
    pageCount: '8',
    success: true,
    useIcon: false,
    description:
      '1.상세화면이라 input으로 하실 경우 disabled 상태입니다(input으로 해야되는건 아닙니다. 편한대로 가이드해주세요)\n2.[조회] 버튼의 위치는 [찾기] 버튼 바로 옆입니다'
  },
  {
    title: '공사 상세 보기(협의체 탭)',
    fileName: 'PWorkDetail2.js',
    component: PWorkDetail2,
    url: '/work-detail2',
    pageCount: '9',
    success: true,
    useIcon: false,
    description:
      '1.좌측 테이블에 선택한 행을 구분하기 위한 스타일이 필요(테이블 공통 사항이긴 합니다)\n2.좌측 테이블에 대한 비활성화 스타일도 가능하면 가이드 부탁드려요.(테마반영할때 스타일이 너무 많다 싶으면 고려않하셔도 됩니다)'
  },
  {
    title: '안전 서류 등록/수정 : 파일 업로드',
    fileName: 'PWorkForm1.js',
    component: PWorkForm1,
    url: '/work-form1',
    pageCount: '10',
    success: true,
    useIcon: true,
    description:
      '0.10~18 페이지는 안전 서류 등록/수정 case로 좌측영역과 상단역역이 공통으로 구성되어있습니다(별도의 파일로 분류함 : PWorkFormLeft.js, PWorkFormTop.js)\n1.[찾기],[조회],[초기화] 버튼은 같은 액션 그룹이라 같이 붙어있으면 됩니다.(찾기와 동시에 조회가 되는 구조여야 될 것 같애서 조회 버튼 필요없을 수 도 있습니다(있다고 가정하시면 됩니다)\n2.파일첨부 각 필드의 마지막에 아래 화살표 아이콘이 있는데 용도가 없어 보여서 삭제\n3.[X] 버튼과 [+] 버튼이 같은 정렬로 있는데 [x] 버튼은 업로된 파일을 삭제하는거고 [+]는 클릭시 파일 다이얼로그가 오픈됨\n4.좌측 하단에 공간이 따로 존재하는데 존재하는 경우와 존재하지 않는 경우 2가지 가이드 필요합니다.\n5.[찾기] 버튼 우측에 있는 등록일시, 등록자 소속 이름, 서류 상태 라벨을 바로 아래로 내립니다.\n3.[?],[X],[+] : 3개 아이콘 필요'
  },
  {
    title: '안전 서류 등록/수정 : 결재선 지정',
    fileName: 'PWorkForm2.js',
    component: PWorkForm2,
    url: '/work-form2',
    pageCount: '11',
    success: true,
    useIcon: true,
    description:
      '1.삭제,변경은 버튼으로 할지 아이콘으로 할지 가이드해주시는데로 그대로 진행\n2.변경 버튼을 누르면 해당 로우는 라벨에서 input으로 변경됨'
  },
  {
    title: '안전 서류 등록/수정 : 안전관리자 등록',
    fileName: 'PWorkForm3.js',
    component: PWorkForm3,
    url: '/work-form3',
    pageCount: '12',
    success: true,
    useIcon: true,
    description:
      '1.안전관리자 필드는 많은 화면에서 사용하는 "사원검색" 모달을 통해 선택된 결과값을 보여주는 영역입니다.\n2.기획서는 여러 필드로 나와있는데 3개의 필드로 보여주는 경우와 하나의 필드로 보여주는 경우 2가지 경우를 가이드해주시면 좋을 것 같습니다.\n3.하나의 필드일 경우 이름 지책(사번) / 소속 순으로 라벨링되어 보여집니다(기획서에 반영해놓았습니다)'
  },
  {
    title: '안전 서류 등록/수정 : 근로자측 위원 등록',
    fileName: 'PWorkForm4.js',
    component: PWorkForm4,
    url: '/work-form4',
    pageCount: '13',
    success: true,
    useIcon: true,
    description:
      '1.위원은 멀티로 등록이 가능하며 추가는 하단의 [찾기], [추가] 버튼을 통해서 등록됩니다.'
  },
  {
    title: '안전 서류 등록/수정 : 직문전환자 안전보건교육 증빙자료',
    fileName: 'PWorkForm5.js',
    component: PWorkForm5,
    url: '/work-form5',
    pageCount: '14',
    success: true,
    useIcon: false,
    description:
      '1.교육대상자 수, 교육실시자 수 "계"는 합계로 자동계산되는 영역으로 input으로 할 경우 disabled 상태임\n2.하단에 있는 "교육 실시 사진"은 이미지 첨부 영역임(한개만 등록하는 UI)'
  },
  {
    title: '안전 서류 등록/수정 : 도급/합동 안전',
    fileName: 'PWorkForm6.js',
    component: PWorkForm6,
    url: '/work-form6',
    pageCount: '15',
    success: true,
    useIcon: false,
    description:
      '1.도급인은 [추가] 버튼을 통해 멀티로 추가되는 UI이고 기존 기획서 상에 [추가] 버튼과 [삭제] 버튼이 누락된걸로 판단됨\n2.확인자 영역의 [?] 버튼은 툴팁 형태로 도움말이 나오는 구조임'
  },
  {
    title: '안전 서류 등록/수정 : 보호구 지급대장',
    fileName: 'PWorkForm7.js',
    component: PWorkForm7,
    url: '/work-form7',
    pageCount: '16',
    success: true,
    useIcon: false,
    description:
      '1.[추가] 버튼시 오픈되는 모달을 통해 테이블에 행이 추가되는 구조입니다\n2.확인자는 기본 사원검색 모달을 통해 선택된 사원 정보인데 "상태"와 "최종처리 일시" 값을 보여줘야하는데 최종 다음행으로 내려서 보여주는 걸로 변경'
  },
  {
    title: '안전 서류 등록/수정 : 작업장 상황조사',
    fileName: 'PWorkForm8.js',
    component: PWorkForm8,
    url: '/work-form8',
    pageCount: '17',
    success: true,
    useIcon: false,
    description: ''
  },
  {
    title: '안전 서류 등록/수정 : 도급_작업장 순회점검일자 격일',
    fileName: 'PWorkForm9.js',
    component: PWorkForm9,
    url: '/work-form9',
    pageCount: '18',
    success: true,
    useIcon: false,
    description: ''
  },
  {
    title: '안전 서류 등록/수정 : 중량물 점검결과',
    fileName: 'PWorkForm10.js',
    component: PWorkForm10,
    url: '/work-form10',
    pageCount: '19',
    success: true,
    useIcon: false,
    description:
      '양호/불량은 스위치 스타일 or 체크박스 스타일 둘중 하나입니다. 여력되시면 2가지 경우 가이드 부탁드릴게요!'
  },
  {
    title: '작업 지시 관리',
    fileName: 'PWorkDirectionList.js',
    component: PWorkDirectionList,
    url: '/work-directions',
    pageCount: '20',
    success: true,
    useIcon: true,
    description: ''
  },
  {
    title: '작업 지시 등록/수정 : 작업정보 탭',
    fileName: 'PWorkDirectionForm1.js',
    component: PWorkDirectionForm1,
    url: '/work-direction-form1',
    pageCount: '21',
    success: true,
    useIcon: true,
    description: ''
  },
  {
    title: '작업 지시 등록/수정 : 작업조 탭',
    fileName: 'PWorkDirectionForm2.js',
    component: PWorkDirectionForm2,
    url: '/work-direction-form2',
    pageCount: '22',
    success: true,
    useIcon: true,
    description: ''
  },
  {
    title: '밀폐공간 작업 허가서 등록 : 작업정보 탭',
    fileName: 'PConfinedSpaceForm1.js',
    component: PConfinedSpaceForm1,
    url: '/confined-space-form1',
    pageCount: '23',
    success: true,
    useIcon: false,
    description: ''
  },
  {
    title: '밀폐공간 작업 허가서 등록 : 안전조치 요구사항 탭',
    fileName: 'PConfinedSpaceForm2.js',
    component: PConfinedSpaceForm2,
    url: '/confined-space-form2',
    pageCount: '24',
    success: true,
    useIcon: false,
    description: ''
  },
  {
    title: '밀폐공간 작업 허가서 등록 : 산소 및 유해가스 농도 측정 탭',
    fileName: 'PConfinedSpaceForm3.js',
    component: PConfinedSpaceForm3,
    url: '/confined-space-form3',
    pageCount: '25',
    success: true,
    useIcon: true,
    description: ''
  },
  {
    title: '점검결과 현황',
    fileName: 'PCheckResultList.js',
    component: PCheckResultList,
    url: '/check-results',
    pageCount: '26',
    success: true,
    useIcon: true,
    description: ''
  },
  {
    title: '점검결과 등록',
    fileName: 'PCheckResultForm.js',
    component: PCheckResultForm,
    url: '/check-result-form',
    pageCount: '27',
    success: true,
    useIcon: false,
    description: ''
  },
  {
    title: '안전 점검 등록 현황 조회',
    fileName: 'PSafeCheckList.js',
    component: PSafeCheckList,
    url: '/safe-checks',
    pageCount: '28',
    success: true,
    useIcon: false,
    description: ''
  },
  {
    title: '작업 지시서 현황',
    fileName: 'PWorkReportList.js',
    component: PWorkReportList,
    url: '/work-reports',
    pageCount: '29',
    success: false,
    useIcon: true,
    description:
      '1.좌측을 트리로할지 결정이 않났습니다. 이건 일단 작업 보류 해주세용'
  },
  {
    title: '컴포넌트 가이드',
    fileName: 'PComponentsGuide.js',
    component: PComponentsGuide,
    url: '/component-guide',
    pageCount: 'gusalnim',
    success: false,
    useIcon: false,
    description: '컴포넌트 가이드 정리'
  }
];

PageConfig.list = list;

export default PageConfig;
