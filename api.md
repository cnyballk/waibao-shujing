# 设计交互系统接口文档

## 概述

本文档描述了设计交互系统（`com.ruoyi.design`）的所有REST API接口。所有接口都遵循RESTful设计原则，并通过Spring Security进行权限控制。

## 基础信息

- **基础路径**: `/design`
- **响应格式**: JSON
- **权限控制**: 基于Spring Security的权限注解

---

## 1. 项目管理接口 (BizProjectController)

### 基础路径: `/design/project`

#### 1.1 查询项目列表
- **接口URL**: `GET /design/project/list`
- **权限要求**: `design:project:list`
- **接口描述**: 分页查询项目列表
- **请求参数**: 
  - `BizProject` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 项目ID |
| projectName | String | 否 | 项目名称 |
| projectManager | String | 否 | 项目经理 |
| thumbnail | String | 否 | 项目缩略图URL |
| projectData | String | 否 | 数据看板 |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `TableDataInfo`

#### 1.2 查询当前用户的项目列表
- **接口URL**: `GET /design/project/my`
- **权限要求**: 无（注释掉了权限检查）
- **接口描述**: 查询当前登录用户的项目列表
- **请求参数**: 无
- **响应格式**: `TableDataInfo`

#### 1.3 导出项目列表
- **接口URL**: `POST /design/project/export`
- **权限要求**: `design:project:export`
- **接口描述**: 导出项目数据为Excel文件
- **请求参数**:
  - `BizProject` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 项目ID |
| projectName | String | 否 | 项目名称 |
| projectManager | String | 否 | 项目经理 |
| thumbnail | String | 否 | 项目缩略图URL |
| projectData | String | 否 | 数据看板 |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: Excel文件

#### 1.4 获取项目详细信息
- **接口URL**: `GET /design/project/{id}`
- **权限要求**: `design:project:query`
- **接口描述**: 根据ID获取项目详细信息
- **请求参数**:
  - `id` (Long): 项目ID
- **响应格式**: `AjaxResult`

#### 1.5 新增项目
- **接口URL**: `POST /design/project`
- **权限要求**: `design:project:add`
- **接口描述**: 创建新项目
- **请求参数**:
  - `BizProject` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| projectName | String | 是 | 项目名称 |
| projectManager | String | 否 | 项目经理 |
| thumbnail | String | 否 | 项目缩略图URL |
| projectData | String | 否 | 数据看板 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 1.6 修改项目
- **接口URL**: `PUT /design/project`
- **权限要求**: `design:project:edit`
- **接口描述**: 更新项目信息
- **请求参数**:
  - `BizProject` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 是 | 项目ID |
| projectName | String | 否 | 项目名称 |
| projectManager | String | 否 | 项目经理 |
| thumbnail | String | 否 | 项目缩略图URL |
| projectData | String | 否 | 数据看板 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 1.7 删除项目
- **接口URL**: `DELETE /design/project/{ids}`
- **权限要求**: `design:project:remove`
- **接口描述**: 批量删除项目
- **请求参数**:
  - `ids` (Long[]): 项目ID数组
- **响应格式**: `AjaxResult`

---

## 2. 项目流程资料接口 (BizProjectFlowDocumentController)

### 基础路径: `/design/document`

#### 2.1 查询项目流程资料列表
- **接口URL**: `GET /design/document/list`
- **权限要求**: `design:document:list`
- **接口描述**: 分页查询项目流程资料列表
- **请求参数**: 
  - `BizProjectFlowDocument` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 资料ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| version | String | 否 | 版本号 |
| docType | String | 否 | 资料类型 |
| docName | String | 否 | 资料名称 |
| format | String | 否 | 文件格式 |
| size | Long | 否 | 文件大小 |
| docPath | String | 否 | 资料路径 |
| isDeleted | Integer | 否 | 是否删除 |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `TableDataInfo`

#### 2.2 导出项目流程资料列表
- **接口URL**: `POST /design/document/export`
- **权限要求**: `design:document:export`
- **接口描述**: 导出项目流程资料数据为Excel文件
- **请求参数**:
  - `BizProjectFlowDocument` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| 参数同查询列表接口 | - | - | - |

- **响应格式**: Excel文件

