import { observable, action, runInAction } from 'mobx';
import FormStore from 'store/ui/FormStore';
import Helper from 'util/Helper';
import ApiService from 'service/ApiService';
import Constant from 'config/Constant';

/*
  
  폼 가이드 store

*/
class GuideFormStore extends FormStore {
  @observable
  test = 'aaa';

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
    this.initFormData();
  }

  @action
  initFormData() {
    // 기본 예시
    // formData.memberId = {
    //   inputName: 'memberId',
    //   value: null,
    //   touched: false,
    //   isRequired: true,
    //   isValid: true
    // };

    // formData.count = {
    //   inputName: 'count',
    //   value: 0,
    //   touched: false,
    //   isRequired: true,
    //   isValid: true,
    //   isNumber: true
    // };

    let formData = {};
    // input명과 필수 여부 전달
    formData.title = Helper.getDefaultInputData('title', true);
    formData.content = Helper.getDefaultInputData('content', true);
    formData.boardType = Helper.getDefaultInputData('boardType', true);
    formData.startDate = Object.assign(
      Helper.getDefaultInputData('startDate', true),
      { value: Helper.getTodayString() }
    );
    formData.startDate = Object.assign(
      Helper.getDefaultInputData('startDate', true),
      { value: '2021-03-01T13:00:00.111' }
    );
    formData.endDate = Helper.getDefaultInputData('endDate', true);
    formData.startTime = Helper.getDefaultInputData('startTime', true);
    formData.endTime = Helper.getDefaultInputData('endTime', true);
    formData.useYn = Helper.getDefaultInputData('useYn', true, 'N');
    formData.checked1 = Helper.getDefaultInputData('checked1', false, true);
    formData.checked2 = Helper.getDefaultInputData('checked2', false, true);
    formData.approverId = Object.assign(
      Helper.getDefaultInputData('approverId', true),
      { isObject: true, keyName: 'orgId' }
    );

    formData.approverId = Object.assign(
      Helper.getDefaultInputData('approverId', true),
      { isObject: true, keyName: 'orgId' }
    );

    // value 값을 특정한 값으로 초기화시키고 싶을때(등록폼에만 해당함. 수정폼에서는 서버 데이터 기준으로 셋팅됨)
    // formData.name = Object.assign(Helper.getDefaultInputData('name', false), { value: 0 });

    this.formData = formData;
  }

  // @action
  // save() {
  //   if (this.validate()) {
  //     let apiParam = this.getApiParam();
  //     // 추가 액션
  //   }
  // }

  // @action
  // validate() {
  //   let success = super.validate();
  //   // 추가 validate
  //   if (success) {
  //   }
  //   return success;
  // }

  // 상세 정보 가져와서 formData에 맵핑시키기
  @action
  getFormData(detailId) {
    this.detailId = detailId;
    this.formType = Constant.FORM_TYPE_UPDATE;
    ApiService.get('boards/' + detailId).then((response) => {
      runInAction(() => {
        let data = response.data;
        this.setFormData(data);
      });
    });
  }

  // 상세 정보 가져오기
  @action
  getDetail(detailId) {
    this.detailId = detailId;
    ApiService.get('boards/' + detailId).then((response) => {
      runInAction(() => {
        let data = response.data;
        this.detailInfo = data;
      });
    });
  }

  @action
  clear() {
    super.clearForm();
  }
}

export default GuideFormStore;
