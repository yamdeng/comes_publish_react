import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import ReactHelper from 'util/ReactHelper';
import Constant from 'config/Constant';

/*

    alert 공통 모달 : ModalType.CONFIRM_MODAL

    modalData 설명
    {
      title(option) : 모달 타이틀
      body : 모달 body(html string)
      okLabel(option) : 버튼 라벨명(기본값은 '확인')
      cancelLabel(option) : 버튼 라벨명(기본값은 '취소')
      ok(option) : [확인] 버튼 핸들러 함수(기본은 모달 닫히게끔)
      cancel(option) : [취소] 버튼 핸들러 함수(기본은 모달 닫히게끔)
    }

    store
     -alertModalStore

*/
@withRouter
@inject('alertModalStore')
@observer
class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // [확인] 버튼 handle
    this.ok = this.ok.bind(this);

    // [취소] 버튼 handle
    this.cancel = this.cancel.bind(this);
  }

  ok() {
    let { modalData, alertModalStore } = this.props;
    if (modalData.ok) {
      alertModalStore.hideModal();
      modalData.ok();
    } else {
      alertModalStore.hideModal();
    }
  }

  cancel() {
    let { modalData, alertModalStore } = this.props;
    if (modalData.cancel) {
      alertModalStore.hideModal();
      modalData.cancel();
    } else {
      alertModalStore.hideModal();
    }
  }

  render() {
    let { modalData } = this.props;
    let { title, body, okLabel, cancelLabel } = modalData;
    body = ReactHelper.convertEnterStringToBrTag(body);
    okLabel = okLabel || Constant.LABEL_MODAL_OK;
    cancelLabel = cancelLabel || Constant.LABEL_MODAL_CANCEL;
    return (
      <div className="popup-container">
        <h3 className="pop_title" style={{ display: title ? '' : 'none' }}>
          {title}
        </h3>
        <p className="pop_cont" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="pop_btns">
          <button className="btn_text btn_dark_gray" onClick={this.cancel}>
            {cancelLabel}
          </button>
          <button className="btn_text btn_green" onClick={this.ok}>
            {okLabel}
          </button>
        </div>
        <ModalTopCloseButton isAlertModal={true} />
      </div>
    );
  }
}

export default ConfirmModal;
