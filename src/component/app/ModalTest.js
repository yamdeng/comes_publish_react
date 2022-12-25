import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

@inject('appStore', 'uiStore', 'vacationManageStore')
@observer
class ModalTest extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  componentDidMount() {}

  render() {
    let { isOpen } = this.state;
    return (
      <div>
        <button onClick={this.openModal}>aaa</button>
        <Modal isOpen={isOpen} className={'modal_box modal_box_850'}>
          <ModalHeader className="popup_head">일일 업무 보고 수정</ModalHeader>
          <ModalBody>
            <div class="pd20">
              <h4>6월 2일 (목)</h4>
              <div class="mgtop10 modal_grid_area">
                <p
                  style={{
                    border: '1px solid #d6d6d6',
                    height: 300,
                    fontSize: 15,
                    lineHeight: 300,
                    textAlign: 'center'
                  }}
                >
                  영역 표시 임으로 삭제하고 넣으시면 됩니다.
                </p>
              </div>
              <div class="right mgtop10">
                <input type="checkbox" id="issue" />
                <label for="issue" class="mglt10">
                  이슈
                </label>
              </div>
              <div class="coment_list mgtop10">
                <ul>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                </ul>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              취소
            </button>
            <button type="button" class="btn btn-primary">
              수정
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalTest;
