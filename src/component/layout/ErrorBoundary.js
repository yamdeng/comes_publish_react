import React from 'react';
import { observer, inject } from 'mobx-react';
import Constant from 'config/Constant';
import Logger from 'util/Logger';

/*

    이름 : render 에러 handle 컴포넌트
    
    store
      -appStore
      
*/
@inject('appStore')
@observer
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    // 페이지 재시작
    this.refreshPage = this.refreshPage.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    let errorObject = {};
    errorObject.errorType = Constant.ERROR_TYPE_REACT;
    if (error.message) {
      errorObject.message = error.message;
    }
    if (error.stack) {
      errorObject.stack = error.stack;
    }
    if (info && info.componentStack) {
      errorObject.componentStack = info.componentStack;
    }
    this.setState({
      errorObject: errorObject
    });
    Logger.error(JSON.stringify(errorObject));
  }

  refreshPage() {
    this.props.appStore.reloadApp();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>
            <h2>KT-SAFEDOC</h2>
          </div>
          <p>
            오류가 발생하였습니다.
            <br />
            페이지를 재시작해주세요.
          </p>
          <div>
            <button
              type="button"
              className="btn medium btn-primary"
              onClick={this.refreshPage}
            >
              재시작
            </button>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
