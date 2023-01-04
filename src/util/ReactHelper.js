import update from 'immutability-helper';
import Helper from 'util/Helper';
import _ from 'lodash';
import moment from 'moment';

// 개행 분자를 <br/> 태그로 변환
const convertEnterStringToBrTag = function (value) {
  return value.replace(/\\r\\n|\r\n|\n|\\n/g, '<br/>');
};

// input change handler : store
const handleInputOnChange = function (event) {
  let currentFormStore = this.currentFormStore;
  if (currentFormStore) {
    let inputName = event.target.name;
    let inputValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    if (event.target.type === 'checkbox') {
      inputValue = inputValue ? true : false;
    }
    if (
      event.target.maxLength > 0 &&
      inputValue.length > event.target.maxLength
    ) {
      inputValue = inputValue.slice(0, event.target.maxLength);
    }
    currentFormStore.changeInput(inputName, inputValue);
  }
};

// input onBlur handler : store
const handleInputOnBlur = function (event) {
  let currentFormStore = this.currentFormStore;
  if (currentFormStore) {
    let inputName = event.target.name;
    currentFormStore.handleInputOnBlur(inputName);
  }
};

// input change handler : state
const handleInputOnChangeToState = function (event) {
  let inputName = event.target.name;
  let inputValue =
    event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value;
  if (event.target.type === 'checkbox') {
    inputValue = inputValue ? true : false;
  }
  if (
    event.target.maxLength > 0 &&
    inputValue.length > event.target.maxLength
  ) {
    inputValue = inputValue.slice(0, event.target.maxLength);
  }
  let beforeFormData = Object.assign({}, this.state.formData);
  let inputData = beforeFormData[inputName];
  inputData.value = inputValue;
  let validResult = Helper.checkValidation(inputData);
  let updateInputData = update(inputData, {
    $merge: {
      touched: true,
      errorMessage: validResult.errorMessage,
      isValid: validResult.isValid,
      value: inputValue,
      byPassValid: false
    }
  });
  let newFormData = update(beforeFormData, {
    $merge: {
      [inputName]: updateInputData
    }
  });
  this.setState({ formData: newFormData });
};

// input onBlur handler : state
const handleInputOnBlurToState = function (event) {
  let currentFormStore = this.currentFormStore;
  if (currentFormStore) {
    let inputName = event.target.name;
    currentFormStore.handleInputOnBlur(inputName);
  }
};

// 전체 form validate 성공 여부
const isFormValidToState = function () {
  let formData = Object.assign({}, this.state.formData);
  let successValidation = true;
  let inputKeys = _.keys(formData);
  inputKeys.forEach((inputName) => {
    let inputData = Object.assign({}, formData[inputName]);
    inputData.touched = true;
    let validResult = Helper.checkValidation(inputData);
    inputData.errorMessage = validResult.errorMessage;
    inputData.isValid = validResult.isValid;
    if (!inputData.isValid) {
      successValidation = false;
    }
  });
  return successValidation;
};

const validateToState = function () {
  let formData = Object.assign({}, this.state.formData);
  let successValidation = true;
  let inputKeys = _.keys(formData);
  inputKeys.forEach((inputName) => {
    let inputData = Object.assign({}, formData[inputName]);
    inputData.touched = true;
    let validResult = Helper.checkValidation(inputData);
    inputData.errorMessage = validResult.errorMessage;
    inputData.isValid = validResult.isValid;
    if (!inputData.isValid) {
      successValidation = false;
    }
  });
  this.setState({ formData: formData });
  return successValidation;
};

const saveToState = function () {
  if (!this.validate()) {
    return;
  }
  let apiParam = this.getApiParam();
};

const getApiParamToState = function () {
  let formData = Object.assign({}, this.state.formData);
  let inputKeys = _.keys(formData);
  let apiParam = {};
  inputKeys.forEach((inputName) => {
    let inputData = Object.assign({}, formData[inputName]);
    apiParam[inputName] = inputData.value;
  });
  return apiParam;
};

// 이하는 newoffice 전용 함수

// 일일_출퇴근 grid 전체 30분, 120분 색깔 반영
const onRowPreparedCommuteDayUpdate = function (row) {
  if (row) {
    if (row.rowType !== 'header') {
      if (row.data) {
        if (row.data.tardy120Minute) {
          row.rowElement.style.backgroundColor = '#f96464';
        } else if (row.data.tardy30Minute) {
          row.rowElement.style.backgroundColor = 'yellow';
        }
      }
    }
  }
};

// 일일_출퇴근 수정 datagrid에서 수정 disable하기 위한 이벤트 핸들러
const onEditingStartCommuteDay = function (e) {
  if (e && e.data) {
    const { vacationKindCode } = e.data;
    if (Helper.getIsAllDayVacation(vacationKindCode)) {
      e.cancel = true;
    }
  }
};

