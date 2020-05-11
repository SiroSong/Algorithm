let testArray = [1,2,3,4,5,6,7,8,9,10]
/**
 * 二分查找
 * 
 * @param {Array} array 
 * @param {Number} target 
 * @returns {Number}
 */
function BinarySearch(array, target) {
  let left = 0,
      right = array.length - 1
  /**
   * 当left、right不相等当时候，说明还没有目标值且数组也没有二分完，继续遍历
   */
  while (right - left) {
    let mid = Math.floor((left + right) / 2)

    if (array[mid] === target) {
      return mid
    }
    /**
     * 当target值大于当前循环的中值时就更改左侧边界为当前中值索引，缩小查找范围，反
     * 之更改右侧边界，缩小查找范围，当符合条件是return当前的mid值即为所求。
     */
    if (array[mid] > target) {
      right = mid
    } else {
      left = mid
    }
  }

  return -1
}