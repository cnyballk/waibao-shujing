import { useEffect, useState } from "react";
import "./index.less";
import { Icon } from "@/icon";
import classNames from "classnames";
import { appStore } from "@/store/appStore";
import { baseApi, request } from "@/axios";
import { getSizeLabel, myUploadFile } from "@/utils";
import { Button, DatePicker, Input, message, Modal, Select, Space, Table, TableProps, TimePicker, Upload } from "antd";
import { getLocalStoreConfig } from "@/setting";
import { useMemoizedFn } from "ahooks";
import { cloneDeep } from "lodash-es";

const DataManagementPage = () => {
  const [currentFlow, setCurrentFlow] = useState({});
  const [steps, setSteps] = useState([]);
  console.log("currentFlow: ", currentFlow);
  const [prevFlow, setPrevFlow] = useState(null);
  console.log("prevFlow: ", prevFlow);
  const { selectFlowId, selectedProjectId } = appStore((state) => state);
  const [canEdit, setCanEdit] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [checkReadList, setCheckReadList] = useState([]);
  console.log("canEdit: ", canEdit);

  useEffect(() => {
    request
      .get("/design/workflow/nodeList", {
        projectId: selectedProjectId,
        flowCode: selectFlowId,
      })
      .then((res: any) => {
        setSteps(res.data);
      });
    request
      .get("design/confirm/detail", {
        projectId: selectedProjectId,
        flowCode: selectFlowId,
      })
      .then((res: any) => {
        setCheckList(res.data);
      });
  }, [selectedProjectId, selectFlowId]);

  useEffect(() => {
    request.get(`/design/user/leaderNodes/${selectedProjectId}`).then((res: any) => {
      console.log("leaderNodes: ", res);
      const result = res.data.find((item) => item.flowCode === selectFlowId);
      setCanEdit(!!result);
    });

    request
      .get(`/design/workflow/detail`, {
        projectId: selectedProjectId,
        flowCode: selectFlowId,
      })
      .then((currentFlow: any) => {
        console.log("workflow: ", currentFlow);
        setCurrentFlow(currentFlow.data);
        if (currentFlow.data.previous) {
          request
            .get(`/design/workflow/detail`, {
              projectId: selectedProjectId,
              flowCode: currentFlow.data.previous,
            })
            .then((prevFlow: any) => {
              console.log("previous: ", prevFlow);
              setPrevFlow(prevFlow.data);
            });

          request
            .get("design/confirm/detail", {
              projectId: selectedProjectId,
              flowCode: currentFlow.data.previous,
            })
            .then((res: any) => {
              setCheckReadList(res.data);
            });
        }
      });
  }, [selectFlowId]);
  return (
    <div className="dataManagement-page">
      <div className="dataManagement-content">
        {prevFlow && (
          <div className="dataManagement-content-left">
            <div className="header">
              <div className="header-left">
                <div className="project-icon">
                  <img src={require("@/assets/images/项目图标.png")} alt="" />
                </div>
                <div className="project-name">
                  <span className="project-name-title">{prevFlow.flowName}</span>
                  <span className="project-name-subtitle">区块负责人： {prevFlow.userName}</span>
                </div>
              </div>
            </div>
            <FilesReadWrap
              title="流转稿"
              type={0}
              flowCode={selectFlowId}
              projectId={selectedProjectId}
              readOnly={true}
            ></FilesReadWrap>
            <FilesReadWrap
              title="初稿"
              type={1}
              flowCode={selectFlowId}
              projectId={selectedProjectId}
              readOnly={canEdit}
              isConfirmed={checkReadList[0]?.isConfirmed === 1}
            ></FilesReadWrap>
            <FilesReadWrap
              title="二稿"
              type={2}
              flowCode={selectFlowId}
              projectId={selectedProjectId}
              readOnly={!canEdit}
              isConfirmed={checkReadList[0]?.isConfirmed === 1}
            ></FilesReadWrap>
            <FilesReadWrap
              title="终稿"
              type={3}
              flowCode={selectFlowId}
              projectId={selectedProjectId}
              readOnly={!canEdit}
              isConfirmed={checkReadList[0]?.isConfirmed === 1}
            ></FilesReadWrap>
          </div>
        )}
        <div className="dataManagement-content-right">
          <div className="header">
            <div className="header-left">
              <div className="project-icon">
                <img src={require("@/assets/images/项目图标.png")} alt="" />
              </div>
              <div className="project-name">
                <span className="project-name-title">{currentFlow.flowName}</span>
                <span className="project-name-subtitle">区块负责人： {currentFlow.userName}</span>
              </div>
            </div>
            <div className="header-right">
              <div className="steps">
                {steps.map((item, index) => (
                  <div className="step-item" key={item.label}>
                    <div className="dot">
                      {selectFlowId === item.flowCode && <div className="dot-active"></div>}
                      {index !== steps.length - 1 && <div className="step-item-line"></div>}
                    </div>
                    <span className="step-item-title">{item.flowName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FilesWrap
            title="流转稿"
            type={0}
            flowCode={selectFlowId}
            projectId={selectedProjectId}
            readOnly={true}
            isConfirmed={true}
          ></FilesWrap>
          <FilesWrap
            title="初稿"
            type={1}
            flowCode={selectFlowId}
            projectId={selectedProjectId}
            readOnly={!canEdit}
            isConfirmed={checkList[0]?.isConfirmed === 1}
          ></FilesWrap>
          <FilesWrap
            title="二稿"
            type={2}
            flowCode={selectFlowId}
            projectId={selectedProjectId}
            readOnly={!canEdit}
            isConfirmed={checkList[1]?.isConfirmed === 1}
          ></FilesWrap>
          <FilesWrap
            title="终稿"
            type={3}
            flowCode={selectFlowId}
            projectId={selectedProjectId}
            readOnly={!canEdit}
            isConfirmed={checkList[2]?.isConfirmed === 1}
          ></FilesWrap>
        </div>
      </div>
    </div>
  );
};
const FilesReadWrap = (props) => {
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [execlList, setExeclList] = useState([]);
  console.log("execlList: ", execlList);
  const [fujianList, setFujianList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  console.log("fujianList: ", fujianList);
  useEffect(() => {
    getList();
    if (props.type != 0) {
      getCommentList();
    }
  }, [props.type]);
  const getList = useMemoizedFn(() => {
    if (props.type == 0) {
      request.get(`/design/document/circulation/${props.projectId}`).then((res: any) => {
        setExeclList(res.data.filter((item) => item.docType == 1));
        setFujianList(res.data.filter((item) => item.docType == 0));
      });
    } else {
      request
        .get(`/design/document/list`, {
          projectId: props.projectId,
          flowCode: props.flowCode,
          version: props.type,
        })
        .then((res: any) => {
          setExeclList(res.rows.filter((item) => item.docType == 1));
          setFujianList(res.rows.filter((item) => item.docType == 0));
        });
    }
  });
  const handleSendComment = useMemoizedFn(() => {
    request
      .post(`/design/feedback`, {
        projectId: props.projectId,
        flowCode: props.flowCode,
        version: props.type,
        content: comment,
        images: "",
      })
      .then((res: any) => {
        console.log("res: ", res);
        message.success("反馈成功");
        setComment("");
        getCommentList();
      })
      .catch((err: any) => {
        message.error("反馈失败");
      });
  });
  const getCommentList = useMemoizedFn(() => {
    request
      .get(`/design/feedback/list`, {
        projectId: props.projectId,
        flowCode: props.flowCode,
        version: props.type,
      })
      .then((res: any) => {
        setCommentList(res.rows);
      });
  });
  return (
    <div className="files-wrap files-read-wrap">
      <ProjectFileModal
        open={open}
        setOpen={setOpen}
        flowCode={props.flowCode}
        projectId={props.projectId}
        type={props.type}
      ></ProjectFileModal>

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
        {!props.isConfirmed && !props.readOnly && (
          <div className="files-header-right">
            <div className="btn" onClick={() => setCommentOpen(true)}>
              <Icon.CommentIcon fill="#fff" />
            </div>
            <div className="comment-modal-wrap" style={{ display: commentOpen ? "block" : "none" }}>
              <div
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setCommentOpen(false);
                  setComment("");
                }}
              >
                <Icon.CloseIcon />
              </div>
              <div className="comment-input-wrap">
                <textarea
                  rows={4}
                  placeholder="请输入反馈意见..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {/* <div className="images">
                  <Upload>
                    <Icon.AddIcon />
                  </Upload>
                </div> */}
                <Button type="primary" className="comment-input-btn" onClick={handleSendComment}>
                  <Icon.SendIcon /> 发送
                </Button>
              </div>
              <div className="comment-list" style={{ display: commentList.length > 0 ? "block" : "none" }}>
                <div className="comment-list-header">历史反馈</div>
                <div className="comment-list-content">
                  {commentList.map((item) => (
                    <div className="comment-list-item" key={item.id}>
                      <div className="comment-time">反馈时间: {item.feedbackTime}</div>
                      <div className="comment-text">{item.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="btn">
              <Icon.RightIcon />
            </div>
          </div>
        )}
      </div>
      <div className="files-content">
        <FilesReadItem
          title="数据表"
          icon={<Icon.ExeclIcon />}
          className="data-excel"
          allSize={getSizeLabel(
            execlList.reduce((a, b) => {
              return a + b.size;
            }, 0)
          )}
        />
        <FilesReadItem
          title="其他附件"
          icon={<Icon.FujianIcon />}
          className="fujian"
          allSize={getSizeLabel(
            fujianList.reduce((a, b) => {
              return a + b.size;
            }, 0)
          )}
        />
      </div>
      <div className="files-footer">
        <div className="files-footer-left">
          <div className="footer-left-title-text">提交人员：张三</div>
          <div className="footer-left-title-text">提交时间：2025-08-23 15:36:28</div>
        </div>
        <div className="files-footer-right">
          {/* <div className="btn">
            <Icon.DownLoadIcon />
          </div> */}
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
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [execlList, setExeclList] = useState([]);
  console.log("execlList: ", execlList);
  const [fujianList, setFujianList] = useState([]);
  console.log("fujianList: ", fujianList);
  useEffect(() => {
    getList();
    getCommentList();
  }, [props.type]);
  const getCommentList = useMemoizedFn(() => {
    request
      .get(`/design/feedback/list`, {
        projectId: props.projectId,
        flowCode: props.flowCode,
        version: props.type,
      })
      .then((res: any) => {
        setCommentList(res.rows);
      });
  });
  const getList = useMemoizedFn(() => {
    console.log("props.type: ", props.type);
    if (props.type == 0) {
      request.get(`/design/document/circulation/${props.projectId}`).then((res: any) => {
        setExeclList(res.data.filter((item) => item.docType == 1));
        setFujianList(res.data.filter((item) => item.docType == 0));
      });
    } else {
      request
        .get(`/design/document/list`, {
          projectId: props.projectId,
          flowCode: props.flowCode,
          version: props.type,
        })
        .then((res: any) => {
          setExeclList(res.rows.filter((item) => item.docType == 1));
          setFujianList(res.rows.filter((item) => item.docType == 0));
        });
    }
  });

  const handleUpload = useMemoizedFn((data, docType) => {
    const formData = new FormData();
    formData.append("files", data.file);
    formData.append("projectId", props.projectId);
    formData.append("flowCode", props.flowCode);
    formData.append("version", props.type);
    formData.append("docType", docType);

    return fetch(baseApi + "/design/document/uploadBatch", {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        authorization: "Bearer " + getLocalStoreConfig("TOKEN"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res: ", res);
        getList();
        data.onSuccess({
          ...res,
          url: res.url,
          name: res.newFileName,
        });
      });
  });
  console.log("commentList: ", commentList);
  const confirmFeedbackFn = useMemoizedFn((id) => {
    request
      .put(`design/feedback/confirm/${id}`)
      .then((res: any) => {
        message.success("确认成功");
        getCommentList();
      })
      .catch((err: any) => {
        message.error("确认失败");
      });
  });
  return (
    <div className="files-wrap">
      <ProjectFileModal
        open={open}
        setOpen={setOpen}
        flowCode={props.flowCode}
        projectId={props.projectId}
        type={props.type}
      ></ProjectFileModal>
      <div className="files-header">
        <div className="files-header-left">
          <div className="files-header-title">
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 6.33988L7 3.17106L0 0V20H1.18186V12.1438L7 9.50871L14 6.33988Z" fill="#1A6FE4" />
            </svg>
            <div className="files-header-title-text">{props.title}</div>
          </div>
          <div className="count-total">
            已添加附件 <span className="number">{execlList.length + fujianList.length}</span>
          </div>
          {commentList[0]?.isConfirmed == 0 && (
            <div className="files-header-comment" onClick={() => setCommentOpen(true)}>
              <Icon.CommentIcon />
              <div className="comment-modal-wrap" style={{ display: commentOpen ? "block" : "none" }}>
                <div
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommentOpen(false);
                  }}
                >
                  <Icon.CloseIcon />
                </div>
                {commentList[0]?.isConfirmed == 0 && <div className="comment-input-wrap">
                  {commentList[0]?.content}
                  {/* <div className="images">
                  <Upload>
                    <Icon.AddIcon />
                  </Upload>
                </div> */}
                  <Button type="primary" className="comment-input-btn" onClick={() => confirmFeedbackFn(commentList[0]?.id)}>
                    <Icon.RightIcon /> 收到
                  </Button>
                </div>}
                <div className="comment-list" style={{ display: commentList.length > 0 ? "block" : "none" }}>
                  <div className="comment-list-header">历史反馈</div>
                  <div className="comment-list-content">
                    {commentList.slice(1).map((item) => (
                      <div className="comment-list-item" key={item.id}>
                        <div className="comment-time">反馈时间: {item.feedbackTime}</div>
                        <div className="comment-text">{item.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {props.isConfirmed && props.type != 0 && (
            <div
              className="files-header-righticon"
              onClick={() => {
                Modal.success({
                  title: "资料已确认",
                  content: <Input.TextArea rows={4} />,
                  onOk: () => {
                    console.log("ok");
                  },
                });
              }}
            >
              <Icon.RightIcon color="#00E573" />
            </div>
          )}
        </div>
        <div className="files-header-right">
          <div className="btn">
            <Icon.UploadIcon />
          </div>
          {/* <div className="btn">
            <Icon.DownLoadIcon />
          </div> */}
          <div className="btn" onClick={() => setOpen(true)}>
            <Icon.FilesIcon />
          </div>
        </div>
      </div>
      <div className="files-content">
        <FilesItem
          title="数据表"
          icon={<Icon.ExeclIcon />}
          className="data-excel"
          data={execlList}
          dataType={"1"}
          handleUpload={handleUpload}
          readOnly={props.readOnly || props.isConfirmed}
        />
        <FilesItem
          title="其他附件"
          icon={<Icon.FujianIcon />}
          className="fujian"
          data={fujianList}
          dataType={"0"}
          handleUpload={handleUpload}
          readOnly={props.readOnly || props.isConfirmed}
        />
      </div>
    </div>
  );
};

const ProjectFileModal = (props) => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "资料类型",
      dataIndex: "docType",
      key: "docType",
      render: (text) => {
        return text == 1 ? (
          <div>
            <Icon.ExeclIcon />
            数据表
          </div>
        ) : (
          <div>
            <Icon.FujianIcon />
            其他附件
          </div>
        );
      },
    },
    {
      title: "资料名称",
      dataIndex: "docName",
      key: "docName",
    },
    {
      title: "格式",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
      render: (text) => {
        return getSizeLabel(text);
      },
    },
    {
      title: "提交人员",
      dataIndex: "submitBy",
      key: "submitBy",
    },
    {
      title: "提交时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <div style={{ cursor: "pointer" }} onClick={() => handleDownload(record)}>
            <Icon.DownLoadIcon color="rgba(0,0,0,0.6)"></Icon.DownLoadIcon>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => handleDelete(record)}>
            <Icon.DeleteIcon></Icon.DeleteIcon>
          </div>
        </Space>
      ),
    },
  ];
  const [fileList, setFileList] = useState([]);
  console.log("fileList: ", fileList);
  const [filter, setFilter] = useState({
    docType: "-1",
    name: "",
    beginCreateTime: "",
    endCreateTime: "",
    format: "",
  });

  useEffect(() => {
    getList();
  }, [filter]);
  const getList = useMemoizedFn(() => {
    console.log("props.type: ", props.type);
    if (props.type == 0) {
      request.get(`/design/document/circulation/${props.projectId}`).then((res: any) => {
        setFileList(res.data);
      });
    } else {
      request
        .get(`/design/document/list`, {
          projectId: props.projectId,
          flowCode: props.flowCode,
          version: props.type,
          ...filter,
          docType: filter.docType == -1 ? undefined : filter.docType,
        })
        .then((res: any) => {
          console.log("re11111s: ", res);
          setFileList(res.rows);
        });
    }
  });
  const handleDelete = useMemoizedFn((record) => {
    request
      .delete(`/design/document/${record.id}`)
      .then((res: any) => {
        message.success("删除成功");
      })
      .catch((err: any) => {
        message.error("删除失败");
      });
  });
  const handleDownload = useMemoizedFn((record) => {
    window.open(baseApi + `/design/document/download/${record.id}`, "_blank");

    // request.get(`/design/document/download/${record.id}`).then((res: any) => {
    //   console.log("download: ", res);
    // });
  });
  return (
    <Modal
      open={props.open}
      onCancel={() => props.setOpen(false)}
      maskClosable={false}
      width={1440}
      height={810}
      style={{ maxWidth: "unset" }}
    >
      <div className="project-file-list">
        <div className="project-file-list-header">
          <Icon.ProjectFileIcon />
          <div className="project-file-list-header-left-text">项目成果</div>
          <div className="count-total">
            <span className="number">{fileList.length}</span>
          </div>
          <div style={{ cursor: "pointer" }}>
            <Icon.RefreshIcon />
          </div>
          <div className={"tableTopInputWrap"}>
            <Input className={"tableInput"} placeholder="姓名/手机号" variant="filled" />
            <Icon.SearchIcon></Icon.SearchIcon>
          </div>
        </div>
        <div className="filter-wrap">
          <div className="filter-left">
            <div className="filter-item">
              <div className="filter-item-label">资料类型</div>
              <div className="filter-item-content">
                <Select
                  options={[
                    { label: "全部", value: "-1" },
                    { label: "数据表", value: "1" },
                    { label: "其他附件", value: "0" },
                  ]}
                  style={{ width: 120 }}
                  value={filter.docType}
                  onChange={(value) => {
                    console.log("value: ", value);
                    setFilter({
                      ...filter,
                      docType: value,
                    });
                  }}
                ></Select>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item-label">提交时间</div>
              <div className="filter-item-content">
                <DatePicker.RangePicker
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      beginCreateTime: value?.[0]?.format("YYYY-MM-DD") || "",
                      endCreateTime: value?.[1]?.format("YYYY-MM-DD") || "",
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="filter-right">
            <div className="filter-item">
              <div className="filter-item-label">文件格式</div>
              <div className="filter-item-content">
                {[".xsl", ".pdf", ".docx", ".pptx", ".dwg"].map((item) => (
                  <div
                    className={classNames("filter-item-content-checkbox-item", { active: item === filter.fileFormat })}
                    key={item}
                    onClick={() => {
                      if (filter.format === item) {
                        setFilter({ ...filter, format: "" });
                      } else {
                        setFilter({ ...filter, format: item });
                      }
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="table-list">
          <Table
            className="u-table"
            columns={columns}
            dataSource={fileList}
            scroll={{ y: 41 * 14 }}
            pagination={false}
          />
        </div>
      </div>
    </Modal>
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
        {!props.readOnly && (
          <div className="addicon">
            <Upload
              accept={props.dataType === "1" ? "application/vnd.ms-excel" : ""}
              customRequest={(data) => {
                props.handleUpload(data, props.dataType);
              }}
              fileList={[]}
            >
              <Icon.AddIcon />
            </Upload>
          </div>
        )}
      </div>
      <div className="files-list">
        {cloneDeep(props.data)
          .reverse()
          .map((item) => (
            <div className="files-list-item" key={item.id}>
              <div className="files-list-item-name">{item.docName}</div>
              <div className="files-list-item-size">{getSizeLabel(item.size)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default DataManagementPage;
