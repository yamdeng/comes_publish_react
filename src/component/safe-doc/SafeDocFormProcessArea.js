import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 안전서류 등록/수정 폼(좌측 프로세스)

    route
     -/safe-docs/new
     -/safe-docs/:id
     -/safe-docs/:id/update

    store
     -boardListStore

*/
@withRouter
@inject('boardListStore')
@observer
class SafeDocFormProcessArea extends Component {
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
        <h2>안전서류 등록/수정 폼(좌측 프로세스) : SafeDocFormProcessArea</h2>
        {info}
      </div>
    );
  }
}

export default SafeDocFormProcessArea;
