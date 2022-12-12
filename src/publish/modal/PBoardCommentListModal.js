import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

@withRouter
@inject('modalStore')
@observer
class PBoardCommentListModal extends React.Component {
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
        <h3 className="pop_title">댓글/답글 내역</h3>
        <div className="pop_full_cont_box">
          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              {/* 말줄임이 들어가는 테이블은 tb_fix가 추가되야함. */}
              <table className="tb_list tb_fix" style={{ minWidth: '500px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th style={{ width: '15%' }}>등록일시</th>
                    <th style={{ width: '25%' }}>등록자</th>
                    <th style={{ width: '60%' }}>내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Yyyy-MM-DD HH:MI</td>
                    <td>ㅇㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동</td>
                    <td className="left">
                      <div className="ellipsis">
                        <Link>
                          ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form">
            <div className="form_table c_pt50">
              <div className="form_cell f_wid100">
                <span className="form_group wid100 c_mr5">
                  <textarea
                    name=""
                    id=""
                    className="form_tag textarea"
                  ></textarea>
                  <label className="f_label" for="b">
                    댓글/답글
                  </label>
                </span>
              </div>
            </div>
            <div className="list_form_btns_fix">
              <button className="btn_text btn_blue c_mr5">
                댓글/답글 달기
              </button>
              <button className="btn_text btn_green c_mr5">수정하기</button>
              <button className="btn_text btn_green">삭제하기</button>
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

export default PBoardCommentListModal;
