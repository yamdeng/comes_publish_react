import React, { Component } from 'react';

class TableTest2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectClick: false
    };
    this.customClick = this.customClick.bind(this);
  }
  customClick() {
    this.setState({
      isSelectClick: !this.state.isSelectClick
    });
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
            <div className="form_cell f_wid50">
              <span className="form_group form_search form_clear wid70 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">
                  검색어 <span className="required">*</span>
                </label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  내용포함
                </label>
              </div>
            </div>
            <div className="form_cell f_wid30">
              <span className="form_group wid100">
                <select name="" id="b" className="form_tag_select">
                  <option value="0">00</option>
                  <option value="1">전체1</option>
                  <option value="2">전체2</option>
                </select>
                <label className="f_label" for="b">
                  게시유형 <span className="required">*</span>
                </label>
              </span>
            </div>
            <div className="form_cell f_wid20">
              <span className="form_group wid100">
                <select name="" id="b" className="form_tag_select invalid">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  공개 <span className="required">*</span>
                </label>
                <span className="invalid_txt">유효하지 않습니다.</span>
              </span>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group wid40 c_mr5">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  서류분류
                </label>
              </span>
              {/*  
              custom select
              .form_tag에 .active 추가, 실패했을때 active + invalid, 값이 있을때 active + isValue
              label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
              f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
              wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
            */}
              <div className="form_group wid40">
                <div
                  className={
                    this.state.isSelectClick ? 'form_tag active' : 'form_tag'
                  }
                  onClick={this.customClick}
                >
                  전체
                  <span className="arr">
                    <i class="fas fa-caret-up"></i>
                  </span>
                  <ul className="option_item">
                    <li>전체1</li>
                    <li>전체2</li>
                  </ul>
                </div>
                <label className="f_label" for="b">
                  custom select
                </label>
              </div>
              {/* <span className="form_group wid40">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  서류유형
                </label>
              </span> */}
            </div>
            <div className="form_cell f_wid50">
              <span className="form_group wid70">
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

          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group wid70 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                />
                <label className="f_label" for="b">
                  공사번호
                </label>
              </span>
              <button className="btn_icon btn_dark_gray">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="group_box_wrap mobile_block">
            <span className="txt">확인자 </span>
            <div className="form_table">
              <div className="form_cell f_wid50">
                <span className="form_group wid20 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    사번
                  </label>
                </span>
                <span className="form_group wid20 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    이름
                  </label>
                </span>
                <span className="form_group wid30 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    소속
                  </label>
                </span>
                <span className="form_group c_mr5">
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="Claude Monet"
                  id="question-1-option-1"
                />
                <label className="checkbox-label" for="question-1-option-1">
                  체크박스
                </label>
              </div>
              <div className="radio-wrapper">
                <input
                  type="radio"
                  name="question-2"
                  value="43200000"
                  id="question-2-option-1"
                />
                <label className="radio-label" for="question-2-option-1">
                  라디오
                </label>
              </div>
            </div>
          </div>

          <p className="c_pt15 right">
            <button className="btn_text btn_green mobile_full">조회</button>
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
                    <th>등록일시</th>
                    <th>등록자</th>
                    <th>제목</th>
                    <th>유형</th>
                    <th>공개기간</th>
                    <th>파일</th>
                    <th>댓글수</th>
                    <th>조회수</th>
                    <th>상세</th>
                    <th>편집</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        className="form_tag center edit"
                        disabled
                        value="Yyyy-MM-DD HH:MI"
                        onChange={this.onChangeInput}
                        onBlur={this.onChangeInput}
                      />
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
                      <select
                        name=""
                        id="b"
                        disabled
                        className="form_tag_select center edit"
                      >
                        <option value="">첨부</option>
                        <option value="">전체</option>
                        <option value="">전체2</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name=""
                        id="b"
                        disabled
                        className="form_tag_select center edit"
                      >
                        <option value="">5</option>
                        <option value="">전체</option>
                        <option value="">전체2</option>
                      </select>
                    </td>
                    <td>1</td>
                    <td>
                      <span className="ico_view">보기</span>
                    </td>
                    <td>
                      <i class="fas fa-edit"></i>
                    </td>
                    <td>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>Yyyy-MM-DD HH:MI</td>
                    <td>{'ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동'}</td>
                    <td>ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ</td>
                    <td>공지</td>
                    <td>Yyyy-mm-dd~yyyy-mm-dd</td>
                    <td>첨부</td>
                    <td>5</td>
                    <td>1</td>
                    <td>
                      <span className="ico_view">보기</span>
                    </td>
                    <td>
                      <i class="fas fa-edit"></i>
                    </td>
                    <td>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>Yyyy-MM-DD HH:MI</td>
                    <td>{'ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동'}</td>
                    <td>ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ</td>
                    <td>공지</td>
                    <td>Yyyy-mm-dd~yyyy-mm-dd</td>
                    <td>첨부</td>
                    <td>5</td>
                    <td>1</td>
                    <td>
                      <span className="ico_view">보기</span>
                    </td>
                    <td>
                      <i class="fas fa-edit"></i>
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
            <button className="btn_text btn_blue c_mr5">미사용 처리</button>
            <button className="btn_text btn_blue c_mr5">사용 처리</button>
            <button className="btn_text btn_green">등록</button>
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

export default TableTest2;
