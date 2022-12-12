import { observable, action, toJS, computed } from 'mobx';
import Config from 'config/Config';
import Constant from 'config/Constant';
import update from 'immutability-helper';
import Helper from 'util/Helper';
import _ from 'lodash';
import ModalService from 'service/ModalService';
import ApiService from 'service/ApiService';

/*


  formData.memberId = {
    inputName: 'memberId',
    value: '',
    touched: false,
    isRequired: true,
    isValid: true,
    errorMessage: '',
    notRequiredMessage: '',
    notPatternMessage: '',
    isNumber: true,
    maxLength: 10,
    minLength: 5,
    max: 1000,
    min: 10,
    pattern: ''
  };

  // 기본 예시
  formData.memberId = {
    inputName: 'memberId',
    value: null,
    touched: false,
    isRequired: true,
    isValid: true
  };

  formData.count = {
    inputName: 'count',
    value: 0,
    touched: false,
    isRequired: true,
    isValid: true,
    isNumber: true
  };

*/

class FormStore {
  // 폼 data
  @observable formData = null;

  // 폼 유형 : add / edit
  @observable formType = Constant.FORM_TYPE_ADD;

  // detailId
  @observable detailId = null;

  // 상세 정보
  @observable
  detailInfo = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  // form 유형 변경
  @action
  changeFormType(formType) {
    this.formType = formType;
  }

  // 상세 id 변경 : 수정 form 전송시 사용
  @action
  changeDetailId(detailId) {
    this.detailId = detailId;
  }

  // 지정 input을 isValid 값을 true로 변경
  @action
  successValidToIunputName(inputName) {
    let beforeFormData = toJS(this.formData);
    let inputData = beforeFormData[inputName];
    let updateInputData = update(inputData, {
      $merge: {
        isValid: true
      }
    });
    let updateFormData = update(beforeFormData, {
      $merge: {
        [inputName]: updateInputData
      }
    });
    this.formData = updateFormData;
  }

  // input focus 벗어났을때
  handleInputOnBlur(inputName) {
    let beforeFormData = toJS(this.formData);
    let inputData = beforeFormData[inputName];
    inputData.touched = true;
    let validResult = Helper.checkValidation(inputData);
    let updateInputData = update(inputData, {
      $merge: {
        touched: true,
        errorMessage: validResult.errorMessage,
        isValid: validResult.isValid,
        byPassValid: false
      }
    });
    let updateFormData = update(beforeFormData, {
      $merge: {
        [inputName]: updateInputData
      }
    });
    this.changeFormData(updateFormData);
  }

  // input 정보 반영
  @action
  changeInput(inputName, inputValue) {
    let beforeFormData = toJS(this.formData);
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
    let updateFormData = update(beforeFormData, {
      $merge: {
        [inputName]: updateInputData
      }
    });
    this.formData = updateFormData;
  }

  // formData 수정
  @action
  changeFormData(formData) {
    this.formData = formData;
  }

  // formData 맵핑시키기
  @action
  setFormData(detailInfo) {
    this.detailInfo = detailInfo;
    this.formType = Constant.FORM_TYPE_UPDATE;
    let formData = toJS(this.formData);
    let formDataKeys = _.keys(formData);
    formDataKeys.forEach((inputKey) => {
      let inputData = formData[inputKey];
      if (inputData.isArray) {
        inputData.value = detailInfo[inputKey] || [];
      } else {
        inputData.value = detailInfo[inputKey];
      }
    });
    this.formData = formData;
  }

  // formData 전체 validate
  @action
  validate() {
    let formData = toJS(this.formData);
    let successValidation = true;
    let inputKeys = _.keys(formData);
    inputKeys.forEach((inputName) => {
      let inputData = formData[inputName];
      inputData.touched = true;
      let validResult = Helper.checkValidation(inputData);
      inputData.errorMessage = validResult.errorMessage;
      inputData.isValid = validResult.isValid;
      if (!inputData.isValid) {
        successValidation = false;
      }
    });
    this.changeFormData(formData);
    return successValidation;
  }

