import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';

class PWorkForm2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>11 : 안전 서류 등록/수정 : 결재선 지정</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="tb_wrap_scroll c_mt15">
                <div className="horizon_tb">
                  <table className="tb_list" style={{ minWidth: '500px' }}>
                    <caption></caption>
                    <thead>
                      <tr>
                        <th>결재선</th>
                        <th>사번</th>
                        <th>성명</th>
                        <th>소속</th>
                        <th>상태</th>
                        <th>최종처리일시</th>
                        <th>삭제</th>
                        <th>변경</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>담당</td>
                        <td>11111111</td>
                        <td>ㅇㅇ</td>
                        <td>ㅇㅇ</td>
                        <td>미신청</td>
                        <td>&nbsp;</td>
                        <td>
                          <i class="fas fa-trash-alt"></i>
                        </td>
                        <td>
                          <i class="fas fa-edit"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="c_pt15 right">
                <button className="btn_text btn_green  c_mr5">저장</button>
                <button className="btn_text btn_green ">결재 요청</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkForm2;
