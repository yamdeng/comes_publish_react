import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import CodeSelect from 'component/ui/CodeSelect';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import SearchInput from 'component/ui/SearchInput';
import Pagination from 'component/ui/Pagination';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';

/*

    이름 : 안전서류 일정 관리

    route : /safe-doc-schedules

    store
     -boardListStore

*/

@HOC.documentTitle('안전서류 일정 관리')
@withRouter
@inject('boardListStore')
@observer
class SafeDocScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openTextAreaModal = this.openTextAreaModal.bind(this);
  }

  goAddPage() {
    const { uiStore } = this.props;
    uiStore.goPage('/work-orders/new');
  }

  openTextAreaModal() {
    ModalService.openModal(ModalType.COMMON_TEXTAREA_MODAL, {});
  }

  componentDidMount() {}

  render() {
    let { boardListStore } = this.props;
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
      <div className="content_area">
        <h3>안전서류 일정 관리</h3>
        <div className="box_form">
          {/* 1행 */}
          <div className="form_table">
            <div className="form_cell f_wid30">
              {/* <span className="form_group form_search form_clear wid20 c_mr5"> */}
              <span className="form_group form_search wid100">
                <SearchInput
                  value={'111111'}
                  label="공사ID"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid70">
              <span className="form_group wid70 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  placeholder="공사명 + 공사기간  혹은 조직명 + 년도
"
                />
                <label className="f_label">공사정보</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid40">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="템플릿"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="일정상태"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid30">
              <p className="c_pt15 right">
                <button className="btn_text btn_green mobile_full">조회</button>
              </p>
            </div>
          </div>
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
              <table className="tb_list" style={{ minWidth: '600px' }}>
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
                    <th>템플릿</th>
                    <th>작성주기</th>
                    <th>작성 요청 기간</th>
                    <th>작성상태</th>
                    <th>상세</th>
                    <th>이동</th>
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
                        <td>안전보건 관리책임자 선임 서류</td>
                        <td>년</td>
                        <td>2021-01-01 ~ 2021-01-01</td>
                        <td>작성중</td>
                        <td>
                          <i class="fas fa-eye"></i>
                        </td>
                        <td>
                          <i class="fas fa-eye"></i>
                        </td>
                      </tr>
                    );
                  })}
                  {!list.length ? (
                    <tr>
                      <td colSpan={7}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="list_form_btns">
            <button className="btn_text btn_green c_mr5">엑셀다운</button>
            <button
              className="btn_text btn_green"
              onClick={this.openTextAreaModal}
            >
              유예처리
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default SafeDocScheduleList;
