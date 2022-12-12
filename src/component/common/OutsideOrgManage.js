import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import SearchInput from 'component/ui/SearchInput';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';

/*

    이름 : 사외 조직/사원 등록

    route : /outside-org-manage

    store
     -outsideOrgManageStore

*/

@HOC.documentTitle('사외 조직/사원 등록')
@withRouter
@inject('testStore')
@observer
class OutsideOrgManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.openOrgAddPopup = this.openOrgAddPopup.bind(this);
    this.openMemberAddPopup = this.openMemberAddPopup.bind(this);
  }

  openOrgAddPopup() {
    ModalService.openModal(ModalType.ORG_SIMPLE_FORM_MODAL, {});
  }

  openMemberAddPopup() {
    ModalService.openModal(ModalType.MEMBER_SIMPLE_FORM_MODAL, {});
  }

  componentDidMount() {
    const { testStore } = this.props;
    testStore.search();
  }

  render() {
    let { testStore } = this.props;
    let { list } = testStore;
    // list = [];
    return (
      <div className="content_area">
        <h3>사외 조직/사원 등록</h3>

        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid70">
              <span className="form_group form_search form_clear wid70 c_mr5">
                <SearchInput label="조직명" />
              </span>
              <button className="btn_text btn_green mobile_full">조회</button>
            </div>
          </div>
        </div>
        <div className="flex_grow_two">
          <div className="f_wid50">
            <div className="list_form c_mt10">
              <p className="relative c_mb10">
                <span className="fs_12">총 nnn 건</span>
              </p>
              <div className="vertical_sc">
                <table className="tb_list">
                  <caption></caption>
                  <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>조직코드</th>
                      <th>조직 명</th>
                      <th>편집</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((info, index) => {
                      return (
                        <tr className={index === 2 ? 'active' : ''}>
                          <td>123123-12312</td>
                          <td>한성유통</td>
                          <td>
                            <i class="fas fa-edit"></i>
                          </td>
                          <td>
                            <i class="fas fa-trash-alt"></i>
                          </td>
                        </tr>
                      );
                    })}
                    {!list.length ? (
                      <tr>
                        <td colSpan={4}>데이터가 존재하지 않습니다.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
              <div className="list_form_btns not_list">
                <button
                  className="btn_text btn_green"
                  onClick={this.openOrgAddPopup}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
          <div className="f_wid50">
            <div className="list_form c_mt10">
              <p className="relative c_mb10">
                <span className="fs_12">총 nnn 건</span>
              </p>
              <div className="vertical_sc">
                <table className="tb_list">
                  <caption></caption>
                  <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>사번</th>
                      <th>성명</th>
                      <th>호칭</th>
                      <th>편집</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((info) => {
                      return (
                        <tr>
                          <td>111123-22</td>
                          <td>김철수</td>
                          <td>부장</td>
                          <td>
                            <i class="fas fa-edit"></i>
                          </td>
                          <td>
                            <i class="fas fa-trash-alt"></i>
                          </td>
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
              <div className="list_form_btns not_list">
                <button
                  className="btn_text btn_green"
                  onClick={this.openMemberAddPopup}
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OutsideOrgManage;
