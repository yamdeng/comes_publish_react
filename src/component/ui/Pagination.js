import React from 'react';
import { observer } from 'mobx-react';

/*

    목록 페이징 공통
     : <Pagination store={boardListStore}}

    props
     -store : 페이징 데이터를 컨트롤할 store

*/

@observer
class Pagination extends React.Component {
  render() {
    const { store } = this.props;
    let { prevPage, nextPage, displayPageInfos, currentPage, lastPage } = store;
    return (
      <div className="paging_wrap">
        <span
          className="p_web"
          style={{ display: prevPage ? '' : 'none' }}
          onClick={() => {
            store.goFirstPage();
          }}
        >
          <i class="fas fa-angle-double-left"></i>
        </span>
        <span
          className="p_web p_arr_l"
          style={{ display: prevPage ? '' : 'none' }}
          onClick={() => {
            store.changeCurrentPage(prevPage);
          }}
        >
          <i class="fas fa-angle-left"></i>
        </span>
        {/* web paging */}
        {displayPageInfos.map((pageIndex) => {
          let pageComponent = (
            <span
              key={pageIndex}
              className="p_web"
              onClick={() => {
                store.changeCurrentPage(pageIndex);
              }}
            >
              {pageIndex}
            </span>
          );
          if (pageIndex === currentPage) {
            pageComponent = (
              <span
                style={{ color: '#2dbab6', textDecoration: 'underline' }}
                key={pageIndex}
                className="p_web mbold"
                onClick={() => {
                  store.changeCurrentPage(pageIndex);
                }}
              >
                {pageIndex}
              </span>
            );
          }
          return pageComponent;
        })}
        {displayPageInfos.length === 0 ? (
          <React.Fragment>
            <span className="p_arr_l">
              <i class="fas fa-angle-left"></i>
            </span>
            <span className="p_web">1</span>
            <span className="p_arr_r">
              <i class="fas fa-angle-right"></i>
            </span>
          </React.Fragment>
        ) : null}
        {/* mobile pagind */}
        <span
          className="p_mobile p_arr_r"
          style={{ display: currentPage !== 1 ? '' : 'none' }}
          onClick={() => {
            store.changeCurrentPage(currentPage - 1);
          }}
        >
          <i class="fas fa-angle-left"></i>
        </span>
        <span className="p_mobile mbold" style={{ color: '#2dbab6' }}>
          {currentPage}
        </span>
        <span className="p_mobile">/</span>
        <span className="p_mobile">{lastPage}</span>
        <span
          className="p_mobile p_arr_r"
          style={{ display: currentPage !== lastPage ? '' : 'none' }}
          onClick={() => {
            store.changeCurrentPage(currentPage + 1);
          }}
        >
          <i class="fas fa-angle-right"></i>
        </span>
        <span
          className="p_web p_arr_r"
          style={{ display: nextPage ? '' : 'none' }}
          onClick={() => {
            store.changeCurrentPage(nextPage);
          }}
        >
          <i class="fas fa-angle-right"></i>
        </span>
        <span
          className="p_web"
          style={{ display: nextPage ? '' : 'none' }}
          onClick={() => {
            store.goLastPage();
          }}
        >
          <i class="fas fa-angle-double-right"></i>
        </span>
      </div>
    );
  }
}

export default Pagination;
