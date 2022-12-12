import { observable, action, runInAction } from 'mobx';
import ListStore from 'store/ui/ListStore';

/*
  
  조직 선택 모달 store

*/
class OrgSelectModalStore extends ListStore {
  @observable
  info = '';

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  @action
  search() {
    setTimeout(() => {
      runInAction(() => {
        let list = [];
        for (let index = 0; index < 15; index++) {
          list.push({ title: '', key: index });
        }
        this.list = list;
        this.changePageInfo(183);
      });
    }, 1000);
  }

  @action
  clear() {
    this.clearList();
    this.info = '';
  }
}

export default OrgSelectModalStore;
