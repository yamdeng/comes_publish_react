import _ from 'lodash';

const Code = {};

// 게시유형
Code.boardType = [
  {
    name: '전체',
    value: ''
  },
  {
    name: '공지',
    value: '공지'
  },
  {
    name: '질문',
    value: '질문'
  },
  {
    name: '자료',
    value: '자료'
  }
];

// 공개유형
Code.publicType = [
  {
    name: '전체',
    value: ''
  },
  {
    name: '공개',
    value: '공개'
  },
  {
    name: '비공개',
    value: '비공개'
  }
];

// 공개유형
Code.pageSizeList = [
  {
    name: '10개',
    value: 10
  },
  {
    name: '15개',
    value: 15
  },
  {
    name: '20개',
    value: 20
  }
];

// 년도 목록
Code.yearList = [
  {
    name: '2021년',
    value: '2021'
  },
  {
    name: '2022년',
    value: '2022'
  }
];

// 코드명 가져오기 : value 기준
Code.getCodeNameByValue = function (codeCategory, codeValue) {
  let codeName = null;
  let codeList = Code[codeCategory] || [];
  let searchIndex = _.findIndex(codeList, (codeInfo) => {
    if (codeValue === codeInfo.value) {
      return true;
    } else {
      return false;
    }
  });
  if (searchIndex !== -1) {
    let findCodeInfo = codeList[searchIndex];
    codeName = findCodeInfo.name;
  }
  return codeName;
};

export default Code;
