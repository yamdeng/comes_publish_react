import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import CodeSelect from 'component/ui/CodeSelect';

/*

    공사 편성 모달 : ModalType.SUBJECT_ORGANIZE_MODAL

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
class SubjectOrganizeModal extends React.Component {
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
        <h3 className="pop_title">공사 관리</h3>
        <div className="pop_cont_box">
          <div className="box_form">
            <div className="write_form">
              <div className="form_table">
                <div className="form_cell f_wid100 c_pr0">
                  <span className="form_group form_clear wid100 ">
                    <input type="text" className="form_tag" disabled />
                    <label className="f_label">공사 조직</label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid100 c_pr0">
                  <span className="form_group form_clear wid100 ">
                    <CodeSelect
                      value={''}
                      label="공사유형"
                      codeType="boardType"
                      onChange={() => {}}
                    />
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid100 c_pr0">
                  <span className="form_group form_clear wid100 ">
                    <CodeSelect
                      value={''}
                      label="공사년도"
                      codeType="yearList"
                      onChange={() => {}}
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

export default SubjectOrganizeModal;
