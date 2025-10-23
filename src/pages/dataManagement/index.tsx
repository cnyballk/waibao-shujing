import { useState } from "react";
import "./index.less";
import { Icon } from "@/icon";
import classNames from "classnames";

const mockData = [
  {
    id: 1,
    filename: "地铁站厅消防点位POI数据2025版.xsl",
    size: "100KB",
  },
  {
    id: 2,
    filename: "地铁站据2025版.xsl",
    size: "100KB",
  },
];
const biaoyu = [{ label: "立基与规划" }, { label: "验证与优化" }, { label: "精修与深化" }, { label: "呈现与交付" }];
const steps = [
  {
    label: "智能路线设计",
  },
  {
    label: "智能总图设计",
  },
  {
    label: "车站模型框架",
  },
  {
    label: "呈现与交付",
  },
];
const DataManagementPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="dataManagement-page">
      <div className="dataManagement-content">
        <div className="dataManagement-content-left">
          <div className="header">
            <div className="header-left">
              <div className="project-icon">
                <img src={require("@/assets/images/项目图标.png")} alt="" />
              </div>
              <div className="project-name">
                <span className="project-name-title">智能路线设计</span>
                <span className="project-name-subtitle">区块负责人：何伟</span>
              </div>
            </div>
          </div>
          <FilesReadWrap title="流转稿"></FilesReadWrap>
          <FilesReadWrap title="初稿"></FilesReadWrap>
          <FilesReadWrap title="二稿"></FilesReadWrap>
          <FilesReadWrap title="终稿"></FilesReadWrap>
        </div>
        <div className="dataManagement-content-right">
          <div className="header">
            <div className="header-left">
              <div className="project-icon">
                <img src={require("@/assets/images/项目图标.png")} alt="" />
              </div>
              <div className="project-name">
                <span className="project-name-title">智能总图设计</span>
                <span className="project-name-subtitle">区块负责人：何伟</span>
              </div>
            </div>
            <div className="header-right">
              <div className="steps">
                {steps.map((item, index) => (
                  <div className="step-item" key={item.label}>
                    <div className="dot">
                      {currentStep === index && <div className="dot-active"></div>}
                      {index !== steps.length - 1 && <div className="step-item-line"></div>}
                    </div>
                    <span className="step-item-title">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FilesWrap title="流转稿"></FilesWrap>
          <FilesWrap title="初稿"></FilesWrap>
          <FilesWrap title="二稿"></FilesWrap>
          <FilesWrap title="终稿"></FilesWrap>
        </div>
      </div>
    </div>
  );
};
const FilesReadWrap = (props) => {
  return (
    <div className="files-wrap files-read-wrap">
      <img src={require("@/assets/images/进度动图.png")} alt="" className="progress-img" />
      <div className="files-header">
        <div className="files-header-left">
          <div className="files-header-title">
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 6.33988L7 3.17106L0 0V20H1.18186V12.1438L7 9.50871L14 6.33988Z" fill="#1A6FE4" />
            </svg>
            <div className="files-header-title-text">{props.title}</div>
          </div>
          <div className="count-total">
            <span className="number">0</span>
          </div>
        </div>
        <div className="files-header-right">
          <div className="btn">
            <Icon.CommentIcon fill="#fff" />
          </div>
          <div className="btn">
            <Icon.RightIcon />
          </div>
        </div>
      </div>
      <div className="files-content">
        <FilesReadItem title="数据表" icon={<Icon.ExeclIcon />} className="data-excel" allSize={"36 MB"} />
        <FilesReadItem title="其他附件" icon={<Icon.FujianIcon />} className="fujian" allSize={"100 MB"} />
      </div>
      <div className="files-footer">
        <div className="files-footer-left">
          <div className="footer-left-title-text">提交人员：张三</div>
          <div className="footer-left-title-text">提交时间：2025-08-23 15:36:28</div>
        </div>
        <div className="files-footer-right">
          <div className="btn">
            <Icon.DownLoadIcon />
          </div>
          <div className="btn">
            <Icon.FilesIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
const FilesReadItem = (props) => {
  return (
    <div className={classNames("files-read-item", props.className)}>
      <div className="read-content">
        <div className="icon">{props.icon}</div>
        <div className="title">
          <div className="title-text">{props.title}</div>
          <div className="all-size">{props.allSize}</div>
        </div>
      </div>
    </div>
  );
};
const FilesWrap = (props) => {
  return (
    <div className="files-wrap">
      <div className="files-header">
        <div className="files-header-left">
          <div className="files-header-title">
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 6.33988L7 3.17106L0 0V20H1.18186V12.1438L7 9.50871L14 6.33988Z" fill="#1A6FE4" />
            </svg>
            <div className="files-header-title-text">{props.title}</div>
          </div>
          <div className="count-total">
            已添加附件 <span className="number">0</span>
          </div>
          <div className="files-header-comment">
            <Icon.CommentIcon />
          </div>
        </div>
        <div className="files-header-right">
          <div className="btn">
            <Icon.UploadIcon />
          </div>
          <div className="btn">
            <Icon.DownLoadIcon />
          </div>
          <div className="btn">
            <Icon.FilesIcon />
          </div>
        </div>
      </div>
      <div className="files-content">
        <FilesItem title="数据表" icon={<Icon.ExeclIcon />} className="data-excel" data={[]} />
        <FilesItem title="其他附件" icon={<Icon.FujianIcon />} className="fujian" data={[]} />
      </div>
    </div>
  );
};
const FilesItem = (props) => {
  return (
    <div className={classNames("files-item", props.className)}>
      <div className="files-item-header">
        <div className="count-total">
          {props.icon}
          {props.title}
          <span className="number">{props.data.length}</span>
        </div>
        <div className="addicon">
          <Icon.AddIcon />
        </div>
      </div>
      <div className="files-list">
        {props.data.map((item) => (
          <div className="files-list-item" key={item.id}>
            <div className="files-list-item-name">{item.filename}</div>
            <div className="files-list-item-size">{item.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DataManagementPage;
