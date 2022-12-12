import React, { Component } from 'react';
import HOC from 'util/HOC';
import SAMPLE from '../resources/images/sample.png';
import SAFEINDEX_GAUGE from '../resources/images/safe-index-gauge.png';
import ICON_MORE from '../resources/images/ic_plus.png';

/*

    이름 : 홈

    route : /

    store
     -boardListStore

*/

@HOC.documentTitle('KT-SAFEDOC')
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <div className="home_flex_box">
          <div className="item">
            <div className="heibox _300">
              <p className="home_title h1">안전보건 체계</p>
              <ul className="list_flex">
                <li>
                  <span className="txt">안전보건관리책임자</span>
                  <span className="txt count">11명</span>
                </li>
                <li>
                  <span className="txt">안전보건총괄책임자</span>
                  <span className="txt count">11명</span>
                </li>
                <li>
                  <span className="txt">관리 감독자</span>
                  <span className="count">11명</span>
                </li>
                <li>
                  <span className="txt">안전보건담당자</span>
                  <span className="count">11명</span>
                </li>
                <li>
                  <span className="txt">
                    안전관리자
                    <br />
                    <span className="sub">자체 23명 위탁 11명</span>
                  </span>

                  <span className="count">11명</span>
                </li>
                <li>
                  <span className="txt">
                    보건관리자
                    <br />
                    <span className="sub">자체 23명 위탁 11명</span>
                  </span>

                  <span className="count">11명</span>
                </li>
                <li>
                  <span className="txt">산업안전보건위원회</span>
                  <span className="count">11구성</span>
                </li>
                <li>
                  <span className="txt">안전보건협의회</span>
                  <span className="count">11구성</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="home_sub_flex_box">
              <div className="sub_item heibox _300">
                <p className="home_title h2 relative">
                  공지사항{' '}
                  <span className="icon_more abrc">
                    <img src={ICON_MORE} alt="" />
                  </span>
                </p>
                <ul className="notice_list">
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                    <span className="new">new</span>
                  </li>
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                    <span className="new">new</span>
                  </li>
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                    <span className="new">new</span>
                  </li>
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                    <span className="new">new</span>
                  </li>
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                    <span className="new">new</span>
                  </li>
                </ul>
              </div>
              <div className="sub_item heibox _300">
                <p className="home_title h3">자료실</p>
                <ul className="notice_list">
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                    <span className="new">new</span>
                  </li>
                  <li className="_notice">
                    1분기 안전 보건 교육 1분기 안전 보건 교육{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="heibox _300 tablet_389">
              <p className="home_title h4">안전점검의 날</p>
              <ul className="img_list">
                <li>
                  <p className="img">
                    <img src={SAMPLE} alt="" />
                  </p>
                  <p className="txt">
                    이번달<span>7.5(월)</span>
                    <span className="download">다운로드</span>
                  </p>
                  <p className="txt">테마:승강기안전</p>
                </li>
                <li>
                  <p className="img">
                    <img src={SAMPLE} alt="" />
                  </p>
                  <p className="txt">
                    이번달<span>7.5(월)</span>
                    <span className="download">다운로드</span>
                  </p>
                  <p className="txt">테마:승강기안전</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="heibox _104">
              <p className="home_title h5">점검</p>
              <ul className="list_flex">
                <li>
                  <span className="txt">순회 점검</span>
                  <span className="txt count">당월 12건/누적 79건</span>
                </li>
                <li>
                  <span className="txt">합동 점검</span>
                  <span className="txt count">당월 12건/누적 79건</span>
                </li>
              </ul>
            </div>
            <div className="heibox _106">
              <p className="home_title h6">안전/보건서류 등록</p>
              <ul className="list_flex">
                <li className="_three">
                  <span className="txt">신규 등록</span>
                  <span className="txt count">79건</span>
                </li>
                <li className="_three">
                  <span className="txt">누적 점검</span>
                  <span className="txt count">79건</span>
                </li>
                <li className="_three">
                  <span className="txt">등록 지연</span>
                  <span className="txt count">79건</span>
                </li>
              </ul>
            </div>
            <div className="heibox _139">
              <p className="home_title h7">사고사례</p>
              <ul className="notice_list">
                <li>1분기 안전 보건 교육 1분기 안전 보건 교육 </li>
                <li>1분기 안전 보건 교육 1분기 안전 보건 교육 </li>
              </ul>
            </div>
          </div>
          <div className="item">
            <div className="heibox _389 relative">
              <p className="home_title h8">안전지수</p>
              <p className=" indices_txt col_red">
                <img
                  src={SAFEINDEX_GAUGE}
                  style={{
                    width: '100%',
                    maxWidth: '80%',
                    margin: '0 auto',
                    display: 'block'
                  }}
                />
              </p>
              {/* col_red, col_orange, col_yellow, col_green */}
              {/* <p className=" indices_txt col_red">매우 위험 : 99</p> */}
            </div>
          </div>
          <div className="item">
            <div className="heibox _65">
              <p className="home_title _1 h9">Safety 메세지 발송 (2021-03호)</p>
            </div>
            <div className="heibox _142">
              <p className="home_title h10">Best Practice</p>
              <ul className="notice_list">
                <li>1분기 안전 보건 교육 1분기 안전 보건 교육 </li>
                <li>1분기 안전 보건 교육 1분기 안전 보건 교육 </li>
              </ul>
            </div>
            <div className="heibox _142">
              <p className="home_title h11">직원 안전의견 제시</p>
              <ul className="notice_list _two">
                <li>안전장비 분야 </li>
                <li>안전프로세스 분야 </li>
                <li>현장 위험요소 발견 </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
