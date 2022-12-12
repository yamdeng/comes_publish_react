import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import DatePicker from 'react-datepicker';

class PWorkForm5 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
      <input
        type="text"
        className="form_tag"
        onClick={onClick}
        ref={ref}
        value={value}
      />
    ));
    return (
      <div className="content_area">
        <h3>14 : 안전 서류 등록/수정 : 직문전환자 안전보건교육 증빙자료</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid70">
                    <select name="" id="b" className="form_tag_select ">
                      <option value=""> </option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                    <label className="f_label" for="b">
                      교육유형
                    </label>
                  </span>
                </div>
              </div>
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
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group wid40">
                    <DatePicker
                      locale="ko"
                      onChange={(date) => {}}
                      customInput={<ExampleCustomInput />}
                    />
                    <label className="f_label" for="b">
                      교육일자
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group wid40">
                    <DatePicker
                      locale="ko"
                      onChange={(date) => {}}
                      customInput={<ExampleCustomInput />}
                    />
                    <label className="f_label" for="b">
                      교육시간
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell">
                  <span className="form_group wid40">
                    <select name="" id="b" className="form_tag_select ">
                      <option value=""> </option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                    <label className="f_label" for="b">
                      진행상태
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid20 c_mr5">
                    <input type="text" className="form_tag" disabled="true" />
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

              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group wid50 c_mr5">
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
                  <button className="btn_text btn_dark_gray">첨부하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkForm5;
