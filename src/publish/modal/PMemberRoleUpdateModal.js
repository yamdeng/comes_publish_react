import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PMemberRoleUpdateModal extends React.Component {
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
        <h3 className="pop_title">confirm modal</h3>
        <div className="pop_cont_box">
          <div className="box_form">
            <div className="form_table">
              <div className="form_cell f_wid100">
                {/* 
                기본은 form_group
                앞에 돋보기 아이콘을 추가하려면 .form_search 와 icon icon_search 추가
                뒤에 클리어 아이콘을 추가하려면 .form_clear 와 icon icon_clear 추가
              */}
                <span className="form_group form_search wid20 c_mr5">
                  <input type="text" className="form_tag" />
                  <label className="f_label">사번</label>
                  {/* input에 value 값이 있으면 style display로 제어 */}
                  <span
                    className="icon icon_clear"
                    style={{ display: 'block' }}
                  >
                    <i class="fas fa-times-circle"></i>
                  </span>
                </span>
                <span className="form_group form_search wid50 c_mr5">
                  <input type="text" className="form_tag" disabled />
                  <label className="f_label">조직풀명</label>
                </span>
                <button className="btn_text btn_dark_gray">조회</button>
              </div>
            </div>
          </div>
          <div className="list_form c_mt10">
            <table className="tb_list">
              <caption></caption>
              <thead>
                <tr>
                  <th>권한</th>
                  <th>부여</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>한성유통</td>
                  <td>
                    <input
                      type="checkbox"
                      id="switch"
                      name="switch"
                      className="switch_on_off"
                    />
                    <label for="switch" className="switch_label_on_off">
                      <span className="marble"></span>{' '}
                      <span className="off">NO</span>
                      <span class="on">YES</span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>한성유통</td>
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
                </tr>
              </tbody>
            </table>
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

export default PMemberRoleUpdateModal;
