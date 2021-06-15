import { getThemeVariables } from "ant-design-vue/dist/theme";
export function generateModifyVars(dark = false) {
  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
  };
}
