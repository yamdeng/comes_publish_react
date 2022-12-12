import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import AppDatePicker from 'component/ui/AppDatePicker';
import AppTimePicker from 'component/ui/AppTimePicker';
import CodeSelect from 'component/ui/CodeSelect';

/*

    이름 : 작업 지시 등록/수정(작업정보 탭)

    route
     -/work-orders/new
     -/work-orders/:id/update
     -/work-orders/:id : 상세화면도 폼화면을 사용시

    store
     -boardListStore

*/
@withRouter
@inject('boardListStore')
@observer
class WorkOrderBasicTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // test handler
    this.testHandle = this.testHandle.bind(this);
  }

  testHandle(info) {
    // const { boardListStore } = this.props;
  }

  render() {
    let { boardListStore } = this.props;
    let { info } = boardListStore;
    return (
      <div className="box_form tabs_cont">
        <div className="form_table">
          <div className="form_cell">
            <span className="form_group wid30 c_mr5">
              <input
                type="text"
                className="form_tag invalid"
                value={this.state.inputValue}
                onChange={this.onChangeInput}
                onBlur={this.onChangeInput}
              />
              <label className="f_label">
                국사 <span className="required">*</span>
              </label>
              <span class="invalid_txt">유효하지 않습니다.</span>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell c_pt20">
            <span className="form_group wid100">
              <input
                type="text"
                className="form_tag"
                value={this.state.inputValue}
                onChange={this.onChangeInput}
                onBlur={this.onChangeInput}
              />
              <label className="f_label">작업 내용</label>
              <span class="invalid_txt">유효하지 않습니다.</span>
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell c_pt20">
            <span className="form_group wid35 c_mr5">
              <AppDatePicker
                id="startDate"
                label="작업일시"
                value={null}
                valueFormat="YYYY-MM-DD"
                onChange={(date) => {}}
                required={true}
              />
            </span>
            <span className="form_group wid25 c_mr5">
              <AppTimePicker
                id="startDate"
                label="시작시간"
                value={null}
                valueFormat="YYYY-MM-DD"
                changeTime={(date) => {}}
                required={true}
              />
            </span>
            <span className="form_group center c_mr5">-</span>
            <span className="form_group wid25 ">
              <AppTimePicker
                id="startDate"
                label="종료시간"
                value={null}
                valueFormat="YYYY-MM-DD"
                changeTime={(date) => {}}
                required={true}
              />
            </span>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell c_pt20">
            <span className="form_group wid65 c_mr5">
              <input type="text" className="form_tag" disabled />
              <label className="f_label">위치</label>
            </span>
            <button className="btn_icon btn_dark_gray c_mr5">
              <i class="fas fa-map"></i>
            </button>
            <button className="btn_icon btn_gray" disabled>
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="form_table">
          <div className="form_cell c_pt20">
            <span className="form_group wid40">
              <CodeSelect
                value={''}
                label="작업 유형"
                codeType="boardType"
                onChange={() => {}}
                required={true}
              />
            </span>
          </div>
        </div>
        <div className="group_box_wrap invalid c_mt25">
          <p className="txt">작업계획서</p>
          <div className="form_table">
            <div className="form_cell f_wid100">
              <div className="checkbox-wrapper c_mr10 c_mt5">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  오거크레인 카고트럭
                </label>
              </div>
              <div className="checkbox-wrapper c_mr10 c_mt5">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  고소작업차
                </label>
              </div>
              <div className="checkbox-wrapper c_mt5">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  운반용 화물트럭
                </label>
              </div>
              {/* <span class="invalid_txt">유효하지 않습니다.</span> */}
            </div>
          </div>
          <span class="invalid_txt">유효하지 않습니다.</span>
        </div>
        <p className="c_pt15 right">
          <button className="btn_text btn_green">저장</button>
        </p>
      </div>
    );
  }
}

export default WorkOrderBasicTab;
