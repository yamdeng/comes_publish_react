import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from 'util/HOC';
import CodeSelect from 'component/ui/CodeSelect';
import SearchInput from 'component/ui/SearchInput';

import AppDatePicker from 'component/ui/AppDatePicker';
import AppTimePicker from 'component/ui/AppTimePicker';
import ReactHelper from 'util/ReactHelper';
import Constant from 'config/Constant';
import ReactTooltip from 'react-tooltip';

/*

    이름 : 가이드 폼1

    route
     -/test/guide/form1

    store
     -guideFormStore

*/

@HOC.documentTitle('가이드 폼1')
@HOC.formStore()
@withRouter
@inject('guideFormStore')
@observer
class GuideForm1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // HOC 사용
    this.props.setCurrentFormStore(this.props.guideFormStore);

    // 현재 formStore 셋팅
    // this.currentFormStore = this.props.guideFormStore;

    // 공통 인풋 변경 핸들러
    // this.handleInputOnChange = ReactHelper.handleInputOnChange.bind(this);

    // 공통 인풋 변경 핸들러
    // this.handleInputOnBlur = ReactHelper.handleInputOnBlur.bind(this);

    // [저장] 버튼 핸들러
    this.save = this.save.bind(this);
  }

  save() {
    let { guideFormStore } = this.props;
    guideFormStore.save();
  }

  componentDidMount() {
    let { guideFormStore } = this.props;
    let detailId = this.props.match.params.detailId;
    if (detailId !== Constant.FORM_ADD_ID) {
      // guideFormStore.getFormData(detailId);
    }
  }

  render() {
    let { guideFormStore, save } = this.props;
    let { formData, isFormValid } = guideFormStore;
    let { handleInputOnChange, handleInputOnBlur } = this.props;
    // let { handleInputOnChange, handleInputOnBlur } = this;

    return (
      <div className="content_area">
        <h3>게시판 등록 / 수정</h3>
        <div className="write_form">
          <div className="form_table">
            <div className="form_cell f_wid30">
              <span className="form_group form_search form_clear wid70 c_mr5">
                <SearchInput
                  value={''}
                  label="게시판 번호"
                  clearInput={this.clearInput}
                  onChange={this.changeTitle}
                />
              </span>
              <ReactTooltip id="toolTip" type="info">
                <span>조회입니다</span>
              </ReactTooltip>
              <button
                className="btn_text btn_green"
                data-tip
                data-for="toolTip"
              >
                조회
              </button>
            </div>
            <div className="form_cell f_wid20">
              <span className="form_group wid100 c_mr5">
                <input type="text" className="form_tag " disabled />
                <label className="f_label">작성자</label>
              </span>
            </div>
            <div className="form_cell f_wid20">
              <span className="form_group wid100 c_mr5">
                <input type="text" className="form_tag " disabled />
                <label className="f_label">작성일시</label>
              </span>
            </div>
          </div>
          <hr className="line" />
          <div className="form_table">
            <div className="form_cell f_wid50">
              <span className="form_group f_wid50 c_mr5">
                <CodeSelect
                  label="게시유형"
                  codeType="boardType"
                  name={formData.boardType.inputName}
                  value={formData.boardType.value}
                  onChange={handleInputOnChange}
                  required={formData.boardType.isRequired}
                  isValid={formData.boardType.isValid}
                  errorMessage={formData.boardType.errorMessage}
                  onBlur={handleInputOnBlur}
                />
              </span>
            </div>
          </div>
          <hr className="line" />
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid100 c_mr5">
                <input
                  type="text"
                  className={
                    formData.title.isValid ? 'form_tag' : 'form_tag invalid'
                  }
                  name={formData.title.inputName}
                  value={formData.title.value}
                  onChange={handleInputOnChange}
                  onBlur={handleInputOnBlur}
                />
                <label className="f_label" for="b">
                  제목 <span className="required">*</span>
                </label>
                <span
                  style={{ display: formData.title.isValid ? 'none' : '' }}
                  class="invalid_txt"
                >
                  {formData.title.errorMessage}
                </span>
              </span>
            </div>
          </div>
          <hr className="line" />
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid100 c_mr5">
                <textarea
                  className={
                    formData.content.isValid
                      ? 'form_tag textarea'
                      : 'form_tag textarea invalid'
                  }
                  name={formData.content.inputName}
                  value={formData.content.value}
                  onChange={handleInputOnChange}
                  onBlur={handleInputOnBlur}
                ></textarea>
                <label className="f_label" for="b">
                  내용 <span className="required">*</span>
                </label>
                <span
                  style={{
                    display: formData.content.isValid ? 'none' : ''
                  }}
                  class="invalid_txt textarea"
                >
                  {formData.content.errorMessage}
                </span>
              </span>
            </div>
          </div>
          {/* 공개시작 기간, 공개종료 기간 */}
          <hr className="line" />
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid40 c_mr5">
                <AppDatePicker
                  id="startDate"
                  label="공개시작기간"
                  name={formData.startDate.inputName}
                  value={formData.startDate.value}
                  onChange={handleInputOnChange}
                  required={formData.startDate.isRequired}
                  isValid={formData.startDate.isValid}
                  errorMessage={formData.startDate.errorMessage}
                  onBlur={handleInputOnBlur}
                />
              </span>
              <span className="form_group wid40">
                <AppDatePicker
                  id="endDate"
                  label="공개종료기간"
                  name={formData.endDate.inputName}
                  value={formData.endDate.value}
                  onChange={handleInputOnChange}
                  required={formData.endDate.isRequired}
                  isValid={formData.endDate.isValid}
                  errorMessage={formData.endDate.errorMessage}
                  onBlur={handleInputOnBlur}
                />
              </span>
            </div>
          </div>
          <hr className="line" />
          {/* 공개시작 시간, 공개종료 시간 */}
          <div className="form_table">
            <div className="form_cell f_wid100">
              <span className="form_group wid40 c_mr5">
                <AppTimePicker
                  id="startTime"
                  label="공개시작시간"
                  name={formData.startTime.inputName}
                  value={formData.startTime.value}
                  onChange={handleInputOnChange}
                  required={formData.startTime.isRequired}
                  isValid={formData.startTime.isValid}
                  errorMessage={formData.startTime.errorMessage}
                  onBlur={handleInputOnBlur}
                />
              </span>
              <span className="form_group wid40">
                <AppTimePicker
                  id="endTime"
                  label="공개종료시간"
                  name={formData.endTime.inputName}
                  value={formData.endTime.value}
                  onChange={handleInputOnChange}
                  required={formData.endTime.isRequired}
                  isValid={formData.endTime.isValid}
                  errorMessage={formData.endTime.errorMessage}
                  onBlur={handleInputOnBlur}
                />
              </span>
            </div>
          </div>
          <div className="form_table">
            <div className="form_cell c_pb0 c_pt0">
              <div className="radio-wrapper c_mr30">
                <input
                  type="radio"
                  id="useYn1"
                  name={formData.useYn.inputName}
                  value="Y"
                  checked={formData.useYn.value === 'Y'}
                  onChange={handleInputOnChange}
                />
                <label className="radio-label" for="useYn1">
                  사용
                </label>
              </div>
              <div className="radio-wrapper">
                <input
                  type="radio"
                  id="useYn2"
                  name={formData.useYn.inputName}
                  value="N"
                  checked={formData.useYn.value === 'N'}
                  onChange={handleInputOnChange}
                />
                <label className="radio-label" for="useYn2">
                  미사용
                </label>
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="group_box_wrap invalid c_mt25">
            <p className="txt">작업계획서</p>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <div className="checkbox-wrapper c_mr10 c_mt5">
                  <input
                    type="checkbox"
                    name="checked1"
                    id="checked1"
                    checked={formData.checked1.value}
                    onChange={handleInputOnChange}
                  />
                  <label className="checkbox-label" for="checked1">
                    오거크레인 카고트럭
                  </label>
                </div>
                <div className="checkbox-wrapper c_mt5">
                  <input
                    type="checkbox"
                    name="checked2"
                    id="checked2"
                    checked={formData.checked2.value}
                    onChange={handleInputOnChange}
                  />
                  <label className="checkbox-label" for="checked2">
                    운반용 화물트럭
                  </label>
                </div>
                {/* <span class="invalid_txt">유효하지 않습니다.</span> */}
              </div>
            </div>
            <span class="invalid_txt">유효하지 않습니다.</span>
          </div>
          <hr className="line" />
          {/* 파일첨부가 하나도 없을 경우 */}
          <div className="group_box_wrap invalid c_mt25">
            <p className="txt">파일 첨부</p>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid70 c_mr5">
                  <input
                    type="text"
                    className="form_tag center"
                    disabled
                    placeholder="파일을 첨부해주세요"
                  />
                  <label className="f_label" for="b">
                    첨부
                  </label>
                </span>
                <button className="btn_icon btn_dark_gray c_mr5">
                  <i class="fas fa-folder-open"></i>
                </button>
              </div>
            </div>
          </div>
          {/* 파일 첨부 영역 */}
          <div className="group_box_wrap invalid c_mt25">
            <p className="txt">파일 첨부</p>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid70 c_mr5">
                  <input
                    type="text"
                    className="form_tag center"
                    disabled
                    placeholder="xxxxx.pdf - 10kb"
                  />
                  <label className="f_label" for="b">
                    첨부
                  </label>
                  <span
                    className="icon icon_clear"
                    style={{ display: 'block' }}
                  >
                    <i class="fas fa-times-circle"></i>
                  </span>
                </span>
                <button className="btn_icon btn_dark_gray c_mr5">
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100">
                <span className="form_group wid70 c_mr5">
                  <input
                    type="text"
                    className="form_tag center"
                    disabled
                    placeholder="xxxxx.pdf - 10kb"
                  />
                  <label className="f_label" for="b">
                    첨부
                  </label>
                  <span
                    className="icon icon_clear"
                    style={{ display: 'block' }}
                  >
                    <i class="fas fa-times-circle"></i>
                  </span>
                </span>
                <button className="btn_icon btn_dark_gray c_mr5">
                  <i class="fas fa-times-circle"></i>
                </button>
              </div>
            </div>
            <div className="form_table">
              <div className="form_cell f_wid100 c_pt5">
                <span className="form_group wid70 c_mr5">
                  <input type="hidden" className="form_tag" />
                </span>
                <button className="btn_icon btn_dark_gray c_mr5">
                  <i class="fas fa-folder-open"></i>
                </button>
              </div>
            </div>
          </div>
          <span style={{ color: '#ed2129' }}>유효하지 않습니다.</span>
        </div>
        {/* 하단 버튼 */}
        <p className="c_pt15 right">
          <button className="btn_text btn_white c_mr5">취소</button>
          <button
            className="btn_text btn_green "
            disabled={!isFormValid}
            onClick={save}
          >
            등록
          </button>
        </p>
      </div>
    );
  }
}

export default GuideForm1;
