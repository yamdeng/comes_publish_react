import { observable, action } from 'mobx';
import FormStore from 'store/ui/FormStore';

/*
  
  게시판 폼/상세 store

*/

class BoardFormStore extends FormStore {
  @observable
  info = '';

  constructor(rootStore) {
    super();
    this.rootStore = rootStore;
  }

  @action
  clear() {
    this.clearForm();
  }
}

export default BoardFormStore;
