/* global XFE */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DatePicker from 'react-datepicker';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'devextreme/data/odata/store';
import DataGrid, { Column } from 'devextreme-react/data-grid';

const dataSourceOptions = {
  store: {
    type: 'odata',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Products',
    key: 'Product_ID'
  },
  select: [
    'Product_ID',
    'Product_Name',
    'Product_Cost',
    'Product_Sale_Price',
    'Product_Retail_Price',
    'Product_Current_Inventory'
  ],
  filter: ['Product_Current_Inventory', '>', 0]
};

@inject('appStore', 'uiStore', 'vacationManageStore')
@observer
class ModalTest extends Component {
  xfe = null;
  constructor(props) {
    super(props);
    this.state = {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.setHtml = this.setHtml.bind(this);
    this.getHtml = this.getHtml.bind(this);
  }

  setHtml() {
    if (this.xfe) {
      this.xfe.setBodyValue('<p>>yamdeng</p>');
    }
  }

  getHtml() {
    if (this.xfe) {
      const body = this.xfe.getBodyValue();
      console.log('body : ' + body);
    }
  }

  openModal(index) {
    this.setState({ ['isOpen' + index]: true });

    setTimeout(() => {
      // debugger;
      this.xfe = new XFE({
        basePath: '/office6/engine/we/xfree',
        width: '100%',
        height: '500px',
        SubMenuBar: false,
        onLoad: (object) => {
          // object.hideToolbar(true);
          // object.hideToolbar(true);
          // object.showMenuBar(false);
          // object.showMenubar();
          // debugger;
        }
      });

      // debugger;

      this.xfe.render('reactEditor');
    }, 300);
  }

  closeModal(index) {
    this.setState({ ['isOpen' + index]: false });
  }

  componentDidMount() {
    // var test = $('#reactEditor');
    // debugger;

    const basePath = '/office6/engine/we/xfree';

    // alert('sss');

    this.xfe = new XFE({
      basePath: basePath,
      width: '100%',
      height: '430px',
      onLoad: () => {
        // alert('aaaa');
        // debugger;
      }
    });

    // debugger;

    this.xfe.render('reactEditor');

    // debugger;
  }

  render() {
    let { isOpen1, isOpen2, isOpen3, isOpen4, isOpen5 } = this.state;
    return (
      <div>
        <button onClick={() => this.openModal(1)}>팀원 출퇴근 수정</button>
        <br />
        <button onClick={() => this.openModal(2)}>부서별 출퇴근 관리</button>
        <br />
        <button onClick={() => this.openModal(3)}>일일 업무보고 수정</button>
        <br />
        <button onClick={() => this.openModal(4)}>일일 업무보고 확인</button>
        <br />
        <button onClick={() => this.openModal(5)}>근무시간수정</button>
        <br />
        {/* 팀원 출퇴근 수정 */}
        <Modal isOpen={isOpen1} className={'modal_box modal_box_850'}>
          <ModalHeader
            className="popup_head"
            close={
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.closeModal(1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            }
          >
            팀원 출퇴근 수정
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="sel_month">
                <a href="javascript:void(0);" class="prev">
                  이전
                </a>
                <span class="txt_month">6월 7일(화)</span>
                <a href="javascript:void(0);" class="next">
                  다음
                </a>
                <a href="javascript:void(0);" class="month">
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
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              취소
            </button>
            <button type="button" class="btn btn-primary">
              수정
            </button>
          </ModalFooter>
        </Modal>
        {/* 부서별 출퇴근 관리 */}
        <Modal isOpen={isOpen2} className={'modal_box modal_box_850'}>
          <ModalHeader
            className="popup_head"
            close={
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.closeModal(2)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            }
          >
            부서별출퇴근관리
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="sel_month">
                <a href="javascript:void(0);" class="prev">
                  이전
                </a>
                <span class="txt_month">6월 7일(화)</span>
                <a href="javascript:void(0);" class="next">
                  다음
                </a>
                <a href="javascript:void(0);" class="month">
                  <img src="images/btn_modify_month.png" alt="월 선택하기" />
                </a>
                <span class="mglt20">1 &#47; 29</span>
              </div>

              <div>
                <div class="grid_top flex_sb mgtop10">
                  <div class="grp_sel_option">
                    <label for="sel_option" class="blind">
                      실 선택
                    </label>
                    <select id="sel_option" class="w90">
                      <option>전체</option>
                      <option>1실</option>
                      <option>2실</option>
                      <option>3실</option>
                    </select>
                  </div>
                  <div class="grp_sel_result">
                    <ul class="flex_sb table_ul">
                      <li>
                        <span>수정</span>
                        <span class="sel_relt_text">N</span>
                      </li>
                      <li>
                        <span>지각</span>
                        <span class="sel_relt_text">N</span>
                      </li>
                      <li>
                        <span>상태</span>
                        <span class="sel_relt_text">제출 전</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <a href="javascript:void(0);" class="btn_ico">
                      <i class="ico_download"></i>엑셀다운로드
                    </a>
                    <a href="javascript:void(0);" class="btn_ico">
                      <i class="ico_refresh"></i>새로고침
                    </a>
                  </div>
                </div>
                <div class="mgtop10 modal_grid_area">
                  <a
                    href="javascript:void(0);"
                    class="btn_nepr prev"
                    style={{ zIndex: 1 }}
                  >
                    <span>이전</span>
                  </a>

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

                  <a href="javascript:void(0);" class="btn_nepr next">
                    <span>다음</span>
                  </a>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              취소
            </button>
            <button type="button" class="btn btn-primary">
              수정
            </button>
          </ModalFooter>
        </Modal>
        {/* 업무보고 수정 */}
        <Modal isOpen={isOpen3} className={'modal_box modal_box_850'}>
          <ModalHeader
            className="popup_head"
            close={
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.closeModal(3)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            }
          >
            일일 업무 보고 수정
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <h4>6월 2일 (목)</h4>
              <div class="mgtop10 modal_grid_area" id="reactEditor"></div>
              <div class="right mgtop10">
                <input type="checkbox" id="issue" />
                <label for="issue" class="mglt10">
                  이슈
                </label>
              </div>
              <div class="coment_list mgtop10">
                <ul>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                  <li>
                    <b>이현수 수석부장</b> 코멘트 작성 내용 출력
                  </li>
                </ul>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={this.setHtml}
            >
              취소
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.getHtml}
            >
              수정
            </button>
          </ModalFooter>
        </Modal>
        {/* 일일 업무보고 확인 */}
        <Modal isOpen={isOpen4} className={'modal_box modal_box_1000'}>
          <ModalHeader
            className="popup_head"
            close={
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.closeModal(4)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            }
          >
            팀 일일 업무 보고 확인
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="sel_month">
                <a href="javascript:void(0);" class="prev">
                  이전
                </a>
                <span class="txt_month">6월 7일(화)</span>
                <a href="javascript:void(0);" class="next">
                  다음
                </a>
                <a href="javascript:void(0);" class="month">
                  <img src="images/btn_modify_month.png" alt="월 선택하기" />
                </a>
                <span class="mglt20">1 &#47; 29</span>
              </div>

              <div>
                <div class="grid_top flex_sb mgtop10">
                  <div class="grp_sel_option">
                    <label for="sel_option" class="blind">
                      실 선택
                    </label>
                    <select id="sel_option" class="w90">
                      <option>전체</option>
                      <option>1실</option>
                      <option>2실</option>
                      <option>3실</option>
                    </select>
                  </div>
                  <div class="grp_sel_result">
                    <ul class="flex_sb table_ul">
                      <li>
                        <span>작성일시</span>
                        <span class="sel_relt_text">2022-06-07 17:35</span>
                      </li>
                      <li>
                        <span>작성자</span>
                        <span class="sel_relt_text">김소영</span>
                      </li>
                      <li>
                        <span>이슈</span>
                        <span class="sel_relt_text">N</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mgtop10 modal_grid_area">
                  <a
                    href="javascript:void(0);"
                    class="btn_nepr prev"
                    style={{ zIndex: 1 }}
                  >
                    <span>이전</span>
                  </a>

                  <DataGrid dataSource={dataSourceOptions} showBorders={true}>
                    <Column dataField="Product_ID" />
                    <Column dataField="Product_Name" width={250} />
                    <Column
                      dataField="Product_Cost"
                      caption="Cost"
                      dataType="number"
                      format="currency"
                    />
                    <Column
                      dataField="Product_Sale_Price"
                      caption="Sale Price"
                      dataType="number"
                      format="currency"
                    />
                    <Column
                      dataField="Product_Retail_Price"
                      caption="Retail Price"
                      dataType="number"
                      format="currency"
                    />
                    <Column
                      dataField="Product_Current_Inventory"
                      caption="Inventory"
                    />
                  </DataGrid>

                  <a href="javascript:void(0);" class="btn_nepr next">
                    <span>다음</span>
                  </a>
                </div>
                <div class="right mgtop10">
                  <input type="checkbox" id="issue" />
                  <label for="issue" class="mglt10">
                    이슈
                  </label>
                </div>
                <div class="coment_write flex_sb mgtop10">
                  <div class="coment_write_form">
                    <p class="coment_user">
                      <b>김희원 과장</b>
                    </p>
                    <textarea
                      maxlength="100"
                      placeholder="댓글을 입력하세요. (최대 100자)"
                      style={{ boxSizing: 'border-box' }}
                    ></textarea>
                  </div>
                  <a href="javascript:void(0);" class="btn_blue btn_normal">
                    등록
                  </a>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              취소
            </button>
            <button type="button" class="btn btn-primary">
              수정
            </button>
          </ModalFooter>
        </Modal>
        {/* 근무시간수정 */}
        <Modal isOpen={isOpen5} className={'modal_box modal_box_850'}>
          <ModalHeader
            className="popup_head"
            close={
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.closeModal(5)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            }
          >
            팀 일일 업무 보고 확인
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="flex_sb">
                <p class="con_title2">근무시간명</p>
                <div class="con_box2">
                  <input
                    type="text"
                    class="w100p"
                    placeholder="제목을 입력해주세요."
                  />
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">근무지</p>
                <div class="con_box2">
                  <input
                    type="text"
                    class="w100p"
                    placeholder="제목을 입력해주세요."
                  />
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">근무시간 설명</p>
                <div class="con_box2">
                  <label for="option1" class="blind">
                    출근 시간
                  </label>
                  <select id="option1" class="w90">
                    <option>09:00</option>
                  </select>
                  <span>~</span>
                  <label for="option2" class="blind">
                    퇴근 시간
                  </label>
                  <select id="option2" class="w90">
                    <option>18:00</option>
                  </select>
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">점심시간</p>
                <div class="con_box2">
                  <label for="option3" class="blind">
                    점심 시작 시간
                  </label>
                  <select id="option3" class="w90" disabled>
                    <option>12:00</option>
                  </select>
                  <span>~</span>
                  <label for="option4" class="blind">
                    점심 종료 시간
                  </label>
                  <select id="option4" class="w90" disabled>
                    <option>13:00</option>
                  </select>
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">적용기간</p>
                <div class="con_box2">
                  <div>
                    <input type="checkbox" id="check1" />
                    <label for="check1" class="mglt10">
                      종료일 미정
                    </label>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <DatePicker
                      selected={null}
                      onChange={(date) => {}}
                      className="w90"
                    />
                  </div>{' '}
                  <a href="javascript:void(0);" class="btn_calen mgrg10">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/calen_sel_ico.png`}
                      alt=""
                    />
                  </a>
                  <span>~</span>
                  <div style={{ display: 'inline-block' }}>
                    <DatePicker
                      selected={null}
                      onChange={(date) => {}}
                      className="w90"
                    />
                  </div>{' '}
                  <a href="javascript:void(0);" class="btn_calen">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/calen_sel_ico.png`}
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">적용 부서 선택</p>
                <div class="con_box2">
                  <label for="option5" class="blind">
                    적용 부서
                  </label>
                  <select id="option5" class="w90">
                    <option>SQ1</option>
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              취소
            </button>
            <button type="button" class="btn btn-primary">
              수정
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalTest;
