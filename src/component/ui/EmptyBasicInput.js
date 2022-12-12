import React from 'react';

/*

    search input 좌측 공통 버튼
     : <EmptyBasicInput search={() => {}} />

    props
     -search : 버튼 handler 함수

*/

class EmptyBasicInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <span
        className="form_group c_mr5"
        style={{ width: '0px', height: 38 }}
      ></span>
    );
  }
}

export default EmptyBasicInput;
