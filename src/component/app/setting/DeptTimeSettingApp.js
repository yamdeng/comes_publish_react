import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import SettingSubMenu from 'component/submenu/SettingSubMenu';

@inject('appStore', 'uiStore', 'deptTimeSettingStore')
@observer
class DeptTimeSettingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.openFormPopup = this.openFormPopup.bind(this);
    this.closeFormPopup = this.closeFormPopup.bind(this);
  }

  init() {
    this.search();
  }

  search() {
    const { deptTimeSettingStore } = this.props;
    deptTimeSettingStore.search();
  }

  openFormPopup() {
    const { deptTimeSettingStore } = this.props;
    deptTimeSettingStore.openFormPopup();
  }

  closeFormPopup() {
    const { deptTimeSettingStore } = this.props;
    deptTimeSettingStore.closeFormPopup();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { deptTimeSettingStore } = this.props;
    const { datagridStore, isFormPopupOpen } = deptTimeSettingStore;
    return (
      <div id="contents_sub" class="">
        <SettingSubMenu />
        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">설정</a>&gt;
            <a href="javascript:void(0);">근무 시간 관리</a>
          </div>
          <div class="title_area">
            <h3>부서별 근무시간관리</h3>
          </div>
          <div class="">
            <div class="grid_top flex_sb mgtop20">
              {/* <div class="number">
                <p>
                  <b class="blue">6</b> 명
                </p>
              </div> */}
              <div></div>
              <div class="search_right">
                <a
                  href="javascript:void(0);"
                  class="btn_normal btn_blue"
                  onClick={this.openFormPopup}
                >
                  근무시간 등록
                </a>
              </div>
            </div>
            <div class="mgtop10">
              <DataGrid
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                noDataText={'업무보고 정보가 존재하지 않습니다.'}
                height={450}
              >
                <Column
                  dataField="timeName"
                  dataType="string"
                  caption="근무시간명"
                />
                <Column
                  dataField="workLocation"
                  dataType="string"
                  caption="근무지"
                />
                <Column
                  dataField="timeDescription"
                  dataType="string"
                  caption="근무시간설명"
                />
                <Column
                  dataField="workStartTime"
                  dataType="string"
                  caption="근무시간"
                />
                <Column
                  dataField="lunchEndTime"
                  dataType="string"
                  caption="점심시간"
                />
                <Column
                  dataField="applyStartDateStr"
                  dataType="string"
                  caption="적용 시작일"
                />
                <Column
                  dataField="applyStartDateStr"
                  dataType="string"
                  caption="적용 예정일"
                />
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="적용 부서"
                />
                <Column
                  dataField="regDate"
                  dataType="datetime"
                  caption="등록일"
                  format="yyyy-MM-dd hh:mm"
                />
                <Paging defaultPageSize={10} />
                <Pager showPageSizeSelector={true} />
              </DataGrid>
            </div>
          </div>
        </div>
        <div>
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
                      placeholder="제목을 입력해주세요."
                    />
                  </div>
                </div>
                <div class="flex_sb mgtop10">
                  <p class="con_title2">근무지</p>
                  <div class="con_box2">
                    <input
                      type="text"
                      class="w100p"
                      placeholder="제목을 입력해주세요."
                    />
                  </div>
                </div>
                <div class="flex_sb mgtop10">
                  <p class="con_title2">근무시간 설명</p>
                  <div class="con_box2">
                    <label for="option1" class="blind">
                      출근 시간
                    </label>
                    <select id="option1" class="w90">
                      <option>09:00</option>
                    </select>
                    <span>~</span>
                    <label for="option2" class="blind">
                      퇴근 시간
                    </label>
                    <select id="option2" class="w90">
                      <option>18:00</option>
                    </select>
                  </div>
                </div>
                <div class="flex_sb mgtop10">
                  <p class="con_title2">점심시간</p>
                  <div class="con_box2">
                    <label for="option3" class="blind">
                      점심 시작 시간
                    </label>
                    <select id="option3" class="w90" disabled>
                      <option>12:00</option>
                    </select>
                    <span>~</span>
                    <label for="option4" class="blind">
                      점심 종료 시간
                    </label>
                    <select id="option4" class="w90" disabled>
                      <option>13:00</option>
                    </select>
                  </div>
                </div>
                <div class="flex_sb mgtop10">
                  <p class="con_title2">적용기간</p>
                  <div class="con_box2">
                    <div>
                      <input type="checkbox" id="check1" />
                      <label for="check1" class="mglt10">
                        종료일 미정
                      </label>
                    </div>
                    <input type="text" class="w90" />
                    <a href="javascript:void(0);" class="btn_calen mgrg10">
                      <img src="images/calen_sel_ico.png" />
                    </a>
                    <span>~</span>
                    <input type="text" class="w90" />
                    <a href="javascript:void(0);" class="btn_calen">
                      <img src="images/calen_sel_ico.png" />
                    </a>
                  </div>
                </div>
                <div class="flex_sb mgtop10">
                  <p class="con_title2">적용 부서 선택</p>
                  <div class="con_box2">
                    <label for="option5" class="blind">
                      적용 부서
                    </label>
                    <select id="option5" class="w90">
                      <option>SQ1</option>
                    </select>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" class="btn btn-secondary">
                취소
              </button>
              <button type="button" class="btn btn-primary">
                저장
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DeptTimeSettingApp;
