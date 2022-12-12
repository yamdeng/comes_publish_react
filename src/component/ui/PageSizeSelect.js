import React from 'react';
import { observer } from 'mobx-react';
import Code from 'config/Code';

/*

    테이블 목록 pagesize 콤보 박스 공통
     : <Pagination store={boardListStore}}

    props
     -store : 페이징 데이터를 컨트롤할 store

*/

@observer
class PageSizeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props;
    let { pageSize } = store;
    let pageSizeList = Code.pageSizeList;
    return (
      <select
        name=""
        className="form_tag_select "
        value={pageSize}
        onChange={(event) => {
          let value = event.target.value;
          store.changePageSize(value);
        }}
      >
        {pageSizeList.map((codeInfo) => (
          <option value={codeInfo.value}>{codeInfo.name}</option>
        ))}
      </select>
    );
  }
}

export default PageSizeSelect;
