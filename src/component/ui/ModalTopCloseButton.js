import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

/*

    모달 우측 상단 [x] 버튼
     : <ModalTopCloseButton isAlertModal={true}}

    props
     -isAlertModal(true/false) : 모달 유형이 일반인지(full), alert 종류인지 확인하기 위한

    store
     -alertModalStore, modalStore

*/

@withRouter
@inject('alertModalStore', 'modalStore')
@observer
class ModalTopCloseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // [x] 버튼 handle
    this.close = this.close.bind(this);
  }

  close() {
    let { modalStore, alertModalStore, isAlertModal } = this.props;
    if (isAlertModal) {
      alertModalStore.hideModal();
    } else {
      modalStore.hideModal();
    }
  }

  render() {
    return (
      <span className="pop_close" onClick={this.close}>
        <i class="fas fa-times"></i>
      </span>
    );
  }
}

export default ModalTopCloseButton;
