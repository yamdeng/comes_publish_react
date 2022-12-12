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

    이름 : 공사 관리

    route : /subjects

    store
     -boardListStore

*/

@HOC.documentTitle('공사 관리')
@withRouter
@inject('boardListStore', 'uiStore')
@observer
class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openSubjectOrganizeModal = this.openSubjectOrganizeModal.bind(this);
  }

  openSubjectOrganizeModal() {
    ModalService.openModal(ModalType.SUBJECT_ORGANIZE_MODAL, {});
  }

  componentDidMount() {}

  render() {
    let { boardListStore } = this.props;
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    return (
      <div className="content_area">
        <h3>공사 관리</h3>
        <div className="box_form">
          {/* 1행 */}
          <div className="form_table">
            <div className="form_cell f_wid30">
              {/* <span className="form_group form_search form_clear wid20 c_mr5"> */}
              <span className="form_group form_search wid100">
                <SearchInput
                  value={'111111'}
                  label="공사명"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid70">
              <span className="form_group wid70 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">조직</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="공사유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="진행상태"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid40">
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
              <table className="tb_list" style={{ minWidth: '1200px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>공사ID</th>
                    <th>공사유형</th>
                    <th>공사명</th>
                    <th>공사 기간</th>
                    <th>공사조직</th>
                    <th>책임자</th>
                    <th>공사유형</th>
                    <th>연계번호</th>
                    <th>협의체</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>123123123</td>
                        <td>직영</td>
                        <td>순천지점_2021_직영</td>
                        <td>2021-01-01 ~ 2021-01-01</td>
                        <td>{'전남광명본부 > 순천지점'}</td>
                        <td>김지점</td>
                        <td>직영</td>
                        <td>SRM_01</td>
                        <td>3</td>
                        <td
                          onClick={() =>
                            this.props.uiStore.goPage('/subjects/123')
                          }
                        >
                          <i class="fas fa-eye"></i>
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
            <button className="btn_text btn_green c_mr5">엑셀다운</button>
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openSubjectOrganizeModal}
            >
              년도 직영공사 편성
            </button>
            <button
              className="btn_text btn_green"
              onClick={this.openSubjectOrganizeModal}
            >
              년도 도급공사 편성
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default SubjectList;
