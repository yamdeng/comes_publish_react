import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PTemplateApplyModal extends React.Component {
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
        <h3 className="pop_title">안전 서류 템플릿 등록</h3>
        <div className="pop_full_cont_box">
          <div className="write_form">
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid100">
                  <select name="" id="b" className="form_tag_select ">
                    <option value="">산업안전보건위원회</option>
                    <option value="">전체1</option>
                    <option value="">전체2</option>
                  </select>
                  <label className="f_label" for="b">
                    서류 템플릿
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid100">
                  <select name="" id="b" className="form_tag_select ">
                    <option value="">산업안전보건위원회</option>
                    <option value="">전체1</option>
                    <option value="">전체2</option>
                  </select>
                  <label className="f_label" for="b">
                    작성 주기
                  </label>
                </span>
              </div>
            </div>
            <hr className="line" />
            <div className="group_box_wrap">
              <p className="txt">결재선</p>
              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group wid50 c_mr5">
                    <select name="" id="b" className="form_tag_select ">
                      <option value="">산업안전보건위원회</option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                  </span>
                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-plus"></i>
                  </button>
                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group wid50 c_mr5">
                    <select name="" id="b" className="form_tag_select ">
                      <option value="">산업안전보건위원회</option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                  </span>
                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-plus"></i>
                  </button>
                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
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

export default PTemplateApplyModal;
