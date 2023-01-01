import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VacationSubMenu from 'component/submenu/VacationSubMenu';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Lookup
} from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import moment from 'moment';
import Code from 'config/Code';

@inject('appStore', 'uiStore', 'workReportFormModalStore')
@observer
class WorkReportFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
  }

  init() {}

  componentDidMount() {
    this.init();
  }

  render() {
    const { workReportFormModalStore } = this.props;
    const { visibleModal } = workReportFormModalStore;
    return (
      <Modal isOpen={visibleModal} className={'modal_box modal_box_850'}>
        <ModalHeader
          className="popup_head"
          close={
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => this.closeModal(3)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          }
        >
          일일 업무 보고 수정
        </ModalHeader>
        <ModalBody>
          <div class="pd20">
            <h4>6월 2일 (목)</h4>
            <div class="mgtop10 modal_grid_area" id="reactEditor"></div>
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
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.setHtml}
          >
            취소
          </button>
          <button type="button" class="btn btn-primary" onClick={this.getHtml}>
            수정
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default WorkReportFormModal;
