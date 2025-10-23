import dayjs from "dayjs";
import "./index.less";
import { useState } from "react";
import RcGantt from "rc-gantt";
import { DatePicker } from "antd";
interface Data {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  planStartDate?: string;
  planEndDate: string;
  actualEndDate?: string;
  planDays: number;
  actualDays: number;
}

function createData(len: number) {
  const result: Data[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      id: i,
      name: "工作事项名称",
      startDate: dayjs().subtract(-i, "day").format("YYYY-MM-DD"),
      planEndDate: dayjs().add(i, "day").format("YYYY-MM-DD"),
      endDate: dayjs().add(i, "day").format("YYYY-MM-DD"),
      planDays: i,
      actualDays: i,
    });
  }
  return result;
}

const ProgressPage = () => {
  const [data, setData] = useState(createData(20));
  console.log("data", data);
  const columns = [
    {
      name: "id",
      label: "序号",
      width: 70,
    },
    {
      name: "name",
      label: "工作项",
      width: 150,
    },
    {
      name: "startDate",
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
      name: "planEndDate",
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
      name: "endDate",
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
      name: "planDays",
      label: "计划天数",
      width: 90,
    },
    {
      name: "actualDays",
      label: "实际天数",
      width: 90,
    },
  ];
  const handleUpdate = (row: Data, data) => {
    console.log("update", row, data);
    setData((prev) => {
      const newList = [...prev];
      const index = newList.findIndex((val) => val.id === row.id);
      newList[index] = { ...row, ...data };
      return newList;
    });
  };
  return (
    <div className="progress-page">
      <RcGantt<Data>
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
          });
          return true;
        }}
      />
    </div>
  );
};

export default ProgressPage;
