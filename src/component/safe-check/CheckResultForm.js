import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';

/*

    이름 : 점검결과 폼

    route
     -/check-results/new
     -/check-results/:id/update

    store
     -boardListStore

*/

@HOC.documentTitle('점검결과 폼')
@withRouter
@inject('boardListStore')
@observer
class CheckResultForm extends Component {
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
        <h2>점검결과 등록/수정 : CheckResultForm</h2>
        {info}
      </div>
    );
  }
}

export default CheckResultForm;
