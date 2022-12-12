import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';

class PWorkForm4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>13 : 안전 서류 등록/수정 : 근로자측 위원 등록</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="group_box_wrap mobile_block">
                <span className="txt">대표 </span>
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="1231231"
                      />
                      <label className="f_label" for="b">
                        사번
                      </label>
                    </span>
                    <span className="form_group wid20 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="홍길동"
                      />
                      <label className="f_label" for="b">
                        이름
                      </label>
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="신규사업팀"
                      />
                      <label className="f_label" for="b">
                        소속
                      </label>
                    </span>
                    <span className="form_group">
                      <button className="btn_icon btn_dark_gray">
                        <i class="fas fa-search"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="group_box_wrap mobile_block">
                <span className="txt">위원 </span>
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="1231231"
                      />
                      <label className="f_label" for="b">
                        사번
                      </label>
                    </span>
                    <span className="form_group wid20 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="홍길동"
                      />
                      <label className="f_label" for="b">
                        이름
                      </label>
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="신규사업팀"
                      />
                      <label className="f_label" for="b">
                        소속
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
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="1231231"
                      />
                      <label className="f_label" for="b">
                        사번
                      </label>
                    </span>
                    <span className="form_group wid20 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="홍길동"
                      />
                      <label className="f_label" for="b">
                        이름
                      </label>
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input
                        type="text"
                        className="form_tag fix_data"
                        disabled="true"
                        value="신규사업팀"
                      />
                      <label className="f_label" for="b">
                        소속
                      </label>
                    </span>
                    <span className="form_group">
                      <button className="btn_icon btn_dark_gray">
                        <i class="fas fa-search"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="group_box_wrap mobile_block">
                <span className="txt">사번 검색</span>
                <div className="form_table">
                  <div className="form_cell f_wid50">
                    <span className="form_group wid20 c_mr5">
                      <input type="text" className="form_tag" />
                    </span>
                    <span className="form_group wid20 c_mr5">
                      <input type="text" className="form_tag" disabled />
                    </span>
                    <span className="form_group wid30 c_mr5">
                      <input type="text" className="form_tag" disabled />
                    </span>
                    <button className="btn_icon btn_dark_gray c_mr5">
                      <i class="fas fa-search"></i>
                    </button>
                    <button className="btn_icon btn_dark_gray c_mr5">
                      <i class="fas fa-plus"></i>
                    </button>
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

export default PWorkForm4;
