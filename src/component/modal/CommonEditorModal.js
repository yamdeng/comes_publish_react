import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import CodeSelect from 'component/ui/CodeSelect';
import AppEditor from 'component/ui/AppEditor';

/*

    에디터 공통 모달 : ModalType.COMMON_EDITOR_MODAL

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
class CommonEditorModal extends React.Component {
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
        <h3 className="pop_title">미흡사항 등록</h3>
        <div className="pop_cont_box c_pt5">
          <div className="write_form">
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid100 c_mr5">
                  <div>
                    <AppEditor
                      editorRef={this.editorRef}
                      value={'aaa'}
                      height={'300px'}
                    />
                  </div>
                  {/* <textarea
                    name=""
                    id=""
                    className="form_tag textarea"
                  ></textarea>
                  <label className="f_label" for="b">
                    점검내용 *
                  </label> */}
                </span>
              </div>
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
        <ModalTopCloseButton />
      </div>
    );
  }
}

export default CommonEditorModal;