// 일일_출퇴근 수정 datagrid에서 수정 반영해야하는 헤더에 color 반영
const onCellPreparedCommuteDay = function (e) {
  if (e.rowType === 'header') {
    if (e.column) {
      const dataField = e.column.dataField;
      if (
        dataField === 'finalStartWorkDate' ||
        dataField === 'finalOutWorkDate' ||
        dataField === 'outsideWorkYn' ||
        dataField === 'etcDescription' ||
        dataField === 'workResultCode'
      ) {
        e.cellElement.style.color = '#4176fa';
      }
    }
  }
};

// 출근일시 column display custom
const finalStartWorkDateColumDisplayValue = function (rowData) {
  const { startWorkDate, finalStartWorkDate } = rowData;
  // 1.출근시간
  // 1-1.출근시간, 출근수정시간 존재하지 않으면 : ''
  // 1-2.출근시간 존재시
  //   1-2-1.출근수정시간 존재시 : 출근수정시간(최초출근시간)
  //   1-2-2.출근수정시간 존재 않할 경우 : 출근시간만
  // 1-3.출근수정시간 존재시
  //   -출근수정시간만
  let startWorkDateCellResult = '';
  if (!startWorkDate && !finalStartWorkDate) {
    return '';
  } else if (startWorkDate) {
    if (finalStartWorkDate) {
      startWorkDateCellResult =
        moment(finalStartWorkDate).format('HH:mm') +
        '(' +
        moment(startWorkDate).format('HH:mm') +
        ')';
    } else {
      startWorkDateCellResult = moment(startWorkDate).format('HH:mm');
    }
  } else if (finalStartWorkDate) {
    startWorkDateCellResult = moment(finalStartWorkDate).format('HH:mm') + '()';
  }
  return startWorkDateCellResult;
};

// 퇴근일시 column display custom
const finalOutWorkDateColumDisplayValue = function (rowData) {
  const { baseDateStr, outWorkDate, finalOutWorkDate } = rowData;
  // 퇴근일시 정보가 시작일 다음날인 경우 format을 변경해줘야 함
  let outWorkDateFormat = 'HH:mm';
  let finalOutWorkDateFormat = 'HH:mm';
  if (outWorkDate) {
    if (moment(baseDateStr).diff(moment(outWorkDate), 'days') < 0) {
      outWorkDateFormat = 'M/D/YYYY H:mm a';
    }
  }

  if (finalOutWorkDate) {
    if (moment(baseDateStr).diff(moment(finalOutWorkDate), 'days') < 0) {
      finalOutWorkDateFormat = 'M/D/YYYY H:mm a';
    }
  }

  let outWorkDateCellResult = '';
  // 사용자 퇴근일시와 수정 퇴근일시 모두 존재하는 경우
  if (!outWorkDate && !finalOutWorkDate) {
    return '';
  } else if (outWorkDate) {
    // 사용자 퇴근일시가 존재하고
    if (finalOutWorkDate) {
      // 수정 퇴근일시가 존재하는 경우
      outWorkDateCellResult =
        moment(finalOutWorkDate).format(finalOutWorkDateFormat) +
        '(' +
        moment(outWorkDate).format(outWorkDateFormat) +
        ')';
    } else {
      // 사용자 퇴근일시만 존재하는 경우
      outWorkDateCellResult = moment(outWorkDate).format(outWorkDateFormat);
    }
  } else if (finalOutWorkDate) {
    // 수정 퇴근일시만 존재하는 경우
    outWorkDateCellResult =
      moment(finalOutWorkDate).format(finalOutWorkDateFormat) + '()';
  }
  return outWorkDateCellResult;
};

// 근무결과 column display custom
const workResultcodeColumDisplayValue = function (rowData) {
  if (rowData && rowData.workResultCodeName) {
    if (rowData.resultModYn === 'Y') {
      return '*' + rowData.workResultCodeName;
    } else {
      return rowData.workResultCodeName;
    }
  }
  return '';
};

// 기준일자 column display custom
const baseDateStrColumDisplayValue = function (rowData) {
  if (rowData && rowData.baseDateStr) {
    return Helper.convertDate(rowData.baseDateStr, 'YYYYMMDD', 'YYYY-MM-DD');
  }
  return '';
};

// 업무보고 댓글여부 column display custom
const commentYnColumDisplayValue = function (rowData) {
  if (rowData && rowData.commentCount) {
    return 'Y';
  }
  return 'N';
};

// 업무보고 미제출 column display custom
const reportNotSubmitColumDisplayValue = function (rowData) {
  if (!rowData || !rowData.reportDate) {
    return '미제출';
  }
  return moment(rowData.reportDate).format('YYYY-MM-DD');
};

export default {
  convertEnterStringToBrTag,
  handleInputOnChange,
  handleInputOnBlur,
  handleInputOnChangeToState,
  handleInputOnBlurToState,
  isFormValidToState,
  validateToState,
  saveToState,
  getApiParamToState,
  onRowPreparedCommuteDayUpdate,
  onEditingStartCommuteDay,
  onCellPreparedCommuteDay,
  finalStartWorkDateColumDisplayValue,
  finalOutWorkDateColumDisplayValue,
  workResultcodeColumDisplayValue,
  baseDateStrColumDisplayValue,
  commentYnColumDisplayValue,
  reportNotSubmitColumDisplayValue
};
