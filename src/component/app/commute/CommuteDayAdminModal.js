import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { toJS } from 'mobx';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VacationSubMenu from 'component/submenu/VacationSubMenu';
import 'devextreme/data/odata/store';
import DatePicker from 'react-datepicker';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Lookup,
  Export
} from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import moment from 'moment';
import Code from 'config/Code';

@inject('appStore', 'uiStore', 'commuteDayAdminModalStore')
@observer
class CommuteDayAdminModal extends Component {
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

    this.update = this.update.bind(this);
    this.reject = this.reject.bind(this);
    this.approve = this.approve.bind(this);
    this.onChangesChange = this.onChangesChange.bind(this);

    this.changeDeptId = this.changeDeptId.bind(this);
    this.nextDept = this.nextDept.bind(this);
    this.prevDept = this.prevDept.bind(this);
    this.onExporting = this.onExporting.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
  }

  downloadExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
      component: this.dataGridRef.current.instance,
      worksheet: worksheet
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          'DataGrid.xlsx'
        );
      });
    });
  }

  init() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.initDataGridComponent(this.dataGridRef);
  }

  search() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.search();
  }

  closeModal() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.closeModal();
  }

  refresh() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.search();
  }

  changeSearchDate(date) {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.changeSearchDate(date);
  }

  openDayDatepicker() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.openDayDatepicker();
  }

  nextDay(kind) {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.nextDay();
  }
  prevDay(kind) {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.prevDay();
  }

  submit() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.submit();
  }

  update() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.updateBatch();
  }

  reject() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.reject();
  }

  approve() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.approve();
  }

  changeDeptId(event) {
    const value = event.target.value;
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.changeDeptId(value);
  }

  nextDept() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.nextDept();
  }

  prevDept() {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.prevDept();
  }

  onChangesChange(changes) {
    const { commuteDayAdminModalStore } = this.props;
    commuteDayAdminModalStore.changeUpdateRows(changes);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { commuteDayAdminModalStore } = this.props;
    let {
      visibleModal,
      searchDate,
      datagridStore,
      dayDatepickerOpend,
      updateRows,
      targetDeptList,
      currentDeptIndex,
      currentDeptId,
      commuteDeptSubmitInfo
    } = commuteDayAdminModalStore;
    commuteDeptSubmitInfo = commuteDeptSubmitInfo || {};
    const { commuteSubmitStatusCode } = commuteDeptSubmitInfo;
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
          부서출퇴근 관리
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
                    부서 선택
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
                      <span>수정</span>
                      <span class="sel_relt_text">
                        {commuteDeptSubmitInfo.modYn
                          ? commuteDeptSubmitInfo.modYn
                          : '-'}
                      </span>
                    </li>
                    <li>
                      <span>지각</span>
                      <span class="sel_relt_text">
                        {commuteDeptSubmitInfo.tardyYn
                          ? commuteDeptSubmitInfo.tardyYn
                          : '-'}
                      </span>
                    </li>
                    <li>
                      <span>상태</span>
                      <span class="sel_relt_text">
                        {commuteDeptSubmitInfo.commuteSubmitStatusCodeName
                          ? commuteDeptSubmitInfo.commuteSubmitStatusCodeName
                          : '-'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <a
                    href="javascript:void(0);"
                    class="btn_ico"
                    onClick={this.downloadExcel}
                  >
                    <i class="ico_download"></i>엑셀다운로드
                  </a>
                  <a
                    href="javascript:void(0);"
                    class="btn_ico"
                    onClick={this.refresh}
                  >
                    <i class="ico_refresh"></i>새로고침
                  </a>
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
                  <span>이전</span>
                </a>
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
                  onExporting={this.onExporting}
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
                    width={150}
                    allowSorting={false}
                  />
                  {/* 근태결과 변경 */}
                  <Column
                    dataField="workResultCode"
                    dataType="string"
                    caption="근태결과"
                    allowSorting={false}
                    width={150}
                  >
                    <Lookup
                      dataSource={Code.workResultCodeList}
                      valueExpr="value"
                      displayExpr="name"
                    />
                  </Column>
                  <Export enabled={true} allowExportSelectedData={true} />
                  <Paging defaultPageSize={10} />
                  <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 'all']}
                  />
                </DataGrid>
                <a
                  href="javascript:void(0);"
                  class="btn_nepr next"
                  onClick={this.nextDept}
                  style={{
                    zIndex: 1,
                    display: targetDeptList.length > 1 ? '' : 'none'
                  }}
                >
                  <span>다음</span>
                </a>
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
            닫기
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.update}
            style={{ display: commuteDeptSubmitInfo.deptId ? '' : 'none' }}
          >
            수정
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.reject}
            style={{
              display:
                commuteDeptSubmitInfo.deptId &&
                (!commuteSubmitStatusCode ||
                  commuteSubmitStatusCode ===
                    Constant.CODE_COMMUTE_DEPT_STATUS_SUBMIT)
                  ? ''
                  : 'none'
            }}
          >
            반려
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={this.approve}
            style={{
              display:
                commuteDeptSubmitInfo.deptId &&
                (!commuteSubmitStatusCode ||
                  commuteSubmitStatusCode ===
                    Constant.CODE_COMMUTE_DEPT_STATUS_SUBMIT)
                  ? ''
                  : 'none'
            }}
          >
            승인
          </button>
        </ModalFooter>
      </Modal>
    );
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('CountriesPopulation');

    exportDataGrid({
      component: e.component,
      worksheet,
      topLeftCell: { row: 4, column: 1 }
    })
      .then((cellRange) => {
        // header
        const headerRow = worksheet.getRow(2);
        headerRow.height = 30;
        worksheet.mergeCells(2, 1, 2, 8);

        headerRow.getCell(1).value =
          'Country Area, Population, and GDP Structure';
        headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
        headerRow.getCell(1).alignment = { horizontal: 'center' };

        // footer
        const footerRowIndex = cellRange.to.row + 2;
        const footerRow = worksheet.getRow(footerRowIndex);
        worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, 8);

        footerRow.getCell(1).value = 'www.wikipedia.org';
        footerRow.getCell(1).font = { color: { argb: 'BFBFBF' }, italic: true };
        footerRow.getCell(1).alignment = { horizontal: 'right' };
      })
      .then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'CountriesPopulation.xlsx'
          );
        });
      });
    e.cancel = true;
  }
}

export default CommuteDayAdminModal;
