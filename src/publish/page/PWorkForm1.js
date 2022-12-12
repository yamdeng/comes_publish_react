import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';

class PWorkForm1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>10 : 안전 서류 등록/수정 : 파일 업로드</h3>

        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="form_table">
                <div className="form_cell f_wid100">
                  <span className="form_group  form_clear wid60 c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label">템플릿 양식</label>
                    {/* input에 value 값이 있으면 style display로 제어 */}
                    <span
                      className="icon icon_clear"
                      style={{ display: 'block' }}
                    >
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </span>

                  <button className="btn_icon btn_dark_gray c_mr5">
                    <i class="fas fa-question"></i>
                  </button>
                  <button className="btn_icon btn_green c_mr5">
                    <i class="fas fa-download"></i>
                  </button>
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
                      첨부
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
                    <i class="fas fa-question"></i>
                  </button>
                  <button className="btn_text btn_dark_gray c_mr5">
                    첨부하기
                  </button>
                  <button className="btn_icon btn_gray c_mr5">
                    <i class="fas fa-times-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkForm1;
