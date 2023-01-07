/* global reactPageType */

import { observable, action, runInAction } from 'mobx';
import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import ApiService from 'service/ApiService';
import moment from 'moment';
import Helper from 'util/Helper';
import ModalService from 'service/ModalService';

/*
  
  개인 출퇴근 store

*/

class HolidayManageStore {
  // datagridRef
  dataGridRef = null;

  // 개인_출퇴근 목록 grid
  @observable
  datagridStore = null;

  @observable
  totalCount = 0;

  // 검색 년
  @observable
  searchYear = '';

  // 년 datepicker 오픈 여부
  @observable
  yearDatepickerOpend = false;

  /* 이하는 모달 속성 */

  @observable
  visibleModal = false;

  // 휴일명
  @observable
  name = '';

  // 휴일날짜
  @observable
  holiDate = null;

  @action
  openFormModal() {
    this.visibleModal = true;
  }

  @action
  closeFormModal() {
    this.visibleModal = false;
    this.name = '';
    this.holiDate = null;
  }

  // 등록
  @action
  saveHolidate() {
    const name = this.name;
    const holiDate = this.holiDate;
    if (!name) {
      alert('휴일명은 필수입니다.');
      return;
    }
    if (!holiDate) {
      alert('날짜를 선택해주세요.');
      return;
    }

    const apiParam = { name };
    const holiDateStr = moment(holiDate).format('YYYYMMDD');
    apiParam.holiDateStr = holiDateStr;
    apiParam.baseYear = Helper.dateToString(this.searchYear, 'YYYY');

    ApiService.post('holiday/detail.do', { holiDateStr }).then((response) => {
      let detailInfo = response.data;
      if (detailInfo) {
        alert(holiDateStr + ' 날짜는 이미 등록되어있습니다.');
      } else {
        ApiService.post('holiday/add.do', apiParam).then((response) => {
          runInAction(() => {
            Helper.toastMessage('휴일이 등록되었습니다.');
            this.closeFormModal();
            this.search();
          });
        });
      }
    });
  }

  // 삭제
  @action
  delete(holiDateStr) {
    ModalService.confirm({
      content: `삭제하시겠습니까?`,
      ok: () => {
        ApiService.post('holiday/delete.do', { holiDateStr: holiDateStr }).then(
          (response) => {
            runInAction(() => {
              Helper.toastMessage('삭제되었습니다.');
              this.search();
            });
          }
        );
      }
    });
  }

  @action
  changeName(name) {
    this.name = name;
  }

  @action
  changeHoliDate(holiDate) {
    this.holiDate = holiDate;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // datepicker 초기화
  @action
  initSearchDateAll() {
    this.searchYear = moment().toDate();
  }

  // datagrid 컴포넌트 셋팅
  initDataGridComponent(dataGridRef) {
    this.dataGridRef = dataGridRef;
  }

  // pageIndex 초기화
  refreshPage() {
    if (
      this.dataGridRef &&
      this.dataGridRef.current &&
      this.dataGridRef.current.instance &&
      this.dataGridRef.current.instance.pageIndex
    ) {
      this.dataGridRef.current.instance.pageIndex(0);
    }
  }

  // [조회] 공통
  @action
  search() {
    this.refreshPage();
    let apiParam = {};
    apiParam.baseYear = Helper.dateToString(this.searchYear, 'YYYY');

    const store = new CustomStore({
      cacheEnabled: false,
      load: (loadOptions) => {
        if (loadOptions) {
          const { skip, take } = loadOptions;
          if (take) {
            apiParam.pageSize = take;
            apiParam.offset = skip;
          } else {
            apiParam.pageSize = null;
            apiParam.offset = null;
          }
        }
        return ApiService.post('holiday/list.do', apiParam).then((response) => {
          const data = response.data;
          runInAction(() => {
            this.totalCount = data.totalCount;
          });
          return {
            data: data.list,
            totalCount: data.totalCount
          };
        });
      }
    });
    this.datagridStore = store;
  }

  /* 년 datepicker 처리 start */
  // 년 datepicker 오픈
  @action
  openYearDatepicker() {
    this.yearDatepickerOpend = true;
  }

  // 년 datepicker 닫기
  @action
  closeYearDatepicker() {
    this.yearDatepickerOpend = false;
  }

  // 년 datepicker 변경
  @action
  changeSearchYear(searchYear) {
    this.searchYear = searchYear;
    this.yearDatepickerOpend = false;
  }

  // 다음년
  @action
  nextYear() {
    this.searchYear = moment(this.searchYear).add(1, 'years').toDate();
    this.search();
  }

  // 이전년
  @action
  prevYear() {
    this.searchYear = moment(this.searchYear).subtract(1, 'years').toDate();
    this.search();
  }
  /* 년 datepicker 처리 end */

  @action
  clear() {}
}

export default HolidayManageStore;
