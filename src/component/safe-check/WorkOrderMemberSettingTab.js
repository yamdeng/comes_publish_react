import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 작업 지시 등록/수정(작업조 탭)

    route
     -/work-orders/new
     -/work-orders/:id/update
     -/work-orders/:id : 상세화면도 폼화면을 사용시

    store
     -boardListStore

*/
@withRouter
@inject('boardListStore')
@observer
class WorkOrderMemberSettingTab extends Component {
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
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
      <div className="box_form tabs_cont">
        <div className="tb_wrap_scroll">
          <div className="horizon_tb vertical_sc_middle">
            <div
              className="flex_grow_two_fix c_pt30 relative"
              style={{ width: '800px' }}
            >
              <div className="">
                <table className="tb_list">
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>사번</th>
                      <th>이름</th>
                      <th>직책/호칭</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((info, index) => {
                      return (
                        <tr className={index === 1 ? 'active' : ''}>
                          <td>11111114</td>
                          <td>ㅇㅇㅇ</td>
                          <td>과장/팀장</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="">
                <table className="tb_list">
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>사번</th>
                      <th>이름</th>
                      <th>직책/호칭</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((info) => {
                      return (
                        <tr>
                          <td>11111114</td>
                          <td>ㅇㅇㅇ</td>
                          <td>과장/팀장</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="abtc c_pt30">
                <p style={{ fontSize: '20px' }}>
                  <i class="fas fa-arrow-circle-right"></i>
                </p>
                <p style={{ fontSize: '20px' }} className="c_mt10">
                  <i class="fas fa-arrow-circle-left"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="c_pt15 right">
          <button className="btn_text btn_green">저장</button>
        </p>
      </div>
    );
  }
}

export default WorkOrderMemberSettingTab;
