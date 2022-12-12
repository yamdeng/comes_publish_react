import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';
import AppDatePicker from 'component/ui/AppDatePicker';
import CodeSelect from 'component/ui/CodeSelect';

class PDocContentWorkInspection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>근골격계 조사표 기본</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="write_form">
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid100 c_mr5">
                      <CodeSelect
                        value={''}
                        label="조사 사유"
                        codeType="boardType"
                        onChange={() => {}}
                        required={true}
                      />
                    </span>
                  </div>
                </div>
                <div className="form_table">
                  <div className="form_cell f_wid50 c_pr0">
                    <span className="form_group wid100">
                      <AppDatePicker
                        id="startDate"
                        label="조사 일시"
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

                <div className="form_table">
                  <div className="form_cell form_cell_flex">
                    <span className="form_group form_glow c_mr5">
                      <input
                        type="text"
                        className="form_tag"
                        placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                      />
                      <label className="f_label" for="b">
                        조사자 사번
                      </label>
                    </span>
                    <span className="form_group form_glow c_mr5">
                      <input
                        type="text"
                        className="form_tag"
                        disabled="true"
                        placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                      />
                      <label className="f_label" for="b">
                        조사자 이름
                      </label>
                    </span>
                    <span className="form_group form_glow">
                      <input
                        type="text"
                        className="form_tag"
                        disabled="true"
                        placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                      />
                      <label className="f_label" for="b">
                        조사자 소속
                      </label>
                    </span>
                  </div>
                  <div className="form_cell shrink right">
                    <span className="form_group">
                      <button className="btn_icon btn_dark_gray">
                        <i class="fas fa-search"></i>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="form_table">
                  <div className="form_cell f_wid100 c_pr0">
                    <span className="form_group wid100">
                      <input type="text" className="form_tag" />
                      <label className="f_label" for="b">
                        작업 공정명
                      </label>
                    </span>
                  </div>
                </div>
                <div className="form_table">
                  <div className="form_cell f_wid100 c_pr0">
                    <span className="form_group wid100">
                      <input type="text" className="form_tag" />
                      <label className="f_label" for="b">
                        작업 명
                      </label>
                    </span>
                  </div>
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

export default PDocContentWorkInspection;
