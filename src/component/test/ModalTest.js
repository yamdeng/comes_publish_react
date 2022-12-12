import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import ModalType from 'config/ModalType';
import ModalService from 'service/ModalService';

/*

    이름 : 모달 테스트

*/

const modalList = [
  {
    name: '공통 alert 모달',
    modalType: ModalType.ALERT_MODAL,
    isAlertModal: true,
    modalData: {
      title2: '제목aaaa',
      body: 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ asdasdasd asd asd asd asd asd as as asd s ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ abcdefghijklmnopqr ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ asdasdasd asd asd asd asd asd as as asd s ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ abcdefghijklmnopqr'
    }
  },
  {
    name: '공통 confirm 모달',
    modalType: ModalType.CONFRIM_MODAL,
    isAlertModal: true,
    modalData: {
      title: '제목aaaa',
      body: 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ asdasdasd asd asd asd asd asd as as asd s ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ abcdefghijklmnopqr ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ asdasdasd asd asd asd asd asd as as asd s ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ abcdefghijklmnopqr'
    }
  },
  {
    name: '조직 선택 모달',
    modalType: ModalType.ORG_SELECT_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '사원 선택 모달',
    modalType: ModalType.MEMBER_SELECT_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '조직 폼 모달',
    modalType: ModalType.ORG_SIMPLE_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '사원 폼 모달',
    modalType: ModalType.MEMBER_SIMPLE_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '댓글 목록 모달',
    modalType: ModalType.BOARD_COMMENT_LIST_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '권한 수정 모달',
    modalType: ModalType.MEMBER_ROLE_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '점검 항목 폼 모달',
    modalType: ModalType.CHECK_ITEM_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '작업 지시 요청 이력 모달',
    modalType: ModalType.WORK_ORDER_STATUS_HISTORY_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '지도 모달',
    modalType: ModalType.COMMON_MAP_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '에디터 모달',
    modalType: ModalType.COMMON_EDITOR_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '결제 모달',
    modalType: ModalType.COMMON_SIGN_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '작업지시서 목록 모달',
    modalType: ModalType.WORK_ORDER_LIST_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '안전서류 템플릿 폼 모달',
    modalType: ModalType.SAFE_DOC_TEMPLATE_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '템플릿 적용 폼 모달',
    modalType: ModalType.SAFE_DOC_TEMPLATE_APPLY_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '등록 공사 찾기 모달',
    modalType: ModalType.SUBJECT_SEARCH_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '공사 편성 모달',
    modalType: ModalType.SUBJECT_ORGANIZE_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: 'textarea 모달',
    modalType: ModalType.COMMON_TEXTAREA_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '등록 서류 검색 모달',
    modalType: ModalType.SAFE_DOC_SEARCH_MODAL,
    isAlertModal: false,
    modalData: {}
  },
  {
    name: '보호구 지급 대장 폼 모달',
    modalType: ModalType.EQUIPMENT_SUPPLY_FORM_MODAL,
    isAlertModal: false,
    modalData: {}
  }
];

@HOC.documentTitle('모달 테스트')
@withRouter
@inject('modalStore', 'alertModalStore')
@observer
class ModalTest extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // 모달 오픈 : modalStore(alert외의 모든 모달)
    this.openModal = this.openModal.bind(this);

    // alert/confirm 모달 오픈: alertModalStore(alert외의 모든 모달)
    this.openAlertModal = this.openAlertModal.bind(this);
  }

  openModal(modalType, modalData) {
    ModalService.openModal(modalType, modalData);
  }

  openAlertModal(modalType, modalData) {
    if (modalType === ModalType.ALERT_MODAL) {
      ModalService.alert(modalData);
    } else {
      ModalService.confirm(modalData);
    }
  }

  render() {
    return (
      <div className="content_area">
        <h2>모달 테스트</h2>
        <br />
        <ul>
          {modalList.map((modalInfo) => {
            return (
              <li
                style={{
                  padding: 8,
                  backgroundColor: '#2dbab6',
                  border: '1px solid black',
                  marginBottom: 5
                }}
                onClick={() => {
                  if (modalInfo.isAlertModal) {
                    this.openAlertModal(
                      modalInfo.modalType,
                      modalInfo.modalData
                    );
                  } else {
                    this.openModal(modalInfo.modalType, modalInfo.modalData);
                  }
                }}
              >
                {modalInfo.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ModalTest;
