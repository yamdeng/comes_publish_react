import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';

class PDocContentEducationAttendUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>교육참여자</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="tb_wrap_scroll c_mt15">
                <div className="horizon_tb">
                  <table className="tb_list" style={{ minWidth: '500px' }}>
                    <caption></caption>
                    <thead>
                      <tr>
                        <th>사번</th>
                        <th>성명</th>
                        <th>소속</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>담당</td>
                        <td>11111111</td>
                        <td>ㅇㅇ</td>
                        <td>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_glow  c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label" for="b">
                      사번
                    </label>
                  </span>
                  <span className="form_group form_glow  c_mr5">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      이름
                    </label>
                  </span>
                  <span className="form_group form_glow ">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      소속
                    </label>
                  </span>
                </div>
                <div className="form_cell shrink right">
                  <span className="form_group c_mr5">
                    <button className="btn_icon btn_dark_gray">
                      <i class="fas fa-search"></i>
                    </button>
                  </span>
                  <span className="form_group">
                    <button className="btn_icon btn_dark_gray">
                      <i class="fas fa-times-circle"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell form_cell_flex">
                  <span className="form_group form_glow  c_mr5">
                    <input type="text" className="form_tag" />
                    <label className="f_label" for="b">
                      사번
                    </label>
                  </span>
                  <span className="form_group form_glow  c_mr5">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      이름
                    </label>
                  </span>
                  <span className="form_group form_glow ">
                    <input type="text" className="form_tag" disabled="true" />
                    <label className="f_label" for="b">
                      소속
                    </label>
                  </span>
                </div>
                <div className="form_cell shrink right">
                  <span className="form_group c_mr5">
                    <button className="btn_icon btn_dark_gray">
                      <i class="fas fa-search"></i>
                    </button>
                  </span>

                  <span className="form_group">
                    <button className="btn_icon btn_dark_gray">
                      <i class="fas fa-plus"></i>
                    </button>
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

export default PDocContentEducationAttendUser;
