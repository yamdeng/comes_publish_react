import React, { Component, createRef } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';
import Config from '../../config/Config';
import ModalService from 'service/ModalService';
import ApiService from 'service/ApiService';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'AppEditor.css';

class AppEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editorRef = null;
    this.onAddImageBlob = this.onAddImageBlob.bind(this);
  }

  validateFileSize(fileObject) {
    let fileSize = fileObject.size;
    if (fileSize > Config.maxFileUploadSize) {
      ModalService.alert({
        body: '한번에 업로드 가능한 사이즈는 100MB 입니다'
      });
      return false;
    }
    return true;
  }

  fileUpload(fileObject, uploadCallback) {
    if (this.validateFileSize(fileObject)) {
      const fileFormData = new FormData();
      fileFormData.append('filePath', '/editor');
      fileFormData.append('files', fileObject);
      ApiService.put('files/upload', fileFormData, {
        passPostPutAlertMessage: true
      }).then(uploadCallback.bind(this));
    }
  }

  onAddImageBlob(file, callback) {
    this.fileUpload(file, ({ data }) => {
      const fileInfo = data[0];
      const { filePath, fileName } = fileInfo;
      const imagePath = filePath + '/' + fileName;
      callback(`${process.env.API_URL}/image` + imagePath, '이미지없음');
    });
  }

  componentDidMount() {
    // this.editor = this.editorRef.current.getInstance();
    // this.editor.removeToolbarItem('indent');
    // this.editor.removeToolbarItem('outdent');
  }

  render() {
    const { value, height = '500px', editorRef } = this.props;
    this.editorRef = editorRef;
    if (value) {
      // this.editorRef.current.getInstance().setMarkDown(value, false);
    }
    return (
      <React.Fragment>
        <Editor
          hideModeSwitch={true}
          initialEditType="wysiwyg"
          previewStyle="vertical"
          // initialValue={value}
          ref={this.editorRef}
          height={height}
          // onChange={() => {}}
          usageStatistics={false}
          plugins={[colorSyntax]}
          autofocus={false}
          hooks={{
            addImageBlobHook: this.onAddImageBlob
          }}
        />
      </React.Fragment>
    );
  }
}

export default AppEditor;
