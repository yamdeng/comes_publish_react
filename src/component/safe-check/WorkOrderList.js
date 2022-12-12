import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import CodeSelect from 'component/ui/CodeSelect';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import SearchInput from 'component/ui/SearchInput';
import Pagination from 'component/ui/Pagination';

/*

    이름 : 작업 지시 관리

    route : /work-orders

    store
     -boardListStore

*/

@HOC.documentTitle('작업 지시 관리')
@withRouter
@inject('boardListStore', 'uiStore')
@observer
class WorkOrderList extends Component {
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
        <h3>작업 지시 관리</h3>
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid33 c_mr5">
                <SearchInput
                  value={''}
                  label="작업ID"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <span className="form_group form_search wid60">
                <SearchInput
                  value={''}
                  label="작업명"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid40">
              <span className="form_group wid60">
                <CodeSelect
                  value={''}
                  label="상태"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
          </div>
          {/* 2행 */}
          <div className="form_table">
            <div className="form_cell f_wid40">
              <span className="form_group form_search form_clear wid75 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  placeholder="조직을 선택해주세요"
                />
                <label className="f_label" for="b">
                  작업 조직
                </label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <SearchInput
                  value={'111111'}
                  label="등록자 사번"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">등록자</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
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
                    <th>등록자</th>
                    <th>작업 명</th>
                    <th>작업 조직</th>
                    <th>작업일</th>
                    <th>상태</th>
                    <th>허가서</th>
                    <th>점검결과</th>
                    <th>편집</th>
                    <th>상세</th>
                    <th>삭제</th>
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
                        <td>안용성/개발팀</td>
                        <td>SAFE-DOC KT!!!</td>
                        <td>asdasd 지사</td>
                        <td>YYYY-MM-Dd</td>
                        <td>작성중</td>
                        <td>등록</td>
                        <td>양호</td>
                        <td>
                          <i class="fas fa-edit"></i>
                        </td>
                        <td>
                          <i class="fas fa-eye"></i>
                        </td>
                        <td>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={13}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="list_form_btns">
            <button className="btn_text btn_green c_mr5">엑셀다운</button>
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.goAddPage}
            >
              작업 등록
            </button>
            <button className="btn_text btn_green c_mr5">승인 요청</button>
            <button className="btn_text btn_green">취소 요청</button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default WorkOrderList;
