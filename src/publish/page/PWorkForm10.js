import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';

class PWorkForm10 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>19 : 안전 서류 등록/수정 : 중량물 점검결과</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="group_box_wrap">
                <p className="txt">중량물의 상태</p>
                <div className="form_table">
                  <div className="form_cell ">
                    <span className="form_group ">
                      운반물의 중량은 장비의 정격하중 이내인가 ?
                    </span>
                  </div>
                  <div className="form_cell f_wid10 right">
                    <div className="form_group ">
                      <div className="center">
                        <input
                          type="checkbox"
                          id="switchs"
                          name="switch"
                          className="switch_on_off"
                        />
                        <label for="switchs" className="switch_label_on_off">
                          <span className="marble"></span>
                          <span className="off">불량</span>
                          <span class="on">양호</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form_table">
                  <div className="form_cell ">
                    <span className="form_group ">
                      붕괴, 낙하 위험이 있는 운반물은 견고하게 묶었는가 ?
                    </span>
                  </div>
                  <div className="form_cell f_wid10 right">
                    <div className="form_group ">
                      <div className="center">
                        <input
                          type="checkbox"
                          id="switchs"
                          name="switch"
                          className="switch_on_off"
                        />
                        <label for="switchs" className="switch_label_on_off">
                          <span className="marble"></span>
                          <span className="off">불량</span>
                          <span class="on">양호</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group_box_wrap">
                <p className="txt">중량물의 상태</p>
                <div className="form_table">
                  <div className="form_cell ">
                    <span className="form_group ">
                      운반물의 중량은 장비의 정격하중 이내인가 ?
                    </span>
                  </div>
                  <div className="form_cell f_wid30 right">
                    <div className="form_group ">
                      <div className="checkbox-wrapper c_mr10 c_mt7">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        >
                          양호
                        </label>
                      </div>
                      <div className="checkbox-wrapper c_mt7">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        >
                          불량
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form_table">
                  <div className="form_cell ">
                    <span className="form_group ">
                      붕괴, 낙하 위험이 있는 운반물은 견고하게 묶었는가 ?
                    </span>
                  </div>
                  <div className="form_cell f_wid30 right">
                    <div className="form_group ">
                      <div className="checkbox-wrapper c_mr10 c_mt7">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        >
                          양호
                        </label>
                      </div>
                      <div className="checkbox-wrapper c_mt7">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        >
                          불량
                        </label>
                      </div>
                    </div>
                  </div>
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

export default PWorkForm10;
