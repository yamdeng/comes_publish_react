import React, { Component } from 'react'; import { observer, inject } from
'mobx-react'; import 'devextreme/data/odata/store'; import DataGrid, { Column,
Paging, Pager } from 'devextreme-react/data-grid'; import CustomStore from
'devextreme/data/custom_store'; import DataStore from
'devextreme/data/data_source'; import ApiService from 'service/ApiService';
import DatePicker from 'react-datepicker'; import ReportModal from
'component/modal/ReportModal'; import { Button, Modal, ModalHeader, ModalBody,
ModalFooter } from 'reactstrap';

// const store = new CustomStore({ // load(loadOptions) { // let params = {}; //
// return ApiService.get('commutes/list.do', params).then((response) => { //
const data = response.data; // return { // data: data.list, // totalCount:
data.totalCount // }; // }); // } // });

function isNotEmpty(value) { return value !== undefined && value !== null &&
value !== ''; }

const allowedPageSizes = [8, 12, 20];

@inject('appStore', 'uiStore') @observer class CommuteDeptApp extends Component
{ constructor(props) { super(props); this.state = { isOpen: false, startDate:
'', store: null, searchParam: { aaa: 'aaa' } }; this.dateBoxRef =
React.createRef();

    this.datagridRef = React.createRef();

    this.openTest = this.openTest.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.openModal = this.openModal.bind(this);

    this.changeParam = this.changeParam.bind(this);

}

changeParam() { let { searchParam } = this.state; let result = searchParam.aaa +
's'; this.setState({ searchParam: { aaa: result } }); }

openTest() { this.setState({ isOpen: true }); }

handleChange() { this.setState({ isOpen: false }); }

openModal() { // let { store } = this.state;

    const store = new CustomStore({
      key: 'OrderNumber',
      load(loadOptions) {
        let params = '?';
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary'
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
          }
        });

        params = params.slice(0, -1);

        return fetch(
          `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
        )
          .then((response) => response.json())
          .then((data) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount
          }))
          .catch(() => {
            throw new Error('Data Loading Error');
          });
      }
    });

    this.setState({ store: store });

    // let test = this.datagridRef.current;

    // test.instance.filter(['searchMonth', '=', 'aaaa']);
    // test.instance.refresh();

    // store.filter(['searchMonth', '=', 'aaaa']);

    // store.load().then((response) => {
    //
    // });
    // ApiService.get('commutes/list.do', {}).then((response) => {
    //   const data = response.data;
    //   store.load().then((response) => {
    //
    //   });
    // });
    // $('#report').modal('show');

}

componentDidMount() { console.log('store : ' + store);

    // store.load();
    // store.load(loadOptions).
    //   let params = {};
    //
    //   return ApiService.get('commutes/list.do', params).then((response) => {
    //     const data = response.data;
    //     return {
    //       data: data.list,
    //       totalCount: data.totalCount
    //     };
    //   });
    // }

    const state = this.state;

    const store = new CustomStore({
      key: 'OrderNumber',
      load(loadOptions) {
        let params = '?';
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary'
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params += `${i}=${JSON.stringify(loadOptions[i])}&`;
          }
        });

        const { searchParam } = state;
        params = params.slice(0, -1);
        console.log('searchParam.aaa : ' + searchParam.aaa);

        return fetch(
          `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
        )
          .then((response) => response.json())
          .then((data) => ({
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount
          }))
          .catch(() => {
            throw new Error('Data Loading Error');
          });
      }
    });

    this.setState({ store: store });

}

