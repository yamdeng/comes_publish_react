import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PSafeClothSupplyFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
  }

  close() {
    this.props.modalStore.hideModal();
  }

  render() {
    return (
      <div className="popup-container">
        <h3 className="pop_title">보호구 지급 대장 폼 모달</h3>
        <div className="pop_full_cont_box">
          <div className="write_form">
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group form_clear wid100 ">
                  <input type="text" className="form_tag" />
                  <label className="f_label">지급일</label>
                  {/* input에 value 값이 있으면 style display로 제어 */}
                  <span
                    className="icon icon_clear"
                    style={{ display: 'block' }}
                  >
                    <i class="fas fa-calendar"></i>
                  </span>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group wid100">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    보호구명
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group wid100">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    안전인증번호
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid30">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    수량
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell form_cell_flex">
                <span className="form_group wid20 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    수령인 사번
                  </label>
                </span>
                <span className="form_group wid20 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    수령인 이름
                  </label>
                </span>
                <span className="form_group wid30 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    수령인 소속
                  </label>
                </span>
              </div>
              <div className="form_cell shrink right">
                <span className="form_group">
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid50">
                <span className="form_group wid20 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    지급담당 사번
                  </label>
                </span>
                <span className="form_group wid20 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    지급담당 이름
                  </label>
                </span>
                <span className="form_group wid30 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    지급담당 소속
                  </label>
                </span>
                <span className="form_group c_mr5">
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text btn_dark_gray" onClick={this.close}>
            닫기
          </button>
          <button className="btn_text btn_green" onClick={this.close}>
            저장
          </button>
        </div>
        <span className="pop_close" onClick={this.close}>
          <i class="fas fa-times"></i>
        </span>
      </div>
    );
  }
}

export default PSafeClothSupplyFormModal;
