import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';

class PDocContentWPlanCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>중량물 점검결과</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="group_box_wrap">
                <p className="txt">중량물의 상태</p>
                <div className="form_table">
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group form_glow">
                      운반물의 중량은 장비의 정격하중 이내인가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
                    <div className="form_group">
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
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group ">
                      붕괴, 낙하 위험이 있는 운반물은 견고하게 묶었는가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
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
                <p className="txt">중량물 취급방법</p>
                <div className="form_table">
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group form_glow">
                      운반물 취급방법, 순서 등을 작업자가 숙지하고 있는가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
                    <div className="form_group">
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
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group ">
                      운반물 형상 및 중량에 적합한 운반지그 또는 보조 로프를
                      사용하고 그 상태는 적정한가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
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
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group ">
                      작업자가 운반물을 들어 올릴 때 편하중이 생기지 않는 위치
                      및 줄걸이 방법을 알고 있는가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
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
                <p className="txt">운반 경로 상태</p>
                <div className="form_table">
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group form_glow">
                      운반이 용이하도록 통로는 안전하게 확보 되었는가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
                    <div className="form_group">
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
                <p className="txt">장비작동 상태점검</p>
                <div className="form_table">
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group form_glow">
                      작업시작 전 장비를 점검한 결과, 문제점이 없는가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
                    <div className="form_group">
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
                  <div className="form_cell form_cell_flex align_center">
                    <span className="form_group ">
                      월1회 정기점검을 실시하고, 문제점 발견시 개선하였는가 ?
                    </span>
                  </div>
                  <div className="form_cell shrink">
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
            </div>
            <PWorkFormBottom />
          </div>
        </div>
      </div>
    );
  }
}

export default PDocContentWPlanCheck;
