import React from 'react';
import { observer, inject } from 'mobx-react';

@observer
class ReportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // [확인] 버튼 handle
    this.ok = this.ok.bind(this);

    this.close = this.close.bind(this);
  }

  ok() {
    let { modalId } = this.props;
    $('#' + modalId).modal('hide');
  }

  close() {
    let { modalId } = this.props;
    $('#' + modalId).modal('hide');
  }

  render() {
    let { modalId } = this.props;
    return (
      <div
        class="modal fade"
        id="report"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal_box modal_box_850" role="document">
          <div class="modal-content">
            <div class="modal-header popup_head">
              <h5 class="modal-title">팀원 출퇴근 수정</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="pd20">
                <div class="sel_month">
                  <a href="#" class="prev">
                    이전
                  </a>
                  <span class="txt_month">6월 7일(화)</span>
                  <a href="#" class="next">
                    다음
                  </a>
                  <a href="#" class="month">
                    <img src="images/btn_modify_month.png" alt="월 선택하기" />
                  </a>
                </div>

                <div>
                  <div class="grid_top">
                    <a href="javascript:void(0);" class="btn_right btn_ico">
                      <i class="ico_refresh"></i>새로고침
                    </a>
                  </div>
                  <div class="mgtop10">
                    <p
                      style={{
                        border: '1px solid #d6d6d6',
                        height: 300,
                        fontSize: 15,
                        lineHeight: 300,
                        textAlign: 'center'
                      }}
                    >
                      그리드 영역 표시 임으로 삭제하고 넣으시면 됩니다.
                    </p>
                  </div>

                  <div class="mgtop10">
                    <p
                      style={{
                        height: 50,
                        fontSize: 15,
                        lineHeight: 50,
                        textAlign: 'center'
                      }}
                    >
                      페이징 영역 표시 임으로 삭제하고 넣으시면 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.close}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportModal;
