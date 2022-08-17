import React from "react";
import { Form } from "antd";
import { itemStore } from "../utils/itemStore";
import { createDraggableItems } from "../utils/createDraggableItem";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function ItemsList() {
  const formItems = createDraggableItems(itemStore)

  return (
    <>
      <div>
        <Form {...layout}>
          <div>{formItems}</div>
        </Form>
      </div>
    </>
  );
}

export default React.memo(ItemsList);
