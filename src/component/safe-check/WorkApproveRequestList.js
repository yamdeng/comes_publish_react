import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import SearchInput from 'component/ui/SearchInput';
import Pagination from 'component/ui/Pagination';

/*

    이름 : 작업 지시 승인 관리

    route : /work-approve-requests

    store
     -boardListStore

*/

@HOC.documentTitle('작업 지시 승인 관리')
@withRouter
@inject('boardListStore')
@observer
class WorkApproveRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goAddPage = this.goAddPage.bind(this);
  }

  goAddPage() {
    const { uiStore } = this.props;
    uiStore.goPage('/work-orders/new');
  }

  componentDidMount() {}

  render() {
    let { boardListStore } = this.props;
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
      <div className="content_area">
        <h3>작업 지시 승인 관리</h3>
        <div className="box_form">
          {/* 1행 */}
          <div className="form_table">
            <div className="form_cell f_wid30">
              {/* <span className="form_group form_search form_clear wid20 c_mr5"> */}
              <span className="form_group form_search wid100">
                <SearchInput
                  value={'111111'}
                  label="승인자 사번"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid70">
              <span className="form_group wid70 c_mr5 _icon">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">승인자</label>
                <button className="btn_icon btn_dark_gray">
                  <i class="fas fa-search"></i>
                </button>
              </span>

              <button className="btn_text btn_dark_gray">본인</button>
            </div>
          </div>
          <p className="c_pt15 right">
            <button className="btn_text btn_green mobile_full">조회</button>
          </p>
        </div>
        <div className="list_form c_mt10">
          <p className="relative c_mb10">
            <span className="form_group c_mr5" style={{ width: '100px' }}>
              <PageSizeSelect store={{}} />
            </span>
            <span className="fs_12">총 nnn 건</span>
          </p>
          <div className="tb_wrap_scroll">
            <div className="horizon_tb vertical_sc">
              <table className="tb_list" style={{ minWidth: '1200px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        ></label>
                      </div>
                    </th>
                    <th>작업지시ID</th>
                    <th>등록일시</th>
                    <th>작업 명</th>
                    <th>작업 조직</th>
                    <th>신청자</th>
                    <th>상태</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>
                          <div className="checkbox-wrapper">
                            <input
                              type="checkbox"
                              name="Claude Monet"
                              id="question-1-option-1"
                            />
                            <label
                              className="checkbox-label"
                              for="question-1-option-1"
                            ></label>
                          </div>
                        </td>
                        <td>123123123</td>
                        <td>YYYY-MM-DD HH:mm</td>
                        <td>SAFE-DOC KT!!!</td>
                        <td>asdasd 지사</td>
                        <td>안용성</td>
                        <td>작성중</td>
                        <td>
                          <i class="fas fa-eye"></i>
                        </td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={8}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="list_form_btns">
            <button className="btn_text btn_green c_mr5">작업 승인</button>
            <button className="btn_text btn_green c_mr5">작업 반려</button>
            <button className="btn_text btn_green c_mr5">취소 승인</button>
            <button className="btn_text btn_green">취소 반려</button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default WorkApproveRequestList;
