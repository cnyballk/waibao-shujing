import dayjs from "dayjs";
import "./index.less";
import { useEffect, useState } from "react";
import RcGantt from "rc-gantt";
import { DatePicker } from "antd";
import { request } from "@/axios";
import { appStore } from "@/store/appStore";

const ProgressPage = () => {
  const [data, setData] = useState([]);
  const { selectFlowId, selectedProjectId } = appStore((state) => state);
  console.log("data", data);

  useEffect(() => {
    request
      .get("/design/schedule/list", {
        pageNum: 1,
        pageSize: 1000,
        projectId: selectedProjectId,
      })
      .then((res) => {
        console.log("ProgressPage: ", res);
        const data = res.rows.map((item) => {
          return {
            ...item,
            startDate: item.plannedStartDate,
            endDate: item.actualEndDate,
          };
        });
        setData(data);
      });
  }, []);
  const columns = [
    {
      name: "id",
      label: "序号",
      width: 70,
    },
    {
      name: "workItem",
      label: "工作项",
      width: 150,
    },
    {
      name: "plannedStartDate",
      label: "计划开始",
      width: 150,
      render: (record) => {
        return (
          <DatePicker
            value={dayjs(record.startDate)}
            maxDate={dayjs(record.planEndDate)}
            onChange={(value) => {
              handleUpdate(record, {
                startDate: dayjs(value).format("YYYY-MM-DD"),
              });
            }}
          />
        );
      },
    },
    {
      name: "plannedEndDate",
      label: "计划结束",
      width: 150,
      render: (record) => {
        return (
          <DatePicker
            value={dayjs(record.planEndDate)}
            minDate={dayjs(record.startDate)}
            onChange={(value) => {
              handleUpdate(record, {
                planEndDate: dayjs(value).format("YYYY-MM-DD"),
              });
            }}
          />
        );
      },
    },
    {
      name: "actualEndDate",
      label: "实际结束",
      width: 150,
      render: (record) => {
        return (
          <DatePicker
            value={dayjs(record.endDate)}
            minDate={dayjs(record.startDate)}
            onChange={(value) => {
              handleUpdate(record, {
                endDate: dayjs(value).format("YYYY-MM-DD"),
              });
            }}
          />
        );
      },
    },
    {
      name: "plannedDays",
      label: "计划天数",
      width: 90,
    },
    {
      name: "actualDays",
      label: "实际天数",
      width: 90,
    },
  ];
  const handleUpdate = (row: any, data) => {
    console.log("update", row, data);
    setData((prev) => {
      const newList = [...prev];
      const index = newList.findIndex((val) => val.id === row.id);
      newList[index] = { ...row, ...data };
      request.put('/design/schedule',{ ...row, ...data }).then(res=>{
      })
      return newList;
    });
  };
  return (
    <div className="progress-page">
      <RcGantt<any>
        data={data}
        columns={columns}
        alwaysShowTaskBar={false}
        getBarColor={(record) => {
          return {
            backgroundColor: "#237FFF",
            borderColor: "#237FFF",
          };
        }}
        rowHeight={46}
        onUpdate={async (row, startDate, endDate) => {
          console.log("update", row, startDate, endDate);
          handleUpdate(row, {
            startDate: dayjs(startDate).format("YYYY-MM-DD"),
            endDate: dayjs(endDate).format("YYYY-MM-DD"),
            plannedStartDate: dayjs(startDate).format("YYYY-MM-DD"),
            actualEndDate: dayjs(endDate).format("YYYY-MM-DD"),
            actualDays: dayjs(endDate).diff(dayjs(startDate), "day"),
          });
          return true;
        }}
      />
    </div>
  );
};

export default ProgressPage;
