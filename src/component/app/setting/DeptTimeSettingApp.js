import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import Constant from 'config/Constant';
import classnames from 'classnames';
import Helper from 'util/Helper';
import SettingSubMenu from 'component/submenu/SettingSubMenu';
import DeptTimeSettingFormModal from './DeptTimeSettingFormModal';
import Code from 'config/Code';

@inject(
  'appStore',
  'uiStore',
  'deptTimeSettingStore',
  'deptTimeSettingFormModalStore'
)
@observer
class DeptTimeSettingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dataGridRef = React.createRef();
    this.init = this.init.bind(this);
    this.search = this.search.bind(this);
    this.openFormPopup = this.openFormPopup.bind(this);
  }

  init() {
    const { deptTimeSettingStore } = this.props;
    deptTimeSettingStore.initDataGridComponent(this.dataGridRef);
    this.search();
  }

  search() {
    const { deptTimeSettingStore } = this.props;
    deptTimeSettingStore.search();
  }

  openFormPopup(formType, deptId) {
    const { deptTimeSettingFormModalStore } = this.props;
    deptTimeSettingFormModalStore.openFormPopup(formType, deptId);
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
                  onClick={() => this.openFormPopup('ADD')}
                >
                  근무시간 등록
                </a>
              </div>
            </div>
            <div class="mgtop10">
              <DataGrid
                ref={this.dataGridRef}
                dataSource={datagridStore}
                showBorders={true}
                remoteOperations={true}
                cacheEnabled={false}
                noDataText={'업무보고 정보가 존재하지 않습니다.'}
                height={450}
              >
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="적용부서명"
                  allowSorting={false}
                />
                <Column
                  dataField="timeName"
                  dataType="string"
                  caption="근무시간명"
                  allowSorting={false}
                />
                <Column
                  dataField="workLocation"
                  dataType="string"
                  caption="근무지"
                  allowSorting={false}
                />
                <Column
                  dataField="timeDescription"
                  dataType="string"
                  caption="근무시간설명"
                  allowSorting={false}
                />
                <Column
                  dataField="workStartTime"
                  dataType="string"
                  caption="근무시간"
                  allowSorting={false}
                />
                <Column
                  dataField="lunchEndTime"
                  dataType="string"
                  caption="점심시간"
                  allowSorting={false}
                />
                <Column
                  dataField="applyStartDateStr"
                  dataType="string"
                  caption="적용 시작일"
                  allowSorting={false}
                />
                <Column
                  dataField="applyEndDateStr"
                  dataType="string"
                  caption="적용 예정일"
                  allowSorting={false}
                />
                <Column
                  dataField="deptName"
                  dataType="string"
                  caption="적용 부서"
                  allowSorting={false}
                />
                <Column
                  dataField="regDate"
                  dataType="datetime"
                  caption="등록일"
                  format="yyyy-MM-dd HH:mm"
                  allowSorting={false}
                />
                <Column
                  dataField="deptId"
                  dataType="string"
                  caption="수정"
                  allowSorting={false}
                  width={80}
                  alignment="center"
                  cellRender={(columnInfo) => {
                    const { data } = columnInfo;
                    const { deptId } = data;
                    return (
                      <a
                        href="javascript:void(0);"
                        class="btn_normal btn_blue"
                        onClick={() => this.openFormPopup('EDIT', deptId)}
                      >
                        수정
                      </a>
                    );
                  }}
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
        <DeptTimeSettingFormModal />
      </div>
    );
  }
}

export default DeptTimeSettingApp;
