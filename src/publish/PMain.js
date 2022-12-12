import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import PSideBar from './PSideBar';
import PTopHeader from './PTopHeader';
import PageHome from 'publish/PageHome';
import ModalHome from 'publish/ModalHome';
import PageConfig from './PageConfig';

// 사이드바 및 헤더 없는 메뉴
const fullPageMenu = ['/', '/modal', 'layout-sample'];

@withRouter
@observer
class PMain extends Component {
  constructor(props) {
    super(props);
    this.state = { side: true, top: true };
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    fullPageMenu.forEach((menu) => {
      if (pathname === menu) {
        this.setState({ side: false, top: false });
      }
    });
  }

  render() {
    const { state } = this;
    const pageList = PageConfig.list;
    return (
      <>
        {state.side ? <PSideBar /> : null}

        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route exact path="/modal" component={ModalHome} />
          {pageList.map((pageInfo) => {
            return (
              <Route exact path={pageInfo.url} component={pageInfo.component} />
            );
          })}
        </Switch>
      </>
    );
  }
}
export default PMain;
