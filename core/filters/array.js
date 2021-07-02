export default {
  /**
   * 数组转换为对象
   * @param array
   * @param keys 转换后的键名
   */
  arraySplitObject (array, keys = []) {
    let object = {}
    array.forEach((val, index) => {
      object[keys[index]] = val
    })
    return object
  },

  /**
   * 数组交换位置
   * @param array
   * @param oldIndex
   * @param newIndex
   */
  arraySwap (array, oldIndex, newIndex) {
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0])
    return array
  },

}
