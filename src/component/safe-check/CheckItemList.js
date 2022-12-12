import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import CheckItemListCommonTab from 'component/safe-check/CheckItemListCommonTab';
import CheckItemListTypeTab from 'component/safe-check/CheckItemListTypeTab';

/*

    이름 : 점검 항목 관리

    route : /check-type-items

    store
     -boardListStore

*/

@HOC.documentTitle('점검 항목 관리')
@withRouter
@inject('boardListStore')
@observer
class CheckItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(index) {
    this.setState({
      tabIndex: index
    });
  }

  componentDidMount() {}

  render() {
    let { tabIndex } = this.state;
    let list = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div className="content_area">
        <h3>점검항목 관리</h3>
        {/* 탭 상단 */}
        <ul className="tabs_wrap">
          <li
            className={tabIndex === 1 ? 'active' : ''}
            onClick={() => this.changeTab(1)}
          >
            공통
          </li>
          <li
            className={tabIndex === 2 ? 'active' : ''}
            onClick={() => this.changeTab(2)}
          >
            공사유형별
          </li>
        </ul>
        {/* 탭 내용 */}
        {tabIndex === 1 ? <CheckItemListCommonTab /> : <CheckItemListTypeTab />}
      </div>
    );
  }
}

export default CheckItemList;
