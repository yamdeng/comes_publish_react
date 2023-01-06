import _ from 'lodash';

const Code = {};

// 근무상태
Code.workStatusCodeList = [
  {
    name: '업무중',
    value: 'ING'
  },
  {
    name: '재택중',
    value: 'HOME_ING'
  },
  {
    name: '업무종료',
    value: 'END'
  },
  {
    name: '연차',
    value: 'VACATION_YEAR'
  },
  {
    name: '오전반차',
    value: 'VACATION_MORNING'
  },
  {
    name: '오후반차',
    value: 'VACATION_AFTERNOON'
  },
  {
    name: '공가',
    value: 'VACATION_NATION'
  },
  {
    name: '대체휴가',
    value: 'VACATION_REPLACE'
  },
  {
    name: '경조휴가',
    value: 'VACATION_CON'
  },
  {
    name: '포상휴가',
    value: 'VACATION_PRIZE'
  },
  {
    name: '출산휴가',
    value: 'VACATION_BABY'
  },
  {
    name: '육아휴직',
    value: 'VACATION_CATE'
  },
  {
    name: '일반휴직',
    value: 'VACATION_NORMAL'
  },
  {
    name: '기타휴가',
    value: 'VACATION_ETC'
  }
];

// 근무결과
Code.workResultCodeList = [
  {
    name: '정상출근',
    value: 'SUCCESS_NORMAL'
  },
  {
    name: '정상출근(오전반차)',
    value: 'SUCCESS_MORNING'
  },
  {
    name: '정상출근(오후반차)',
    value: 'SUCCESS_AFTERNOON'
  },
  {
    name: '정상출근(생일)',
    value: 'SUCCESS_BIRTHDAY'
  },
  {
    name: '지각',
    value: 'TARDY'
  },
  {
    name: '지각(생일)',
    value: 'TARDY_BIRTHDAY'
  },
  {
    name: '지각(오전반차)',
    value: 'TARDY_MORNING'
  },
  {
    name: '지각(오후반차)',
    value: 'TARDY_AFTERNOON'
  },
  {
    name: '연차',
    value: 'VACATION_YEAR'
  },
  {
    name: '공가',
    value: 'VACATION_NATION'
  },
  {
    name: '대체휴가',
    value: 'VACATION_REPLACE'
  },
  {
    name: '경조휴가',
    value: 'VACATION_CON'
  },
  {
    name: '포상휴가',
    value: 'VACATION_PRIZE'
  },
  {
    name: '출산휴가',
    value: 'VACATION_BABY'
  },
  {
    name: '육아휴직',
    value: 'VACATION_CARE'
  },
  {
    name: '일반휴직',
    value: 'VACATION_NORMAL'
  },
  {
    name: '기타휴가',
    value: 'VACATION_ETC'
  },
  {
    name: '결근',
    value: 'ABSENT'
  },
  {
    name: '기타',
    value: 'ETC'
  }
];

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

// dayWorkTimeCodeList
Code.dayWorkTimeCodeList = [
  {
    name: '전체',
    value: ''
  },
  {
    name: '근무시간 8시간 미만',
    value: 'LESS'
  },
  {
    name: '근무시간 8시간 초과',
    value: 'GREATER'
  }
];

// weekWorkTimeCodeList
Code.weekWorkTimeCodeList = [
  {
    name: '전체',
    value: ''
  },
  {
    name: '근무시간 52시간 미만',
    value: 'LESS'
  },
  {
    name: '근무시간 52시간 초과',
    value: 'GREATER'
  }
];

// 출퇴근 통계 검색 유형
Code.commuteStatsSearchTypeCodeList = [
  {
    name: '주간',
    value: 'WEEK'
  },
  {
    name: '월간(주별)',
    value: 'MONTH_WORKDAY'
  },
  {
    name: '월간(휴일)',
    value: 'MONTH_HOLIDAY'
  }
];

// 외근 여부
Code.outsideWorkYnCodeList = [
  {
    name: 'Y',
    value: 'Y'
  },
  {
    name: 'N',
    value: 'N'
  }
];

const timeSettingCodeList = [];
for (let index = 0; index < 24; index++) {
  // 00:00, 00:30, 01:00 ~
  let timeStr = '';
  if (index > 10) {
    timeStr = index + '';
  } else {
    timeStr = '0' + index;
  }
  timeSettingCodeList.push({
    name: timeStr + ':00',
    value: timeStr + ':00'
  });
  timeSettingCodeList.push({
    name: timeStr + ':30',
    value: timeStr + ':30'
  });
}

Code.timeSettingCodeList = timeSettingCodeList;

// 외근 여부
Code.plusTargetConditionCodeList = [
  {
    name: '1년이상',
    value: '1YEAR'
  },
  {
    name: '10년이상',
    value: '10YEAR'
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
