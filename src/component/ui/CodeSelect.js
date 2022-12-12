import React from 'react';
import Helper from 'util/Helper';
import Code from 'config/Code';
import rootStore from 'store/RootStore';

/*

    code 콤보 박스 공통
     : <CodeSelect id='' name='' value={''} label='직책코드' 
          codeType='rankType' onChange={() => {}} required={true} codeList={[]}/>

    props
     -id(option) : 라벨을 매핑시키기 위한 id(없으면 uuid로 정의)
     -name(option) : name 속성 값
     -label : input label
     -value : code value
     -onChange : code 값 변경 handler 함수
     -codeType(option) : Code.js에 정의된 타입명
     -codeList(option) : []
     -required(option) : 필수 값 여부

*/

class CodeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      label,
      value,
      onChange,
      id,
      name,
      codeType,
      codeList,
      required,
      errorMessage,
      onBlur,
      isFrontCode,
      emptyPlaceHolderText
    } = this.props;
    let labelId = id ? id : Helper.getUuid();
    let resultCodeList = [];
    if (isFrontCode) {
      resultCodeList = codeType ? Code[codeType] : codeList;
    } else {
      // resultCodeList = rootStore.appStore.getCodeByGrpCode(codeType) || [];
    }
    return (
      <React.Fragment>
        <select
          name={name}
          id={id}
          className={
            errorMessage
              ? 'form_tag_select isValue invalid'
              : 'form_tag_select isValue'
          }
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {emptyPlaceHolderText ? (
            <option value="">{emptyPlaceHolderText}</option>
          ) : null}
          {resultCodeList.map((codeInfo) => {
            let { value, name } = codeInfo;
            return <option value={value}>{name}</option>;
          })}
        </select>
        <label className="f_label" for={labelId}>
          {label} {required ? <span class="required">*</span> : null}
        </label>
        <span
          style={{ display: errorMessage ? '' : 'none' }}
          class="invalid_txt"
        >
          {errorMessage}
        </span>
      </React.Fragment>
    );
  }
}

export default CodeSelect;
