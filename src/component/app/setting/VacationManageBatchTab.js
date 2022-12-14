import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing
} from 'devextreme-react/data-grid';
import VacationNotApplyUserModal from './VacationNotApplyUserModal';

@inject(
  'appStore',
  'uiStore',
  'vacationManageStore',
  'vacationNotApplyUserModalStore'
)
@observer
class VacationManageBatchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.changeSearchUserName = this.changeSearchUserName.bind(this);
    this.changeYearApplyTarget = this.changeYearApplyTarget.bind(this);
    this.applyYearVacation = this.applyYearVacation.bind(this);
    this.updateBatch = this.updateBatch.bind(this);
    this.createPreview = this.createPreview.bind(this);
    this.onChangesChange = this.onChangesChange.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  downloadExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('datagrid-excel');

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
    const { vacationManageStore } = this.props;
    vacationManageStore.getVacationBaseYear();
    vacationManageStore.initDataGridComponent(this.dataGridRef);
  }

  search() {
    const { vacationManageStore } = this.props;
    vacationManageStore.search();
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { vacationManageStore } = this.props;
    vacationManageStore.changeSearchUserName(value);
  }
  changeYearApplyTarget(event) {
    const value = event.target.value;
    const { vacationManageStore } = this.props;
    vacationManageStore.changeYearApplyTarget(value);
  }
  applyYearVacation() {
    const { vacationManageStore } = this.props;
    vacationManageStore.applyYearVacation();
  }
  updateBatch() {
    const { vacationManageStore } = this.props;
    vacationManageStore.updateBatch();
  }

  createPreview() {
    const { vacationManageStore } = this.props;
    vacationManageStore.createPreview();
  }

  onChangesChange(changes) {
    const { vacationManageStore } = this.props;
    vacationManageStore.changeUpdateRows(changes);
  }

  openModal() {
    const { vacationManageStore, vacationNotApplyUserModalStore } = this.props;
    const { baseYear } = vacationManageStore;
    vacationNotApplyUserModalStore.openModal(baseYear);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationManageStore, visible } = this.props;
    const {
      datagridStore,
      totalCount,
      baseYear,
      yearApplyTarget,
      updateRows,
      searchUserName
    } = vacationManageStore;
    return (
      <div style={{ display: visible ? '' : 'none' }}>
        <div class="">
          <ul class="search_area">
            <li>
              <div class="title">?????? ??????</div>
              <div class="con">
                <input
                  type="text"
                  value={baseYear + '???'}
                  disabled
                  class="w90"
                />
              </div>
            </li>
            <li>
              <div class="title">?????? ??????</div>
              <div class="con">
                <ul class="con_flex">
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="option1"
                        name="yearTargetOption"
                        value="ALL"
                        checked={yearApplyTarget === 'ALL'}
                        onChange={this.changeYearApplyTarget}
                      />
                      <label for="option1">?????????</label>
                    </div>
                  </li>
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="option2"
                        name="yearTargetOption"
                        value="NOVACATION"
                        checked={yearApplyTarget === 'NOVACATION'}
                        onChange={this.changeYearApplyTarget}
                      />
                      <label for="option2">?????? ?????? ????????? ?????? ??????</label>
                    </div>
                    <a
                      class="btn_normal btn_blue"
                      href="javascript:void(0);"
                      onClick={this.openModal}
                      style={{
                        display: yearApplyTarget === 'NOVACATION' ? '' : 'none'
                      }}
                    >
                      ????????????
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div class="grid_top flex_sb mgtop20">
            <div class="number">
              <p>
                ???????????? ????????????/??????( <b class="blue">{totalCount}</b> )???
              </p>
            </div>
            <div class="search_right">
              <input
                type="text"
                class="w100"
                placeholder="?????????????????? ??????????????????."
                value={searchUserName}
                onChange={this.changeSearchUserName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.search(); // Enter ????????? ?????? ?????? ????????? ??????
                  }
                }}
                style={{ height: 30 }}
              />{' '}
              <a
                href="javascript:void(0);"
                class="btn_ico"
                onClick={this.downloadExcel}
              >
                <i class="ico_download"></i>??????????????????
              </a>
            </div>
          </div>
          <div class="mgtop10">
            <DataGrid
              keyExpr="userId"
              key="userId"
              ref={this.dataGridRef}
              dataSource={datagridStore}
              showBorders={true}
              remoteOperations={true}
              noDataText={'???????????? ????????? ???????????? ????????????.'}
              height={450}
              cacheEnabled={false}
              onToolbarPreparing={(e) => {
                e.toolbarOptions.visible = false;
              }}
              onCellPrepared={(e) => {
                if (e.rowType === 'header') {
                  if (e.column) {
                    const dataField = e.column.dataField;
                    if (
                      dataField === 'annualCount' ||
                      dataField === 'monthCount' ||
                      dataField === 'pastOccurCount'
                    ) {
                      e.cellElement.style.color = '#4176fa';
                    }
                  }
                }
              }}
            >
              <Editing
                mode="batch"
                keyExpr="userId"
                key="userId"
                columnAutoWidth={true}
                allowUpdating={true}
                selectTextOnEditStart={true}
                startEditAction={'click'}
                changes={toJS(updateRows)}
                onChangesChange={this.onChangesChange}
              />
              <Column
                dataField="positionTitle"
                dataType="string"
                caption="??????"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="??????"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="joinDate"
                dataType="datetime"
                format="yyyy-MM-dd"
                caption="?????????"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="deptName"
                dataType="string"
                caption="?????????"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="calculateYear"
                dataType="number"
                caption="????????????"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="firstYear"
                dataType="number"
                caption="????????????"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="annualCount"
                dataType="number"
                caption="????????????"
                allowSorting={false}
                allowEditing={true}
              />
              <Column
                dataField="monthCount"
                dataType="number"
                caption="????????????"
                allowSorting={false}
                allowEditing={true}
              />
              <Column caption="????????????">
                <Column
                  dataField="pastOccurCount"
                  caption="??????"
                  allowSorting={false}
                  allowEditing={true}
                />
                <Column
                  dataField="pastUseCount"
                  caption="??????"
                  allowSorting={false}
                  allowEditing={false}
                />
              </Column>
              <Column
                dataField="occurVacationCount"
                caption={baseYear + '??? ????????????'}
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="beforeYearUsedCount"
                caption={baseYear - 1 + '??? ????????????'}
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="baseYearUseableCount"
                caption={baseYear + '??? ????????????'}
                allowSorting={false}
                allowEditing={false}
              />
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
        <div class="btn_area relative mgtop10">
          <div class="btn_right">
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              onClick={this.createPreview}
            >
              ????????????????????????
            </a>
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              style={{ display: updateRows.length ? '' : 'none' }}
              onClick={this.updateBatch}
            >
              ????????????
            </a>
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              onClick={this.applyYearVacation}
            >
              ????????????
            </a>
          </div>
        </div>
        <VacationNotApplyUserModal />
      </div>
    );
  }
}

export default VacationManageBatchTab;
