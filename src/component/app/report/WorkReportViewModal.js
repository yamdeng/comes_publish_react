import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'devextreme/data/odata/store';
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

@inject('appStore', 'uiStore', 'workReportViewModalStore')
@observer
class WorkReportViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.changeSearchDate = this.changeSearchDate.bind(this);
    this.openDayDatepicker = this.openDayDatepicker.bind(this);
    this.changeDeptId = this.changeDeptId.bind(this);
    this.nextDept = this.nextDept.bind(this);
    this.prevDept = this.prevDept.bind(this);
    this.changeIssueYn = this.changeIssueYn.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.changeCommentContent = this.changeCommentContent.bind(this);
  }

  init() {}

  closeModal() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.closeModal();
  }

  nextDay() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.nextDay();
  }

  prevDay() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.prevDay();
  }

  changeSearchDate(date) {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.openDayDatepicker();
  }

  changeDeptId(event) {
    const value = event.target.value;
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.changeDeptId(value);
  }

  nextDept() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.nextDept();
  }

  prevDept() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.prevDept();
  }

  changeIssueYn(event) {
    let value = event.target.checked;
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.changeIssueYn(value ? 'Y' : 'N');
  }

  saveComment() {
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.saveComment();
  }

  changeCommentContent(event) {
    const value = event.target.value;
    const { workReportViewModalStore } = this.props;
    workReportViewModalStore.changeCommentContent(value);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { workReportViewModalStore, appStore } = this.props;
    const { profile } = appStore;
    const { user_name, userType, user_key, position_title } = profile;
    let {
      visibleModal,
      reportDetailInfo,
      commentDetailInfo,
      searchDate,
      issueYn,
      targetDeptList,
      currentDeptIndex,
      currentDeptId,
      dayDatepickerOpend,
      commentContent
    } = workReportViewModalStore;
    targetDeptList = targetDeptList || [];
    reportDetailInfo = reportDetailInfo || {};
    commentDetailInfo = commentDetailInfo || {};

    let commentComponent = null;
    // ???????????? ??????????????? ????????? ?????? ?????? ????????????
    // ????????? ?????? ?????? view, ?????? ??????????????? ???????????? ?????? ?????? ?????? view
    // ???????????? ??????/?????? ???????????????
    if (!reportDetailInfo.reportId) {
      commentComponent = null;
    } else if (
      userType !== Constant.USER_TYPE_HEADER ||
      (commentDetailInfo &&
        commentDetailInfo.userId &&
        commentDetailInfo.userId !== user_key)
    ) {
      commentComponent = (
        <div
          class="coment_list mgtop10"
          style={{ display: commentDetailInfo.userId ? '' : 'none' }}
        >
          <ul>
            <li>
              <b>
                {commentDetailInfo.userName} {commentDetailInfo.positionTitle}
              </b>{' '}
              {commentDetailInfo.commentContent}
            </li>
          </ul>
        </div>
      );
    } else {
      commentComponent = (
        <div class="coment_write flex_sb mgtop10">
          <div class="coment_write_form">
            <p class="coment_user">
              <b>
                {user_name} {position_title}
              </b>
            </p>
            <textarea
              maxlength="100"
              placeholder="????????? ???????????????. (?????? 100???)"
              style={{ boxSizing: 'border-box' }}
              value={commentContent}
              onChange={this.changeCommentContent}
            ></textarea>
          </div>
          <a
            href="javascript:void(0);"
            class="btn_blue btn_normal"
            onClick={this.saveComment}
          >
            {commentDetailInfo.userId ? '??????' : '??????'}
          </a>
        </div>
      );
    }
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
          ??? ?????? ?????? ?????? ??????
        </ModalHeader>
        <ModalBody>
          <div class="pd20">
            <div class="sel_month">
              <a href="javascript:void(0);" class="prev" onClick={this.prevDay}>
                ??????
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchDate, 'M??? DD??? (ddd)')}
              </span>
              <a href="javascript:void(0);" class="next" onClick={this.nextDay}>
                ??????
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openDayDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="??? ????????????"
                />
              </a>
              {dayDatepickerOpend && (
                <DatePicker
                  selected={searchDate}
                  onChange={(date) => this.changeSearchDate(date)}
                  dateFormat="yyyyMMdd"
                  inline
                />
              )}
              <span
                class="mglt20"
                style={{ display: targetDeptList.length ? '' : 'none' }}
              >
                {currentDeptIndex + 1} &#47; {targetDeptList.length}
              </span>
            </div>
            <div>
              <div class="grid_top flex_sb mgtop10">
                <div
                  class="grp_sel_option"
                  style={{
                    visibility: targetDeptList.length ? 'visible' : 'hidden'
                  }}
                >
                  <label for="sel_option" class="blind">
                    ?????? ??????
                  </label>
                  <select
                    id="sel_option"
                    class="w90"
                    onChange={this.changeDeptId}
                    value={currentDeptId}
                  >
                    {targetDeptList.map((item) => (
                      <option value={item.deptId} key={item.deptId}>
                        {item.deptName}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="grp_sel_result">
                  <ul class="flex_sb table_ul">
                    <li>
                      <span>????????????</span>
                      <span class="sel_relt_text">
                        {reportDetailInfo.reportDate
                          ? moment(reportDetailInfo.reportDate).format(
                              'YYYY-MM-DD HH:mm'
                            )
                          : '-'}
                      </span>
                    </li>
                    <li>
                      <span>?????????</span>
                      <span class="sel_relt_text">
                        {reportDetailInfo.managerName
                          ? reportDetailInfo.managerName
                          : '-'}
                      </span>
                    </li>
                    <li>
                      <span>??????</span>
                      <span class="sel_relt_text">
                        {reportDetailInfo.issueYn
                          ? reportDetailInfo.issueYn
                          : '-'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mgtop10 modal_grid_area">
                <a
                  href="javascript:void(0);"
                  class="btn_nepr prev"
                  style={{
                    zIndex: 1,
                    display: targetDeptList.length > 1 ? '' : 'none'
                  }}
                  onClick={this.prevDept}
                >
                  <span>??????</span>
                </a>
                <div
                  class="mgtop10 modal_grid_area scroll-minimum"
                  style={{
                    height: 400,
                    border: '1px solid #d6d6d6',
                    padding: 5,
                    overflow: 'scroll'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: reportDetailInfo.reportContent
                  }}
                ></div>
                <a
                  href="javascript:void(0);"
                  class="btn_nepr next"
                  onClick={this.nextDept}
                  style={{
                    zIndex: 1,
                    display: targetDeptList.length > 1 ? '' : 'none'
                  }}
                >
                  <span>??????</span>
                </a>
              </div>

              <div class="right mgtop10">
                <input
                  type="checkbox"
                  id="issue"
                  checked={issueYn === 'Y'}
                  onChange={this.changeIssueYn}
                />
                <label for="issue" class="mglt10">
                  ??????
                </label>
              </div>
              {commentComponent}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.closeModal}
          >
            ??????
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default WorkReportViewModal;
