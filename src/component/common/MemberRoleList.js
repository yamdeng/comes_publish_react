import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import Pagination from 'component/ui/Pagination';
import SearchInput from 'component/ui/SearchInput';
import PageSizeSelect from 'component/ui/PageSizeSelect';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';
import UiCommonService from 'service/UiCommonService';

/*

    이름 : 권한 부여

    route : /member-roles

    store
     -boardListStore

*/

@HOC.documentTitle('권한 부여')
@withRouter
@inject('boardListStore')
@observer
class MemberRoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openRoleFormModal = this.openRoleFormModal.bind(this);
    this.openOrgSelectModal = this.openOrgSelectModal.bind(this);
  }

  openRoleFormModal() {
    ModalService.openModal(ModalType.MEMBER_ROLE_FORM_MODAL, {});
  }

  openOrgSelectModal() {
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
          <div className="form_table">
            <div className="form_cell f_wid30">
              <span className="form_group form_search wid100">
                <SearchInput
                  value={''}
                  label="사번"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group form_search wid100">
                <SearchInput
                  value={''}
                  label="성명"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid40"></div>
          </div>
          {/* 2행 */}
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
                    <th>사번</th>
                    <th>이름</th>
                    <th>소속</th>
                    <th>부여권한</th>
                    <th>편집</th>
                  </tr>
                </thead>
                <tbody>
                  {!list.length ? (
                    <tr>
                      <td colSpan={5}>데이터가 존재하지 않습니다.</td>
                    </tr>
                  ) : null}
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>111-23123</td>
                        <td>안용성</td>
                        <td>{'ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동>123123>ㅁㅁㅁ'}</td>
                        <td>권한1,권한2,권한3,권한4,권한5</td>
                        <td onClick={this.openRoleFormModal}>
                          <i class="fas fa-edit"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button
              className="btn_text btn_green"
              onClick={this.openRoleFormModal}
            >
              등록
            </button>
          </div>
        </div>
        <Pagination store={boardListStore} />
      </div>
    );
  }
}

export default MemberRoleList;
