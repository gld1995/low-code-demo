import React, { useContext, useEffect, useRef } from "react";
import { Button, Form, FormProps } from "antd";
import { cloneDeep } from "lodash";

import { ConfigsContext } from "./index";
import { itemStore } from "../utils/itemStore";
import { DroppedItem } from "../components/DroppedItem";

import {
  TConfigs,
  ItemStoreInfo,
  TLinkedInfo,
  TSchema,
  TSchemaType,
} from "../utils/interface";

export class LeggoSchema implements TSchema {
  id: string;
  type: TSchemaType;
  configs: TConfigs;
  currentItemValue: any;
  needDefineGetterProps: { [namepath: string]: TLinkedInfo };
  constructor(schemaType: TSchemaType, itemInfo: ItemStoreInfo) {
    this.id = Date.now().toString();
    this.type = schemaType;
    this.configs = cloneDeep(itemInfo).configs;
    this.currentItemValue = null;
    this.needDefineGetterProps = {};
    const name = this.configs.itemProps.name;
    if (name !== undefined) {
      this.configs.itemProps.name =
        name + Math.random().toString(36).substring(2, 5);
    }
  }
  public getStringedName = () => String(this.configs.itemProps.name);
}

const defaultFormProps: FormProps = {
  name: undefined,
  labelCol: { span: 6, offset: 0 },
  wrapperCol: { span: 16, offset: 0 },
  colon: true,
  labelAlign: "right",
  layout: "horizontal",
  scrollToFirstError: false,
  size: undefined,
  validateTrigger: "onChange",
  preserve: true,
  requiredMark: true,
};

export default function LeggoMiddle() {
  const { schemaList, setSchemaList, activeSchema } =
    useContext(ConfigsContext);
  const [form] = Form.useForm();
  const formProps = useRef<FormProps>(defaultFormProps);
  const targetIndex = useRef<number>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const schemaType = e.dataTransfer.getData("text/plain");
    if (!schemaType) {
      return;
    }
    const ItemInfo = itemStore[schemaType];
    const newSchema = new LeggoSchema(schemaType, ItemInfo);
    setSchemaList([...schemaList, newSchema]);
  };

  const clearAllSchemas = () => {
    activeSchema.current = null;
    setSchemaList([]);
  };

  useEffect(() => {
    form.validateFields();
  });

  return (
    <div className="leggo-configs-middle">
      <div className="top-area">
        <strong>表单模板</strong>
        <div className="top-actions">
          <Button onClick={clearAllSchemas}>clear</Button>
        </div>
      </div>
      <Form
        form={form}
        {...formProps.current}
        className="leggo-configs-middle-form"
      >
        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ width: 300, height: 800, border: "1px dashed red" }}
        >
          {schemaList.map((schema: any, index: number) => (
            <DroppedItem
              key={schema.id}
              index={index}
              targetIndex={targetIndex}
              schema={schema}
            />
          ))}
        </div>
      </Form>
    </div>
  );
}
