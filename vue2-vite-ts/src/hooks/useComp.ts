
import Vue from 'vue'

type Comp = {
  name: string;
};
export default function useComp(...comps:Comp[]) {

  comps.forEach(comp => {
    Vue.component(comp.name, comp)
  })
}