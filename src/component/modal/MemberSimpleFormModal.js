import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';

/*

    시외 조직 / 사원 폼 모달 : ModalType.MEMBER_SIMPLE_FORM_MODAL

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
class MemberSimpleFormModal extends React.Component {
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
        <h3 className="pop_title">사원 등록/수정</h3>
        <div className="pop_cont_box">
          <div className="box_form">
            <div className="write_form">
              <div className="form_table">
                {/* 
            input,select,textarea 실패했을때 invalid
            label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
            f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
            wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
          */}
                <div className="form_cell f_wid100 c_pr0">
                  {/* 
              기본은 form_group
              앞에 돋보기 아이콘을 추가하려면 .form_search 와 icon icon_search 추가
              뒤에 클리어 아이콘을 추가하려면 .form_clear 와 icon icon_clear 추가
            */}
                  <span className="form_group form_clear wid100 ">
                    <input type="text" className="form_tag" />
                    <label className="f_label">
                      사번(이메일) <span className="required">*</span>
                    </label>
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid100 c_pr0">
                  {/* 
              기본은 form_group
              앞에 돋보기 아이콘을 추가하려면 .form_search 와 icon icon_search 추가
              뒤에 클리어 아이콘을 추가하려면 .form_clear 와 icon icon_clear 추가
            */}
                  <span className="form_group form_clear wid100 ">
                    <input type="text" className="form_tag" />
                    <label className="f_label">
                      성 명 <span className="required">*</span>
                    </label>
                    {/* <span
                    className="icon icon_clear"
                    style={{ display: 'block' }}
                  >
                    <i class="fas fa-times-circle"></i>
                  </span> */}
                  </span>
                </div>
              </div>
              <div className="form_table">
                <div className="form_cell f_wid100 c_pr0">
                  <span className="form_group form_clear wid100 ">
                    <input type="text" className="form_tag" />
                    <label className="f_label">
                      호 칭 <span className="required">*</span>
                    </label>
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

export default MemberSimpleFormModal;
