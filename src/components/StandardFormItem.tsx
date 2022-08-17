import React from "react"
import { Form } from "antd"
import { TConfigs } from "../utils/interface"


export default function StandardFormItem(props: React.PropsWithoutRef<{
  StandardInput: any, 
  configs: TConfigs
}>){
  const { StandardInput, configs }= props
  const { itemProps, inputProps, }= configs

  return (
    <Form.Item {...itemProps} >
      <StandardInput {...inputProps}></StandardInput>
    </Form.Item>
  )
}