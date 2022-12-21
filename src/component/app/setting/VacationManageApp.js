import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';

const store = new CustomStore({
  key: 'OrderNumber',
  load(loadOptions) {
    let params = {};
    debugger;
    return ApiService.post('commutes/list.do', params).then((response) => {
      const data = response.data;
      return {
        data: data.list,
        totalCount: data.totalCount
      };
    });
  }
});

@inject('appStore', 'uiStore')
@observer
class VacationManageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="contents_sub" class="">
        <div class="sub_lnb">
          <h3>설정</h3>
          <ul class="sub_menu">
            <li class="on">
              <a href="javascript:void(0);">휴가발생관리</a>
            </li>
          </ul>
        </div>

        <div class="sub_con">
          <div class="site_location">
            <a href="javascript:void(0);">
              <img
                src={`${process.env.PUBLIC_URL}/images/ico_location.png`}
                alt="홈으로 가기"
              />
            </a>
            &gt;<a href="javascript:void(0);">출퇴근</a>&gt;
            <a href="javascript:void(0);">개인출퇴근</a>
          </div>

          <div class="tab_sub">
            <ul class="tab_subnav">
              <li>
                <a href="#tab01">일괄 발생</a>
              </li>
              <li>
                <a href="#tab02">조건 발생</a>
              </li>
            </ul>
            <div class="tab_subcontent">
              <div id="tab01">
                <div class="">
                  <ul class="search_area">
                    <li>
                      <div class="title">발생 연도</div>
                      <div class="con">
                        <input
                          type="text"
                          value="2022년"
                          disabled
                          class="w90"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="title">발생 대상</div>
                      <div class="con">
                        <ul class="con_flex">
                          <li>
                            <div class="radio">
                              <input
                                type="radio"
                                id="option1"
                                name="option"
                                checked
                              />
                              <label for="option1">전직원</label>
                            </div>
                            <label for="sel_option1" class="blind">
                              선택
                            </label>
                            <select id="sel_option1" class="mgrg40">
                              <option>------------------</option>
                              <option>------------------</option>
                              <option>------------------</option>
                              <option>------------------</option>
                            </select>
                          </li>
                          <li>
                            <div class="radio">
                              <input type="radio" id="option2" name="option" />
                              <label for="option2">
                                휴가 발생 데이터 없는 직원 선택
                              </label>
                            </div>
                            <label for="sel_option2" class="blind">
                              선택
                            </label>
                            <select id="sel_option2">
                              <option>
                                ------------------------------------
                              </option>
                              <option>
                                ------------------------------------
                              </option>
                              <option>
                                ------------------------------------
                              </option>
                              <option>
                                ------------------------------------
                              </option>
                            </select>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <div class="grid_top flex_sb mgtop20">
                    <div class="number">
                      <p>
                        발생대상 미리보기/수정( <b class="blue">228</b> )명
                      </p>
                    </div>
                    <div class="search_right">
                      <a href="javascript:void(0);" class="btn_ico">
                        <i class="ico_download"></i>엑셀다운로드
                      </a>
                      <a href="javascript:void(0);" class="btn_ico">
                        <i class="ico_copyfile"></i>복사
                      </a>
                    </div>
                  </div>
                  <p
                    style={{
                      border: '1px solid #d6d6d6',
                      height: 300,
                      fontSize: 15,
                      lineHeight: 300,
                      textAlign: 'center',
                      maxWidth: 1600
                    }}
                  >
                    <DataGrid
                      dataSource={store}
                      showBorders={true}
                      remoteOperations={true}
                    >
                      <Column dataField="OrderNumber" dataType="number" />
                      <Column dataField="OrderDate" dataType="date" />
                      <Column dataField="StoreCity" dataType="string" />
                      <Column dataField="StoreState" dataType="string" />
                      <Column dataField="Employee" dataType="string" />
                      <Column
                        dataField="SaleAmount"
                        dataType="number"
                        format="currency"
                      />
                      <Paging defaultPageSize={12} />
                      <Pager showPageSizeSelector={true} />
                    </DataGrid>
                  </p>
                </div>
                <div class="btn_area relative mgtop10">
                  <div class="btn_right">
                    <a class="btn_normal btn_blue" href="#">
                      휴가발생
                    </a>
                  </div>
                </div>
              </div>

              <div id="tab02">
                <div class="">
                  <ul class="search_area">
                    <li>
                      <div class="title">발생 연도</div>
                      <div class="con">
                        <input
                          type="text"
                          value="2022년"
                          disabled
                          class="w90"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="title">발생 대상</div>
                      <div class="con">
                        <ul class="con_flex">
                          <li>
                            <div class="radio">
                              <input
                                type="radio"
                                id="option1"
                                name="option"
                                checked
                              />
                              <label for="option1">전직원</label>
                            </div>
                          </li>
                          <li>
                            <div class="radio">
                              <input type="radio" id="option2" name="option" />
                              <label for="option2">
                                휴가 발생 데이터 없는 직원 선택
                              </label>
                            </div>
                            <label for="sel_option" class="blind">
                              실 선택
                            </label>
                            <select id="sel_option">
                              <option>
                                ------------------------------------
                              </option>
                              <option>
                                ------------------------------------
                              </option>
                              <option>
                                ------------------------------------
                              </option>
                              <option>
                                ------------------------------------
                              </option>
                            </select>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="title">휴가발생</div>
                      <div class="con">
                        <label for="vacation_option1" class="mgrg20">
                          휴가이름
                        </label>
                        <input type="text" id="vacation_option1" />
                        <label for="vacation_option2" class="mgrg20">
                          휴가일수
                        </label>
                        <input type="text" id="vacation_option2" class="w90" />
                        <a href="#" class="btn_normal btn_blue">
                          적용
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationManageApp;
