import React, { Component } from 'react';

class PWorkDirectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>19 : 작업 지시 관리</h3>
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid40">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">작업ID</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <span className="form_group wid60">
                <input type="text" className="form_tag" />
                <label className="f_label">작업명</label>
              </span>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">등록 자 ID</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">등록 자 명</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
              <button className="btn_text btn_dark_gray">본인</button>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell f_wid40">
              <span className="form_group form_search form_clear wid60 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">작업 조직</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">승인 자 ID</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">승인 자 명</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
              <button className="btn_text btn_dark_gray">본인</button>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell f_wid40">
              <span className="form_group wid60">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  상태
                </label>
              </span>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">작업 자 ID</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">작업 자 명</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
              <button className="btn_text btn_dark_gray">본인</button>
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
              <table className="tb_list" style={{ minWidth: '1200px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>
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
                    <th>작업지시ID</th>
                    <th>등록일시</th>
                    <th>등록자</th>
                    <th>작업 명</th>
                    <th>작업 조직</th>
                    <th>작업일</th>
                    <th>상태</th>
                    <th>허가서</th>
                    <th>점검결과</th>
                    <th>편집</th>
                    <th>상세</th>
                    <th>삭제</th>
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
                    <td>
                      <input
                        type="text"
                        className="form_tag center edit"
                        disabled
                        value="ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동"
                        onChange={this.onChangeInput}
                        onBlur={this.onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form_tag center edit"
                        disabled
                        value="ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ"
                        onChange={this.onChangeInput}
                        onBlur={this.onChangeInput}
                      />
                    </td>
                    <td>
                      {/* 공지 */}
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label only_label"
                          for="question-1-option-1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      {/* 한성유통㈜ */}
                      <input
                        type="checkbox"
                        id="switchs"
                        name="switch"
                        className="switch_on_off"
                      />
                      <label for="switchs" className="switch_label_on_off">
                        <span className="marble"></span>
                        <span className="off">NO</span>
                        <span class="on">YES</span>
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form_tag center edit"
                        disabled
                        value="YYYY-MM-DD"
                        onChange={this.onChangeInput}
                        onBlur={this.onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form_tag center edit"
                        disabled
                        value="YYYY-MM-DD"
                        onChange={this.onChangeInput}
                        onBlur={this.onChangeInput}
                      />
                    </td>
                    <td>
                      <select
                        name=""
                        id="b"
                        disabled
                        className="form_tag_select center edit"
                      >
                        <option value="">작성중</option>
                        <option value="">승인요청</option>
                        <option value="">전체2</option>
                      </select>
                    </td>
                    <td>등록</td>
                    <td>양호</td>
                    <td>
                      <i class="fas fa-edit"></i>
                    </td>
                    <td>
                      <i class="fas fa-eye"></i>
                    </td>
                    <td>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="list_form_btns">
            <button className="btn_text btn_blue c_mr5">엑셀다운</button>
            <button className="btn_text btn_blue c_mr5">작업 등록</button>
            <button className="btn_text btn_blue c_mr5">승인 요청</button>
            <button className="btn_text btn_blue">취소 요청</button>
          </div>
        </div>
        <div className="paging_wrap">
          <span className="p_web">
            <i class="fas fa-angle-double-left"></i>
          </span>
          <span className="p_arr_l">
            <i class="fas fa-angle-left"></i>
          </span>
          {/* web paging */}
          <span className="p_web">1</span>
          <span className="p_web">2</span>
          <span className="p_web">3</span>
          <span className="p_web">4</span>
          {/* mobile pagind */}
          <span className="p_mobile">1</span>
          <span className="p_mobile">/</span>
          <span className="p_mobile">10</span>
          <span className="p_arr_r">
            <i class="fas fa-angle-right"></i>
          </span>
          <span className="p_web">
            <i class="fas fa-angle-double-right"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default PWorkDirectionList;
