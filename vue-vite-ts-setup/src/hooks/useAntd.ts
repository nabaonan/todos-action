import { Plugin, getCurrentInstance } from "vue";

interface Registed {
  [key: string]: boolean;
}
let registed: Registed = {};

type Comp = {
  displayName?: string;
  name?: string;
} & Plugin;

type RegisteComps = (...comps: Comp[]) => void;

export const useComp: RegisteComps = (...comps) => {
  comps.forEach(comp => {
    const name = comp.displayName || comp.name;

    if (name && !registed[name]) {
      const instance = getCurrentInstance();
      const app = instance?.appContext.app;

      if (app) {
        app.use(comp);
        registed[name] = true;
      }
    }
  });
};
