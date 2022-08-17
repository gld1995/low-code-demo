import React from "react";
import StandardFormItem from "../components/StandardFormItem";
import { ItemStoreInfo } from "./interface";

export function createDraggableItems(itemStore: {
  [key: string]: ItemStoreInfo;
}) {
  const result: any = [];

  const handleDragStart = (e: React.DragEvent) => {
    //@ts-ignore
    const schemaType = e.target.dataset.type;
    e.dataTransfer.setData("text/plain", schemaType);
    //@ts-ignore
    console.log(e, e.target.dataset.type);
  };

  for (const value of Object.values(itemStore)) {
    const { type, StandardInput, configs } = value;
    const item = (
      <div
        key={type}
        className="item"
        draggable
        onDragStart={handleDragStart}
        data-type={type}
      >
        <div style={{ pointerEvents: "none" }}>
          <StandardFormItem StandardInput={StandardInput} configs={configs} />
        </div>
      </div>
    );
    result.push(item);
  }

  return result;
}
