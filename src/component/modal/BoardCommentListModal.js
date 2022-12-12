import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';

/*

    댓글/답글 모달 : ModalType.BOARD_COMMENT_LIST_MODAL

    modalData 설명
    {
      title : 모달 타이틀
      body(required) : 모달 body(html string)
      okLabel(option) : 버튼 라벨명(기본값은 '확인')
      ok(option) : [확인] 버튼 핸들러 함수(기본은 모달 닫히게끔)
    }

    state
     -tagList : 태그 목록

    props
     -tagList : 태그 목록

    store
     -alertModalStore, modalStore

*/
@withRouter
@inject('alertModalStore', 'modalStore')
@observer
class BoardCommentListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
  }

  close() {
    this.props.modalStore.hideModal();
  }

  render() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    return (
      <div className="popup-container">
        <h3 className="pop_title">댓글/답글 내역</h3>
        <div className="pop_full_cont_box">
          <div className="tb_wrap_scroll">
            <div className="horizon_tb vertical_sc_small mobile_fix">
              {/* 말줄임이 들어가는 테이블은 tb_fix가 추가되야함. */}
              <table className="tb_list tb_fix" style={{ minWidth: '800px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>등록일시</th>
                    <th style={{ width: '25%' }}>등록자</th>
                    <th style={{ width: '55%' }}>내용</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((info) => {
                    return (
                      <tr>
                        <td>Yyyy-MM-DD HH:MI</td>
                        <td>
                          <div className="ellipsis">
                            {'ㅇㅇ 부문>ㅇㅇㅇㅇ팀 홍길동>asdasd> asdasd'}
                          </div>
                        </td>
                        <td className="left">
                          <div className="ellipsis">
                            <a
                              href=""
                              onClick={(event) => {
                                event.preventDefault();
                              }}
                            >
                              ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ
                              ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="list_form">
            <div className="form_table c_pt30">
              <div className="form_cell f_wid100">
                <span className="form_group wid100 c_mr5">
                  <textarea
                    name=""
                    id=""
                    className="form_tag textarea invalid"
                  ></textarea>
                  <label className="f_label" for="b">
                    댓글/답글
                  </label>
                  <span class="invalid_txt textarea">유효하지 않습니다.</span>
                </span>
              </div>
            </div>
            <div className="list_form_btns_fix">
              <button className="btn_text btn_green c_mr5" disabled={true}>
                댓글/답글 달기
              </button>
              <button className="btn_text btn_green c_mr5" disabled={true}>
                수정하기
              </button>
              <button className="btn_text btn_green">삭제하기</button>
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text btn_dark_gray" onClick={this.close}>
            닫기
          </button>
          {/* <button className="btn_text btn_green" onClick={this.close}>
            저장
          </button> */}
        </div>
        <ModalTopCloseButton />
      </div>
    );
  }
}

export default BoardCommentListModal;
