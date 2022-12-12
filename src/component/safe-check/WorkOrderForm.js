import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import SearchInput from 'component/ui/SearchInput';
import WorkOrderBasicTab from 'component/safe-check/WorkOrderBasicTab';
import WorkOrderMemberSettingTab from 'component/safe-check/WorkOrderMemberSettingTab';

/*

    이름 : 작업 지시 폼/상세

    route
     -/work-orders/new
     -/work-orders/:id/update
     -/work-orders/:id : 상세화면도 폼화면을 사용

    store
     -boardListStore

*/

@HOC.documentTitle('작업 지시 폼/상세')
@withRouter
@inject('boardListStore')
@observer
class WorkOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>작업 지시 등록/수정</h3>
        {/* 상단 영역 */}
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group form_search form_clear wid70 c_mr5">
                <SearchInput
                  value={''}
                  label="작업지시 ID"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <button className="btn_text btn_green mobile_full">조회</button>
            </div>
            <div className="form_cell f_wid50">
              <span className="form_group form_clear wid40 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  value="진행중"
                  disabled
                />
                <label className="f_label">진행상태</label>
              </span>
              <button className="btn_text btn_dark_gray c_mr5">승인신청</button>
              <button className="btn_text btn_dark_gray">이력보기</button>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group wid100">
                <input
                  type="text"
                  className="form_tag"
                  value="YYYY-MM-DD HH:mm"
                  disabled
                />
                <label className="f_label">작업일시</label>
              </span>
            </div>
            <div className="form_cell f_wid50">
              <span className="form_group wid100">
                <input
                  type="text"
                  className="form_tag"
                  value="최재민"
                  disabled
                />
                <label className="f_label">작성자</label>
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid50"></div>
            <div className="form_cell f_wid50">
              <p className="c_pt15 right">
                <button className="btn_text btn_green c_mr5">가져오기</button>
                <button className="btn_text btn_green">이력</button>
              </p>
            </div>
          </div>
        </div>
        {/* 탭 상단 */}
        <ul className="tabs_wrap">
          <li className="active">작업정보</li>
          <li className="">작업조</li>
        </ul>
        {/* 탭 내용 */}
        <WorkOrderBasicTab />
        {/* <WorkOrderMemberSettingTab /> */}
      </div>
    );
  }
}

export default WorkOrderForm;