#### 2.3 获取项目流程资料详细信息
- **接口URL**: `GET /design/document/{id}`
- **权限要求**: `design:document:query`
- **接口描述**: 根据ID获取项目流程资料详细信息
- **请求参数**:
  - `id` (Long): 资料ID
- **响应格式**: `AjaxResult`

#### 2.4 新增项目流程资料
- **接口URL**: `POST /design/document`
- **权限要求**: `design:document:add`
- **接口描述**: 创建新的项目流程资料
- **请求参数**:
  - `BizProjectFlowDocument` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| projectId | Long | 是 | 项目ID |
| flowCode | String | 是 | 流程编号 |
| version | String | 否 | 版本号 |
| docType | String | 是 | 资料类型 |
| docName | String | 是 | 资料名称 |
| format | String | 否 | 文件格式 |
| size | Long | 否 | 文件大小 |
| docPath | String | 是 | 资料路径 |
| isDeleted | Integer | 否 | 是否删除（0-未删除，1-已删除） |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 2.5 修改项目流程资料
- **接口URL**: `PUT /design/document`
- **权限要求**: `design:document:edit`
- **接口描述**: 更新项目流程资料信息
- **请求参数**:
  - `BizProjectFlowDocument` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 是 | 资料ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| version | String | 否 | 版本号 |
| docType | String | 否 | 资料类型 |
| docName | String | 否 | 资料名称 |
| format | String | 否 | 文件格式 |
| size | Long | 否 | 文件大小 |
| docPath | String | 否 | 资料路径 |
| isDeleted | Integer | 否 | 是否删除 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 2.6 删除项目流程资料
- **接口URL**: `DELETE /design/document/{ids}`
- **权限要求**: `design:document:remove`
- **接口描述**: 批量删除项目流程资料
- **请求参数**:
  - `ids` (Long[]): 资料ID数组
- **响应格式**: `AjaxResult`

#### 2.7 批量上传文件
- **接口URL**: `POST /design/document/uploadBatch`
- **权限要求**: `design:document:add`
- **接口描述**: 批量上传文件并插入项目流程资料
- **请求参数**:
  - `files` (MultipartFile[]): 文件数组
  - `projectId` (Long): 项目ID
  - `flowCode` (String): 流程代码
  - `version` (String): 版本号
  - `docType` (String): 文档类型
- **响应格式**: `AjaxResult`

---

## 3. 项目流程反馈接口 (BizProjectFlowFeedbackController)

### 基础路径: `/design/feedback`

#### 3.1 查询项目流程反馈列表
- **接口URL**: `GET /design/feedback/list`
- **权限要求**: `design:feedback:list`
- **接口描述**: 分页查询项目流程反馈列表
- **请求参数**: 
  - `BizProjectFlowFeedback` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 反馈ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| version | String | 否 | 版本号 |
| content | String | 否 | 反馈内容 |
| images | String | 否 | 反馈图片 |
| feedbackTime | Date | 否 | 反馈时间 |
| feedbackUserId | Long | 否 | 反馈人 ID |
| isConfirmed | Integer | 否 | 是否确认 |
| confirmedBy | Long | 否 | 确认人 ID |
| confirmedTime | Date | 否 | 确认时间 |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `TableDataInfo`

#### 3.2 导出项目流程反馈列表
- **接口URL**: `POST /design/feedback/export`
- **权限要求**: `design:feedback:export`
- **接口描述**: 导出项目流程反馈数据为Excel文件
- **请求参数**:
  - `BizProjectFlowFeedback` 对象作为查询条件
- **响应格式**: Excel文件

#### 3.3 获取项目流程反馈详细信息
- **接口URL**: `GET /design/feedback/{id}`
- **权限要求**: `design:feedback:query`
- **接口描述**: 根据ID获取项目流程反馈详细信息
- **请求参数**:
  - `id` (Long): 反馈ID
- **响应格式**: `AjaxResult`

#### 3.4 新增项目流程反馈
- **接口URL**: `POST /design/feedback`
- **权限要求**: `design:feedback:add`
- **接口描述**: 创建新的项目流程反馈
- **请求参数**:
  - `BizProjectFlowFeedback` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| projectId | Long | 是 | 项目ID |
