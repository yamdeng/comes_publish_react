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

    이름 : 안전서류 템플릿 관리

    route : /safe-doc-templates

    store
     -boardListStore

*/

@HOC.documentTitle('안전서류 템플릿 관리')
@withRouter
@inject('boardListStore')
@observer
class SafeDocTemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectClick: false
    };
    this.openFormModal = this.openFormModal.bind(this);
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

  openFormModal() {
    ModalService.openModal(ModalType.SAFE_DOC_TEMPLATE_FORM_MODAL, {});
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
        <h3>안전서류 템플릿 관리</h3>
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid60 c_mr5">
                <SearchInput
                  value={''}
                  label="템플릿명"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="카테고리"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="사용여부"
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
                    <th>템플릿 번호</th>
                    <th>카테고리</th>
                    <th>템플릿 명</th>
                    <th>작성주기</th>
                    <th>보존연한(년)</th>
                    <th>사용</th>
                    <th>양식</th>
                    <th>편집</th>
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
                        <td>111</td>
                        <td>관리자책임자 등 선임</td>
                        <td>안전보건관리책임자 선임 서류</td>
                        <td>매년</td>
                        <td>3</td>
                        <td>사용</td>
                        <td>
                          <i class="fas fa-file-alt"></i>
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
                      <td colSpan={10}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openFormModal}
            >
              엑셀다운
            </button>
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openFormModal}
            >
              미사용 처리
            </button>
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openFormModal}
            >
              사용 처리
            </button>
            <button className="btn_text btn_green" onClick={this.openFormModal}>
              등록
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default SafeDocTemplateList;