render() { let { isOpen, startDate, store } = this.state; return (
<div id="contents_sub" class=""> <div class="sub_lnb"> <h3>?????????</h3>
<ul class="sub_menu"> <li class="on"> <a href="javascript:void(0);">????????????
???</a> </li> <li> <a href="javascript:void(0);">???????????????</a> </li> <li>
<a href="javascript:void(0);">???????????????</a> </li> <li>
<a href="javascript:void(0);">?????????????????????</a> </li> <li>
<a href="javascript:void(0);">?????????????????????</a> </li> </ul> </div>

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="????????? ??????"
              />
            </a>
            &gt;<a href="javascript:void(0);">?????????</a>&gt;
            <a href="javascript:void(0);">???????????????</a>
          </div>

          <div class="sub_top" style={{ overflow: 'visible' }}>
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
            <div class="grp_cale_option">
              <ul id="calelist" class="flex_sb">
                <li>
                  <div class="radio">
                    <input
                      type="radio"
                      id="cale_option1"
                      name="cale_option"
                      checked
                    />
                    <label for="cale_option1">??????</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input type="radio" id="cale_option2" name="cale_option" />
                    <label for="cale_option2">??????</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input type="radio" id="cale_option3" name="cale_option" />
                    <label for="cale_option3">??????</label>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="sel_month calelist_month cale_option1 on"
              style={{ zIndex: 1 }}
            >
              <a href="javascript:void(0);" class="prev">
                ?????? ???
              </a>
              <span class="txt_month" onClick={() => console.log('aaa')}>
                6??? 15???(???2)
              </span>
              <a href="javascript:void(0);" class="next">
                ?????? ???
              </a>

              <a
                href="javascript:void(0);"
                class="month"
                onClick={() => console.log('ssss')}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="??? ????????????"
                  onClick={this.openTest}
                />
              </a>
              {isOpen && (
                <DatePicker
                  selected={startDate}
                  onChange={this.handleChange}
                  showYearDropdown={true}
                  showMonthDropdown={true}
                  dropdownMode="select"
                  inline
                />
              )}
            </div>
            <div class="sel_month calelist_month cale_option2">
              <a href="javascript:void(0);" class="prev">
                ?????? ???
              </a>
              <span class="txt_month">2022??? 6???</span>
              <a href="javascript:void(0);" class="next">
                ?????? ???
              </a>
              <a href="javascript:void(0);" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="??? ????????????"
                />
              </a>
            </div>
            <div class="sel_month calelist_month cale_option3">
              <a href="javascript:void(0);" class="prev">
                ?????? ???
              </a>
              <span class="txt_month2">2022-06-01</span>
              <a href="javascript:void(0);" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="??? ????????????"
                />
              </a>
              <span>~</span>
              <span class="txt_month2">2022-06-15</span>
              <a href="javascript:void(0);" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="??? ????????????"
                />
              </a>
              <a href="javascript:void(0);" class="next">
                ?????? ???
              </a>
            </div>
            <a
              href="javascript:void(0);"
              class="btn_right btn_search_big"
              onClick={this.openModal}
            >
              ??????
            </a>
          </div>

          <div class="sub_serch_result">
            <ul class="flex_ul_box flex_sb">
              <li class="flex_center">
                <div onClick={this.changeParam}>
                  <span>?????? ???2</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>?????? ???</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>????????????</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>????????????</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>????????????</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>??????</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>??????/??????</span>
                  <b>6</b>
                </div>
              </li>
            </ul>
          </div>

          <div class="sub_serch_result">
            <div class="relative btn_area mgtopm20">
              <a
                href="javascript:void(0);"
                onclick="showID('toggle_tip2')"
                class="btn_tooltip btn_right"
              >
                <img src={`${process.env.PUBLIC_URL}/images/btn_info.png`} />
              </a>
              <div id="toggle_tip2" class="tip_box" style={{ display: 'none' }}>
                {' '}
                ???????????? / ?????? / ??????,??????{' '}
              </div>
            </div>
            <div class="relative">
              <a href="javascript:void(0);" class="btn_nepr prev">
                <span>??????</span>
              </a>
              <div class="flex_ul_box_container">
                <ul class="flex_ul_box flex_sb">
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>????????? ??????</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                </ul>
              </div>
              <a href="javascript:void(0);" class="btn_nepr next">
                <span>??????</span>
              </a>
            </div>
          </div>

          <div class="flex_sb hidden">
            <div class="work_result_half relative">
              <h3>
                <span>9</span>??? ?????? ?????? ??????{' '}
                <a
                  href="javascript:void(0);"
                  onclick="showID('toggle_tip4')"
                  class="btn_right"
                >
                  <img src={`${process.env.PUBLIC_URL}/images/btn_info.png`} />
                </a>
              </h3>

              <div id="toggle_tip4" class="tip_box" style={{ display: 'none' }}>
                {' '}
                [??????] ?????? ?????? ?????? 10?????? ???????????? ?????? ????????? ??????
                <br />
                [???/?????? ?????????] ?????? ????????? ???/?????? ????????? ??????
              </div>
              <div class="flex_center bg">
                <div class="result">
                  <h4>??????</h4>
                  <p class="blue">0</p>
                </div>
                <div class="result">
                  <h4>??????/??????</h4>
                  <p class="blue">0 / 0</p>
                </div>
              </div>
            </div>
            <div class="team_result relative">
              <div class="relative btn_area mg10">
                <h3>
                  ????????? ????????? ????????? ????????????.
                  <a
                    href="javascript:void(0);"
                    onclick="showID('toggle_tip5')"
                    class="btn_right"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/btn_info.png`}
                    />
                  </a>
                </h3>
              </div>
              <div id="toggle_tip5" class="tip_box" style={{ display: 'none' }}>
                ???????????? / ?????? / ??????,?????? / ?????? ?????? ??????
              </div>
              <div class="sub_serch_result relative">
                <a href="javascript:void(0);" class="btn_nepr prev">
                  <span>??????</span>
                </a>
                <div class="flex_ul_box_container_half">
                  <ul class="flex_ul_box flex_sb">
                    <li class="flex_center">
                      <div>
                        <span>SQ01</span>
                        <b>7 / 0 / 0 / 8</b>
                      </div>
                    </li>
                    <li class="flex_center">
                      <div>
                        <span>SQ03</span>
                        <b>7 / 0 / 0 / 8</b>
                      </div>
                    </li>
                    <li class="flex_center">
                      <div>
                        <span>SQ04</span>
                        <b>7 / 0 / 0 / 8</b>
                      </div>
                    </li>
                    <li class="flex_center">
                      <div>
                        <span>SQ07</span>
                        <b>7 / 0 / 0 / 8</b>
                      </div>
                    </li>
                    <li class="flex_center">
                      <div>
                        <span>SQ09</span>
                        <b>7 / 0 / 0 / 8</b>
                      </div>
                    </li>
                  </ul>
                </div>
                <a href="javascript:void(0);" class="btn_nepr next">
                  <span>??????</span>
                </a>
              </div>
            </div>
          </div>

          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>
                  <b class="blue">6</b> ???
                </p>
              </div>
              <div class="search_right">
                <a href="javascript:void(0);" class="btn_normal">
                  ??????
                </a>
                <a href="javascript:void(0);" class="btn_normal btn_blue">
                  ??????
                </a>
              </div>
            </div>
            <div class="mgtop10">
              <p
                style={{
                  height: 700,
                  fontSize: 15,
                  // lineHeight: 300,
                  textAlign: 'center',
                  maxWidth: 1600
                }}
              >
                <DataGrid
                  width={'100%'}
                  dataSource={store}
                  showBorders={true}
                  remoteOperations={true}
                  ref={this.datagridRef}
                >
                  <Column dataField="OrderNumber" dataType="number" />
                  <Column dataField="OrderDate" dataType="date" />
                  <Column dataField="StoreCity" dataType="string" />
                  <Paging defaultPageSize={10} />
                  <Pager showPageSizeSelector={true} />
                </DataGrid>
              </p>
            </div>
          </div>
        </div>

        {/* sd */}

        <Modal isOpen={false} className={'modal_box_850 modal_box'}>
          <div class="modal-header popup_head ">
            <h5 class="modal-title">?????? ????????????</h5>
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
              <div class="flex_sb">
                <p class="con_title">??????</p>
                <div class="con_box">
                  <input
                    type="text"
                    class="w100p"
                    placeholder="????????? ??????????????????."
                  />
                </div>
              </div>
              <div class="flex_sb mgtop10">
                <p class="con_title">??????</p>
                <div class="con_box">
                  <textarea
                    maxlength="100"
                    placeholder="????????? ????????? ?????? ???????????? ????????? ???????????????.&#13;&#10;????????? ??????????????? ???????????????."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="">
              ??????
            </button>
            <button type="button" class="btn btn-primary" onclick="">
              ?????????
            </button>
          </div>
        </Modal>

        <Modal isOpen={false} className={'modal_box_850 modal_box'}>
          <div class="modal-content">
            <div class="modal-header popup_head">
              <h5 class="modal-title">?????? ????????? ??????</h5>
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

                  <div class="mgtop10">
                    <p
                      style={{
                        height: 50,
                        fontSize: 15,
                        lineHeight: 50,
                        textAlign: 'center'
                      }}
                    >
                      ????????? ?????? ?????? ????????? ???????????? ???????????? ?????????.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                onclick="closePopup('modal2')"
              >
                ??????
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );

} }

export default CommuteDeptApp;
