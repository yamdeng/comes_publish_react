import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import DatePicker from 'react-datepicker';
import DataGrid, {
  Column,
  Paging,
  Pager,
  Selection
} from 'devextreme-react/data-grid';
import VacationPlusUserModal from './VacationPlusUserModal';
import Code from 'config/Code';

@inject(
  'appStore',
  'uiStore',
  'vacationManagePlusStore',
  'vacationPlusUserModalStore'
)
@observer
class VacationManageConditionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);

    this.changeSearchUserName = this.changeSearchUserName.bind(this);
    this.changeSelectedRows = this.changeSelectedRows.bind(this);
    this.changePlusApplyTarget = this.changePlusApplyTarget.bind(this);
    this.changePlusTargetConditionValue =
      this.changePlusTargetConditionValue.bind(this);
    this.changePlusVacationName = this.changePlusVacationName.bind(this);
    this.changePlusVacationCount = this.changePlusVacationCount.bind(this);
    this.applyPlusVacation = this.applyPlusVacation.bind(this);
    this.createPreview = this.createPreview.bind(this);

    this.deleteSelect = this.deleteSelect.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.openModal = this.openModal.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
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
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.getVacationBaseYear();
    vacationManagePlusStore.initDataGridComponent(this.dataGridRef);
  }

  search() {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.search();
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.changeSearchUserName(value);
  }
  changeSelectedRows({ selectedRowKeys, selectedRowsData }) {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.changeSelectedRows(selectedRowKeys);
  }
  changePlusApplyTarget(event) {
    const value = event.target.value;
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.changePlusApplyTarget(value);
  }
  changePlusTargetConditionValue(event) {
    const value = event.target.value;
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.changePlusTargetConditionValue(value);
  }
  changePlusVacationName(event) {
    const value = event.target.value;
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.changePlusVacationName(value);
  }
  changePlusVacationCount(event) {
    const value = event.target.value;
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.changePlusVacationCount(value);
  }

  applyPlusVacation() {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.applyPlusVacation();
  }

  createPreview() {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.createPreview();
  }

  deleteSelect() {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.deleteSelect();
  }

  deleteAll() {
    const { vacationManagePlusStore } = this.props;
    vacationManagePlusStore.deleteAll();
  }

  openModal() {
    const { vacationManagePlusStore, vacationPlusUserModalStore } = this.props;
    const { baseYear } = vacationManagePlusStore;
    vacationPlusUserModalStore.openModal(baseYear);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationManagePlusStore, visible } = this.props;
    const {
      datagridStore,
      totalCount,
      baseYear,
      plusApplyTarget,
      plusTargetConditionValue,
      plusVacationName,
      plusVacationCount,
      searchUserName,
      selectedRows
    } = vacationManagePlusStore;
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
                        id="plusoption1"
                        name="plusTargetOption"
                        value="CONDITION"
                        checked={plusApplyTarget === 'CONDITION'}
                        onChange={this.changePlusApplyTarget}
                      />
                      <label for="plusoption1">??????</label>
                    </div>
                    <label for="sel_option1" class="blind">
                      ??????
                    </label>
                    <select
                      id="sel_option1"
                      value={plusTargetConditionValue}
                      onChange={this.changePlusTargetConditionValue}
                    >
                      {Code.plusTargetConditionCodeList.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="plusoption2"
                        name="plusTargetOption"
                        value="SELECT"
                        checked={plusApplyTarget === 'SELECT'}
                        onChange={this.changePlusApplyTarget}
                      />
                      <label for="plusoption2">?????? ??????</label>
                    </div>
                    <a
                      class="btn_normal btn_blue"
                      href="javascript:void(0);"
                      onClick={this.openModal}
                      style={{
                        display: plusApplyTarget === 'SELECT' ? '' : 'none'
                      }}
                    >
                      ????????????
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="title">????????????</div>
              <div class="con">
                <label for="vacation_option1" class="mgrg20">
                  ????????????
                </label>
                <input
                  type="text"
                  id="vacation_option1"
                  value={plusVacationName}
                  disabled={true}
                />
                <label for="vacation_option2" class="mgrg20">
                  ????????????
                </label>
                <input
                  type="number"
                  id="vacation_option2"
                  class="w90"
                  value={plusVacationCount}
                  onChange={this.changePlusVacationCount}
                />
                <a
                  href="javascript:void(0);"
                  class="btn_normal btn_blue"
                  onClick={this.createPreview}
                  style={{
                    display: plusApplyTarget === 'CONDITION' ? '' : 'none'
                  }}
                >
                  ??????
                </a>
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
              keyExpr="previewId"
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
              selectedRowKeys={toJS(selectedRows)}
              onSelectionChanged={this.changeSelectedRows}
            >
              <Selection
                mode="multiple"
                showCheckBoxesMode={'always'}
                selectAllMode="page"
              />
              <Column
                dataField="positionTitle"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="??????"
                allowSorting={false}
              />
              <Column
                dataField="deptName"
                dataType="string"
                caption="?????????"
                allowSorting={false}
              />
              <Column
                dataField="joinDate"
                dataType="datetime"
                format="yyyy-MM-dd"
                caption="?????????"
                allowSorting={false}
              />
              <Column
                dataField="vacationCount"
                dataType="number"
                caption="???????????? ????????????"
                allowSorting={false}
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
              style={{ display: totalCount ? '' : 'none' }}
              onClick={this.deleteAll}
            >
              ????????????
            </a>
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              style={{
                display: totalCount && selectedRows.length ? '' : 'none'
              }}
              onClick={this.deleteSelect}
            >
              ????????????
            </a>
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              onClick={this.applyPlusVacation}
            >
              ????????????
            </a>
          </div>
        </div>
        <VacationPlusUserModal />
      </div>
    );
  }
}

export default VacationManageConditionTab;
