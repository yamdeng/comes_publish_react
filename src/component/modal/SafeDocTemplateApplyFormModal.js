import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import CodeSelect from 'component/ui/CodeSelect';

/*

    템플릿 적용 등록 모달 : ModalType.SAFE_DOC_TEMPLATE_APPLY_FORM_MODAL

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
class SafeDocTemplateApplyFormModal extends React.Component {
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
        <h3 className="pop_title">템플릿 적용 추가</h3>
        <div className="pop_cont_box">
          <div className="box_form">
            <div className="write_form">
              <div className="form_table">
                <div className="form_cell f_wid100 c_pr0">
                  <span className="form_group form_clear wid100 ">
                    <CodeSelect
                      value={''}
                      label="템플릿"
                      codeType="boardType"
                      onChange={() => {}}
                      required={true}
                    />
                  </span>
                </div>
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

export default SafeDocTemplateApplyFormModal;
