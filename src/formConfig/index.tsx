import React, { useRef, useState } from "react";

import ItemsList from "./ItemList";
import FormTemplate from "./FormTemplate";

export const ConfigsContext = React.createContext(null);

export function FormConfig(
  props: React.PropsWithChildren<{
    onGetSchemaModel: any;
  }>
) {
  const { onGetSchemaModel } = props;
  const activeSchema = useRef(null);
  const [schemaList, setSchemaList] = useState([]);
  const setForceRender = useState(0)[1];
  const contextValue: any = {
    activeSchema,
    schemaList,
    schemaListOptions: [],
    setSchemaList,
    onGetSchemaModel,
    forceRender: () => setForceRender((pre) => pre + 1),
  };

  return (
    <ConfigsContext.Provider value={contextValue}>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <ItemsList />
        <FormTemplate />
      </div>
    </ConfigsContext.Provider>
  );
}
