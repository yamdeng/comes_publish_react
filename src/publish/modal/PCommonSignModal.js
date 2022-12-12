import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import SignatureCanvas from 'react-signature-canvas';

@withRouter
@inject('modalStore')
@observer
class PCommonSignModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
  }

  close() {
    this.props.modalStore.hideModal();
  }

  componentDidMount() {}

  render() {
    return (
      <div className="popup-container">
        <h3 className="pop_title">공통 결재 모달</h3>
        <div className="pop_full_cont_box">
          <ul className="tabs_wrap">
            <li className="active">점검자</li>
            <li className="">확인자</li>
          </ul>
          <div className="box_form tabs_cont">
            <div className="write_form c_mt15">
              <div className="sigCanvas_box">
                <SignatureCanvas
                  penColor="green"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'sigCanvas'
                  }}
                />
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

export default PCommonSignModal;
