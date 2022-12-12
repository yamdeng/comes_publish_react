import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PSubjectOrganizeModal extends React.Component {
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
        <h3 className="pop_title">공사 관리</h3>
        <div className="pop_cont_box">
          <div className="box_form">
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group form_clear wid100 ">
                  <input type="text" className="form_tag" disabled />
                  <label className="f_label">공사 조직</label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group form_clear wid100 ">
                  <input type="text" className="form_tag" disabled />
                  <label className="f_label">공사 유형</label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group form_clear wid100 ">
                  <input type="text" className="form_tag" />
                  <label className="f_label">공사 년도</label>
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

export default PSubjectOrganizeModal;
