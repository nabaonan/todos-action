import { useHooksOnDesign } from "plain-design-composition";

/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
function getUUID(randomLength: number):string {
  return Number(
    Math.random()
      .toString()
      .substr(2, randomLength) + Date.now()
  ).toString(36);
}



export function useHookRef<T extends (...args: any[]) => any>(hookRefFunction: T): { value: T extends ((...args: any[]) => [infer R]) ? R : never } {
  const refs = {value: null} as any
  useHooksOnDesign(() => {
      const [refer] = hookRefFunction()
      refs.value = refer
  })
  return refs
}

export { getUUID };
