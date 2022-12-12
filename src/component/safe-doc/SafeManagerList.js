import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import Pagination from 'component/ui/Pagination';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import UiCommonService from 'service/UiCommonService';

/*

    이름 : 안전보건 담당자 관리

    route : /safe-managers

    store
     -boardListStore

*/

@HOC.documentTitle('안전보건 담당자 관리')
@withRouter
@inject('boardListStore')
@observer
class SafeManagerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openSelectMemberModal = this.openSelectMemberModal.bind(this);
  }

  openSelectMemberModal() {
    UiCommonService.openOrgSelectModal(() => {});
  }

  componentDidMount() {
    const { boardListStore } = this.props;
    boardListStore.search();
  }

  componentWillUnmount() {
    const { boardListStore } = this.props;
    boardListStore.clear();
  }

  render() {
    let { boardListStore } = this.props;
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // list = [];
    return (
      <div className="content_area">
        <h3>사용자 권한 부여</h3>
        <div className="box_form">
          {/* 1행 */}
          <div className="form_table">
            <div className="form_cell f_wid80">
              <span className="form_group wid80 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  placeholder="조직을 선택해주세요"
                />
                <label className="f_label" for="b">
                  조직
                </label>
              </span>
              <button
                className="btn_icon btn_dark_gray"
                onClick={this.openOrgSelectModal}
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div className="form_cell f_wid20">
              <p className="c_pt15 right">
                <button className="btn_text btn_green mobile_full">조회</button>
              </p>
            </div>
          </div>
        </div>
        <div className="list_form c_mt10">
          <p className="relative c_mb10">
            <span className="form_group c_mr5" style={{ width: '100px' }}>
              <PageSizeSelect store={boardListStore} />
            </span>
            <span className="fs_12">총 nnn 건</span>
          </p>
          <div className="tb_wrap_scroll">
            <div className="horizon_tb vertical_sc">
              <table className="tb_list" style={{ minWidth: '1000px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>조직코드</th>
                    <th>조직명</th>
                    <th>사번</th>
                    <th>성명</th>
                    <th>소속</th>
                    <th>지정</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>111-23123</td>
                        <td>{'개발1 > 개발2 > 개발3'}</td>
                        <td>12345</td>
                        <td>안용성</td>
                        <td>강남지사</td>
                        <td onClick={this.openSelectMemberModal}>
                          <i class="fas fa-search"></i>
                        </td>
                        <td onClick={this.deleteBoard}>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={11}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button
              className="btn_text btn_green"
              onClick={this.openRoleFormModal}
            >
              엑셀다운
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default SafeManagerList;
