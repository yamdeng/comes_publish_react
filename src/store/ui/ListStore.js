import { observable, action, computed, toJS } from 'mobx';
import Config from 'config/Config';
import update from 'immutability-helper';

class ListStore {
  // 검색 데이터
  @observable list = [];

  // 현재 페이지
  @observable
  currentPage = 1;

  // 마지막 페이지
  @observable
  lastPage = 0;

  // 목록의 총 갯수
  @observable
  totalCount = 0;

  // 이전 페이지(그룹)
  @observable
  prevPage = null;

  // 다음 페이지(그룹)
  @observable
  nextPage = null;

  // 페이지 정보
  @observable
  displayPageInfos = [];

  // 목록 정렬정보
  @observable
  sortInfo = null;

  // page 사이즈
  @observable
  pageSize = Config.defaultPageSize;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 목록 페이징 사이즈 변경
  @action
  changePageSize(pageSize) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.search();
  }

  // 현재 페이지 변경
  @action
  changeCurrentPage(currentPage) {
    this.currentPage = currentPage;
    this.search();
  }

  // 목록 첫페이지로 이동
  @action
  goFirstPage() {
    if (this.prevPage) {
      this.changeCurrentPage(1);
    }
  }

  // 목록 마지막 페이지로 이동
  @action
  goLastPage() {
    if (this.nextPage) {
      this.changeCurrentPage(Math.ceil(this.totalCount / this.pageSize));
    }
  }

  // 검색 이후 공통 로직 : 차후에 일괄적으로 바꾸기 위한 용도
  @action
  setList(data) {
    let { content, totalElements } = data;
    this.changePageInfo(totalElements, content);
  }

  // 검색정보 : list, pageable 추출
  @action
  changePageInfo(totalCount, list) {
    let maxPagingSize = Config.maxPagingSize;
    let totalPageSize = Math.ceil(totalCount / this.pageSize);
    let currentPageStep = Math.floor(this.currentPage / maxPagingSize);
    if (this.currentPage % maxPagingSize !== 0) {
      currentPageStep = currentPageStep + 1;
    }
    let pageInfoStartIndex =
      currentPageStep * maxPagingSize - (maxPagingSize - 1);
    let pageInfoLastIndex =
      currentPageStep * maxPagingSize <= totalPageSize
        ? currentPageStep * maxPagingSize
        : totalPageSize;
    let displayPageInfos = [];
    for (
      let pageInfoIndex = pageInfoStartIndex;
      pageInfoIndex <= pageInfoLastIndex;
      pageInfoIndex++
    ) {
      displayPageInfos.push(pageInfoIndex);
    }
    let lastPageStep = Math.ceil(totalPageSize / maxPagingSize);
    let isNextPageStep = currentPageStep < lastPageStep;
    let nextPage = isNextPageStep ? currentPageStep * maxPagingSize + 1 : null;
    let isPrevPageStep = currentPageStep > 1;
    let prevPage = isPrevPageStep
      ? (currentPageStep - 2) * maxPagingSize + 1
      : null;
    this.displayPageInfos = displayPageInfos;
    this.prevPage = prevPage;
    this.nextPage = nextPage;
    this.lastPage = Math.ceil(totalCount / this.pageSize);
    this.totalCount = totalCount;
    if (list) {
      this.list = list;
    }
  }

  // 목록 정렬 정보 변경
  @action
  changeSort(sortInfo) {
    this.sortInfo = sortInfo;
    this.currentPage = 1;
    this.search();
  }

  // [검색] 아이콘 선택시 : currentPage를 초기화시키기 위한
  @action
  enterSearch() {
    this.currentPage = 1;
    this.search();
  }

  // 체크박스 전체 체크
  @computed
  get checkedAllList() {
    let allChecked = false;
    let list = toJS(this.list);
    let checkedCount = 0;
    for (let index = 0; index < list.length; index++) {
      if (list[index].checked) {
        checkedCount = checkedCount + 1;
      }
    }
    if (checkedCount === list.length) {
      allChecked = true;
    }
    return allChecked;
  }

  @computed
  get checkedItem() {
    let itemChecked = false;
    let list = toJS(this.list);
    for (let index = 0; index < list.length; index++) {
      if (list[index].checked) {
        itemChecked = true;
        break;
      }
    }
    return itemChecked;
  }

  // 테이블 전체 선택 박스 toggle
  @action
  toggleTableAllChecked() {
    let list = toJS(this.list);
    let newList = [];
    if (this.checkedAllList) {
      // 전체 해제
      newList = list.map((info) => {
        info.checked = false;
        return info;
      });
    } else {
      // 전체 선택
      newList = list.map((info) => {
        info.checked = true;
        return info;
      });
    }
    this.list = newList;
  }

  // 테이블 개별행 체크박스 toggle
  @action
  toggleTableChecked(index) {
    let list = toJS(this.list);
    let searchInfo = list[index];
    let newList = update(list, {
      [index]: {
        checked: { $set: !searchInfo.checked }
      }
    });
    this.list = newList;
  }

  getCheckedList() {
    let list = toJS(this.list);
    return list.filter((e) => e.checked);
  }

  // 페이지 파리미터 공통
  getPageParam() {
    let apiParam = {
      size: this.pageSize,
      page: this.currentPage
    };
    return apiParam;
  }

  // 목록 clear
  @action
  clearList() {
    this.list = [];
    this.currentPage = 1;
    this.lastPage = 0;
    this.totalCount = 0;
    this.prevPage = null;
    this.nextPage = null;
    this.displayPageInfos = [];
    this.pageSize = Config.defaultPageSize;
    this.sortInfo = null;
  }
}

export default ListStore;
