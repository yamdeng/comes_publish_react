import React, { Component } from 'react';

// edit-table
// 1.text input
// 2.select
// 3.text number
// 4.checkbox(일반)
// 5.checkbox(스위치)
// 6.radio

class EditTable extends Component {
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
        <h3>에디트 테이블</h3>
        <div className="list_form c_mt10">
          <div className="tb_wrap_scroll">
            <div className="horizon_tb">
              <table className="tb_list" style={{ minWidth: '1000px' }}>
                <caption></caption>
                <thead>
                  <tr>
                    <th>input(text)</th>
                    <th>input(number)</th>
                    <th>select</th>
                    <th>checkbox(일반)</th>
                    <th>checkbox(스위치)</th>
                    <th>라디오</th>
                  </tr>
                </thead>
                <tbody>
                  {/* td 기본은 center 정렬, left, right 넣어주면 됨. input,select 내부 정렬은 해당 테그에 넣어주면 됨 */}
                  <tr>
                    <td className="left">
                      <span className="form_group ">
                        <input type="text" className="form_tag center" />
                      </span>
                    </td>
                    <td className="right">
                      <span className="form_group ">
                        <input type="number" className="form_tag center" />
                      </span>
                    </td>
                    <td className="wid30">
                      <select name="" id="b" className="form_tag_select">
                        <option value="">전체1전체1전체1</option>
                        <option value="">전체1</option>
                        <option value="">전체2</option>
                      </select>
                    </td>
                    <td className="left">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        >
                          체크박스
                        </label>
                      </div>
                    </td>
                    <td className="right">
                      <div className="center inline-block">
                        <input
                          type="checkbox"
                          id="switchs"
                          name="switch"
                          className="switch_on_off"
                        />
                        <label for="switchs" className="switch_label_on_off">
                          <span className="marble"></span>
                          <span className="off">NO</span>
                          <span class="on">YES</span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="radio-wrapper">
                        <input
                          type="radio"
                          name="question-2"
                          value="43200000"
                          id="question-2-option-1"
                        />
                        <label
                          className="radio-label"
                          for="question-2-option-1"
                        >
                          라디오
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="form_group ">
                        <input type="text" className="form_tag " />
                      </span>
                    </td>
                    <td>
                      <span className="form_group ">
                        <input type="number" className="form_tag" />
                      </span>
                    </td>
                    <td>
                      <select name="" id="b" className="form_tag_select">
                        <option value=""> </option>
                        <option value="">전체1</option>
                        <option value="">전체2</option>
                      </select>
                    </td>
                    <td>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          name="Claude Monet"
                          id="question-1-option-1"
                        />
                        <label
                          className="checkbox-label"
                          for="question-1-option-1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div className="center inline-block">
                        <input
                          type="checkbox"
                          id="switchs2"
                          name="switch"
                          className="switch_on_off"
                        />
                        <label for="switchs2" className="switch_label_on_off">
                          <span className="marble"></span>
                          <span className="off"></span>
                          <span class="on"></span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="radio-wrapper">
                        <input
                          type="radio"
                          name="question-2"
                          value="43200000"
                          id="question-2-option-1"
                        />
                        <label
                          className="radio-label"
                          for="question-2-option-1"
                        >
                          라디오
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTable;
