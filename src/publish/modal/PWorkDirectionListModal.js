import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@withRouter
@inject('modalStore')
@observer
class PWorkDirectionListModal extends React.Component {
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
        <h3 className="pop_title">작업지시서 목록 모달</h3>
        <div className="pop_cont_box">
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
                <table className="tb_list tb_fix" style={{ minWidth: '900px' }}>
                  <caption></caption>
                  <thead>
                    <tr>
                      <th style={{ width: '5%' }}>순번</th>
                      <th style={{ width: '20%' }}>조직</th>
                      <th style={{ width: '15%' }}>작업일</th>
                      <th style={{ width: '15%' }}>작업시간</th>
                      <th>공사명</th>
                      <th style={{ width: '10%' }}>상태</th>
                      <th style={{ width: '5%' }}>상세</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>DDD>DDDDDDDDDDDDDDDD</td>
                      <td>YYYY-MM-DD</td>
                      <td>HH:MI!HH:MI</td>
                      <td>DDDDDDDDDDDDDDDDDDDDDDDDDDDD</td>
                      <td>작성중</td>
                      <td>
                        <i class="fas fa-eye"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="list_form_btns">
              <button className="btn_text btn_green">엑셀다운</button>
            </div>
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

export default PWorkDirectionListModal;
