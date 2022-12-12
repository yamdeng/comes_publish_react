import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import DatePicker from 'react-datepicker';
import AppDatePicker from 'component/ui/AppDatePicker';

/*

    이름 : 안전서류 폼

    route
     -/safe-docs/new
     -/safe-docs/:id
     -/safe-docs/:id/update

    store
     -boardListStore

*/

@HOC.documentTitle('안전서류 폼')
@withRouter
@inject('boardListStore')
@observer
class SafeDocForm extends Component {
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
        <h3>12 : 안전 서류 등록/수정 : 안전관리자 등록</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="group_box_wrap">
                <span className="txt">사내/외</span>
                <div className="form_table">
                  <div className="radio-wrapper c_mr30">
                    <input
                      type="radio"
                      name="question-2"
                      value="43200000"
                      id="question-2-option-1"
                    />
                    <label className="radio-label" for="question-2-option-1">
                      사내
                    </label>
                  </div>
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      name="question-2"
                      value="43200000"
                      id="question-2-option-1"
                    />
                    <label className="radio-label" for="question-2-option-1">
                      사외
                    </label>
                  </div>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid70 c_mr5">
                    <input type="text" className="form_tag" disabled />
                    <label className="f_label" for="b">
                      공사번호
                    </label>
                  </span>
                  <span className="form_group c_mr5">
                    <button className="btn_icon btn_dark_gray">
                      <i class="fas fa-search"></i>
                    </button>
                  </span>
                  <span className="form_group">
                    <button className="btn_text btn_green">등록</button>
                  </span>
                </div>
              </div>
              <div className="group_box_wrap mobile_block">
                <span className="txt">안전 관리자 </span>
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input type="text" className="form_tag" disabled="true" />
                      <label className="f_label" for="b">
                        사번
                      </label>
                    </span>
                    <span className="form_group wid20 c_mr5">
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
                    <span className="form_group c_mr5">
                      <button className="btn_icon btn_dark_gray">
                        <i class="fas fa-search"></i>
                      </button>
                    </span>
                    <span className="form_group">
                      <button className="btn_text btn_green">등록</button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group wid40">
                    <AppDatePicker id="startDate" label="공개시작기간" />
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

export default SafeDocForm;
