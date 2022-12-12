import React, { Component } from 'react';

class PWorkFormBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="form-table">
        <div className="form_cell f_wid100">
          <p className="right">
            <button className="btn_text btn_white">이전</button>
          </p>
        </div>
      </div>
    );
  }
}

export default PWorkFormBottom;
