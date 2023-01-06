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
      <div id="tab01" style={{ display: visible ? '' : 'none' }}>
        <div class="">
          <ul class="search_area">
            <li>
              <div class="title">발생 연도</div>
              <div class="con">
                <input
                  type="text"
                  value={baseYear + '년'}
                  disabled
                  class="w90"
                />
              </div>
            </li>
            <li>
              <div class="title">발생 대상</div>
              <div class="con">
                <ul class="con_flex">
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="option1"
                        name="option"
                        value="ALL"
                        checked={yearApplyTarget === 'ALL'}
                        onChange={this.changeYearApplyTarget}
                      />
                      <label for="option1">전직원</label>
                    </div>
                  </li>
                  <li>
                    <div class="radio">
                      <input
                        type="radio"
                        id="option2"
                        name="option"
                        value="NOVACATION"
                        checked={yearApplyTarget === 'NOVACATION'}
                        onChange={this.changeYearApplyTarget}
                      />
                      <label for="option2">휴가 발생 데이터 없는 직원</label>
                    </div>
                    <a
                      class="btn_normal btn_blue"
                      href="javascript:void(0);"
                      onClick={this.openModal}
                      style={{
                        display: yearApplyTarget === 'NOVACATION' ? '' : 'none'
                      }}
                    >
                      직원선택
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
                발생대상 미리보기/수정( <b class="blue">{totalCount}</b> )명
              </p>
            </div>
            <div class="search_right">
              <a
                href="javascript:void(0);"
                class="btn_ico"
                onClick={this.downloadExcel}
              >
                <i class="ico_download"></i>엑셀다운로드
              </a>
            </div>
          </div>
          <div class="mgtop10">
            <DataGrid
              ref={this.dataGridRef}
              dataSource={datagridStore}
              showBorders={true}
              remoteOperations={true}
              noDataText={'출근 정보가 존재하지 않습니다.'}
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
                caption="직급"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="userName"
                dataType="string"
                caption="성명"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="joinDate"
                dataType="datetime"
                format="yyyy-MM-dd"
                caption="입사일"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="deptName"
                dataType="string"
                caption="부서명"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="calculateYear"
                dataType="number"
                caption="회계년수"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="firstYear"
                dataType="number"
                caption="초년월수"
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="annualCount"
                dataType="number"
                caption="발생연차"
                allowSorting={false}
                allowEditing={true}
              />
              <Column
                dataField="monthCount"
                dataType="number"
                caption="금년월차"
                allowSorting={false}
                allowEditing={true}
              />
              <Column caption="과년월차">
                <Column
                  dataField="pastOccurCount"
                  caption="발생"
                  allowSorting={false}
                  allowEditing={true}
                />
                <Column
                  dataField="pastUseCount"
                  caption="사용"
                  allowSorting={false}
                  allowEditing={false}
                />
              </Column>
              <Column
                dataField="occurVacationCount"
                caption={baseYear + '년 발생일수'}
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="beforeYearUsedCount"
                caption={baseYear - 1 + '년 사용일수'}
                allowSorting={false}
                allowEditing={false}
              />
              <Column
                dataField="baseYearUseableCount"
                caption={baseYear + '년 가능일수'}
                allowSorting={false}
                allowEditing={false}
              />
              <Paging defaultPageSize={10} />
              <Pager
                visible={true}
                showPageSizeSelector={true}
                allowedPageSizes={[5, 10, 'all']}
              />
            </DataGrid>
          </div>
        </div>
        <div class="btn_area relative mgtop10">
          <div class="btn_right">
            {/* <a class="btn_normal btn_blue" href="javascript:void(0);">
              미리보기생성
            </a> */}
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              style={{ display: updateRows.length ? '' : 'none' }}
              onClick={this.updateBatch}
            >
              일괄수정
            </a>
            <a
              class="btn_normal btn_blue"
              href="javascript:void(0);"
              onClick={this.applyYearVacation}
            >
              휴가발생
            </a>
          </div>
        </div>
        <VacationNotApplyUserModal />
      </div>
    );
  }
}

export default VacationManageBatchTab;
