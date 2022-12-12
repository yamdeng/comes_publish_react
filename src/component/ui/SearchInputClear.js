import React from 'react';

/*

    검색 인풋 우측 clear 버튼
     : <SearchInputClear value={''} clearInput={() => {}}

    props
     -value : input value(값 여부에 따라 버튼 보이고 않보이게
     -clearInput : [x] 버튼 handler 함수

*/

class SearchInputClear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { value, clearInput } = this.props;
    return (
      <span
        className="icon icon_clear"
        style={{ display: value ? 'block' : 'none' }}
        onClick={clearInput}
      >
        <i class="fas fa-times-circle"></i>
      </span>
    );
  }
}

export default SearchInputClear;
