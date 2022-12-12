import React, { Component } from 'react';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';
import SearchInput from 'component/ui/SearchInput';
import PageSizeSelect from 'component/ui/PageSizeSelect';

class PMemberRoleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    // MemberRoleFormModal.js
    ModalService.openModal(ModalType.MEMBER_ROLE_FORM_MODAL, {});
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>사용자 권한 부여</h3>
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <input type="text" className="form_tag" placeholder="" />
                <label className="f_label" for="b">
                  사번
                </label>
              </span>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <input type="text" className="form_tag" placeholder="" />
                <label className="f_label" for="b">
                  성명
                </label>
              </span>
            </div>
          </div>
          {/* 2행 */}
          <div className="form_table">
            <div className="form_cell f_wid80">
              <span className="form_group wid100 _icon">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  placeholder="조직을 선택해주세요"
                />
                <label className="f_label" for="b">
                  조직
                </label>
                <button
                  className="btn_icon btn_dark_gray"
                  onClick={this.openOrgSelectModal}
                >
                  <i class="fas fa-search"></i>
                </button>
              </span>
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
              <select name="" id="b" className="form_tag_select ">
                <option value="">목록 10개</option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
            </span>
            <span className="fs_12">총 nnn 건</span>
          </p>
          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              <table className="tb_list" style={{ minWidth: '700px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>사번</th>
                    <th>이름</th>
                    <th>소속</th>
                    <th>부여 권한</th>
                    <th>편집</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>11111111</td>
                    <td>ㅇㅇㅇ</td>
                    <td>전남광역본부>순천지사/ㅇㅇㅇ팀</td>
                    <td>안전서류,안전검검</td>
                    <td>
                      <i class="fas fa-edit"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns_fix">
            <button
              className="btn_text btn_green c_mr5"
              onClick={this.openModal}
            >
              추가
            </button>
          </div>
        </div>
        <div className="paging_wrap">
          <span className="p_web">
            <i class="fas fa-angle-double-left"></i>
          </span>
          <span className="p_arr_l">
            <i class="fas fa-angle-left"></i>
          </span>
          {/* web paging */}
          <span className="p_web">1</span>
          <span className="p_web">2</span>
          <span className="p_web">3</span>
          <span className="p_web">4</span>
          {/* mobile pagind */}
          <span className="p_mobile">1</span>
          <span className="p_mobile">/</span>
          <span className="p_mobile">10</span>
          <span className="p_arr_r">
            <i class="fas fa-angle-right"></i>
          </span>
          <span className="p_web">
            <i class="fas fa-angle-double-right"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default PMemberRoleManage;
