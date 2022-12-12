import React, { Component } from 'react';
import PWorkFormLeft from 'publish/page/layout/PWorkFormLeft';
import PWorkFormTop from 'publish/page/layout/PWorkFormTop';
import PWorkFormBottom from 'publish/page/layout/PWorkFormBottom';

class PDocContentWPlanFling extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content_area">
        <h3>중량물 작업계획서 생성</h3>
        <PWorkFormTop />
        <div className="work_forw_wrap">
          <PWorkFormLeft />
          <div className="work_content">
            <div className="box_form">
              <div className="relative" style={{ height: '100px' }}>
                <span className="abcc">파일을 생성하시겠습니까 ?</span>
                {/* <span className="abcc">
                  이미 파일이 생성되어 있습니다. 파일을 다시 만드시겠습니까 ?
                </span> */}
              </div>
            </div>
            <PWorkFormBottom />
          </div>
        </div>
      </div>
    );
  }
}

export default PDocContentWPlanFling;
