import React from 'react';
import update from 'immutability-helper';
import Helper from 'util/Helper';
import _ from 'lodash';

const HOC = {};

// document.title 변경 및 title 기준으로 페이징 트래킹
const documentTitle = (title, category) => (WrappedComponent) =>
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {
      document.title = title;
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

// inputFocus 공통 처리
const focusHandle = () => (WrappedComponent) =>
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { currentFocusName: '' };
      // input focus/blur handle
      this.handleFocusByInputName = this.handleFocusByInputName.bind(this);
    }

    handleFocusByInputName(name) {
      this.setState({ currentFocusName: name });
    }

    render() {
      let { currentFocusName } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          currentFocusName={currentFocusName}
          handleFocusByInputName={this.handleFocusByInputName}
        />
      );
    }
  };

// form validate 처리를 store 기반으로 처리
const formStore = () => (WrappedComponent) =>
  class WithSubscription extends React.PureComponent {
    currentFormStore = null;

    constructor(props) {
      super(props);

      // input onChange event
      this.handleInputOnChange = this.handleInputOnChange.bind(this);

      // input onBlur event
      this.handleInputOnBlur = this.handleInputOnBlur.bind(this);

      // currentFormStore set
      this.setCurrentFormStore = this.setCurrentFormStore.bind(this);

      // save
      this.save = this.save.bind(this);
    }

    handleInputOnChange(event) {
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
    }

    handleInputOnBlur(event) {
      let currentFormStore = this.currentFormStore;
      if (currentFormStore) {
        let inputName = event.target.name;
        currentFormStore.handleInputOnBlur(inputName);
      }
    }

    setCurrentFormStore(formStore) {
      this.currentFormStore = formStore;
    }

    save() {
      let currentFormStore = this.currentFormStore;
      if (currentFormStore) {
        currentFormStore.save();
      }
    }

    componentWillUnmount() {
      let currentFormStore = this.currentFormStore;
      if (currentFormStore && currentFormStore.clear) {
        currentFormStore.clear();
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          setCurrentFormStore={this.setCurrentFormStore}
          handleInputOnChange={this.handleInputOnChange}
          handleInputOnBlur={this.handleInputOnBlur}
          save={this.save}
        />
      );
    }
  };

const formState = (formData) => (WrappedComponent) =>
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { formData: formData };

      // input onChange event
      this.handleInputOnChange = this.handleInputOnChange.bind(this);

      // input onBlur event
      this.handleInputOnBlur = this.handleInputOnBlur.bind(this);

      // changeFormData
      this.changeFormData = this.changeFormData.bind(this);

      // 전체 form validate 성공 여부
      this.isFormValid = this.isFormValid.bind(this);

      // validate
      this.validate = this.validate.bind(this);

      // save
      this.save = this.save.bind(this);

      // getApiParam
      this.getApiParam = this.getApiParam.bind(this);

      // setFormData
      this.setFormData = this.setFormData.bind(this);
    }

    handleInputOnChange(event) {
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
    }

    handleInputOnBlur(event) {
      let inputName = event.target.name;
      let beforeFormData = Object.assign({}, this.state.formData);
      let inputData = beforeFormData[inputName];
      inputData.touched = true;
      let validResult = Helper.checkValidation(inputData);
      let newInputData = update(inputData, {
        $merge: {
          touched: true,
          errorMessage: validResult.errorMessage,
          isValid: validResult.isValid,
          byPassValid: false
        }
      });
      let newFormData = update(beforeFormData, {
        $merge: {
          [inputName]: newInputData
        }
      });
      this.setState({ formData: newFormData });
    }

    changeFormData(formData) {
      this.setState({ formData: formData });
    }

    isFormValid() {
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
    }

    validate() {
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
    }

    save() {
      if (!this.validate()) {
        return;
      }
      let apiParam = this.getApiParam();
    }

    getApiParam() {
      let formData = Object.assign({}, this.state.formData);
      let inputKeys = _.keys(formData);
      let apiParam = {};
      inputKeys.forEach((inputName) => {
        let inputData = Object.assign({}, formData[inputName]);
        apiParam[inputName] = inputData.value;
      });
      return apiParam;
    }

    setFormData(data) {}

    render() {
      let { formData } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          formData={formData}
          isFormValid={this.isFormValid}
          validate={this.validate}
          save={this.save}
          getApiParam={this.getApiParam}
          changeFormData={this.changeFormData}
          handleInputOnChange={this.handleInputOnChange}
          handleInputOnBlur={this.handleInputOnBlur}
          setFormData={this.setFormData}
        />
      );
    }
  };

HOC.documentTitle = documentTitle;
HOC.focusHandle = focusHandle;
HOC.formStore = formStore;
HOC.formState = formState;

export default HOC;
