import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';
import ModalService from 'service/ModalService';
import ModalType from 'config/ModalType';

class PDocContentInventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    // SafeClothSupplyFormModal.js
    ModalService.openModal(ModalType.EQUIPMENT_SUPPLY_FORM_MODAL, {});
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>보호구 지급대장(모달 포함)</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <p className="right c_mb10 c_mt10">
                <button className="btn_text btn_green" onClick={this.openModal}>
                  추가
                </button>
              </p>
              <div className="list_form c_mt10">
                <div className="tb_wrap_scroll">
                  <div className="horizon_tb">
                    <table className="tb_list" style={{ minWidth: '1000px' }}>
                      <caption></caption>
                      <thead>
                        <tr>
                          <th rowspan={2}>지급일</th>
                          <th rowspan={2}>보호구 명</th>
                          <th rowspan={2}>안전인증번호</th>
                          <th rowspan={2}>수량</th>
                          <th colspan={3}>수령인</th>
                          <th colspan={3}>지급담당</th>
                          <th rowspan={2}>수정</th>
                          <th rowspan={2}>삭제</th>
                        </tr>
                        <tr>
                          <th>사번</th>
                          <th>이름</th>
                          <th>소속</th>
                          <th>사번</th>
                          <th>이름</th>
                          <th>소속</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Yyyy-mm-dd</td>
                          <td>&nbsp;</td>
                          <td>1</td>
                          <td>1</td>
                          <td>11111111</td>
                          <td>홍길동</td>
                          <td>ㅇㅇㅇㅇㅇ</td>
                          <td>11111111</td>
                          <td>홍길동</td>
                          <td>ㅇㅇㅇㅇㅇ</td>
                          <td>
                            <i class="fas fa-edit"></i>
                          </td>
                          <td>
                            <i class="fas fa-trash-alt"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
            <PWorkFormBottom />
          </div>
        </div>
      </div>
    );
  }
}

export default PDocContentInventoryList;
