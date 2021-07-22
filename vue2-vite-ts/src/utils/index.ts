/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
function getUUID(randomLength: number) {
  return Number(
    Math.random()
      .toString()
      .substr(2, randomLength) + Date.now()
  ).toString(36);
}

export { getUUID };
