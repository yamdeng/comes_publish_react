import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';
import AppDatePicker from 'component/ui/AppDatePicker';
import SearchInput from 'component/ui/SearchInput';
import CodeSelect from 'component/ui/CodeSelect';

class PDocContentWorkCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>근골격계 조사표 상황</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell shrink" style={{ width: '150px' }}>
                  <span className="form_group">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="Claude Monet"
                        id="question-1-option-1"
                      />
                      <label
                        className="checkbox-label"
                        for="question-1-option-1"
                      >
                        작업 설비 변화
                      </label>
                    </div>
                  </span>
                </div>
                <div className="form_cell wid100">
                  <span className="form_group wid50">
                    <AppDatePicker
                      id="startDate"
                      label="발생일"
                      value={null}
                      valueFormat="YYYY-MM-DD"
                      onChange={(date) => {}}
                      required={true}
                    />
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell shrink" style={{ width: '150px' }}>
                  <span className="form_group">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="Claude Monet"
                        id="question-1-option-1"
                      />
                      <label
                        className="checkbox-label"
                        for="question-1-option-1"
                      >
                        작업 량 변화
                      </label>
                    </div>
                  </span>
                </div>
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_glow c_mr5">
                    <CodeSelect
                      value={''}
                      label="유형"
                      codeType="boardType"
                      onChange={() => {}}
                      required={true}
                    />
                  </span>
                  <span className="form_group form_glow">
                    <AppDatePicker
                      id="startDate"
                      label="발생일"
                      value={null}
                      valueFormat="YYYY-MM-DD"
                      onChange={(date) => {}}
                      required={true}
                    />
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell shrink" style={{ width: '150px' }}>
                  <span className="form_group">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="Claude Monet"
                        id="question-1-option-1"
                      />
                      <label
                        className="checkbox-label"
                        for="question-1-option-1"
                      >
                        작업 속도 변화
                      </label>
                    </div>
                  </span>
                </div>
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_glow c_mr5">
                    <CodeSelect
                      value={''}
                      label="유형"
                      codeType="boardType"
                      onChange={() => {}}
                      required={true}
                    />
                  </span>
                  <span className="form_group form_glow">
                    <AppDatePicker
                      id="startDate"
                      label="발생일"
                      value={null}
                      valueFormat="YYYY-MM-DD"
                      onChange={(date) => {}}
                      required={true}
                    />
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell shrink" style={{ width: '150px' }}>
                  <span className="form_group">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="Claude Monet"
                        id="question-1-option-1"
                      />
                      <label
                        className="checkbox-label"
                        for="question-1-option-1"
                      >
                        업무 변화
                      </label>
                    </div>
                  </span>
                </div>
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_glow c_mr5">
                    <CodeSelect
                      value={''}
                      label="유형"
                      codeType="boardType"
                      onChange={() => {}}
                      required={true}
                    />
                  </span>
                  <span className="form_group form_glow">
                    <AppDatePicker
                      id="startDate"
                      label="발생일"
                      value={null}
                      valueFormat="YYYY-MM-DD"
                      onChange={(date) => {}}
                      required={true}
                    />
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <PWorkFormBottom />
          </div>
        </div>
      </div>
    );
  }
}

export default PDocContentWorkCondition;
