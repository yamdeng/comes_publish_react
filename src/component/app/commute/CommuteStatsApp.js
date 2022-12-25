import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import CommuteStatsTabDay from './CommuteStatsTabDay';
import CommuteStatsTabMonth from './CommuteStatsTabMonth';

@inject('appStore', 'uiStore')
@observer
class CommuteStatsApp extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 1 };
    this.changeTabIndex = this.changeTabIndex.bind(this);
  }

  changeTabIndex(tabIndex) {
    this.setState({ tabIndex: tabIndex });
  }

  componentDidMount() {}

  render() {
    let { tabIndex } = this.state;
    return (
      <div id="contents_sub" class="">
        <CommuteSubMenu />

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">출퇴근</a>&gt;
            <a href="javascript:void(0);">전체출퇴근통계</a>
          </div>

          <div class="tab_sub">
            <ul class="tab_subnav">
              <li onClick={() => this.changeTabIndex(1)}>
                <a
                  href="javascript:void(0);"
                  className={tabIndex === 1 ? 'active' : ''}
                >
                  일간
                </a>
              </li>
              <li onClick={() => this.changeTabIndex(2)}>
                <a
                  href="javascript:void(0);"
                  className={tabIndex === 2 ? 'active' : ''}
                >
                  주간/월간
                </a>
              </li>
            </ul>
            <div class="tab_subcontent">
              <CommuteStatsTabDay visible={tabIndex === 1 ? true : false} />
              <CommuteStatsTabMonth visible={tabIndex === 2 ? true : false} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommuteStatsApp;
