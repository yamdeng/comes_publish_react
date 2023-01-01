import AppStore from 'store/AppStore';
import UiStore from 'store/UiStore';
import ModalStore from 'store/ModalStore';
import AlertModalStore from 'store/AlertModalStore';
import BoardListStore from 'store/common/BoardListStore';
import BoardFormStore from 'store/common/BoardFormStore';
import TestStore from 'store/test/TestStore';
import GuideListStore from 'store/test/GuideListStore.js';
import GuideFormStore from 'store/test/GuideFormStore.js';
import OrgSelectModalStore from 'store/modal/OrgSelectModalStore';
import CommutePrivateStore from './commute/CommutePrivateStore';
import CommuteDeptStore from './commute/CommuteDeptStore';
import PortalStore from './portal/PortalStore';
import CommuteStatsDayStore from './commute/CommuteStatsDayStore';
import CommuteStatsMonthStore from './commute/CommuteStatsMonthStore';
import VacationStore from './vacation/VacationStore';
import VacationStatsStore from './vacation/VacationStatsStore';
import WorkReportStore from './report/WorkReportStore';
import VacationManageStore from './setting/VacationManageStore';
import HolidayManageStore from './setting/HolidayManageStore';
import DeptTimeSettingStore from './setting/DeptTimeSettingStore';
import CommuteDaySubmitModalStore from './commute/CommuteDaySubmitModalStore';
import CommuteDayUpdateModalStore from './commute/CommuteDayUpdateModalStore';
import CommuteDayAdminModalStore from './commute/CommuteDayAdminModalStore';
import WorkReportFormModalStore from './report/WorkReportFormModalStore';

/*

  appStore : 전역 data manage store
  uiStore : 전역 ui manage store
  modalStore : 중간, full 모달 manage store
  alertModalStore : alert, confirm 모달 manage store
  boardListStore : 게시판 목록 store
  boardFormStore : 게시판 폼 store


  모달 store
  orgSelectModalStore : 조직 선택 모달 store

  testStore : testStore

*/
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.uiStore = new UiStore(this);
    this.alertModalStore = new AlertModalStore(this);
    this.modalStore = new ModalStore(this);
    this.boardListStore = new BoardListStore(this);
    this.boardFormStore = new BoardFormStore(this);

    // 모달 store
    this.orgSelectModalStore = new OrgSelectModalStore(this);

    // test store
    this.testStore = new TestStore(this);
    this.guideListStore = new GuideListStore(this);
    this.guideFormStore = new GuideFormStore(this);

    this.commutePrivateStore = new CommutePrivateStore(this);
    this.commuteDeptStore = new CommuteDeptStore(this);
    this.portalStore = new PortalStore(this);
    this.commuteStatsDayStore = new CommuteStatsDayStore(this);
    this.commuteStatsMonthStore = new CommuteStatsMonthStore(this);
    this.vacationStore = new VacationStore(this);
    this.vacationStatsStore = new VacationStatsStore(this);
    this.workReportStore = new WorkReportStore(this);

    this.vacationManageStore = new VacationManageStore(this);
    this.holidayManageStore = new HolidayManageStore(this);
    this.deptTimeSettingStore = new DeptTimeSettingStore(this);
    this.commuteDaySubmitModalStore = new CommuteDaySubmitModalStore(this);
    this.commuteDayUpdateModalStore = new CommuteDayUpdateModalStore(this);
    this.commuteDayAdminModalStore = new CommuteDayAdminModalStore(this);
    this.workReportFormModalStore = new WorkReportFormModalStore(this);
  }
}

export default new RootStore();
