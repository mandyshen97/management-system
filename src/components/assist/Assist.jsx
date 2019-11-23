import React, { Component } from 'react';
import { Button,Icon,Upload } from 'antd'
import API from "../../api/algorithm";
class Assist extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pic: undefined
    }
  };

  UploadImg=() => {
    console.log(this.state)
    const { previewVisible, previewImage, fileList } = this.state;
  };
  render() { 
    
    return (  
      <div className="main-content">
        <Upload 
          action="http://10.13.81.190:5000/analysis/uploadImg"
          listType="picture-card"
        >
      <Button>
        <Icon type="upload" /> Upload
      </Button>
      </Upload>
      </div>
    );
  }
}
 
export default Assist;