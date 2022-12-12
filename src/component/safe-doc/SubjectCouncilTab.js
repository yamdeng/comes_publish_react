import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 공사 상세(안전협의체 탭)

    route : /subjects/:id

    store
     -boardListStore

*/
@withRouter
@inject('boardListStore')
@observer
class SubjectCouncilTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { boardListStore } = this.props;
    let { info } = boardListStore;
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
      <div className="tabs_cont">
        <div className="flex_grow_two">
          <div className="f_wid50">
            <div className="list_form mmb c_mt10 vertical_sc_small">
              <table className="tb_list">
                <caption></caption>
                <thead>
                  <tr>
                    <th>협의체아이디</th>
                    <th>협의체 명</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>관리책임자</td>
                        <td>11111111</td>
                        <td>YYYY-MM-DD</td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={3}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
          <div className="f_wid50">
            <div className="list_form c_mt10 vertical_sc_small">
              <table className="tb_list">
                <caption></caption>
                <thead>
                  <tr>
                    <th>협력업체 명</th>
                    <th>대표자 명</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>11111111</td>
                        <td>홍길동</td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={2}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubjectCouncilTab;
