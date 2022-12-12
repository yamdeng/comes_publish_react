import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import SearchInput from 'component/ui/SearchInput';
import UiCommonService from 'service/UiCommonService';
import SwitchButton from 'component/ui/SwitchButton';

/*

    권한 부여 폼 모달 : ModalType.MEMBER_ROLE_FORM_MODAL

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
class MemberRoleFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
    this.openOrgSelectModal = this.openOrgSelectModal.bind(this);
    this.selectOrgByModal = this.selectOrgByModal.bind(this);
  }

  close() {
    this.props.modalStore.hideModal();
  }

  openOrgSelectModal() {
    // ModalService.openModal(ModalType.ORG_SELECT_MODAL, {
    //   selectHandler: this.selectOrgByModal
    // });
    UiCommonService.openOrgSelectModal(this.selectOrgByModal);
  }

  selectOrgByModal(orgInfo) {}

  render() {
    let list = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div className="popup-container">
        <h3 className="pop_title">권한 부여</h3>
        <div className="pop_cont_box">
          <div className="box_form">
            <div className="form_table">
              <div className="form_cell f_wid40">
                <span className="form_group wid100">
                  <input type="text" className="form_tag" placeholder="" />
                  <label className="f_label" for="b">
                    사번
                  </label>
                </span>
              </div>
              <div className="form_cell f_wid50">
                <span className="form_group wid100 _icon">
                  <input type="text" className="form_tag" disabled />
                  <label className="f_label">조직명</label>
                  <button
                    className="btn_icon btn_dark_gray "
                    onClick={this.openOrgSelectModal}
                  >
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="list_form c_mt10">
            <table className="tb_list">
              <caption></caption>
              <thead>
                <tr>
                  <th>권한</th>
                  <th>부여</th>
                </tr>
              </thead>
              <tbody>
                {list.map((info) => {
                  return (
                    <tr>
                      <td>한성유통</td>
                      <td className="c_pt0 c_pb0">
                        <SwitchButton
                          id=""
                          inputName=""
                          value={true}
                          onChange={() => {}}
                          yesLabel="YES"
                          noLabel="NO"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default MemberRoleFormModal;
