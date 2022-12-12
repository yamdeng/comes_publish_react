import React, { Component } from 'react';

class PSafeCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>27 : 안전 점검 등록 현황 조회</h3>

        <div className="box_form">
          <div className="form_table">
            {/* 
      input,select,textarea 실패했을때 invalid
      label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
      f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
      wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
    */}
            <div className="form_cell">
              {/* 
        기본은 form_group
        앞에 돋보기 아이콘을 추가하려면 .form_search 와 icon icon_search 추가
        뒤에 클리어 아이콘을 추가하려면 .form_clear 와 icon icon_clear 추가
      */}
              <span className="form_group form_search form_clear wid70 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">조직</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <button className="btn_icon btn_dark_gray">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid30 c_mr5">
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

export default PSafeCheckList;
