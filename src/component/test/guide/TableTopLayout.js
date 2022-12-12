import React, { Component } from 'react';

class TableTopLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectClick: false
    };
    this.customClick = this.customClick.bind(this);
  }
  customClick() {
    this.setState({
      isSelectClick: !this.state.isSelectClick
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>상단 버튼 영역(input안에 버튼을 넣는 경우)</h3>
        <div className="box_form">
          {/* 
            아이콘이 버튼만 인풋안에 있는 case 
            form_group 에 _icon 추가
            button 을 form_group 안으로 넣는다.
          */}
          <div className="form_table">
            {/* form_cell f_wid50를 주어도 그에 맞는 form_cell f_wid50 태그를 주어야 wid100을 주었을 경우 50%안에서 100%가 먹음 */}
            <div className="form_cell f_wid50">
              <span className="form_group wid100 c_mr5 _icon">
                <input
                  type="text"
                  className="form_tag"
                  placeholder="팝업을 통해 검색해주세요"
                  disabled
                />
                <label className="f_label" for="b">
                  아이콘을 버튼을 안으로 + 50%
                </label>
                <button className="btn_icon btn_dark_gray">
                  <i class="fas fa-search"></i>
                </button>
              </span>
            </div>
            {/* form_cell 마크업에 내용이 없어도 스타일은 적용되기 때문에 경우에 따라 c_pt0 스타일을 적용함 */}
            {/* <div className="form_cell f_wid50 c_pt0"></div> */}
            {/* form_cell 마크업에 내용이 존재하는 경우는 c_pt0 줄 필요가 없음 */}
            <div className="form_cell f_wid50">
              <span className="form_group wid100 c_mr5 _icon">
                <input
                  type="text"
                  className="form_tag"
                  placeholder="팝업을 통해 검색해주세요"
                  disabled
                />
                <label className="f_label" for="b">
                  아이콘을 버튼을 안으로 + 50%
                </label>
                <button className="btn_icon btn_dark_gray">
                  <i class="fas fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          {/* 
             텍스트 버튼만 인풋안에 있는 case 
            form_group 에 _text 추가
            button 을 form_group 안으로 넣는다.
          */}
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group wid100 c_mr5 _text">
                <input type="text" className="form_tag" />
                <label className="f_label" for="b">
                  라벨 버튼을 안으로 + 정렬을 위한 c_pt0
                </label>
                <button className="btn_text btn_green">추가</button>
              </span>
            </div>
            <div className="form_cell f_wid50 c_pt0"></div>
          </div>

          {/* 
            클리어버튼과 아이콘버튼이 같이 쓰일때 case 
            form_group 에 _clear_icon 추가
            button 을 form_group 안으로 넣는다.
          */}
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid70 form_search form_clear c_mr5 _clear_icon">
                <input type="text" className="form_tag" />
                <label className="f_label" for="b">
                  모바일에서 %를 고정시킬경우 f_wid100으로 처리하고 form_group
                  wid70 이런식으로 부여함(많이는 사용않하는 경우)
                </label>
                <span className="icon icon_search">
                  <i class="fas fa-search"></i>
                </span>
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
                <button className="btn_icon btn_dark_gray">
                  <i class="fas fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          {/* 
            클리어버튼과 아이콘버튼이 같이 쓰일때 case 
            form_group 에 _clear_text 추가
            button 을 form_group 안으로 넣는다.
          */}
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid100 form_clear c_mr5 _clear_text">
                <input type="text" className="form_tag" />
                <label className="f_label" for="b">
                  f_wid100 100, wid100 100
                </label>
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
                <button className="btn_text btn_dark_gray">추가</button>
              </span>
            </div>
          </div>
          {/* 
            클리어버튼과 아이콘버튼이 같이 쓰일때 case 
            form_group 에 _clear_text 추가
            button 을 form_group 안으로 넣는다.
          */}
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group wid100 form_clear c_mr5 _clear_text">
                <input type="text" className="form_tag" />
                <label className="f_label" for="b">
                  [조회] 버튼을 두번째 컴포넌트 위치에 줘야할 경우
                </label>
                <span className="icon icon_clear" style={{ display: 'block' }}>
                  <i class="fas fa-times-circle"></i>
                </span>
                <button className="btn_text btn_dark_gray">추가</button>
              </span>
            </div>
            <div className="form_cell f_wid50 right">
              <button className="btn_text btn_green mobile_full">조회</button>
            </div>
          </div>

          {/* 조회 버튼 하나만 존재하는 경우는 아래와 같이 */}
          <p className="c_pt15 right">
            <button className="btn_text btn_green mobile_full">조회</button>
          </p>
        </div>
        {/* 기타 배치 */}
        <h3>상단 버튼 영역(기타 방법)</h3>
        <div className="box_form">
          {/* 1행 */}
          <div className="form_table">
            <div className="form_cell f_wid50 c_pr0">
              <span className="form_group wid100 c_mr5">
                <input type="text" className="form_tag" value={'KT'} />
                <label className="f_label" for="b">
                  이름2
                </label>
              </span>
            </div>
            <div className="form_cell f_wid50 right">
              <span className="form_group wid100 c_mr5">
                <button className="btn_text btn_green mobile_full">조회</button>
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid50">
                <input type="text" className="form_tag" value={'KT'} />
                <label className="f_label" for="b">
                  이름
                </label>
              </span>
              <span className="form_group wid50 right">
                <button className="btn_text btn_green">조회</button>
              </span>
            </div>
          </div>
          {/* 2행 */}
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid50">
                <input type="text" className="form_tag" value={'KT'} />
                <label className="f_label" for="b">
                  모바일에서도 [조회] 버튼이 바로 옆으로 되게끔
                </label>
              </span>{' '}
              <button className="btn_text btn_green">조회</button>
            </div>
          </div>
          {/* 3행 */}
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid50">
                <input type="text" className="form_tag" value={'KT'} />
                <label className="f_label" for="b">
                  모바일에서 [조회] 버튼이 100%로 나오게끔
                </label>
              </span>{' '}
              <button className="btn_text btn_green mobile_full m_mt15">
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableTopLayout;
