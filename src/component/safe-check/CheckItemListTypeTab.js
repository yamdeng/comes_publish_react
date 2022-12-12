import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import CodeSelect from 'component/ui/CodeSelect';
import EmptyBasicInput from 'component/ui/EmptyBasicInput';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';

/*

    이름 : 점검 항목 관리(공통탭)

    route : /check-common-items

    store
     -boardListStore

*/

@HOC.documentTitle('점검 항목 관리(공사유형별)')
@withRouter
@inject('boardListStore')
@observer
class CheckItemListTypeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // test handler
    this.openTypeFormModal = this.openTypeFormModal.bind(this);
    this.openItemFormModal = this.openItemFormModal.bind(this);
  }

  openTypeFormModal() {
    ModalService.openModal(ModalType.CHECK_ITEM_TYPE_FORM_MODAL, {});
  }

  openItemFormModal() {
    ModalService.openModal(ModalType.CHECK_ITEM_FORM_MODAL, {});
  }

  testHandle(info) {
    // const { boardListStore } = this.props;
  }

  render() {
    let { boardListStore } = this.props;
    let { info } = boardListStore;
    return (
      <React.Fragment>
        <div className="box_form tabs_cont">
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid30 c_mr5">
                <CodeSelect
                  value={''}
                  label="작업부문"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
              <span className="form_group wid30 c_mr5">
                <CodeSelect
                  value={''}
                  label="작업유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
              <button className="btn_text btn_green mobile_full m_mt15">
                조회
              </button>
            </div>
          </div>
        </div>
        <div className="list_form">
          <p className="relative c_mb10">
            <EmptyBasicInput />
            {/* TODO : 35px는 button, input 기준 높이인데 변경시 수정 : Empty 컴포넌트 필요 */}
            <span className="fs_12">총 nnn 건</span>
          </p>

          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              <table className="tb_list" style={{ minWidth: '500px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>
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
                    <th style={{ width: '20%' }}>
                      <span className="c_mr5">분류ID</span>
                      {/* default, 클릭할떄마다 up,down 바뀜. */}
                      <i class="fas fa-sort"></i>
                      {/* <i class="fas fa-sort-down"></i> /> */}
                      {/* <i class="fas fa-sort-up"></i> /> */}
                    </th>
                    <th>분류 명</th>
                    <th style={{ width: '7%' }}>사용</th>
                    <th style={{ width: '7%' }}>편집</th>
                  </tr>
                </thead>
                <tbody>
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
                    <td>123456789</td>
                    <td>고공작업</td>
                    <td>Yes</td>
                    <td>
                      <i class="fas fa-edit"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button className="btn_text btn_green c_mr5">엑셀다운</button>
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openTypeFormModal}
            >
              그룹 추가
            </button>
            <button className="btn_text btn_green c_mr5">순위 저장</button>
            <button className="btn_text btn_green">삭제</button>
          </div>
        </div>

        <div className="list_form">
          <p className="relative c_mb10">
            <span
              className="form_group c_mr5"
              style={{ width: '0px', height: 38 }}
            ></span>
            <span className="fs_12">총 nnn 건</span>
          </p>
          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              <table className="tb_list" style={{ minWidth: '500px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>
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
                    <th style={{ width: '20%' }}>
                      <span className="c_mr5">항목ID</span>
                      <i class="fas fa-sort"></i>
                    </th>
                    <th>점검 항목명</th>
                    <th>점검 내용</th>
                    <th style={{ width: '7%' }}>사용</th>
                    <th style={{ width: '7%' }}>편집</th>
                    <th style={{ width: '7%' }}>정렬</th>
                  </tr>
                </thead>
                <tbody>
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
                    <td>123456789</td>
                    <td className="left">
                      도로 인접한 통신주 작업 시 신호수 배치 여부
                    </td>
                    <td className="left">
                      작업 시 작업 종료 시까지 신호수를 배치하고 있는가?
                    </td>
                    <td>Yes</td>
                    <td>
                      <i class="fas fa-edit"></i>
                    </td>
                    <td>
                      <i class="fas fa-caret-up"></i>
                      <i class="fas fa-caret-down"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openTypeFormModal}
            >
              항목 추가
            </button>
            <button className="btn_text btn_green c_mr5">순위 저장</button>
            <button className="btn_text btn_green">삭제</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckItemListTypeTab;
