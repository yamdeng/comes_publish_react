import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import DatePicker from 'react-datepicker';

class PWorkForm6 extends Component {
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
        <h3>15 : 안전 서류 등록/수정 : 도급/합동 안전</h3>
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
                      조사 사유
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
                      점검일
                    </label>
                    <span className="icon icon_calendar">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                  </span>
                </div>
              </div>
              <div className="group_box_wrap mobile_block">
                <span className="txt">도급인(KT) </span>
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        사번
                      </label>
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        이름
                      </label>
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        소속
                      </label>
                    </span>
                    <button className="btn_icon btn_dark_gray c_mr5">
                      <i class="fas fa-search"></i>
                    </button>
                    <button className="btn_icon btn_gray">
                      <i class="fas fa-times-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group wid100">
                    <input type="text" className="form_tag" />
                    <label className="f_label" for="b">
                      교육장소
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group wid100">
                    <input type="text" className="form_tag" />
                    <label className="f_label" for="b">
                      비고
                    </label>
                  </span>
                </div>
              </div>
              <div className="group_box_wrap mobile_block">
                <span className="txt">확인자 </span>
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        사번
                      </label>
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        이름
                      </label>
                    </span>
                    <span className="form_group wid20 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        소속
                      </label>
                    </span>
                    <button className="btn_icon btn_dark_gray c_mr5">
                      <i class="fas fa-question"></i>
                    </button>
                    <button className="btn_icon btn_dark_gray c_mr5">
                      <i class="fas fa-search"></i>
                    </button>
                    <button className="btn_icon btn_gray c_mr5">
                      <i class="fas fa-times-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="detail_list">
                <li className="lists">
                  <span className="label">상태</span>
                  <div className="cont">미완료</div>
                </li>
                <li className="lists">
                  <span className="label">최종 처리일시</span>
                  <div className="cont">2021년 10월 1일</div>
                </li>
              </ul>
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

export default PWorkForm6;
