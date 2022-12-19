import React, { Component } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import DatePicker from 'react-datepicker';

const store = new CustomStore({
  key: 'OrderNumber',
  load(loadOptions) {
    let params = {};
    return ApiService.get('commutes/list.do', params).then((response) => {
      const data = response.data;
      return {
        data: data.list,
        totalCount: data.totalCount
      };
    });
  }
});

class CommuteDeptApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, startDate: '' };
    this.dateBoxRef = React.createRef();

    this.openTest = this.openTest.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  openTest() {
    this.setState({ isOpen: true });
  }

  handleChange() {
    this.setState({ isOpen: false });
  }

  render() {
    let { isOpen, startDate } = this.state;
    return (
      <div id="contents_sub" class="">
        <div class="sub_lnb">
          <h3>출퇴근</h3>
          <ul class="sub_menu">
            <li class="on">
              <a href="javascript:void(0);">개인출퇴근</a>
            </li>
            <li>
              <a href="javascript:void(0);">팀원출퇴근</a>
            </li>
            <li>
              <a href="javascript:void(0);">실원출퇴근</a>
            </li>
            <li>
              <a href="javascript:void(0);">전체출퇴근관리</a>
            </li>
            <li>
              <a href="javascript:void(0);">전체출퇴근통계</a>
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

          <div class="sub_top" style={{ overflow: 'visible' }}>
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
                    <label for="cale_option1">하루</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input type="radio" id="cale_option2" name="cale_option" />
                    <label for="cale_option2">월간</label>
                  </div>
                </li>
                <li>
                  <div class="radio">
                    <input type="radio" id="cale_option3" name="cale_option" />
                    <label for="cale_option3">기간</label>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="sel_month calelist_month cale_option1 on"
              style={{ zIndex: 9999 }}
            >
              <a href="#" class="prev">
                이전 일
              </a>
              <span class="txt_month" onClick={() => console.log('aaa')}>
                6월 15일(수2)
              </span>
              <a href="#" class="next">
                다음 일
              </a>

              <a href="#" class="month" onClick={() => console.log('ssss')}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
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
              <a href="#" class="prev">
                이전 달
              </a>
              <span class="txt_month">2022년 6월</span>
              <a href="#" class="next">
                다음 달
              </a>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
            </div>
            <div class="sel_month calelist_month cale_option3">
              <a href="#" class="prev">
                이전 달
              </a>
              <span class="txt_month2">2022-06-01</span>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
              <span>~</span>
              <span class="txt_month2">2022-06-15</span>
              <a href="#" class="month">
                <img
                  src={`${process.env.PUBLIC_URL}/images/btn_modify_month.png`}
                  alt="월 선택하기"
                />
              </a>
              <a href="#" class="next">
                다음 달
              </a>
            </div>
            <a href="javascript:void(0);" class="btn_right btn_search_big">
              조회
            </a>
          </div>

          <div class="sub_serch_result">
            <ul class="flex_ul_box flex_sb">
              <li class="flex_center">
                <div>
                  <span>업무 중2</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>재택 중</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>오전반차</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>오후반차</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>업무종료</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>지각</span>
                  <b>6</b>
                </div>
              </li>
              <li class="flex_center">
                <div>
                  <span>휴가/휴직</span>
                  <b>6</b>
                </div>
              </li>
            </ul>
          </div>

          <div class="sub_serch_result">
            <div class="relative btn_area mgtopm20">
              <a
                href="#"
                onclick="showID('toggle_tip2')"
                class="btn_tooltip btn_right"
              >
                <img src={`${process.env.PUBLIC_URL}/images/btn_info.png`} />
              </a>
              <div id="toggle_tip2" class="tip_box" style={{ display: 'none' }}>
                {' '}
                정상출근 / 지각 / 휴가,휴직{' '}
              </div>
            </div>
            <div class="relative">
              <a href="#" class="btn_nepr prev">
                <span>이전</span>
              </a>
              <div class="flex_ul_box_container">
                <ul class="flex_ul_box flex_sb">
                  <li class="flex_center">
                    <div>
                      <span>김소영 대리</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>박정수 대리</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>백희망 대리</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>신동우 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>안지수 대리</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>주민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>이민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>이민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                  <li class="flex_center">
                    <div>
                      <span>이민호 사원</span>
                      <b>7 / 0 / 0</b>
                    </div>
                  </li>
                </ul>
              </div>
              <a href="#" class="btn_nepr next">
                <span>다음</span>
              </a>
            </div>
          </div>

          <div class="flex_sb hidden">
            <div class="work_result_half relative">
              <h3>
                <span>9</span>월 실원 근태 현황{' '}
                <a href="#" onclick="showID('toggle_tip4')" class="btn_right">
                  <img src={`${process.env.PUBLIC_URL}/images/btn_info.png`} />
                </a>
              </h3>

              <div id="toggle_tip4" class="tip_box" style={{ display: 'none' }}>
                {' '}
                [지각] 근무 시작 시간 10분을 초과하여 출근 체크한 건수
                <br />
                [출/퇴근 미체크] 조회 기간의 출/퇴근 미체크 건수
              </div>
              <div class="flex_center bg">
                <div class="result">
                  <h4>지각</h4>
                  <p class="blue">0</p>
                </div>
                <div class="result">
                  <h4>휴가/휴직</h4>
                  <p class="blue">0 / 0</p>
                </div>
              </div>
            </div>
            <div class="team_result relative">
              <div class="relative btn_area mg10">
                <h3>
                  제목을 넣으면 좋을거 같습니다.
                  <a href="#" onclick="showID('toggle_tip5')" class="btn_right">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/btn_info.png`}
                    />
                  </a>
                </h3>
              </div>
              <div id="toggle_tip5" class="tip_box" style={{ display: 'none' }}>
                정상출근 / 지각 / 휴가,휴직 / 평균 근무 시간
              </div>
              <div class="sub_serch_result relative">
                <a href="#" class="btn_nepr prev">
                  <span>이전</span>
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
                <a href="#" class="btn_nepr next">
                  <span>다음</span>
                </a>
              </div>
            </div>
          </div>

          <div class="">
            <div class="grid_top flex_sb mgtop20">
              <div class="number">
                <p>
                  <b class="blue">6</b> 명
                </p>
              </div>
              <div class="search_right">
                <a href="javascript:void(0);" class="btn_normal">
                  수정
                </a>
                <a href="javascript:void(0);" class="btn_normal btn_blue">
                  제출
                </a>
              </div>
            </div>
            <div class="mgtop10">
              <p
                style={{
                  border: '1px solid #d6d6d6',
                  height: 700,
                  fontSize: 15,
                  lineHeight: 300,
                  textAlign: 'center'
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
          </div>
        </div>
      </div>
    );
  }
}

export default CommuteDeptApp;
