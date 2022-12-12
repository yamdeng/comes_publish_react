import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PDocSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
  }

  close() {
    this.props.modalStore.hideModal();
  }

  render() {
    return (
      <div className="popup-container">
        <h3 className="pop_title">등록 서류 검색 (모달 모달)</h3>
        <div className="pop_full_cont_box">
          <div className="box_form">
            <div className="form_table">
              <div className="form_cell f_wid30">
                <span className="form_group wid100 c_mr5">
                  <select name="" id="b" className="form_tag_select ">
                    <option value=""> </option>
                    <option value="">전체1</option>
                    <option value="">전체2</option>
                  </select>
                  <label className="f_label" for="b">
                    서류분류
                  </label>
                </span>
              </div>
              <div className="form_cell f_wid30">
                <span className="form_group wid100 c_mr5">
                  <select name="" id="b" className="form_tag_select ">
                    <option value=""> </option>
                    <option value="">전체1</option>
                    <option value="">전체2</option>
                  </select>
                  <label className="f_label" for="b">
                    서류유형
                  </label>
                </span>
              </div>
              <div className="form_cell f_wid30">
                <span className="form_group wid100 c_mr5">
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
            <div className="form_table">
              <div className="form_cell f_wid60">
                <span className="form_group wid25 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    등록자 ID
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
                    등록자 이름
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
                    등록자 소속
                  </label>
                </span>
                <span className="form_group">
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid40 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    작업지시 ID
                  </label>
                </span>
                <span className="form_group wid50 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    작업지시 명
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid30 c_mr5">
                  <select name="" id="b" className="form_tag_select">
                    <option value=""> </option>
                    <option value="">전체1</option>
                    <option value="">전체2</option>
                  </select>
                  <label className="f_label" for="b">
                    공사유형
                  </label>
                </span>
                <span className="form_group wid40 c_mr5">
                  <input type="text" className="form_tag" placeholder="" />
                  <label className="f_label" for="b">
                    서류유형
                  </label>
                </span>
                <span className="form_group wid25">
                  <input type="text" className="form_tag" placeholder="" />
                  <label className="f_label" for="b">
                    WBS ID
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
                      <th>등록일시</th>
                      <th>등록ID</th>
                      <th>서류유형</th>
                      <th>등록자사번</th>
                      <th>등록자 명</th>
                      <th>소속</th>
                      <th>진행상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2020-01-02 23:00</td>
                      <td>123456789</td>
                      <td>XXXXXXXXXXXXXXXXXX</td>
                      <td>11010101</td>
                      <td>홍길동</td>
                      <td>ㅇㅇㅇㅇㅇ>ㅇㅇㅇㅇㅇ</td>
                      <td>작성중</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

        <div className="pop_btns">
          <button className="btn_text btn_dark_gray" onClick={this.close}>
            닫기
          </button>
          <button className="btn_text btn_green" onClick={this.close}>
            저장
          </button>
        </div>
        <span className="pop_close" onClick={this.close}>
          <i class="fas fa-times"></i>
        </span>
      </div>
    );
  }
}

export default PDocSearchModal;
