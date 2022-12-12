import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Constant from 'config/Constant';
import SideBar from './SideBar';
import Home from 'component/Home';
import OutsideOrgManage from 'component/common/OutsideOrgManage';
import BoardList from 'component/common/BoardList';
import BoardForm from 'component/common/BoardForm';
import BoardDetail from 'component/common/BoardDetail';
import MemberRoleList from 'component/common/MemberRoleList';
import CheckItemList from 'component/safe-check/CheckItemList';
import WorkOrderList from 'component/safe-check/WorkOrderList';
import WorkOrderForm from 'component/safe-check/WorkOrderForm';
import WorkApproveRequestList from 'component/safe-check/WorkApproveRequestList';
import ClosenessPermissionList from 'component/safe-check/ClosenessPermissionList';
import ClosenessPermissionForm from 'component/safe-check/ClosenessPermissionForm';
import CheckResultList from 'component/safe-check/CheckResultList';
import CheckResultForm from 'component/safe-check/CheckResultForm';
import WorkOrderStatusList from 'component/safe-check/WorkOrderStatusList';
import CheckItemStatusList from 'component/safe-check/CheckItemStatusList';
import WorkOrderDashBoard from 'component/safe-check/WorkOrderDashBoard';
import SafeDocTemplateList from 'component/safe-doc/SafeDocTemplateList';
import SafeDocTemplateApplyList from 'component/safe-doc/SafeDocTemplateApplyList';
import SafeManagerList from 'component/safe-doc/SafeManagerList';
import SubjectList from 'component/safe-doc/SubjectList';
import SubjectDetail from 'component/safe-doc/SubjectDetail';
import SafeDocScheduleList from 'component/safe-doc/SafeDocScheduleList';
import SafeDocList from 'component/safe-doc/SafeDocList';
import SafeDocForm from 'component/safe-doc/SafeDocForm';

// 아래부터는 테스트 컴포넌트 : 추가되는 컴포넌트는 위에 정의
import ModalTest from 'component/test/ModalTest';
import TableTest1 from 'component/test/TableTest1';
import TableTest2 from 'component/test/TableTest2';
import FormTest1 from 'component/test/FormTest1';
import FormTest2 from 'component/test/FormTest2';
// import FormTest3 from 'component/test/FormTest3';
import SearchField1 from 'component/test/SearchField1';
import GuideTable1 from 'component/test/guide/GuideTable1';
import GuideForm1 from 'component/test/guide/GuideForm1';
import GuideForm2 from 'component/test/guide/GuideForm2';
import TableTopLayout from 'component/test/guide/TableTopLayout';
import TableTopLayout2 from 'component/test/guide/TableTopLayout2';
import EditTable from 'component/test/guide/EditTable';

import ServerError from 'component/error/ServerError';

// 개발 가이드

@withRouter
@observer
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SideBar />
        <div className="content_area_wrap">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/outside-org-manage"
              component={OutsideOrgManage}
            />
            <Route exact path="/boards" component={BoardList} />
            <Route exact path="/boards" component={BoardList} />
            <Route
              exact
              path="/boards/:id"
              render={(props) => {
                if (props.match.params.id === Constant.FORM_ADD_ID) {
                  return <BoardForm {...props} />;
                } else {
                  return <BoardDetail {...props} />;
                }
              }}
            />
            <Route exact path="/boards/:id/update" component={BoardForm} />
            <Route exact path="/member-roles" component={MemberRoleList} />
            <Route exact path="/check-items" component={CheckItemList} />
            <Route exact path="/work-orders" component={WorkOrderList} />
            <Route
              exact
              path="/work-orders/:id"
              render={(props) => {
                if (props.match.params.id === Constant.FORM_ADD_ID) {
                  return <WorkOrderForm {...props} />;
                } else {
                  return <WorkOrderForm {...props} />;
                }
              }}
            />
            <Route
              exact
              path="/work-orders/:id/update"
              component={WorkOrderForm}
            />
            <Route
              exact
              path="/work-approve-requests"
              component={WorkApproveRequestList}
            />
            <Route
              exact
              path="/closeness-permissions"
              component={ClosenessPermissionList}
            />
            <Route
              exact
              path="/closeness-permissions/:id"
              render={(props) => {
                if (props.match.params.id === Constant.FORM_ADD_ID) {
                  return <ClosenessPermissionForm {...props} />;
                } else {
                  return <ClosenessPermissionForm {...props} />;
                }
              }}
            />
            <Route
              exact
              path="/closeness-permissions/:id/update"
              component={ClosenessPermissionForm}
            />
            <Route exact path="/check-results" component={CheckResultList} />
            <Route
              exact
              path="/check-results/:id"
              render={(props) => {
                if (props.match.params.id === Constant.FORM_ADD_ID) {
                  return <CheckResultForm {...props} />;
                } else {
                  return <CheckResultForm {...props} />;
                }
              }}
            />
            <Route
              exact
              path="/check-results/:id/update"
              component={CheckResultForm}
            />
            <Route
              exact
              path="/work-order-statuses"
              component={WorkOrderStatusList}
            />
            <Route
              exact
              path="/check-item-statuses"
              component={CheckItemStatusList}
            />
            <Route
              exact
              path="/work-order-dashboard"
              component={WorkOrderDashBoard}
            />
            <Route
              exact
              path="/safe-doc-templates"
              component={SafeDocTemplateList}
            />
            <Route
              exact
              path="/safe-doc-template-applys"
              component={SafeDocTemplateApplyList}
            />
            <Route exact path="/safe-managers" component={SafeManagerList} />
            <Route exact path="/subjects" component={SubjectList} />
            <Route exact path="/subjects/:id" component={SubjectDetail} />
            <Route
              exact
              path="/safe-doc-schedules"
              component={SafeDocScheduleList}
            />
            <Route exact path="/safe-docs" component={SafeDocList} />
            <Route
              exact
              path="/safe-docs/:id"
              render={(props) => {
                if (props.match.params.id === Constant.FORM_ADD_ID) {
                  return <SafeDocForm {...props} />;
                } else {
                  return <SafeDocForm {...props} />;
                }
              }}
            />
            {/* 이후 아래는 테스트 라우팅 */}
            <Route exact path="/test/modal" component={ModalTest} />
            <Route exact path="/test/table1" component={TableTest1} />
            <Route exact path="/test/table2" component={TableTest2} />
            <Route exact path="/test/form1" component={FormTest1} />
            <Route exact path="/test/form2" component={FormTest2} />
            {/* <Route exact path="/test/form3" component={FormTest3} /> */}
            <Route exact path="/test/search-field1" component={SearchField1} />
            <Route exact path="/test/guide/table1" component={GuideTable1} />
            <Route exact path="/test/guide/form1" component={GuideForm1} />
            <Route exact path="/test/guide/form2" component={GuideForm2} />
            <Route
              exact
              path="/test/guide/table_top_layout"
              component={TableTopLayout}
            />
            <Route exact path="/test/guide/edit-table" component={EditTable} />
            <Route
              exact
              path="/test/guide/table_top_layout2"
              component={TableTopLayout2}
            />
            <Route exact path="/error/server" component={ServerError} />
          </Switch>
        </div>
      </>
    );
  }
}
export default Main;
