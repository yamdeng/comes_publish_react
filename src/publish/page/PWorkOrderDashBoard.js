import React, { Component } from 'react';

class PWorkOrderDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>작업지시서 등록 집계</h3>
        <div className="box_form">
          <div className="form_table"></div>
        </div>
      </div>
    );
  }
}

export default PWorkOrderDashBoard;