| flowCode | String | 是 | 流程编号 |
| version | String | 否 | 版本号 |
| content | String | 是 | 反馈内容 |
| images | String | 否 | 反馈图片 |
| feedbackTime | Date | 否 | 反馈时间（yyyy-MM-dd） |
| feedbackUserId | Long | 否 | 反馈人 ID |
| isConfirmed | Integer | 否 | 是否确认（0-未确认，1-已确认） |
| confirmedBy | Long | 否 | 确认人 ID |
| confirmedTime | Date | 否 | 确认时间（yyyy-MM-dd） |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 3.5 修改项目流程反馈
- **接口URL**: `PUT /design/feedback`
- **权限要求**: `design:feedback:edit`
- **接口描述**: 更新项目流程反馈信息
- **请求参数**:
  - `BizProjectFlowFeedback` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 是 | 反馈ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| version | String | 否 | 版本号 |
| content | String | 否 | 反馈内容 |
| images | String | 否 | 反馈图片 |
| feedbackTime | Date | 否 | 反馈时间 |
| feedbackUserId | Long | 否 | 反馈人 ID |
| isConfirmed | Integer | 否 | 是否确认 |
| confirmedBy | Long | 否 | 确认人 ID |
| confirmedTime | Date | 否 | 确认时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 3.6 删除项目流程反馈
- **接口URL**: `DELETE /design/feedback/{ids}`
- **权限要求**: `design:feedback:remove`
- **接口描述**: 批量删除项目流程反馈
- **请求参数**:
  - `ids` (Long[]): 反馈ID数组
- **响应格式**: `AjaxResult`

---

## 4. 项目流程用户关联接口 (BizProjectFlowUserController)

### 基础路径: `/design/user`

#### 4.1 查询项目流程用户关联列表
- **接口URL**: `GET /design/user/list`
- **权限要求**: `design:user:list`
- **接口描述**: 分页查询项目流程用户关联列表
- **请求参数**: 
  - `BizProjectFlowUser` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 关联ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| userId | Long | 否 | 用户ID |
| isLeader | Integer | 否 | 是否负责人（0-普通成员，1-负责人） |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `TableDataInfo`

#### 4.2 导出项目流程用户关联列表
- **接口URL**: `POST /design/user/export`
- **权限要求**: `design:user:export`
- **接口描述**: 导出项目流程用户关联数据为Excel文件
- **请求参数**:
  - `BizProjectFlowUser` 对象作为查询条件
- **响应格式**: Excel文件

#### 4.3 获取项目流程用户关联详细信息
- **接口URL**: `GET /design/user/{id}`
- **权限要求**: `design:user:query`
- **接口描述**: 根据ID获取项目流程用户关联详细信息
- **请求参数**:
  - `id` (Long): 关联ID
- **响应格式**: `AjaxResult`

#### 4.4 新增项目流程用户关联
- **接口URL**: `POST /design/user`
- **权限要求**: `design:user:add`
- **接口描述**: 创建新的项目流程用户关联
- **请求参数**:
  - `BizProjectFlowUser` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| projectId | Long | 是 | 项目ID |
| flowCode | String | 是 | 流程编号 |
| userId | Long | 是 | 用户ID |
| isLeader | Integer | 否 | 是否负责人（0-普通成员，1-负责人） |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 4.5 修改项目流程用户关联
- **接口URL**: `PUT /design/user`
- **权限要求**: `design:user:edit`
- **接口描述**: 更新项目流程用户关联信息
- **请求参数**:
  - `BizProjectFlowUser` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 是 | 关联ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| userId | Long | 否 | 用户ID |
| isLeader | Integer | 否 | 是否负责人 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 4.6 删除项目流程用户关联
- **接口URL**: `DELETE /design/user/{ids}`
- **权限要求**: `design:user:remove`
- **接口描述**: 批量删除项目流程用户关联
- **请求参数**:
  - `ids` (Long[]): 关联ID数组
- **响应格式**: `AjaxResult`

---

## 5. 项目进度管理接口 (BizProjectScheduleController)

### 基础路径: `/design/schedule`

#### 5.1 查询项目进度管理列表
- **接口URL**: `GET /design/schedule/list`
- **权限要求**: `design:schedule:list`
- **接口描述**: 分页查询项目进度管理列表
- **请求参数**: 
  - `BizProjectSchedule` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 进度ID |
