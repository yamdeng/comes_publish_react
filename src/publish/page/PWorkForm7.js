import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';

class PWorkForm7 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>16 : 안전 서류 등록/수정 : 보호구 지급대장</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <p className="right c_mb10 c_mt10">
                <button className="btn_text btn_green">추가</button>
              </p>
              <div className="tb_wrap_scroll">
                <div className="horizon_tb">
                  <table className="tb_list" style={{ minWidth: '1000px' }}>
                    <caption></caption>
                    <thead>
                      <tr>
                        <th rowspan={2}>지급일</th>
                        <th rowspan={2}>보호구 명</th>
                        <th rowspan={2}>안전인증번호</th>
                        <th rowspan={2}>수량</th>
                        <th colspan={3}>수령인</th>
                        <th colspan={3}>지급담당</th>
                        <th rowspan={2}>수정</th>
                        <th rowspan={2}>삭제</th>
                      </tr>
                      <tr>
                        <th>사번</th>
                        <th>이름</th>
                        <th>소속</th>
                        <th>사번</th>
                        <th>이름</th>
                        <th>소속</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Yyyy-mm-dd</td>
                        <td>&nbsp;</td>
                        <td>1</td>
                        <td>1</td>
                        <td>11111111</td>
                        <td>홍길동</td>
                        <td>ㅇㅇㅇㅇㅇ</td>
                        <td>11111111</td>
                        <td>홍길동</td>
                        <td>ㅇㅇㅇㅇㅇ</td>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PWorkForm7;
