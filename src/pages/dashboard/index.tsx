import type { GraphOptions } from "@antv/g6";
import { Graph as G6Graph } from "@antv/g6";
import { useRef, useEffect, useState } from "react";
import "./index.less";
import { Icon } from "@/icon";
import test from "./test.json";
const DashboardPage = () => {
  const [options, setOptions] = useState<GraphOptions>({
    autoFit: "view",
    layout: {
      // type: "force-atlas2",
      type: "d3-force",
      // preventOverlap: true,
      // kr: 20,
      // center: [250, 250],
    },
    node: {
      type: "image",
      style: {
        size: (node) => {
          return {
            0: 30,
            1: 10,
            2: 10,
          }[node.attributes.imgType];
        },
        src: (node) => {
          return {
            0: require("@/assets/images/img0.png"),
            1: require("@/assets/images/img1.png"),
            2: require("@/assets/images/img2.png"),
          }[node.attributes.imgType];
        },
        labelText: (d) => d.attributes.label,
        labelFontSize: (node) => {
          return {
            0: 8,
            1: 5,
            2: 5,
          }[node.attributes.imgType];
        },
        labelBackground: false,
      },
      animation: {
        enter: false,
      },
    },
    behaviors: ["zoom-canvas", "drag-canvas", "drag-element-force"],
    autoResize: true,
    zoomRange: [0.1, 5],
  });
  const graphRef = useRef<G6Graph>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new G6Graph({ container: containerRef.current! });
    graphRef.current = graph;

    return () => {
      const graph = graphRef.current;
      if (graph) {
        graph.destroy();
        graphRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const graph = graphRef.current;

    if (!options || !container || !graph || graph.destroyed) return;

    graph.setOptions(options);
    graph
      .render()
      // eslint-disable-next-line no-console
      .catch((error) => console.debug(error));
  }, [options]);

  useEffect(() => {
    test.nodes.forEach((node) => {
      const isSource = test.edges.find((edge) => edge.source === node.id);
      const isTarget = test.edges.find((edge) => edge.target === node.id);
      if (isSource && !isTarget) {
        console.log(node);
        node.attributes.imgType = 0;
      } else if (!isSource && isTarget) {
        node.attributes.imgType = 2;
      } else {
        node.attributes.imgType = 1;
      }
    });
    setOptions({
      ...options,
      data: test,
    });
  }, []);
  return (
    <div className="dashboard-page">
      <div className="update-btn">
        <Icon.UploadIcon></Icon.UploadIcon> 更新知识图谱
      </div>
      <img src={require("@/assets/images/legend.png")} className="legend"></img>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <div className="tools">
        <div className="search">
          <Icon.SearchIcon fill="white" />
        </div>
        <div className="line"></div>
        <div className="btns">
          <div className="btn">
            <Icon.ViewIcon />
          </div>
          <div className="btn">
            <Icon.ExpandIcon />
          </div>
          <div className="btn">
            <Icon.FullScreenIcon />
          </div>
        </div>
        <div className="line"></div>
        <div className="scale-wrap">
          <Icon.JiaIcon />
          <div className="bar">
            <div className="bar-line"></div>
            <div className="bar-dot"></div>
          </div>
          <Icon.JianIcon />
          <div className="bar-text">100%</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
