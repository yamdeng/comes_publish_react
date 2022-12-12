import React from 'react';
import ApiService from 'service/ApiService';
import Helper from 'util/Helper';

/*

    code 콤보 박스 공통
     : <CodeSelectApi id='' inputName='' value={''} label='직책코드' 
        codeType='rankType' onChange={() => {}} emptyValueText=''/>

    props
     -id(option) : 라벨을 매핑시키기 위한 id(없으면 uuid로 정의)
     -inputName(option) : name 속성 값
     -label : input label
     -value : code value
     -changeCodeValue : code 값 변경 handler 함수
     -codeType : api 요청을 날릴 codeType
     -emptyValueText(option) : 기본값('선택해주세요')

*/

class CodeSelectApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { codeList: [] };
  }

  componentDidMount() {
    let { codeType } = this.props;
    // TODO : ApiService call
    setTimeout(() => {
      this.setState({
        codeList: [
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
        ]
      });
    }, 1500);
  }

  render() {
    let { label, value, onChange, id, inputName, emptyValueText } = this.props;
    let { codeList } = this.state;
    let labelId = id ? id : Helper.getUuid();
    return (
      <React.Fragment>
        <select
          name={inputName}
          id={labelId}
          className="form_tag_select isValue"
          value={value}
          onChange={onChange}
        >
          <option value="">
            {emptyValueText ? emptyValueText : '선택해주세요'}
          </option>
          {codeList.map((codeInfo) => {
            let { value, name } = codeInfo;
            return <option value={value}>{name}</option>;
          })}
        </select>
        <label className="f_label" for={labelId}>
          {label}
        </label>
      </React.Fragment>
    );
  }
}

export default CodeSelectApi;
