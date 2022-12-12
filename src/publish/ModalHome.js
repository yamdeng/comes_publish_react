import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import ModalConfig from 'publish/ModalConfig';
import _ from 'lodash';
import ReactHelper from 'util/ReactHelper';

@withRouter
@inject('modalStore')
@observer
class ModalHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openModal = this.openModal.bind(this);
    this.changeList = this.changeList.bind(this);
  }

  changeList(listType) {
    this.setState({ listType: listType });
  }

  openModal(type) {
    let { modalStore } = this.props;
    modalStore.showModal(type, {});
  }

  render() {
    let list = ModalConfig.list;
    let listType = this.state.listType;
    let filetedMenu = _.filter(list, (info) => {
      if (listType === 'ing') {
        return !info.success;
      } else if (listType === 'complete') {
        return info.success;
      }
      return true;
    });

    return (
      <div>
        <h6>
          <a href={'/publish.html'} style={{ color: 'blue' }}>
            페이지 퍼블리싱으로 이동
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
              파일명(src/publish/modals)
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
              mobile-full
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
          {filetedMenu.map((info, index) => {
            let backgroundColor = '';
            if (info.success) {
              backgroundColor = 'green';
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
                  {index + 1}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                  onClick={() => {
                    this.openModal(info.modalType);
                  }}
                >
                  {info.title}
                </td>
                <td
                  style={{
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    padding: 5
                  }}
                >
                  <a
                    href={
                      'vscode://file/' +
                      process.env.PROJECT_FOLDER_PATH +
                      '/src/publish/modal/' +
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
                  {info.isMobileFull ? 'O' : 'X'}
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

export default ModalHome;
