import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 안전서류 폼 : 업로드 유형

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
class ContentTypeUpload extends Component {
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
        <h2>업로드 유형 : ContentTypeUpload</h2>
        {info}
      </div>
    );
  }
}

export default ContentTypeUpload;
