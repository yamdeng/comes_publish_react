import React, { Component } from 'react';

class PWorkDirectionForm2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>21 : 작업 지시 등록/수정 : 작업조 탭</h3>
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
          <li className="">작업정보</li>
          <li className="active">작업조</li>
        </ul>
        <div className="box_form tabs_cont">
          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              <div
                className="flex_grow_two_fix c_pt30 relative"
                style={{ width: '800px' }}
              >
                <div className="">
                  <table className="tb_list">
                    <caption></caption>
                    <thead>
                      <tr>
                        <th>사번</th>
                        <th>이름</th>
                        <th>직책/호칭</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11111114</td>
                        <td>ㅇㅇㅇ</td>
                        <td>과장/팀장</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="">
                  <table className="tb_list">
                    <caption></caption>
                    <thead>
                      <tr>
                        <th>사번</th>
                        <th>이름</th>
                        <th>직책/호칭</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>11111114</td>
                        <td>ㅇㅇㅇ</td>
                        <td>과장/팀장</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="abtc c_pt30">
                  <p style={{ fontSize: '20px' }}>
                    <i class="fas fa-arrow-circle-right"></i>
                  </p>
                  <p style={{ fontSize: '20px' }} className="c_mt10">
                    <i class="fas fa-arrow-circle-left"></i>
                  </p>
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

export default PWorkDirectionForm2;
