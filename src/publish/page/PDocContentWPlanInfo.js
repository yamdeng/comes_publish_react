import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';
import CodeSelect from 'component/ui/CodeSelect';

class PDocContentWPlanInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>중량물 작업정보</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_glow c_mr5">
                    <input
                      type="text"
                      className="form_tag"
                      placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                    />
                    <label className="f_label" for="b">
                      작업자 사번
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
                      작업자 이름
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
                      소속 조직
                    </label>
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
                      작업지휘자 사번
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
                      작업지휘자 이름
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
                      소속 조직
                    </label>
                  </span>
                </div>
              </div>
              <hr className="line" />
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      품명
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      중량
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      형상
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      운반장비명
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      정격하중(톤)
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      운반 경로
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      거리
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
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
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      지형 경사
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      지반
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      바닥단차
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      줄걸이 재료
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      줄걸이 방법
                    </label>
                  </span>
                </div>
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      줄걸이 위치
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid50">
                  <span className="form_group wid100 c_mr5">
                    <input type="text" className="form_tag" placeholder="" />
                    <label className="f_label" for="b">
                      체결도구
                    </label>
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

export default PDocContentWPlanInfo;
