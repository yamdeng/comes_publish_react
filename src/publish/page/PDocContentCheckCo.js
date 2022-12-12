import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';
import AppDatePicker from 'component/ui/AppDatePicker';

class PDocContentCheckCo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>합동점검_기본정보</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              {/* 점검일 */}
              <div className="form_table">
                <div className="form_cell f_wid30">
                  <span className="form_group wid100">
                    <AppDatePicker
                      label="점검일"
                      name="inspDate"
                      value=""
                      onChange={() => {}}
                      required={true}
                    />
                  </span>
                </div>
                <div className="form_cell f_wid70"></div>
              </div>
              {/* 도급인 */}
              <div className="group_box_wrap mobile_block">
                <span className="txt">도급인</span>
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
                        <i class="fas fa-times-circle"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid70 c_pr5">
                  <span className="form_group wid100 _icon">
                    <input
                      type="text"
                      className="form_tag"
                      placeholder="추가할 수급인을 검색해주세요"
                      disabled
                      value="개발팀 / 황승연"
                    />
                    <label className="f_label" for="a">
                      수급인
                    </label>
                    <button className="btn_icon btn_dark_gray">
                      <i className="fas fa-search"></i>
                    </button>
                  </span>
                </div>
                <div className="form_cell f_wid30">
                  <button className="btn_icon btn_dark_gray">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              {/* 수급인 */}
              <hr className="line" />
              <div className="group_box_wrap mobile_block">
                <span className="txt">수급인</span>
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
                        <i class="fas fa-times-circle"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid70 c_pr5">
                  <span className="form_group wid100 _icon">
                    <input
                      type="text"
                      className="form_tag"
                      placeholder="추가할 수급인을 검색해주세요"
                      disabled
                      value="개발팀 / 황승연"
                    />
                    <label className="f_label" for="a">
                      수급인
                    </label>
                    <button className="btn_icon btn_dark_gray">
                      <i className="fas fa-search"></i>
                    </button>
                  </span>
                </div>
                <div className="form_cell f_wid30">
                  <button className="btn_icon btn_dark_gray">
                    <i className="fas fa-plus"></i>
                  </button>{' '}
                  <button className="btn_text btn_green">사외사원 등록</button>
                </div>
              </div>
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

export default PDocContentCheckCo;
