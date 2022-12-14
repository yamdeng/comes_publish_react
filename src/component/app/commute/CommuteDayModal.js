import React, { Component } from 'react';
import { toJS } from 'mobx';
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
import ReactHelper from 'util/ReactHelper';

@inject('appStore', 'uiStore', 'commuteDayUpdateModalStore')
@observer
class CommuteDayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refresh = this.refresh.bind(this);

    this.changeSearchDate = this.changeSearchDate.bind(this);
    this.openDayDatepicker = this.openDayDatepicker.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.update = this.update.bind(this);
    this.onChangesChange = this.onChangesChange.bind(this);
  }

  init() {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.initDataGridComponent(this.dataGridRef);
  }

  search() {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.search();
  }

  closeModal() {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.closeModal();
  }

  refresh() {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.changeUpdateRows([]);
    this.search();
  }

  changeSearchDate(date) {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.changeSearchDate(date);
    commuteDayUpdateModalStore.changeUpdateRows([]);
  }

  openDayDatepicker() {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.openDayDatepicker();
  }

  nextDay(kind) {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.nextDay(kind);
    commuteDayUpdateModalStore.changeUpdateRows([]);
  }
  prevDay(kind) {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.prevDay(kind);
    commuteDayUpdateModalStore.changeUpdateRows([]);
  }

  update() {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.updateBatch();
  }

  onChangesChange(changes) {
    const { commuteDayUpdateModalStore } = this.props;
    commuteDayUpdateModalStore.changeUpdateRows(changes);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { commuteDayUpdateModalStore } = this.props;
    const {
      visibleModal,
      searchDate,
      datagridStore,
      dayDatepickerOpend,
      isUpdateAvailable,
      updateRows
    } = commuteDayUpdateModalStore;
    return (
      <Modal isOpen={visibleModal} className={'modal_box modal_box_1370'}>
        <ModalHeader
          className="popup_head"
          close={
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => this.closeModal()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          }
        >
          ?????? ????????? ??????
        </ModalHeader>
        <ModalBody>
          <div class="pd20" style={{ zIndex: 1, overflow: 'visible' }}>
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
                  zIndex={2}
                  inline
                />
              )}
            </div>

            <div>
              <div class="grid_top">
                <a
                  href="javascript:void(0);"
                  class="btn_right btn_ico"
                  onClick={this.refresh}
                >
                  <i class="ico_refresh"></i>????????????
                </a>
              </div>
              <div class="mgtop10">
                <DataGrid
                  ref={this.dataGridRef}
                  dataSource={datagridStore}
                  showBorders={true}
                  remoteOperations={true}
                  noDataText={'?????? ????????? ???????????? ????????????.'}
                  height={450}
                  columnAutoWidth={false}
                  cacheEnabled={false}
                  onToolbarPreparing={(e) => {
                    e.toolbarOptions.visible = false;
                  }}
                  onEditingStart={ReactHelper.onEditingStartCommuteDay}
                  onCellPrepared={ReactHelper.onCellPreparedCommuteDay}
                  onRowPrepared={ReactHelper.onRowPreparedCommuteDayUpdate}
                >
                  <Editing
                    mode="batch"
                    keyExpr="userKey"
                    key="userKey"
                    allowUpdating={true}
                    selectTextOnEditStart={true}
                    startEditAction={'click'}
                    changes={toJS(updateRows)}
                    onChangesChange={this.onChangesChange}
                  />
                  <Column
                    dataField="baseDateStr"
                    dataType="string"
                    caption="??????"
                    width={100}
                    allowEditing={false}
                    allowSorting={false}
                    cellRender={ReactHelper.baseDateStrColumDisplayValue}
                  />
                  <Column
                    dataField="deptName"
                    dataType="string"
                    caption="?????????"
                    allowSorting={false}
                    allowEditing={false}
                    width={90}
                  />
                  <Column
                    dataField="userName"
                    dataType="string"
                    caption="??????"
                    allowSorting={false}
                    allowEditing={false}
                    width={90}
                  />
                  <Column
                    dataField="positionTitle"
                    dataType="string"
                    caption="??????"
                    allowSorting={false}
                    allowEditing={false}
                    width={80}
                  />
                  <Column
                    dataField="startWorkIp"
                    dataType="string"
                    caption="???????????????"
                    allowSorting={false}
                    allowEditing={false}
                    width={120}
                    calculateDisplayValue={
                      ReactHelper.startWorkIpColumDisplayValue
                    }
                  />
                  {/* ???????????? ?????? */}
                  <Column
                    dataField="finalStartWorkDate"
                    dataType="datetime"
                    caption="????????????"
                    format="HH:mm"
                    width={160}
                    allowSorting={false}
                    calculateDisplayValue={
                      ReactHelper.finalStartWorkDateColumDisplayValue
                    }
                  />
                  <Column
                    dataField="outWorkIp"
                    dataType="string"
                    caption="???????????????"
                    width={120}
                    allowSorting={false}
                    allowEditing={false}
                    calculateDisplayValue={
                      ReactHelper.outWorkIpColumDisplayValue
                    }
                  />
                  {/* ???????????? ?????? */}
                  <Column
                    dataField="finalOutWorkDate"
                    dataType="datetime"
                    caption="????????????"
                    format="HH:mm"
                    width={160}
                    allowSorting={false}
                    cellRender={ReactHelper.finalOutWorkDateColumDisplayValue}
                  />
                  {/* ???????????? ?????? */}
                  <Column
                    dataField="outsideWorkYn"
                    dataType="string"
                    caption="????????????"
                    width={70}
                    allowSorting={false}
                  >
                    <Lookup
                      dataSource={Code.outsideWorkYnCodeList}
                      valueExpr="value"
                      displayExpr="name"
                    />
                  </Column>
                  {/* ???????????? ?????? */}
                  <Column
                    dataField="etcDescription"
                    dataType="string"
                    caption="????????????"
                    width={150}
                    allowSorting={false}
                  />
                  {/* ???????????? ?????? */}
                  <Column
                    dataField="workResultCode"
                    dataType="string"
                    caption="????????????"
                    allowSorting={false}
                    width={150}
                    calculateDisplayValue={
                      ReactHelper.workResultcodeColumDisplayValue
                    }
                  >
                    <Lookup
                      dataSource={Code.workResultCodeList}
                      valueExpr="value"
                      displayExpr="name"
                    />
                  </Column>
                  <Paging defaultPageSize={10} />
                  <Pager
                    visible={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 'all']}
                    showNavigationButtons={true}
                    showInfo={true}
                    infoText="{0} ????????? / ?????? {1}"
                  />
                </DataGrid>
              </div>
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
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.update}
            style={{ display: isUpdateAvailable ? '' : 'none' }}
          >
            ??????
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CommuteDayModal;
