import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';
import CodeSelect from 'component/ui/CodeSelect';
import AppDatePicker from 'component/ui/AppDatePicker';
import AppTimePicker from 'component/ui/AppTimePicker';
import SearchInput from 'component/ui/SearchInput';

class PDocContentEducationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>교육실시내용</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group f_wid50 c_mr5">
                    <CodeSelect
                      value={''}
                      label="교육유형"
                      codeType="boardType"
                      onChange={() => {}}
                      required={true}
                    />
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="group_box_wrap">
                <span className="txt">교육대상자 수 </span>
                <div className="form_table">
                  <div className="form_table">
                    <div className="form_cell f_wid50">
                      <span className="form_group wid20 c_mr5">
                        <input type="text" className="form_tag" />
                        <label className="f_label" for="b">
                          남
                        </label>
                      </span>
                      <span className="form_group wid20 c_mr5">
                        <input type="text" className="form_tag" />
                        <label className="f_label" for="b">
                          여
                        </label>
                      </span>
                      <span className="form_group wid20">
                        <input
                          type="text"
                          className="form_tag"
                          disabled="true"
                        />
                        <label className="f_label" for="b">
                          계
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group_box_wrap">
                <span className="txt">교육실시자 수 </span>
                <div className="form_table">
                  <div className="form_table">
                    <div className="form_cell f_wid50">
                      <span className="form_group wid20 c_mr5">
                        <input type="text" className="form_tag" />
                        <label className="f_label" for="b">
                          남
                        </label>
                      </span>
                      <span className="form_group wid20 c_mr5">
                        <input type="text" className="form_tag" />
                        <label className="f_label" for="b">
                          여
                        </label>
                      </span>
                      <span className="form_group wid20">
                        <input
                          type="text"
                          className="form_tag"
                          disabled="true"
                        />
                        <label className="f_label" for="b">
                          계
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group wid100 c_mr5">
                    <textarea
                      name=""
                      id=""
                      className="form_tag textarea"
                    ></textarea>
                    <label className="f_label" for="b">
                      교육내용
                    </label>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell f_wid40">
                  <span className="form_group wid100">
                    <AppDatePicker
                      id="startDate"
                      label="교육일자"
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
                <div className="form_cell f_wid40">
                  <span className="form_group wid100">
                    <AppTimePicker
                      id="startTime"
                      label="교육시간"
                      value="14:59"
                      valueFormat="HH:mm"
                      changeTime={(date) => {}}
                      required={true}
                    />
                    <span className="icon icon_calendar">
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid20 c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label" for="b">
                      교육실시자 사번
                    </label>
                  </span>
                  <span className="form_group wid20 c_mr5">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      교육실시자 이름
                    </label>
                  </span>
                  <span className="form_group wid30 c_mr5">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      교육실시자 소속
                    </label>
                  </span>
                  <span className="form_group">
                    <button className="btn_icon btn_dark_gray">
                      <i class="fas fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group wid100">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      교육장소
                    </label>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group wid100">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      비고
                    </label>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group wid60 c_mr5">
                    <input
                      type="text"
                      className="form_tag center"
                      disabled
                      placeholder="xxxxx.pdf - 10kb"
                    />
                    <label className="f_label" for="b">
                      교육실시사진
                    </label>
                    {/* input에 value 값이 있으면 style display로 제어 */}
                    <span
                      className="icon icon_clear"
                      style={{ display: 'block' }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>
                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-folder-open"></i>
                  </button>
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-times-circle"></i>
                  </button>
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

export default PDocContentEducationInfo;
