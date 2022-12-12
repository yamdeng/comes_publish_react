import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import AppDatePicker from 'component/ui/AppDatePicker';

/*

    보호구 지급대장 폼 모달 : ModalType.EQUIPMENT_SUPPLY_FORM_MODAL

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
class SafeClothSupplyFormModal extends React.Component {
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
        <h3 className="pop_title">보호구 지급 대장 폼 모달</h3>
        <div className="pop_full_cont_box">
          <div className="write_form">
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group wid100">
                  <AppDatePicker
                    id="startDate"
                    label="지급일"
                    value={null}
                    valueFormat="YYYY-MM-DD"
                    onChange={(date) => {}}
                    required={true}
                  />
                  <span className="icon icon_calendar">
                    <i class="fas fa-calendar-alt"></i>
                  </span>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group wid100">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    보호구명
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pr0">
                <span className="form_group wid100">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    안전인증번호
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid30">
                  <input type="text" className="form_tag" />
                  <label className="f_label" for="b">
                    수량
                  </label>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell form_cell_flex">
                <span className="form_group form_glow c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    수령인 사번
                  </label>
                </span>
                <span className="form_group form_glow c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    수령인 이름
                  </label>
                </span>
                <span className="form_group form_glow">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    수령인 소속
                  </label>
                </span>
              </div>
              <div className="form_cell shrink right">
                <span className="form_group">
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell form_cell_flex">
                <span className="form_group form_glow c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    지급담당 사번
                  </label>
                </span>
                <span className="form_group form_glow c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    지급담당 이름
                  </label>
                </span>
                <span className="form_group form_glow">
                  <input
                    type="text"
                    className="form_tag"
                    disabled="true"
                    placeholder="직영시 조직명+년도  공사는 공사명 + 기간"
                  />
                  <label className="f_label" for="b">
                    지급담당 소속
                  </label>
                </span>
              </div>
              <div className="form_cell shrink right">
                <span className="form_group">
                  <button className="btn_icon btn_dark_gray">
                    <i class="fas fa-search"></i>
                  </button>
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

export default SafeClothSupplyFormModal;
