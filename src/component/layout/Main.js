import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Constant from 'config/Constant';
import SideBar from './SideBar';
import Home from 'component/mobile/Home';
import WorkReportList from 'component/mobile/WorkReportList';
import WorkReportDetail from 'component/mobile/WorkReportDetail';
import WorkReportForm from 'component/mobile/WorkReportForm';
import CommuteList from 'component/mobile/CommuteList';
import CommuteForm from 'component/mobile/CommuteForm';

// 개발 가이드

@withRouter
@observer
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <SideBar />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/reports" component={WorkReportList} />
            <Route
              exact
              path="/reports/:baseDateStr/:deptId/detail"
              component={WorkReportDetail}
            />
            <Route
              exact
              path="/reports/:baseDateStr/:deptId/form"
              component={WorkReportForm}
            />
            <Route exact path="/commute-depts" component={CommuteList} />
            <Route
              exact
              path="/commute-depts/:baseDateStr/:userId/form"
              component={CommuteForm}
            />
          </Switch>
        </div>
      </>
    );
  }
}
export default Main;
