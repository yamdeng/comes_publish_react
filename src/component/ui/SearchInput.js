import React from 'react';
import Helper from 'util/Helper';
import SearchInputClear from './SearchInputClear';

/*

    검색 필드 공통
     : <SearchInput id='' value={''} label='' onChange={() => {}}/>

    props
     -id(option) : 라벨을 매핑시키기 위한 id(없으면 uuid로 정의)
     -value : input value(값 여부에 따라 버튼 보이고 않보이게
     -label : input label
     -onChange : input 값 변경 handler 함수
     -onEnter(option) : 엔터키 핸들러

*/

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { id, value, label, onChange, onEnter } = this.props;
    let labelId = id ? id : Helper.getUuid();
    return (
      <React.Fragment>
        <input
          id={labelId}
          type="text"
          className="form_tag"
          value={value}
          onChange={onChange}
          onKeyPress={onEnter}
        />
        <label className="f_label" for={labelId}>
          {label}
        </label>
        <span className="icon icon_search">
          <i class="fas fa-search"></i>
        </span>
        <SearchInputClear
          clearInput={() => onChange({ target: { value: '' } })}
          value={value}
        />
      </React.Fragment>
    );
  }
}

export default SearchInput;
