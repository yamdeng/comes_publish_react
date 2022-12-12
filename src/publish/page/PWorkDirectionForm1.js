import React, { Component } from 'react';

class PWorkDirectionForm1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>20 : 작업 지시 등록/수정 : 작업정보 탭</h3>
        <div className="box_form">
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group form_search form_clear wid30 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">작업지시ID</label>
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
            <div className="form_cell f_wid50">
              <span className="form_group form_search form_clear wid40 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">진행상태</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
              <button className="btn_text btn_dark_gray c_mr5">승인신청</button>
              <button className="btn_text btn_dark_gray">이력보기</button>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid40">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  작성일시
                </label>
              </span>
            </div>
          </div>

          <div className="form_table">
            <div className="form_cell">
              <span className="form_group form_search form_clear wid50 c_mr5">
                <input type="text" className="form_tag" />
                <label className="f_label">작성자</label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                {/* input에 value 값이 있으면 style display로 제어 */}
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
              </span>
            </div>
          </div>

          <p className="c_pt15 right">
            <button className="btn_text btn_green c_mr5">조회</button>
            <button className="btn_text btn_blue c_mr5">가져오기</button>
            <button className="btn_text btn_blue">이력</button>
          </p>
        </div>
        <ul className="tabs_wrap">
          <li className="active">작업정보</li>
          <li className="disabled">작업조</li>
        </ul>
        <div className="box_form tabs_cont">
          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid30 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  value={this.state.inputValue}
                  onChange={this.onChangeInput}
                  onBlur={this.onChangeInput}
                />
                <label className="f_label">국사</label>
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid100">
                <input
                  type="text"
                  className="form_tag"
                  value={this.state.inputValue}
                  onChange={this.onChangeInput}
                  onBlur={this.onChangeInput}
                />
                <label className="f_label">작업 내용</label>
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid30 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  value=""
                  onChange={this.onChangeInput}
                  onBlur={this.onChangeInput}
                />
                <label className="f_label">작업일시</label>
                <span className="icon icon_calendar">
                  <i class="fas fa-calendar-alt"></i>
                </span>
              </span>
              <span className="form_group wid20 c_mr5">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  value={this.state.inputValue}
                  onChange={this.onChangeInput}
                  onBlur={this.onChangeInput}
                />
                <label className="f_label">HH:MM</label>
                <span className="icon icon_calendar">
                  <i class="fas fa-clock"></i>
                </span>
              </span>
              <span className="form_group center c_mr5">-</span>
              <span className="form_group wid20">
                <input
                  type="text"
                  className="form_tag"
                  disabled
                  value={this.state.inputValue}
                  onChange={this.onChangeInput}
                  onBlur={this.onChangeInput}
                />
                <label className="f_label">HH:MM</label>
                <span className="icon icon_calendar">
                  <i class="fas fa-clock"></i>
                </span>
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid70 c_mr5">
                <input type="text" className="form_tag" disabled />
                <label className="f_label">위치</label>
              </span>
              <button className="btn_icon btn_dark_gray c_mr5">
                <i class="fas fa-map"></i>
              </button>
              <button className="btn_icon btn_gray">
                <i class="fas fa-times-circle"></i>
              </button>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell">
              <span className="form_group wid40">
                <select name="" id="b" className="form_tag_select ">
                  <option value=""> </option>
                  <option value="">전체1</option>
                  <option value="">전체2</option>
                </select>
                <label className="f_label" for="b">
                  작업 유형
                </label>
              </span>
            </div>
          </div>
          <div className="group_box_wrap">
            <p className="txt">작업계획서</p>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <div className="checkbox-wrapper c_mr10 c_mt5">
                  <input
                    type="checkbox"
                    name="Claude Monet"
                    id="question-1-option-1"
                  />
                  <label className="checkbox-label" for="question-1-option-1">
                    오거크레인 카고트럭
                  </label>
                </div>
                <div className="checkbox-wrapper c_mr10 c_mt5">
                  <input
                    type="checkbox"
                    name="Claude Monet"
                    id="question-1-option-1"
                  />
                  <label className="checkbox-label" for="question-1-option-1">
                    고소작업차
                  </label>
                </div>
                <div className="checkbox-wrapper c_mt5">
                  <input
                    type="checkbox"
                    name="Claude Monet"
                    id="question-1-option-1"
                  />
                  <label className="checkbox-label" for="question-1-option-1">
                    운반용 화물트럭
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p className="c_pt15 right">
            <button className="btn_text btn_green">저장</button>
          </p>
        </div>
      </div>
    );
  }
}

export default PWorkDirectionForm1;
