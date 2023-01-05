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

@inject('appStore', 'uiStore', 'deptTimeSettingFormModalStore')
@observer
class DeptTimeSettingFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.save = this.save.bind(this);
    this.closeFormPopup = this.closeFormPopup.bind(this);
    this.changeEndNotLimitYn = this.changeEndNotLimitYn.bind(this);
    this.changeApplyStartDate = this.changeApplyStartDate.bind(this);
    this.changeApplyEndDate = this.changeApplyEndDate.bind(this);
    this.changeCurrentDeptId = this.changeCurrentDeptId.bind(this);
  }

  init() {}

  closeFormPopup() {
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.closeFormPopup();
  }

  changeEndNotLimitYn(event) {
    let value = event.target.checked;
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.changeEndNotLimitYn(value ? 'Y' : 'N');
  }

  changeApplyStartDate(applyStartDate) {
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.changeApplyStartDate(applyStartDate);
  }

  changeApplyEndDate(applyEndDate) {
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.changeApplyEndDate(applyEndDate);
  }

  changeCurrentDeptId(event) {
    const deptId = event.target.value;
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.changeCurrentDeptId(deptId);
  }

  save() {
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.save();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { deptTimeSettingFormModalStore } = this.props;
    let {
      isFormPopupOpen,
      formType,
      currentDeptId,
      commuteDeptTargetList,
      timeName,
      workLocation,
      timeDescription,
      workStartTime,
      workEndTime,
      lunchStartTime,
      lunchEndTime,
      applyStartDate,
      applyEndDate,
      endNotLimitYn
    } = deptTimeSettingFormModalStore;
    const timeSettingCodeList = Code.timeSettingCodeList;
    return (
      <Modal isOpen={isFormPopupOpen} className={'modal_box modal_box_450'}>
        <ModalHeader
          className="popup_head"
          close={
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.closeFormPopup}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          }
        >
          근무시간 정보 등록
        </ModalHeader>
        <ModalBody>
          <div class="pd20">
            <div class="flex_sb">
              <p class="con_title2">근무시간명</p>
              <div class="con_box2">
                <input
                  type="text"
                  class="w100p"
                  placeholder="근무시간명을 입력해주세요."
                  value={timeName}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'timeName',
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>
            <div class="flex_sb mgtop10">
              <p class="con_title2">근무지</p>
              <div class="con_box2">
                <input
                  type="text"
                  class="w100p"
                  placeholder="근무지를 입력해주세요."
                  value={workLocation}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'workLocation',
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>
            <div class="flex_sb mgtop10">
              <p class="con_title2">근무설명</p>
              <div class="con_box2">
                <input
                  type="text"
                  class="w100p"
                  placeholder="설명을 입력해주세요."
                  value={timeDescription}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'timeDescription',
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>
            <div class="flex_sb mgtop10">
              <p class="con_title2">근무시간</p>
              <div class="con_box2">
                <label for="option1" class="blind">
                  출근 시간
                </label>
                <select
                  id="option1"
                  class="w90"
                  value={workStartTime}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'workStartTime',
                      e.target.value
                    );
                  }}
                  disabled={formType === 'EDIT' ? true : false}
                >
                  {timeSettingCodeList.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span> ~ </span>
                <label for="option2" class="blind">
                  퇴근 시간
                </label>
                <select
                  id="option2"
                  class="w90"
                  value={workEndTime}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'workEndTime',
                      e.target.value
                    );
                  }}
                  disabled={formType === 'EDIT' ? true : false}
                >
                  {timeSettingCodeList.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="flex_sb mgtop10">
              <p class="con_title2">점심시간</p>
              <div class="con_box2">
                <label for="option3" class="blind">
                  점심 시작 시간
                </label>
                <select
                  id="option3"
                  class="w90"
                  value={lunchStartTime}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'lunchStartTime',
                      e.target.value
                    );
                  }}
                  disabled={formType === 'EDIT' ? true : false}
                >
                  {timeSettingCodeList.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span> ~ </span>
                <label for="option4" class="blind">
                  점심 종료 시간
                </label>
                <select
                  id="option4"
                  class="w90"
                  value={lunchEndTime}
                  onChange={(e) => {
                    deptTimeSettingFormModalStore.changeInput(
                      'lunchEndTime',
                      e.target.value
                    );
                  }}
                  disabled={formType === 'EDIT' ? true : false}
                >
                  {timeSettingCodeList.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="flex_sb mgtop10">
              <p class="con_title2">적용기간</p>
              <div class="con_box2">
                <div>
                  <input
                    type="checkbox"
                    id="check1"
                    checked={endNotLimitYn === 'Y' ? true : false}
                    onChange={this.changeEndNotLimitYn}
                  />
                  <label for="check1" class="mglt10">
                    종료일 미정
                  </label>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <DatePicker
                    selected={applyStartDate}
                    onChange={this.changeApplyEndDate}
                    className="wd100"
                    dateFormat="yyyy-MM-dd"
                    disabled={formType === 'EDIT' ? true : false}
                  />
                </div>{' '}
                <a href="javascript:void(0);" class="btn_calen mgrg10">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/calen_sel_ico.png`}
                    alt=""
                  />
                </a>
                <span>~</span>
                <div style={{ display: 'inline-block' }}>
                  <DatePicker
                    selected={applyEndDate}
                    onChange={this.changeApplyEndDate}
                    className="wd100"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>{' '}
                <a href="javascript:void(0);" class="btn_calen">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/calen_sel_ico.png`}
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div class="flex_sb mgtop10">
              <p class="con_title2">적용 부서 선택</p>
              <div class="con_box2">
                <label for="option5" class="blind">
                  적용 부서
                </label>
                <select
                  id="option5"
                  style={{ width: 150 }}
                  value={currentDeptId}
                  onChange={this.changeCurrentDeptId}
                  disabled={formType === 'EDIT' ? true : false}
                >
                  {commuteDeptTargetList.map((item) => (
                    <option value={item.deptKey} key={item.deptKey}>
                      {item.deptName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.closeFormPopup}
          >
            취소
          </button>
          <button type="button" class="btn btn-primary" onClick={this.save}>
            저장
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeptTimeSettingFormModal;
