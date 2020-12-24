import { VNodeData } from "@stencil/core";
import styleToObject from "style-to-object";


export function attributesToProps<T extends VNodeData>(a?: T): VNodeData {
  if (!a) {
    return {};
  }
  const { style, ...rest } = a;
  return {
    style: styleToObject(style),
    ...rest,
  };
}
