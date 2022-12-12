import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';

class PWorkForm9 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>18 : 안전 서류 등록/수정 : 도급_작업장 순회점검일자 격일</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group  form_clear wid30 c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label">점검사항</label>
                    {/* input에 value 값이 있으면 style display로 제어 */}
                    <span
                      className="icon icon_clear"
                      style={{ display: 'block' }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>
                  <span className="form_group  form_clear wid30 c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label">개선방안</label>
                    {/* input에 value 값이 있으면 style display로 제어 */}
                    <span
                      className="icon icon_clear"
                      style={{ display: 'block' }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>
                  <button className="btn_icon btn_gray c_mr5">
                    <i class="fas fa-times-circle"></i>
                  </button>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell ">
                  <span className="form_group  form_clear wid30 c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label">점검사항</label>
                    {/* input에 value 값이 있으면 style display로 제어 */}
                    <span
                      className="icon icon_clear"
                      style={{ display: 'block' }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>
                  <span className="form_group  form_clear wid30 c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label">개선방안</label>
                    {/* input에 value 값이 있으면 style display로 제어 */}
                    <span
                      className="icon icon_clear"
                      style={{ display: 'block' }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>
                  <button className="btn_icon btn_gray c_mr5">
                    <i class="fas fa-times-circle"></i>
                  </button>
                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-plus"></i>
                  </button>
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

export default PWorkForm9;
