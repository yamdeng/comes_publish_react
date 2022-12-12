import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 밀폐 허가서 작업 등록(산소 및 유해가스 농도 측정 탭)

    route
     -/closeness-permissions/new
     -/closeness-permissions/:id/update

    store
     -boardListStore

*/
@withRouter
@inject('boardListStore')
@observer
class ClosenessAirMeasureTab extends Component {
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
      <div>
        <h2>
          밀폐 허가서 작업 등록(산소 및 유해가스 농도 측정 탭) :
          ClosenessAirMeasureTab
        </h2>
        {info}
      </div>
    );
  }
}

export default ClosenessAirMeasureTab;
