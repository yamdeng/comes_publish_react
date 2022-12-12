import React, { Component } from 'react';

class PWorkOrderResgistStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>작업지시 등록 현황</h3>

        <div className="box_form">
          <div className="form_table f_wid50">
            <div className="form_cell form_cell_flex">
              <span className="form_group form_search form_clear form_glow c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">조직</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <button className="btn_icon btn_dark_gray">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="form_table f_wid50">
            <div className="form_cell form_cell_flex">
              <span className="form_group form_glow c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">년도</label>
              </span>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  미등록 조직만
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="tb_wrap_scroll c_mt15">
          <div className="horizon_tb">
            <table className="tb_list">
              <caption></caption>
              <thead>
                <tr>
                  <th>조직</th>
                  <th>점검건수</th>
                  <th>양호</th>
                  <th>미흡</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>전남광역본부>순천지사</td>
                  <td>10</td>
                  <td>9</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkOrderResgistStats;
