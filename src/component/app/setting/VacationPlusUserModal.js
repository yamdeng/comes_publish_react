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
  Lookup,
  Selection
} from 'devextreme-react/data-grid';
import CommuteSubMenu from 'component/submenu/CommuteSubMenu';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import moment from 'moment';
import Code from 'config/Code';
import ReactHelper from 'util/ReactHelper';

@inject('appStore', 'uiStore', 'vacationPlusUserModalStore')
@observer
class VacationPlusUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeSearchUserName = this.changeSearchUserName.bind(this);
    this.createPreviewVacation = this.createPreviewVacation.bind(this);
    this.changeSelectedRows = this.changeSelectedRows.bind(this);
  }

  init() {
    const { vacationPlusUserModalStore } = this.props;
    vacationPlusUserModalStore.initDataGridComponent(this.dataGridRef);
  }

  search() {
    const { vacationPlusUserModalStore } = this.props;
    vacationPlusUserModalStore.search();
  }

  closeModal() {
    const { vacationPlusUserModalStore } = this.props;
    vacationPlusUserModalStore.closeModal();
  }

  changeSearchUserName(event) {
    const value = event.target.value;
    const { vacationPlusUserModalStore } = this.props;
    vacationPlusUserModalStore.changeSearchUserName(value);
  }

  createPreviewVacation() {
    const { vacationPlusUserModalStore } = this.props;
    vacationPlusUserModalStore.createPreviewVacation();
  }

  changeSelectedRows({ selectedRowKeys, selectedRowsData }) {
    const { vacationPlusUserModalStore } = this.props;
    vacationPlusUserModalStore.changeSelectedRows(selectedRowKeys);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const { vacationPlusUserModalStore } = this.props;
    const {
      visibleModal,
      datagridStore,
      selectedRows,
      totalCount,
      searchUserName
    } = vacationPlusUserModalStore;
    return (
      <Modal isOpen={visibleModal} className={'modal_box modal_box_850'}>
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
          포상휴가 발생 사용자 선택
        </ModalHeader>
        <ModalBody>
          <div class="pd20" style={{ zIndex: 1, overflow: 'visible' }}>
            <div>
              <div class="grid_top flex_sb">
                <div></div>
                <div class="search_right">
                  <input
                    type="text"
                    class="w100"
                    placeholder="사용자이름을 입력해주세요."
                    value={searchUserName}
                    onChange={this.changeSearchUserName}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        this.search(); // Enter 입력이 되면 클릭 이벤트 실행
                      }
                    }}
                    style={{ height: 30 }}
                  />
                </div>
              </div>
              <div class="mgtop10">
                <DataGrid
                  ref={this.dataGridRef}
                  keyExpr="userKey"
                  dataSource={datagridStore}
                  showBorders={true}
                  remoteOperations={true}
                  noDataText={'사용자 정보가 존재하지 않습니다.'}
                  height={450}
                  columnAutoWidth={false}
                  cacheEnabled={false}
                  selectedRowKeys={toJS(selectedRows)}
                  onSelectionChanged={this.changeSelectedRows}
                >
                  <Selection
                    mode="multiple"
                    showCheckBoxesMode={'always'}
                    selectAllMode="page"
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
                    caption="직급"
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

                  <Paging defaultPageSize={10} />
                  <Pager
                    visible={true}
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
            onClick={this.createPreviewVacation}
            style={{ display: selectedRows.length ? '' : 'none' }}
          >
            미리보기 생성
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default VacationPlusUserModal;
