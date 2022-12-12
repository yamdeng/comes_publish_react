import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Tree } from 'antd';

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

@withRouter
@inject('modalStore')
@observer
class PMemberSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gData, expandedKeys: ['0-0', '0-0-0', '0-0-0-0'] };
    this.close = this.close.bind(this);
  }

  onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data
    });
  };

  close() {
    this.props.modalStore.hideModal();
  }

  render() {
    return (
      <div className="popup-container">
        <h3 className="pop_title">조직 선택 모달</h3>
        <div className="pop_full_cont_box">
          <div className="pop_flex_group">
            <div className="tree_wrap">
              <Tree
                className="draggable-tree"
                defaultExpandedKeys={this.state.expandedKeys}
                draggable
                blockNode
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                treeData={this.state.gData}
              />
            </div>
            <div className="pop_cont_form">
              <div className="box_form">
                <div className="form_table">
                  {/* 
              input,select,textarea 실패했을때 invalid
              label 에 for 와 tag들의 id는 동일하게 넣어줘야함.
              f_wid50 : 10~100 까지 10단위고, 같은 그룹끼리 묶였을때 쓰는값 (모바일에서는 100%로 강제)
              wid50 : 10~100 까지 10단위고, 모바일에서도 그상태 그대로 유지됨.
            */}
                  <div className="form_cell f_wid70">
                    {/* 
                기본은 form_group
                앞에 돋보기 아이콘을 추가하려면 .form_search 와 icon icon_search 추가
                뒤에 클리어 아이콘을 추가하려면 .form_clear 와 icon icon_clear 추가
              */}
                    <span className="form_group form_search form_clear wid70 c_mr5">
                      <input type="text" className="form_tag" />
                      <label className="f_label">조직 명</label>
                      <span className="icon icon_search">
                        <i class="fas fa-search"></i>
                      </span>
                      {/* input에 value 값이 있으면 style display로 제어 */}
                      <span
                        className="icon icon_clear"
                        style={{ display: 'block' }}
                      >
                        <i class="fas fa-times-circle"></i>
                      </span>
                    </span>
                    <button className="btn_text btn_dark_gray">조회</button>
                  </div>
                </div>
              </div>
              <div className="list_form c_mt10">
                <p className="relative c_mb10">
                  <span className="fs_12">총 nnn 건</span>
                </p>
                <table className="tb_list">
                  <caption></caption>
                  <thead>
                    <tr>
                      <th>사번</th>
                      <th>성명</th>
                      <th>소속</th>
                      <th>직책/호칭</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11111111</td>
                      <td>홍길동</td>
                      <td>KT>전남광역본부>순천지점</td>
                      <td>팀장/과장</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="pop_btns">
          <button className="btn_text btn_dark_gray" onClick={this.close}>
            취소
          </button>
          <button className="btn_text btn_green" onClick={this.close}>
            확인
          </button>
        </div>
        <span className="pop_close" onClick={this.close}>
          <i class="fas fa-times"></i>
        </span>
      </div>
    );
  }
}

export default PMemberSelectModal;
