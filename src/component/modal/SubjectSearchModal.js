import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import ModalTopCloseButton from 'component/ui/ModalTopCloseButton';
import Pagination from 'component/ui/Pagination';
import SearchInput from 'component/ui/SearchInput';
import CodeSelect from 'component/ui/CodeSelect';
import PageSizeSelect from 'component/ui/PageSizeSelect';

/*

    등록 공사 찾기 모달 : ModalType.SUBJECT_SEARCH_MODAL

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
@inject('alertModalStore', 'modalStore', 'boardListStore')
@observer
class SubjectSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.close = this.close.bind(this);
  }

  close() {
    this.props.modalStore.hideModal();
  }

  render() {
    let { boardListStore } = this.props;
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div className="popup-container">
        <h3 className="pop_title">등록 과제 검색</h3>
        <div className="pop_full_cont_box">
          <div className="box_form">
            <div className="form_table">
              <div className="form_cell f_wid50">
                <span className="form_group wid100 c_mr5">
                  <CodeSelect
                    value={''}
                    label="공사유형"
                    codeType="boardType"
                    onChange={() => {}}
                  />
                </span>
              </div>
              <div className="form_cell f_wid3=50">
                <span className="form_group form_search form_clear wid100 c_mr5">
                  <SearchInput
                    value={''}
                    label="공사명"
                    clearInput={this.clearInput}
                    onChange={this.changeTitle}
                  />
                </span>
              </div>
            </div>

            <div className="form_table">
              <div className="form_cell f_wid70">
                <span className="form_group wid80 c_mr5">
                  <input
                    type="text"
                    className="form_tag"
                    disabled
                    placeholder="조직을 선택해주세요"
                  />
                  <label className="f_label" for="b">
                    조직
                  </label>
                </span>
                <button className="btn_icon btn_dark_gray">
                  <i class="fas fa-search"></i>
                </button>
              </div>
              <div className="form_cell f_wid30">
                <p className="right">
                  <button className="btn_text btn_green mobile_full">
                    조회
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="list_form c_mt10">
            <p className="relative c_mb10">
              <span className="form_group c_mr5" style={{ width: '100px' }}>
                <PageSizeSelect store={boardListStore} />
              </span>
              <span className="fs_12">총 nnn 건</span>
            </p>
            <div className="tb_wrap_scroll">
              <div className="horizon_tb">
                <table className="tb_list" style={{ minWidth: '500px' }}>
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>등록일시</th>
                      <th>공사ID</th>
                      <th>공사명</th>
                      <th>공사기간</th>
                      <th>담당 조직</th>
                      <th>공사유형</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((info) => {
                      return (
                        <tr>
                          <td>2020-01-02 23:00</td>
                          <td>123456789</td>
                          <td>XXXXXXXXXXXXXXXXXX</td>
                          <td>2020-01-02 ~ 2020-01-02</td>
                          <td>{'서초지점'}</td>
                          <td>직영</td>
                        </tr>
                      );
                    })}

                    {!list.length ? (
                      <tr>
                        <td colSpan={6}>데이터가 존재하지 않습니다.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination store={boardListStore} />
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

export default SubjectSearchModal;
