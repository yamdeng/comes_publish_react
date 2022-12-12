import React from 'react';

/*

    search input 좌측 공통 버튼
     : <SearchButton search={() => {}} />

    props
     -search : 버튼 handler 함수

*/

class SearchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { search } = this.props;
    return (
      <button className="btn_icon btn_dark_gray " onClick={search}>
        <i class="fas fa-search"></i>
      </button>
    );
  }
}

export default SearchButton;
