import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

/*

    이름 : 공사 상세(안전선임자 탭)

    route : /subjects/:id

    store
     -boardListStore

*/
@withRouter
@inject('boardListStore')
@observer
class SubjectSeniorTab extends Component {
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
        <div className="list_form c_mt10">
          <div className="tb_wrap_scroll">
            <div className="horizon_tb vertical_sc">
              <table className="tb_list" style={{ minWidth: '500px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>역할</th>
                    <th>사번</th>
                    <th>이름</th>
                    <th>소속</th>
                    <th>선임일</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>관리책임자</td>
                        <td>11111111</td>
                        <td>홍길동</td>
                        <td>{'전남광역본부>순천지사/ㅇㅇ지점'}</td>
                        <td>YYYY-MM-DD</td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={5}>데이터가 존재하지 않습니다.</td>
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

export default SubjectSeniorTab;
