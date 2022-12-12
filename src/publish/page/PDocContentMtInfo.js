import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';

class PDocContentMtInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>회의내용</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              {/* 점검사항 목록 1행 */}
              <div className="form_table">
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_clear form_glow ">
                    <input type="text" className="form_tag invalid" />
                    <label className="f_label">안건</label>
                    <span class="invalid_txt">필수정보입니다.</span>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell form_cell_flex ">
                  <span className="form_group form_glow">
                    <textarea
                      name=""
                      id=""
                      className="form_tag textarea invalid"
                    ></textarea>
                    <label className="f_label" for="b">
                      내용
                    </label>
                    <span class="invalid_txt textarea">필수정보입니다.</span>
                  </span>
                </div>
              </div>
              <div className="right c_mt5">
                <button className="btn_icon btn_dark_gray c_ml5 ">
                  <i class="fas fa-times-circle"></i>
                </button>
                <button className="btn_icon btn_dark_gray c_ml5 ">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              {/* 점검사항 2행 */}
              <>
                <hr className="add_group_line" />
                <div className="form_table">
                  <div className="form_cell form_cell_flex">
                    <span className="form_group form_clear form_glow ">
                      <input type="text" className="form_tag" />
                      <label className="f_label">안건</label>
                      <span class="invalid_txt textarea">필수정보입니다.</span>
                    </span>
                  </div>
                </div>
                <div className="form_table">
                  <div className="form_cell form_cell_flex ">
                    <span className="form_group form_glow">
                      <textarea
                        name=""
                        id=""
                        className="form_tag textarea invalid"
                      ></textarea>
                      <label className="f_label" for="b">
                        내용
                      </label>
                      <span class="invalid_txt textarea">필수정보입니다.</span>
                    </span>
                  </div>
                </div>
                <div className="right c_mt5">
                  <button className="btn_icon btn_dark_gray c_ml5 ">
                    <i class="fas fa-times-circle"></i>
                  </button>
                  <button className="btn_icon btn_dark_gray c_ml5 ">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </>
              <hr className="add_group_line" />
              <p className="c_pt15 right">
                <button className="btn_text btn_green">저장</button>
              </p>
            </div>
            <PWorkFormBottom />
          </div>
        </div>
      </div>
    );
  }
}

export default PDocContentMtInfo;
