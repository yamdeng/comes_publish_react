import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import CodeSelect from 'component/ui/CodeSelect';
import AppEditor from 'component/ui/AppEditor';

/*

    점검 항목 폼 모달 : ModalType.CHECK_ITEM_FORM_MODAL

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
class CheckItemFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
    this.editorRef = createRef();
  }

  close() {
    this.props.modalStore.hideModal();
  }

  render() {
    return (
      <div className="popup-container">
        <h3 className="pop_title">점검 항목 등록/수정</h3>
        <div className="pop_full_cont_box">
          <div className="write_form">
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group form_clear wid50 ">
                  <input type="text" className="form_tag" disabled />
                  <label className="f_label">항목 ID</label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell form_cell_flex">
                <span className="form_group form_glow c_mr5">
                  <CodeSelect
                    value={''}
                    label="작업 부문"
                    codeType="boardType"
                    onChange={() => {}}
                    required={true}
                  />
                </span>
                <span className="form_group form_glow">
                  <CodeSelect
                    value={''}
                    label="공사유형"
                    codeType="boardType"
                    onChange={() => {}}
                    required={true}
                  />
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell c_pb10 c_pt10">
                <div className="radio-wrapper c_mr30">
                  <input
                    type="radio"
                    name="question-2"
                    value="43200000"
                    id="question-2-option-1"
                  />
                  <label className="radio-label" for="question-2-option-1">
                    사용
                  </label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    name="question-2"
                    value="43200000"
                    id="question-2-option-1"
                  />
                  <label className="radio-label" for="question-2-option-1">
                    미사용
                  </label>
                </div>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid100">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    항목 명
                  </label>
                </span>
              </div>
            </div>
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

export default CheckItemFormModal;
