import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import DatePicker from 'react-datepicker';

class PWorkForm8 extends Component {
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
        <h3>17 : 안전 서류 등록/수정 : 작업장 상황조사</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell f_wid25">
                  <div className="checkbox-wrapper c_mt0">
                    <input
                      type="checkbox"
                      name="Claude Monet"
                      id="question-1-option-1"
                    />
                    <label className="checkbox-label" for="question-1-option-1">
                      작업 설비 변화
                    </label>
                  </div>
                </div>
                <div className="form_cell ">
                  <span className="form_group wid40">
                    <DatePicker
                      locale="ko"
                      onChange={(date) => {}}
                      customInput={<ExampleCustomInput />}
                    />
                    <label className="f_label" for="b">
                      발생일
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid25">
                  <div className="checkbox-wrapper c_mt0">
                    <input
                      type="checkbox"
                      name="Claude Monet"
                      id="question-1-option-1"
                    />
                    <label className="checkbox-label" for="question-1-option-1">
                      작업 량 변화
                    </label>
                  </div>
                </div>
                <div className="form_cell ">
                  <span className="form_group wid40 c_mr5">
                    <select name="" id="b" className="form_tag_select ">
                      <option value=""> </option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                    <label className="f_label" for="b">
                      유형
                    </label>
                  </span>
                  <span className="form_group wid40">
                    <DatePicker
                      locale="ko"
                      onChange={(date) => {}}
                      customInput={<ExampleCustomInput />}
                    />
                    <label className="f_label" for="b">
                      발생일
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid25">
                  <div className="checkbox-wrapper c_mt0">
                    <input
                      type="checkbox"
                      name="Claude Monet"
                      id="question-1-option-1"
                    />
                    <label className="checkbox-label" for="question-1-option-1">
                      작업 속도 변화
                    </label>
                  </div>
                </div>
                <div className="form_cell ">
                  <span className="form_group wid40 c_mr5">
                    <select name="" id="b" className="form_tag_select ">
                      <option value=""> </option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                    <label className="f_label" for="b">
                      유형
                    </label>
                  </span>
                  <span className="form_group wid40">
                    <DatePicker
                      locale="ko"
                      onChange={(date) => {}}
                      customInput={<ExampleCustomInput />}
                    />
                    <label className="f_label" for="b">
                      발생일
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid25">
                  <div className="checkbox-wrapper c_mt0">
                    <input
                      type="checkbox"
                      name="Claude Monet"
                      id="question-1-option-1"
                    />
                    <label className="checkbox-label" for="question-1-option-1">
                      업무 변화
                    </label>
                  </div>
                </div>
                <div className="form_cell ">
                  <span className="form_group wid40 c_mr5">
                    <select name="" id="b" className="form_tag_select ">
                      <option value=""> </option>
                      <option value="">전체1</option>
                      <option value="">전체2</option>
                    </select>
                    <label className="f_label" for="b">
                      유형
                    </label>
                  </span>
                  <span className="form_group wid40">
                    <DatePicker
                      locale="ko"
                      onChange={(date) => {}}
                      customInput={<ExampleCustomInput />}
                    />
                    <label className="f_label" for="b">
                      발생일
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <p className="c_pt15 right">
                <button className="btn_text btn_green">저장</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkForm8;
