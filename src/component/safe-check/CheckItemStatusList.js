import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';

/*

    이름 : 안전점검 등록 현황

    route : /check-item-statuses

    store
     -boardListStore

*/

@HOC.documentTitle('안전점검 등록 현황')
@withRouter
@inject('boardListStore')
@observer
class CheckItemStatusList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // test handler
    this.testHandle = this.testHandle.bind(this);
  }

  testHandle(info) {
    // const { boardListStore } = this.props;
  }

  render() {
    let { boardListStore } = this.props;
    let { info } = boardListStore;
    return (
      <div className="content_area">
        <h2>안전점검 등록 현황 : CheckItemStatusList</h2>
        {info}
      </div>
    );
  }
}

export default CheckItemStatusList;
