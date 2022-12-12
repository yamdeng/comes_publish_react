import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import Pagination from 'component/ui/Pagination';
import CodeSelect from 'component/ui/CodeSelect';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';

/*

    이름 : 안전서류 템플릿 적용

    route : /safe-doc-template-applys

    store
     -boardListStore

*/

@HOC.documentTitle('안전서류 템플릿 적용')
@withRouter
@inject('boardListStore')
@observer
class SafeDocTemplateApplyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openFormModal = this.openFormModal.bind(this);
  }

  openFormModal() {
    ModalService.openModal(ModalType.SAFE_DOC_TEMPLATE_APPLY_FORM_MODAL, {});
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
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="공사유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid50">
              <p className="right">
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
              <table className="tb_list" style={{ minWidth: '500px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>템플릿ID</th>
                    <th>템플릿분류</th>
                    <th>템플릿명</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {!list.length ? (
                    <tr>
                      <td colSpan={11}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>111-23123</td>
                        <td>분류111</td>
                        <td>템플릿 템플릿 템플릿</td>
                        <td>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button className="btn_text btn_green" onClick={this.openFormModal}>
              추가
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default SafeDocTemplateApplyList;
