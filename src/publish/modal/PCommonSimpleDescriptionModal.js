import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PCommonSimpleDescriptionModal extends React.Component {
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
        <h3 className="pop_title">유예 사유</h3>
        <div className="pop_cont_box">
          <div className="list_form">
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid100 c_mr5">
                  <textarea
                    name=""
                    id=""
                    className="form_tag textarea"
                  ></textarea>
                  <label className="f_label" for="b">
                    내용 *
                  </label>
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

export default PCommonSimpleDescriptionModal;
