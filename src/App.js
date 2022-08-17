import React, { useState, useMemo } from "react";
import { Menu } from "antd";

import ItemsList from "./formConfig/ItemList";
import { FormConfig } from "./formConfig";
import "./App.css";

function App() {
  const [current, setCurrent] = useState("config");

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const menuItems = [
    { label: "配置模板", key: "config" },
    { label: "渲染模板", key: "render" },
  ];

  const content = useMemo(() => {
    console.log(current);

    switch (current) {
      case "config":
        return <FormConfig />;
      default:
        return <ItemsList />;
    }
  }, [current]);

  return (
    <div className="App">
      <h1>低代码 demo</h1>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
      <div className="content-area">{content}</div>
    </div>
  );
}

export default App;