| projectId | Long | 否 | 项目ID |
| workItem | String | 否 | 工作项名称 |
| plannedStartDate | Date | 否 | 计划开始日期（yyyy-MM-dd） |
| plannedEndDate | Date | 否 | 计划结束日期（yyyy-MM-dd） |
| actualEndDate | Date | 否 | 实际结束日期（yyyy-MM-dd） |
| plannedDays | Long | 否 | 计划天数 |
| actualDays | Long | 否 | 实际天数 |
| status | Integer | 否 | 状态（0-未开始，1-进行中，2-已完成，3-已延期） |
| flowCode | String | 否 | 流程编码 |
| designVersion | String | 否 | 设计版本 |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `TableDataInfo`

#### 5.2 导出项目进度管理列表
- **接口URL**: `POST /design/schedule/export`
- **权限要求**: `design:schedule:export`
- **接口描述**: 导出项目进度管理数据为Excel文件
- **请求参数**:
  - `BizProjectSchedule` 对象作为查询条件
- **响应格式**: Excel文件

#### 5.3 获取项目进度管理详细信息
- **接口URL**: `GET /design/schedule/{id}`
- **权限要求**: `design:schedule:query`
- **接口描述**: 根据ID获取项目进度管理详细信息
- **请求参数**:
  - `id` (Long): 进度ID
- **响应格式**: `AjaxResult`

#### 5.4 新增项目进度管理
- **接口URL**: `POST /design/schedule`
- **权限要求**: `design:schedule:add`
- **接口描述**: 创建新的项目进度管理记录
- **请求参数**:
  - `BizProjectSchedule` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| projectId | Long | 是 | 项目ID |
| workItem | String | 是 | 工作项名称 |
| plannedStartDate | Date | 是 | 计划开始日期（yyyy-MM-dd） |
| plannedEndDate | Date | 是 | 计划结束日期（yyyy-MM-dd） |
| actualEndDate | Date | 否 | 实际结束日期（yyyy-MM-dd） |
| plannedDays | Long | 否 | 计划天数 |
| actualDays | Long | 否 | 实际天数 |
| status | Integer | 否 | 状态（0-未开始，1-进行中，2-已完成，3-已延期） |
| flowCode | String | 否 | 流程编码 |
| designVersion | String | 否 | 设计版本 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 5.5 修改项目进度管理
- **接口URL**: `PUT /design/schedule`
- **权限要求**: `design:schedule:edit`
- **接口描述**: 更新项目进度管理信息
- **请求参数**:
  - `BizProjectSchedule` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 是 | 进度ID |
| projectId | Long | 否 | 项目ID |
| workItem | String | 否 | 工作项名称 |
| plannedStartDate | Date | 否 | 计划开始日期 |
| plannedEndDate | Date | 否 | 计划结束日期 |
| actualEndDate | Date | 否 | 实际结束日期 |
| plannedDays | Long | 否 | 计划天数 |
| actualDays | Long | 否 | 实际天数 |
| status | Integer | 否 | 状态 |
| flowCode | String | 否 | 流程编码 |
| designVersion | String | 否 | 设计版本 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 5.6 删除项目进度管理
- **接口URL**: `DELETE /design/schedule/{ids}`
- **权限要求**: `design:schedule:remove`
- **接口描述**: 批量删除项目进度管理记录
- **请求参数**:
  - `ids` (Long[]): 进度ID数组
- **响应格式**: `AjaxResult`

---

## 6. 项目流程接口 (BizProjectWorkflowController)

### 基础路径: `/design/workflow`

#### 6.1 查询项目流程列表
- **接口URL**: `GET /design/workflow/list`
- **权限要求**: `design:workflow:list`
- **接口描述**: 分页查询项目流程列表
- **请求参数**: 
  - `BizProjectWorkflow` 对象作为查询条件

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 否 | 流程ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| flowName | String | 否 | 流程名称 |
| flowType | Integer | 否 | 流程类型 |
| previous | String | 否 | 上个流程 |
| next | String | 否 | 下个流程 |
| feedback | String | 否 | 反馈流程 |
| details | String | 否 | 流程详情 |
| sortOrder | Long | 否 | 排序序号 |
| isConfirmed | Integer | 否 | 是否确认 |
| confirmBy | String | 否 | 确认人 |
| confirmTime | Date | 否 | 确认时间（yyyy-MM-dd HH:mm:ss） |
| createBy | String | 否 | 创建者 |
| createTime | Date | 否 | 创建时间 |
| updateBy | String | 否 | 更新者 |
| updateTime | Date | 否 | 更新时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `TableDataInfo`

