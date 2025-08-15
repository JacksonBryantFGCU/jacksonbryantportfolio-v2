// src/components/SkillsMap.tsx
import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5 } from "react-icons/fa";

const initialNodes = [
  {
    id: "1",
    position: { x: 250, y: 0 },
    data: { label: <div style={{ textAlign: "center" }}><FaReact size={30} color="#61DBFB" /><div style={{ color: "#61DBFB" }}>React</div></div> },
    style: {
      backgroundColor: "#1a1f2b",
      border: "2px solid #61DBFB",
      borderRadius: "12px",
      padding: "10px"
    }
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: <div style={{ textAlign: "center" }}><FaNodeJs size={30} color="#68A063" /><div style={{ color: "#68A063" }}>Node.js</div></div> },
    style: {
      backgroundColor: "#1a1f2b",
      border: "2px solid #68A063",
      borderRadius: "12px",
      padding: "10px"
    }
  },
  {
    id: "3",
    position: { x: 400, y: 100 },
    data: { label: <div style={{ textAlign: "center" }}><FaCss3Alt size={30} color="#264de4" /><div style={{ color: "#264de4" }}>CSS3</div></div> },
    style: {
      backgroundColor: "#1a1f2b",
      border: "2px solid #264de4",
      borderRadius: "12px",
      padding: "10px"
    }
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: { label: <div style={{ textAlign: "center" }}><FaHtml5 size={30} color="#e34c26" /><div style={{ color: "#e34c26" }}>HTML5</div></div> },
    style: {
      backgroundColor: "#1a1f2b",
      border: "2px solid #e34c26",
      borderRadius: "12px",
      padding: "10px"
    }
  }
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", style: { stroke: "#61DBFB" } },
  { id: "e1-3", source: "1", target: "3", style: { stroke: "#61DBFB" } },
  { id: "e1-4", source: "1", target: "4", style: { stroke: "#61DBFB" } }
];

export default function SkillsMap() {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background: "linear-gradient(90deg, #121726 0%, #0c1122 30%, #060714 100%)",
        borderRadius: "12px",
        padding: "10px"
      }}
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        panOnDrag={false}
        fitView
      />
    </div>
  );
}
