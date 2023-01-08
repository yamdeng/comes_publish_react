import AppStore from 'store/AppStore';
import UiStore from 'store/UiStore';
import HomeStore from './mobile/HomeStore';
import WorkReportListStore from './mobile/WorkReportListStore';
import WorkReportDetailStore from './mobile/WorkReportDetailStore';
import WorkReportFormStore from './mobile/WorkReportFormStore';
import CommuteListStore from './mobile/CommuteListStore';
import CommuteFormStore from './mobile/CommuteFormStore';

/*

  appStore : 전역 data manage store
  uiStore : 전역 ui manage store

*/
class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.uiStore = new UiStore(this);
    this.homeStore = new HomeStore(this);
    this.workReportListStore = new WorkReportListStore(this);
    this.workReportDetailStore = new WorkReportDetailStore(this);
    this.workReportFormStore = new WorkReportFormStore(this);
    this.commuteListStore = new CommuteListStore(this);
    this.commuteFormStore = new CommuteFormStore(this);
  }
}

export default new RootStore();
