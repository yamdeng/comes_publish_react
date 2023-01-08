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
    this.closeModal = this.closeModal.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.changeIssueYn = this.changeIssueYn.bind(this);
  }

  closeModal() {
    const { workReportFormModalStore } = this.props;
    workReportFormModalStore.closeModal();
  }

  saveReport() {
    const { workReportFormModalStore } = this.props;
    workReportFormModalStore.saveReport();
  }

  changeIssueYn(event) {
    let value = event.target.checked;
    const { workReportFormModalStore } = this.props;
    workReportFormModalStore.changeIssueYn(value ? 'Y' : 'N');
  }

  init() {}

  componentDidMount() {
    this.init();
  }

  render() {
    const { workReportFormModalStore } = this.props;
    let {
      visibleModal,
      reportDetailInfo,
      commentDetailInfo,
      searchDate,
      issueYn
    } = workReportFormModalStore;
    reportDetailInfo = reportDetailInfo || {};
    commentDetailInfo = commentDetailInfo || {};
    return (
      <Modal isOpen={visibleModal} className={'modal_box modal_box_1270'}>
        <ModalHeader
          className="popup_head"
          close={
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          }
        >
          일일 업무 보고 {reportDetailInfo.userId ? '수정' : '등록'}
        </ModalHeader>
        <ModalBody>
          <div class="pd20">
            <h4>{Helper.dateToString(searchDate, 'M월 DD일 (ddd)')}</h4>
            <div class="mgtop10 modal_grid_area" id="reactEditor"></div>
            <div class="right mgtop10">
              <input
                type="checkbox"
                checked={issueYn === 'Y' ? true : false}
                onChange={this.changeIssueYn}
              />
              <label for="issue" class="mglt10">
                이슈
              </label>
            </div>
            <div
              class="mgtop10"
              style={{ display: commentDetailInfo.userId ? '' : 'none' }}
            >
              <ul>
                <li>
                  <b>
                    {commentDetailInfo.userName}{' '}
                    {commentDetailInfo.positionTitle}
                  </b>{' '}
                  {commentDetailInfo.commentContent}
                </li>
              </ul>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.closeModal}
          >
            취소
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.saveReport}
          >
            {reportDetailInfo.userId ? '수정' : '등록'}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default WorkReportFormModal;
