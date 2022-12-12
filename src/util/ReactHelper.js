import update from 'immutability-helper';
import Helper from 'util/Helper';
import _ from 'lodash';

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

export default {
  convertEnterStringToBrTag,
  handleInputOnChange,
  handleInputOnBlur,
  handleInputOnChangeToState,
  handleInputOnBlurToState,
  isFormValidToState,
  validateToState,
  saveToState,
  getApiParamToState
};
