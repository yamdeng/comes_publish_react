import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import Pagination from 'component/ui/Pagination';
import SearchInput from 'component/ui/SearchInput';
import CodeSelect from 'component/ui/CodeSelect';
import PageSizeSelect from 'component/ui/PageSizeSelect';

/*

    이름 : 검색 필드

*/

@HOC.documentTitle('폼 테스트1')
@withRouter
@inject('boardListStore', 'alertModalStore')
@observer
class SearchField1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>검색 필드 case 1</h3>
        {/* case 1 : 버튼 정렬 및 기본 case*/}
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
                <SearchInput
                  value={''}
                  label="검색어"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
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
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="공개"
                  codeType="publicType"
                  onChange={() => {}}
                />
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid50">
              <p className="c_pt15 right">
                <button className="btn_text btn_green mobile_full">
                  조회1
                </button>
              </p>
            </div>
          </div>
          {/* 좌측에 버튼 붙이기 */}
          <div className="form_table">
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid50 left">
              <button className="btn_text btn_green">조회(왼쪽)</button>
            </div>
          </div>
          {/* [조회] 버튼이 하나의 행을 혼자 모두 차지하고 오른쪽 정렬해야 하는 경우 1 */}
          <div className="form_table">
            <div className="form_cell f_wid100 right">
              <button className="btn_text btn_green">조회2</button>
            </div>
          </div>
          {/* [조회] 버튼이 하나의 행을 혼자 모두 차지하고 오른쪽 정렬해야 하는 경우 2 */}
          <p className="c_pt15 right">
            <button className="btn_text btn_green">조회3</button>
          </p>
        </div>

        {/* case 2 */}
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
                <SearchInput
                  value={''}
                  label="검색어"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
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
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="공개"
                  codeType="publicType"
                  onChange={() => {}}
                />
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid25">
              <span className="form_group wid100">
                <CodeSelect
                  value={''}
                  label="게시유형"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid100 right">
              <button className="btn_text btn_green">조회</button>
            </div>
          </div>
        </div>
        {/* 3 행 */}
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid40">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <SearchInput
                  value={''}
                  label="작업ID"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <span className="form_group form_search wid60">
                <SearchInput
                  value={''}
                  label="작업명"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <SearchInput
                  value={''}
                  label="등록자 사번"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">등록자</label>
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
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  placeholder="조직을 선택해주세요"
                />
                <label className="f_label" for="b">
                  작업 조직
                </label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <SearchInput
                  value={''}
                  label="승인자 사번"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">승인자</label>
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
                <CodeSelect
                  value={''}
                  label="상태"
                  codeType="boardType"
                  onChange={() => {}}
                />
              </span>
            </div>
            <div className="form_cell f_wid60">
              <span className="form_group form_search form_clear wid25 c_mr5">
                <SearchInput
                  value={''}
                  label="작업자 사번"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <span className="form_group wid40 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">작업자</label>
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
      </div>
    );
  }
}

export default SearchField1;
