import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import Pagination from 'component/ui/Pagination';
import SearchInput from 'component/ui/SearchInput';
import CodeSelect from 'component/ui/CodeSelect';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';

/*

    이름 : 게시판 관리

    route : /boards

    store
     -boardListStore

*/

@HOC.documentTitle('게시판 관리')
@withRouter
@inject('uiStore', 'boardListStore')
@observer
class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectClick: false
    };
    this.customClick = this.customClick.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
    this.goAddPage = this.goAddPage.bind(this);
    this.goDetailPage = this.goDetailPage.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.openBoardCommentListModal = this.openBoardCommentListModal.bind(this);
  }

  customClick() {
    this.setState({
      isSelectClick: !this.state.isSelectClick
    });
  }

  enterSearch(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  goAddPage() {
    const { uiStore } = this.props;
    uiStore.goPage('/boards/new');
  }

  goDetailPage() {
    const { uiStore } = this.props;
    uiStore.goPage('/boards/111');
  }

  deleteBoard() {
    ModalService.confirm({ body: '삭제하시겠습니까?' });
  }

  openBoardCommentListModal() {
    ModalService.openModal(ModalType.BOARD_COMMENT_LIST_MODAL, {});
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
        <h3>게시판 관리</h3>
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid60 c_mr5">
                <SearchInput
                  value={''}
                  label="검색어"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  내용포함
                </label>
              </div>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid50">
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
                    <th>등록일시</th>
                    <th>등록자</th>
                    <th>제목</th>
                    <th>유형</th>
                    <th>공개기간</th>
                    <th>파일</th>
                    <th>댓글수</th>
                    <th>조회수</th>
                    <th>상세</th>
                    <th>편집</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>Yyyy-MM-DD HH:MI</td>
                        <td>{'ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동'}</td>
                        <td>
                          <a
                            href=""
                            style={{ textDecoration: 'underline' }}
                            onClick={(event) => {
                              event.preventDefault();
                              this.goDetailPage();
                            }}
                          >
                            1111
                          </a>
                        </td>
                        <td>공지</td>
                        <td>Yyyy-mm-dd~yyyy-mm-dd</td>
                        <td>
                          {/* <i class="fas fa-paperclip"></i> */}
                          <i class="fas fa-file-alt"></i>
                        </td>
                        <td>
                          <a
                            href=""
                            style={{ textDecoration: 'underline' }}
                            onClick={(event) => {
                              event.preventDefault();
                              this.openBoardCommentListModal();
                            }}
                          >
                            1
                          </a>
                        </td>
                        <td>1</td>
                        <td>
                          <i class="fas fa-eye"></i>
                        </td>
                        <td>
                          <i class="fas fa-edit"></i>
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
            <button className="btn_text btn_green" onClick={this.goAddPage}>
              등록
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default BoardList;
