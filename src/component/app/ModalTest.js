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
        <button onClick={() => this.openModal(1)}>?????? ????????? ??????</button>
        <br />
        <button onClick={() => this.openModal(2)}>????????? ????????? ??????</button>
        <br />
        <button onClick={() => this.openModal(3)}>?????? ???????????? ??????</button>
        <br />
        <button onClick={() => this.openModal(4)}>?????? ???????????? ??????</button>
        <br />
        <button onClick={() => this.openModal(5)}>??????????????????</button>
        <br />
        {/* ?????? ????????? ?????? */}
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
            ?????? ????????? ??????
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="sel_month">
                <a href="javascript:void(0);" class="prev">
                  ??????
                </a>
                <span class="txt_month">6??? 7???(???)</span>
                <a href="javascript:void(0);" class="next">
                  ??????
                </a>
                <a href="javascript:void(0);" class="month">
                  <img src="images/btn_modify_month.png" alt="??? ????????????" />
                </a>
              </div>

              <div>
                <div class="grid_top">
                  <a href="javascript:void(0);" class="btn_right btn_ico">
                    <i class="ico_refresh"></i>????????????
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
                    ????????? ?????? ?????? ????????? ???????????? ???????????? ?????????.
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              ??????
            </button>
            <button type="button" class="btn btn-primary">
              ??????
            </button>
          </ModalFooter>
        </Modal>
        {/* ????????? ????????? ?????? */}
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
            ????????????????????????
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="sel_month">
                <a href="javascript:void(0);" class="prev">
                  ??????
                </a>
                <span class="txt_month">6??? 7???(???)</span>
                <a href="javascript:void(0);" class="next">
                  ??????
                </a>
                <a href="javascript:void(0);" class="month">
                  <img src="images/btn_modify_month.png" alt="??? ????????????" />
                </a>
                <span class="mglt20">1 &#47; 29</span>
              </div>

              <div>
                <div class="grid_top flex_sb mgtop10">
                  <div class="grp_sel_option">
                    <label for="sel_option" class="blind">
                      ??? ??????
                    </label>
                    <select id="sel_option" class="w90">
                      <option>??????</option>
                      <option>1???</option>
                      <option>2???</option>
                      <option>3???</option>
                    </select>
                  </div>
                  <div class="grp_sel_result">
                    <ul class="flex_sb table_ul">
                      <li>
                        <span>??????</span>
                        <span class="sel_relt_text">N</span>
                      </li>
                      <li>
                        <span>??????</span>
                        <span class="sel_relt_text">N</span>
                      </li>
                      <li>
                        <span>??????</span>
                        <span class="sel_relt_text">?????? ???</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <a href="javascript:void(0);" class="btn_ico">
                      <i class="ico_download"></i>??????????????????
                    </a>
                    <a href="javascript:void(0);" class="btn_ico">
                      <i class="ico_refresh"></i>????????????
                    </a>
                  </div>
                </div>
                <div class="mgtop10 modal_grid_area">
                  <a
                    href="javascript:void(0);"
                    class="btn_nepr prev"
                    style={{ zIndex: 1 }}
                  >
                    <span>??????</span>
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
                    ????????? ?????? ?????? ????????? ???????????? ???????????? ?????????.
                  </p>

                  <a href="javascript:void(0);" class="btn_nepr next">
                    <span>??????</span>
                  </a>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              ??????
            </button>
            <button type="button" class="btn btn-primary">
              ??????
            </button>
          </ModalFooter>
        </Modal>
        {/* ???????????? ?????? */}
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
            ?????? ?????? ?????? ??????
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <h4>6??? 2??? (???)</h4>
              <div class="mgtop10 modal_grid_area" id="reactEditor"></div>
              <div class="right mgtop10">
                <input type="checkbox" id="issue" />
                <label for="issue" class="mglt10">
                  ??????
                </label>
              </div>
              <div class="coment_list mgtop10">
                <ul>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
                  </li>
                  <li>
                    <b>????????? ????????????</b> ????????? ?????? ?????? ??????
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
              ??????
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.getHtml}
            >
              ??????
            </button>
          </ModalFooter>
        </Modal>
        {/* ?????? ???????????? ?????? */}
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
            ??? ?????? ?????? ?????? ??????
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="sel_month">
                <a href="javascript:void(0);" class="prev">
                  ??????
                </a>
                <span class="txt_month">6??? 7???(???)</span>
                <a href="javascript:void(0);" class="next">
                  ??????
                </a>
                <a href="javascript:void(0);" class="month">
                  <img src="images/btn_modify_month.png" alt="??? ????????????" />
                </a>
                <span class="mglt20">1 &#47; 29</span>
              </div>

              <div>
                <div class="grid_top flex_sb mgtop10">
                  <div class="grp_sel_option">
                    <label for="sel_option" class="blind">
                      ??? ??????
                    </label>
                    <select id="sel_option" class="w90">
                      <option>??????</option>
                      <option>1???</option>
                      <option>2???</option>
                      <option>3???</option>
                    </select>
                  </div>
                  <div class="grp_sel_result">
                    <ul class="flex_sb table_ul">
                      <li>
                        <span>????????????</span>
                        <span class="sel_relt_text">2022-06-07 17:35</span>
                      </li>
                      <li>
                        <span>?????????</span>
                        <span class="sel_relt_text">?????????</span>
                      </li>
                      <li>
                        <span>??????</span>
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
                    <span>??????</span>
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
                    <span>??????</span>
                  </a>
                </div>
                <div class="right mgtop10">
                  <input type="checkbox" id="issue" />
                  <label for="issue" class="mglt10">
                    ??????
                  </label>
                </div>
                <div class="coment_write flex_sb mgtop10">
                  <div class="coment_write_form">
                    <p class="coment_user">
                      <b>????????? ??????</b>
                    </p>
                    <textarea
                      maxlength="100"
                      placeholder="????????? ???????????????. (?????? 100???)"
                      style={{ boxSizing: 'border-box' }}
                    ></textarea>
                  </div>
                  <a href="javascript:void(0);" class="btn_blue btn_normal">
                    ??????
                  </a>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" class="btn btn-secondary">
              ??????
            </button>
            <button type="button" class="btn btn-primary">
              ??????
            </button>
          </ModalFooter>
        </Modal>
        {/* ?????????????????? */}
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
            ??? ?????? ?????? ?????? ??????
          </ModalHeader>
          <ModalBody>
            <div class="pd20">
              <div class="flex_sb">
                <p class="con_title2">???????????????</p>
                <div class="con_box2">
                  <input
                    type="text"
                    class="w100p"
                    placeholder="????????? ??????????????????."
                  />
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">?????????</p>
                <div class="con_box2">
                  <input
                    type="text"
                    class="w100p"
                    placeholder="????????? ??????????????????."
                  />
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">???????????? ??????</p>
                <div class="con_box2">
                  <label for="option1" class="blind">
                    ?????? ??????
                  </label>
                  <select id="option1" class="w90">
                    <option>09:00</option>
                  </select>
                  <span>~</span>
                  <label for="option2" class="blind">
                    ?????? ??????
                  </label>
                  <select id="option2" class="w90">
                    <option>18:00</option>
                  </select>
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">????????????</p>
                <div class="con_box2">
                  <label for="option3" class="blind">
                    ?????? ?????? ??????
                  </label>
                  <select id="option3" class="w90" disabled>
                    <option>12:00</option>
                  </select>
                  <span>~</span>
                  <label for="option4" class="blind">
                    ?????? ?????? ??????
                  </label>
                  <select id="option4" class="w90" disabled>
                    <option>13:00</option>
                  </select>
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title2">????????????</p>
                <div class="con_box2">
                  <div>
                    <input type="checkbox" id="check1" />
                    <label for="check1" class="mglt10">
                      ????????? ??????
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
                <p class="con_title2">?????? ?????? ??????</p>
                <div class="con_box2">
                  <label for="option5" class="blind">
                    ?????? ??????
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
              ??????
            </button>
            <button type="button" class="btn btn-primary">
              ??????
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalTest;
