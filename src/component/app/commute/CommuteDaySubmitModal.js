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

@inject('appStore', 'uiStore', 'commuteDaySubmitModalStore')
@observer
class CommuteDaySubmitModal extends Component {
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
    this.submit = this.submit.bind(this);
  }

  init() {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.initDataGridComponent(this.dataGridRef);
  }

  search() {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.search();
  }

  closeModal() {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.closeModal();
  }

  refresh() {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.search();
  }

  changeSearchDate(date) {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.openDayDatepicker();
  }

  nextDay(kind) {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.nextDay(kind);
  }
  prevDay(kind) {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.prevDay(kind);
  }

  submit() {
    const { commuteDaySubmitModalStore } = this.props;
    commuteDaySubmitModalStore.submit();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { commuteDaySubmitModalStore } = this.props;
    const {
      visibleModal,
      searchDate,
      datagridStore,
      dayDatepickerOpend,
      isSubmitAvailable
    } = commuteDaySubmitModalStore;
    return (
      <Modal isOpen={visibleModal} className={'modal_box modal_box_1000'}>
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
          팀원 출퇴근 제출
        </ModalHeader>
        <ModalBody>
          <div class="pd20" style={{ zIndex: 1, overflow: 'visible' }}>
            <div class="sel_month">
              <a href="javascript:void(0);" class="prev" onClick={this.prevDay}>
                이전
              </a>
              <span class="txt_month">
                {Helper.dateToString(searchDate, 'M월 DD일 (ddd)')}
              </span>
              <a href="javascript:void(0);" class="next" onClick={this.nextDay}>
                다음
              </a>
              <a
                href="javascript:void(0);"
                class="month"
                onClick={this.openDayDatepicker}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="일 선택하기"
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
                  <i class="ico_refresh"></i>새로고침
                </a>
              </div>
              <div class="mgtop10">
                <DataGrid
                  ref={this.dataGridRef}
                  dataSource={datagridStore}
                  showBorders={true}
                  remoteOperations={true}
                  noDataText={'출근 정보가 존재하지 않습니다.'}
                  height={450}
                  columnResizingMode={true}
                  columnAutoWidth={true}
                  cacheEnabled={false}
                  onToolbarPreparing={(e) => {
                    e.toolbarOptions.visible = false;
                  }}
                >
                  <Column
                    dataField="deptName"
                    dataType="string"
                    caption="부서명"
                    allowSorting={false}
                    allowEditing={false}
                  />
                  <Column
                    dataField="userName"
                    dataType="string"
                    caption="이름"
                    allowSorting={false}
                    allowEditing={false}
                  />
                  <Column
                    dataField="positionTitle"
                    dataType="string"
                    caption="직급명"
                    allowSorting={false}
                    allowEditing={false}
                  />
                  <Column
                    dataField="startWorkIp"
                    dataType="string"
                    caption="출근아이피"
                    allowSorting={false}
                    allowEditing={false}
                  />
                  {/* 출근시간 변경 */}
                  <Column
                    dataField="startWorkDate"
                    dataType="datetime"
                    caption="출근시간"
                    format="yyyy-MM-dd HH:mm"
                    width={200}
                    allowSorting={false}
                    calculateDisplayValue={function (rowData) {
                      const { startWorkDate, finalStartWorkDate } = rowData;
                      let startWorkDateCellResult = '';
                      if (!startWorkDate && !finalStartWorkDate) {
                        return '';
                      } else if (startWorkDate) {
                        if (finalStartWorkDate) {
                          startWorkDateCellResult =
                            moment(finalStartWorkDate).format('HH:mm') +
                            '(' +
                            moment(startWorkDate).format('HH:mm') +
                            ')';
                        } else {
                          startWorkDateCellResult =
                            moment(startWorkDate).format('HH:mm');
                        }
                      } else if (finalStartWorkDate) {
                        startWorkDateCellResult =
                          moment(finalStartWorkDate).format('HH:mm') + '()';
                      }
                      return startWorkDateCellResult;
                    }}
                  />
                  <Column
                    dataField="outWorkIp"
                    dataType="string"
                    caption="퇴근아이피"
                    allowSorting={false}
                    allowEditing={false}
                  />
                  {/* 퇴근시간 변경 */}
                  <Column
                    dataField="outWorkDate"
                    dataType="datetime"
                    caption="퇴근시간"
                    format="HH:mm"
                    width={200}
                    allowSorting={false}
                    calculateDisplayValue={function (rowData) {
                      const { baseDateStr, outWorkDate, finalOutWorkDate } =
                        rowData;
                      let outWorkDateFormat = 'HH:mm';
                      let finalOutWorkDateFormat = 'HH:mm';
                      if (outWorkDate) {
                        if (
                          moment(baseDateStr).diff(
                            moment(outWorkDate),
                            'days'
                          ) < 0
                        ) {
                          outWorkDateFormat = 'M/D/YYYY H:mm a';
                        }
                      }

                      if (finalOutWorkDate) {
                        if (
                          moment(baseDateStr).diff(
                            moment(finalOutWorkDate),
                            'days'
                          ) < 0
                        ) {
                          finalOutWorkDateFormat = 'M/D/YYYY H:mm a';
                        }
                      }

                      let outWorkDateCellResult = '';

                      if (!outWorkDate && !finalOutWorkDate) {
                        return '';
                      } else if (outWorkDate) {
                        if (finalOutWorkDate) {
                          outWorkDateCellResult =
                            moment(finalOutWorkDate).format(
                              finalOutWorkDateFormat
                            ) +
                            '(' +
                            moment(outWorkDate).format(outWorkDateFormat) +
                            ')';
                        } else {
                          outWorkDateCellResult =
                            moment(outWorkDate).format(outWorkDateFormat);
                        }
                      } else if (finalOutWorkDate) {
                        outWorkDateCellResult =
                          moment(finalOutWorkDate).format(
                            finalOutWorkDateFormat
                          ) + '()';
                      }
                      return outWorkDateCellResult;
                    }}
                  />
                  {/* 외근여부 변경 */}
                  <Column
                    dataField="outsideWorkYn"
                    dataType="string"
                    caption="외근여부"
                    allowSorting={false}
                  >
                    <Lookup
                      dataSource={Code.outsideWorkYnCodeList}
                      valueExpr="value"
                      displayExpr="name"
                    />
                  </Column>
                  {/* 기타셜명 변경 */}
                  <Column
                    dataField="etcDescription"
                    dataType="string"
                    caption="기타설명"
                    allowSorting={false}
                    width={150}
                  />
                  {/* 근태결과 변경 */}
                  <Column
                    dataField="workResultCode"
                    dataType="string"
                    caption="근태결과"
                    allowSorting={false}
                  >
                    <Lookup
                      dataSource={Code.workResultCodeList}
                      valueExpr="value"
                      displayExpr="name"
                    />
                  </Column>
                  <Paging defaultPageSize={10} />
                  <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 'all']}
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
            취소
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.submit}
            style={{ display: isSubmitAvailable ? '' : 'none' }}
          >
            제출
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CommuteDaySubmitModal;