  getApiParam() {
    let formData = this.formData;
    let inputKeys = _.keys(formData);
    let apiParam = {};
    inputKeys.forEach((key) => {
      let inputData = formData[key];
      if (inputData.isObject) {
        if (inputData.value) {
          if (inputData.keyName) {
            apiParam[key] = inputData.value[inputData.keyName];
          } else {
            apiParam[key] = inputData.value;
          }
        } else {
          apiParam[key] = null;
        }
      } else {
        apiParam[key] = inputData.value;
      }
    });
    return apiParam;
  }

  // 저장
  @action
  save() {
    if (!this.validate()) {
      return;
    }
    let apiParam = this.getApiParam();
    // if (this.formType === Constant.FORM_TYPE_UPDATE) {
    //   return ApiService.put(this.apiUrl + '/' + this.detailId, apiParam);
    // } else {
    //   return ApiService.post(this.apiUrl, apiParam);
    // }
  }

  // 이미지 파일 업로드
  @action
  uploadFile(fileObject, fileMaxSize, inputName) {
    if (
      !Helper.checkFileUploadMaxSize(
        fileObject,
        fileMaxSize || Config.maxFileUploadSize
      )
    ) {
      ModalService.alert({ body: '용량을 확인해주세요(5MB 이하).' });
      return;
    }
    let formData = toJS(this.formData);
    let fileList = formData[inputName].value;
    let fileFormData = new FormData();
    fileFormData.append('upload_file', fileObject);
    // fileFormData.append('fileType', Constant.FILE_UPLOAD_TYPE_IMAGE);
    // fileFormData.append('fileLocation', fileLocation);
    ApiService.post('common/uploadFile', fileFormData, {}).then((response) => {
      let data = response.data;
      fileList.push({
        status: Constant.FILE_UPLOAD_STATUS_NEW,
        fileName: data.fileName,
        fileThumbnail: data.thumb,
        fileSeq: data.tempFileSeq,
        fileUrl: data.fileUrl
      });
      this.changeInput(inputName, fileList);
    });
  }

  // errorMessage 수동적으로 반영
  @action
  changeInputErrorMessage(inputName, errorMessage) {
    let beforeFormData = toJS(this.formData);
    let inputData = beforeFormData[inputName];
    let updateInputData = update(inputData, {
      $merge: {
        errorMessage: errorMessage,
        isValid: false
      }
    });
    let updateFormData = update(beforeFormData, {
      $merge: {
        [inputName]: updateInputData
      }
    });
    this.formData = updateFormData;
  }

  // errorMessage 수동적으로 반영(멀티)
  @action
  changeInputErrorMessageArray(errorInfoArray) {
    let updateFormData = toJS(this.formData);
    if (errorInfoArray.length) {
      let firstErrorInputData = null;
      errorInfoArray.forEach((errorInfo) => {
        let inputName = errorInfo.name;
        let errorMessage = errorInfo.errorMessage;
        let inputData = updateFormData[inputName];
        let updateInputData = update(inputData, {
          $merge: {
            errorMessage: errorMessage,
            isValid: false,
            byPassValid: false
          }
        });
        if (!firstErrorInputData) {
          firstErrorInputData = updateInputData;
        }
        updateFormData = update(updateFormData, {
          $merge: {
            [inputName]: updateInputData
          }
        });
      });
    }
    this.formData = updateFormData;
  }

  @computed
  get isFormValid() {
    let formData = toJS(this.formData);
    let successValidation = true;
    let inputKeys = _.keys(formData);
    inputKeys.forEach((inputName) => {
      let inputData = formData[inputName];
      inputData.touched = true;
      let validResult = Helper.checkValidation(inputData);
      inputData.errorMessage = validResult.errorMessage;
      inputData.isValid = validResult.isValid;
      if (!inputData.isValid) {
        successValidation = false;
      }
    });
    return successValidation;
  }

  // 폼 clear
  @action
  clearForm() {
    this.initFormData();
    this.formType = Constant.FORM_TYPE_ADD;
    this.detailId = null;
    this.detailInfo = null;
  }
}

export default FormStore;
