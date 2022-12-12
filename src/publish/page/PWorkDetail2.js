import React, { Component } from 'react';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class PWorkDetail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>9 : 공사 상세 보기(협의체 탭)</h3>
        <div className="box_form">
          <div className="form_table">
            {/* 
          input,select,textarea 실패했을때 invalid
          label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
          f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
          wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
        */}
            <div className="form_cell f_wid100">
              <span className="form_group wid30 c_mr5">
                <input type="text" className="form_tag " />
                <label className="f_label">공사번호</label>
              </span>

              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
              <button className="btn_text btn_dark_gray">조회</button>
            </div>
          </div>
        </div>
        <div className="detail_form">
          <ul className="detail_list">
            <li className="lists">
              <span className="label">공사 유형</span>
              <div className="cont">111111111</div>
            </li>
            <li className="lists">
              <span className="label">공사 명</span>
              <div className="cont">111111111</div>
            </li>
            <li className="lists">
              <span className="label">공사 기간 </span>
              <div className="cont">111111111</div>
            </li>
            <li className="lists">
              <span className="label">주관 조직 </span>
              <div className="cont">111111111</div>
            </li>
            <li className="lists">
              <span className="label">공사금액 </span>
              <div className="cont">111111111</div>
            </li>
            <li className="lists">
              <span className="label">연계 번호 </span>
              <div className="cont">111111111</div>
            </li>
          </ul>
        </div>
        <ul className="tabs_wrap">
          <li className="three active">안전 선임자</li>
          <li className="three ">안전 위원회</li>
          <li className="three ">협의체</li>
        </ul>
        <div className="tabs_cont">
          <div className="flex_grow_two">
            <div className="f_wid50">
              <div className="list_form mmb c_mt10">
                <table className="tb_list">
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>협의체아이디</th>
                      <th>협의체 명</th>
                      <th>등록일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>관리책임자</td>
                      <td>11111111</td>
                      <td>YYYY-MM-DD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="f_wid50">
              <div className="list_form c_mt10">
                <table className="tb_list">
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>협력업체 명</th>
                      <th>대표자 명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11111111</td>
                      <td>홍길동</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkDetail2;