#### 6.2 导出项目流程列表
- **接口URL**: `POST /design/workflow/export`
- **权限要求**: `design:workflow:export`
- **接口描述**: 导出项目流程数据为Excel文件
- **请求参数**:
  - `BizProjectWorkflow` 对象作为查询条件
- **响应格式**: Excel文件

#### 6.3 获取项目流程详细信息
- **接口URL**: `GET /design/workflow/{id}`
- **权限要求**: `design:workflow:query`
- **接口描述**: 根据ID获取项目流程详细信息
- **请求参数**:
  - `id` (Long): 流程ID
- **响应格式**: `AjaxResult`

#### 6.4 新增项目流程
- **接口URL**: `POST /design/workflow`
- **权限要求**: `design:workflow:add`
- **接口描述**: 创建新的项目流程
- **请求参数**:
  - `BizProjectWorkflow` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| projectId | Long | 是 | 项目ID |
| flowCode | String | 是 | 流程编号 |
| flowName | String | 是 | 流程名称 |
| flowType | Integer | 否 | 流程类型 |
| previous | String | 否 | 上个流程 |
| next | String | 否 | 下个流程 |
| feedback | String | 否 | 反馈流程 |
| details | String | 否 | 流程详情 |
| sortOrder | Long | 否 | 排序序号 |
| isConfirmed | Integer | 否 | 是否确认（0-未确认，1-已确认） |
| confirmBy | String | 否 | 确认人 |
| confirmTime | Date | 否 | 确认时间（yyyy-MM-dd HH:mm:ss） |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 6.5 修改项目流程
- **接口URL**: `PUT /design/workflow`
- **权限要求**: `design:workflow:edit`
- **接口描述**: 更新项目流程信息
- **请求参数**:
  - `BizProjectWorkflow` 对象（JSON格式）

| 字段名 | 字段类型 | 必填 | 描述 |
|--------|----------|------|------|
| id | Long | 是 | 流程ID |
| projectId | Long | 否 | 项目ID |
| flowCode | String | 否 | 流程编号 |
| flowName | String | 否 | 流程名称 |
| flowType | Integer | 否 | 流程类型 |
| previous | String | 否 | 上个流程 |
| next | String | 否 | 下个流程 |
| feedback | String | 否 | 反馈流程 |
| details | String | 否 | 流程详情 |
| sortOrder | Long | 否 | 排序序号 |
| isConfirmed | Integer | 否 | 是否确认 |
| confirmBy | String | 否 | 确认人 |
| confirmTime | Date | 否 | 确认时间 |
| remark | String | 否 | 备注 |

- **响应格式**: `AjaxResult`

#### 6.6 删除项目流程
- **接口URL**: `DELETE /design/workflow/{ids}`
- **权限要求**: `design:workflow:remove`
- **接口描述**: 批量删除项目流程
- **请求参数**:
  - `ids` (Long[]): 流程ID数组
- **响应格式**: `AjaxResult`

---

## 通用响应格式

### TableDataInfo (分页数据响应)
```json
{
  "total": 100,
  "rows": [
    // 数据列表
  ],
  "code": 200,
  "msg": "查询成功"
}
```

### AjaxResult (通用响应)
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    // 具体数据
  }
}
```

## 错误码说明

- `200`: 操作成功
- `401`: 未授权
- `403`: 无权限
- `404`: 资源不存在
- `500`: 服务器内部错误

## 权限说明

所有接口都需要相应的权限才能访问，权限格式为：`模块:功能:操作`

例如：
- `design:project:list` - 项目列表查询权限
- `design:project:add` - 项目新增权限
- `design:project:edit` - 项目编辑权限
- `design:project:remove` - 项目删除权限

---

**文档版本**: 1.0  
**最后更新**: 2025-10-13  
**作者**: DJJ