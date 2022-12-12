import React, { Component } from 'react';
import PageConfig from 'publish/PageConfig';
import _ from 'lodash';
import ReactHelper from 'util/ReactHelper';

class PageHome extends Component {
  constructor(props) {
    super(props);
    this.state = { listType: '', useIcon: false };
    this.changeList = this.changeList.bind(this);
    this.changeUseIcon = this.changeUseIcon.bind(this);
  }

  changeList(listType) {
    this.setState({ listType: listType });
  }

  changeUseIcon(event) {
    let checked = event.target.checked;
    this.setState({ useIcon: checked });
  }

  render() {
    /*
s
      이름, 리액트 파일명, route url, 기획서 페이지

    */
    let list = PageConfig.list;
    let listType = this.state.listType;
    let useIcon = this.state.useIcon;
    let filetedList = _.filter(list, (info) => {
      if (listType === 'ing') {
        return !info.success;
      } else if (listType === 'complete') {
        return info.success;
      }
      return true;
    });
    if (useIcon) {
      filetedList = _.filter(list, (info) => {
        return info.useIcon;
      });
    }
    return (
      <div style={{ overflowX: 'auto' }}>
        <h6>
          <a href={'#/modal'} style={{ color: 'blue' }}>
            모달 퍼블리싱으로 이동
          </a>
        </h6>
        <div>
          <button
            onClick={() => this.changeList('ing')}
            style={{ background: 'yellow' }}
          >
            작업중
          </button>{' '}
          <button
            onClick={() => this.changeList('complete')}
            style={{ background: '#8897ff' }}
          >
            완료
          </button>{' '}
          <button onClick={() => this.changeList('')}>전체</button>
          {/* 아이콘 존재 여부{' '}
          <input
            type="checkbox"
            id="useIcon"
            name="useIcon"
            checked={useIcon}
            onChange={this.changeUseIcon}
          /> */}
        </div>
        <table className="publish_tb">
          <tr>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              index
            </th>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              이름
            </th>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              파일명(src/publish/page)
            </th>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              url
            </th>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              기획서 페이지
            </th>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              완료여부
            </th>
            <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5
              }}
            >
              아이콘여부
            </th>
            {/* <th
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: 5,
                width: '40%'
              }}
            >
              설명
            </th> */}
          </tr>
          {filetedList.map((info, index) => {
            let backgroundColor = '';
            if (info.success) {
              backgroundColor = '#8897ff';
            } else {
              backgroundColor = 'yellow';
            }
            return (
              <tr style={{ backgroundColor: backgroundColor }}>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  <a style={{ color: '#000' }} href={'#' + info.url}>
                    {index + 1}
                  </a>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  <a
                    style={{ color: '#000' }}
                    href={'#' + info.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {info.title}
                  </a>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  <a
                    style={{ color: '#000' }}
                    href={
                      'vscode://file/' +
                      process.env.PROJECT_FOLDER_PATH +
                      '/src/publish/page/' +
                      info.fileName
                    }
                  >
                    {info.fileName}
                  </a>
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  {info.url}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  {info.pageCount}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  {info.success ? '완료' : '작업중'}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  {info.useIcon ? '사용' : '미사용'}
                </td>
                {/* <td
                  style={{
                    backgroundColor: '#2196f3',
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5,
                    width: '40%'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: ReactHelper.convertEnterStringToBrTag(
                      info.description
                    )
                  }}
                ></td> */}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default PageHome;
