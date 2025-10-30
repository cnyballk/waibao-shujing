import { appStore } from "@/store/appStore";
import "./index.less";
import { history } from "umi";
import { useMemoizedFn } from "ahooks";
import FlowSvgCom from "./FlowSvgCom";

const biaoyu = [{ label: "立基与规划" }, { label: "验证与优化" }, { label: "精修与深化" }, { label: "呈现与交付" }];
const ProjectPage = () => {
  const { selectedProject } = appStore((state) => state);
  const projectData = JSON.parse(selectedProject.projectData);
  console.log("projectData: ", projectData);

  const handleClick = useMemoizedFn((flowId) => {
    console.log("flowId", flowId);
    appStore.setState({ selectFlowId: flowId });
    history.push('/dataManagement')
  });
  return (
    <div className="project-page">
      <div className="project-content">
        <div className="biaoyu">
          {biaoyu.map((item) => (
            <div className="biaoyu-item" key={item.label}>
              <img src={require("@/assets/images/标语标签.png")} alt="" />
              <div className="label">{item.label}</div>
              <div className="da">{item.label[0]}</div>
            </div>
          ))}
        </div>
        <div className="tuopu">
          <FlowSvgCom handleClick={handleClick}></FlowSvgCom>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
