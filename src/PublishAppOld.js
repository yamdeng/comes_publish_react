import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PMain from 'publish/PMain';
import PModalContainer from 'publish/PModalContainer';
import LoadingBarContainer from 'component/layout/LoadingBarContainer';
import ReactTooltip from 'react-tooltip';

@withRouter
@observer
class PublishApp extends Component {
  render() {
    return (
      <div>
        <PMain />
        <PModalContainer />
        <LoadingBarContainer />
        <ReactTooltip />
      </div>
    );
  }
}

export default PublishApp;
