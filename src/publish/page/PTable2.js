import React, { Component } from 'react';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class PTable2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>테이블 case 2</h3>
        <div className="box_form">
          <div className="form_table">
            {/* 
          input,select,textarea 실패했을때 invalid
          label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
          f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
          wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
        */}
            <div className="form_cell f_wid1000">
              <span className="form_group wid30 c_mr5 ">
                <input type="text" className="form_tag" />
                <label className="f_label">공사아이디</label>
              </span>
              <span className="form_group wid40 c_mr5 ">
                <input type="text" className="form_tag" disabled />
              </span>
              <span className="form_group ">
                <button className="btn_icon btn_dark_gray ">
                  <i class="fas fa-search"></i>
                </button>
              </span>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group f_wid50 c_mr5">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  템플릿
                </label>
              </span>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group f_wid50 c_mr5">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  진행상태
                </label>
              </span>
            </div>
          </div>

          <p className="c_pt15 right">
            <button className="btn_text btn_green">조회</button>
          </p>
        </div>
        <div className="list_form c_mt10">
          <p className="relative c_mb10">
            <span className="form_group c_mr5" style={{ width: '100px' }}>
              <select name="" id="b" className="form_tag_select ">
                <option value="">목록 10개</option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
            </span>
            <span className="fs_12">총 nnn 건</span>
          </p>
          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              <table className="tb_list" style={{ minWidth: '1000px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        ></label>
                      </div>
                    </th>
                    <th>템플릿</th>
                    <th>작성주기</th>
                    <th>작성 요청 기간</th>
                    <th>작성상태</th>
                    <th>작성자</th>
                    <th>상세</th>
                    <th>편집</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        ></label>
                      </div>
                    </td>
                    <td className="left">안전보건관리책임자 선임 서류</td>
                    <td>년</td>
                    <td>2021-01-01 ~ 2021-12-31</td>
                    <td>작성완료</td>
                    <td>전남광역본부>순천지점 홍길동 차장</td>
                    <td>
                      <Link>
                        <i class="fas fa-eye"></i>
                      </Link>
                    </td>
                    <td>
                      <Link>
                        <i class="fas fa-edit"></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form_btns">
            <button className="btn_text btn_blue c_mr5">엑셀다운</button>
            <button className="btn_text btn_blue">유예처리</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PTable2;
