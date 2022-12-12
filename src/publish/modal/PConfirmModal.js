import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PConfirmModal extends React.Component {
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
        <p className="pop_cont">
          3.title이 존재하는 경우와 존재하지 않는 경우가 존재(confirm도
          마찬가지)
        </p>
        <div className="pop_btns">
          <button className="btn_text btn_dark_gray" onClick={this.close}>
            취소
          </button>
          <button className="btn_text btn_green" onClick={this.close}>
            확인
          </button>
        </div>
        <span className="pop_close" onClick={this.close}>
          <i class="fas fa-times"></i>
        </span>
      </div>
    );
  }
}

export default PConfirmModal;
