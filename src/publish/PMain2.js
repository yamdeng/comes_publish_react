import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import SideBar from './PNewSideBar';
import PageConfig2 from './PageConfig2';
import PNewHome from 'publish/page/PNewHome';

@withRouter
@observer
class PMain2 extends Component {
  constructor(props) {
    super(props);
    this.state = { side: true, top: true };
  }

  componentDidMount() {}

  render() {
    const pageList = PageConfig2.list;
    return (
      <>
        <SideBar />
        <div className="content_area_wrap home">
          <Switch>
            <Route exact path="/" component={PNewHome} />
            {pageList.map((pageInfo) => {
              return (
                <Route
                  exact
                  path={pageInfo.url}
                  component={pageInfo.component}
                />
              );
            })}
          </Switch>
        </div>
      </>
    );
  }
}
export default PMain2;
