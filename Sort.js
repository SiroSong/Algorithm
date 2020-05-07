let testArray = [7,23,98,45,76,12,31,4,5,64,13,99,77,54,11,21,79,443,976,627,55,975,764,295,362,
                856,991,773,201,119,118,440,339,227,434,130.197,540,227,356,298]
// 快速排序
// 时间复杂度： 平均O(nlogn)，最坏O(n2)，实际上大多情况小于O(nlogn)
// 空间复杂度： O(logn)（递归调用消耗）
// 稳定性： 不稳定

/**
 * 快速排序1
 * 
 * 时间复杂度： 平均O(nlogn)，最坏O(n2)，实际上大多情况小于O(nlogn)
 * 
 * 空间复杂度： O(logn)（递归调用消耗）
 * 
 * 稳定性： 不稳定
 * 
 * @param {Array} array 待排序数组
 * @returns {Array} 
 */
function quickSort1(array){
  if (array.length < 2) {
    return array
  }

  const target = array[0],
        left = [],
        right = []
  
  for (let i = 1; i < array.length; i++) {
    if (array[i] < target) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return quickSort1(left).concat([target], quickSort1(right))
}

/**
 * 快速排序2
 * 
 * 时间复杂度： 平均O(nlogn)，最坏O(n2)，实际上大多情况小于O(nlogn)
 * 
 * 空间复杂度： O(logn)（递归调用消耗）
 * 
 * 稳定性： 不稳定
 * 
 * @param {Array} array 待排序数组
 * @param {Number} start 开始索引值
 * @param {Number} end 结束索引值
 * @returns {Array}
 */
function quickSort2(array, start, end) {
  if (end - start < 1) {
    return
  }

  const target = array[start]
  let l = start,
      r = end
  
  while (l < r) {
    while (l < r && array[r] >= target) {
      r--
    }
    array[l] = array[r]

    while (l < r && array[l] < target) {
      l++
    }
    array[r] = array[l]
  }

  array[l] = target
  quickSort2(array, start, l - 1)
  quickSort2(array, l + 1, end)

  return array
}

// 归并排序
// 时间复杂度： O(nlogn)
// 空间复杂度： O(n)
// 稳定性： 稳定
/**
 * 归并排序
 * 
 * 时间复杂度： O(nlogn)
 * 
 * 空间复杂度： O(n)
 * 
 * 稳定性： 稳定
 * 
 * @param {Array} array 待排序数组
 */
function mergeSort1(array) {
  if (array.length < 2) {
    return array
  }

  const mid = Math.floor(array.length / 2),
        front = array.slice(0, mid),
        end = array.slice(mid)

  return merge1(mergeSort1(front), mergeSort1(end))
}
/**
 * 
 * @param {Array} front 前半段数组
 * @param {Array} end 后半段数组
 */
function merge1(front, end) {
  const temp = []

  while (front.length || end.length) {
    if (!front.length) {
      temp.push(end.shift())
      continue
    }

    if (!end.length) {
      temp.push(front.shift())
      continue
    }

    if (front[0] < end[0]) {
      temp.push(front.shift())
    } else {
      temp.push(end.shift())
    }
  }

  return temp
}

/**
 * 归并排序
 * 
 * 时间复杂度： O(nlogn)
 * 
 * 空间复杂度： O(n)
 * 
 * 稳定性： 稳定
 * 
 * @param {Array} array 待排序数组
 * @param {Number} left 当前数组开始索引值
 * @param {Number} right 当前数组结束索引值
 * @param {Array} temp 临时数组
 * @returns {Array}
 */
function mergeSort2(array, left, right, temp = []) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)

    mergeSort2(array, left, mid, temp)
    mergeSort2(array, mid + 1, right, temp)
    merge2(array, left, right, temp)
  }

  return array
}

function merge2(array, left, right, temp) {
  const mid = Math.floor((left + right) / 2);
  let leftIndex = left,
      rightIndex = mid + 1,
      tempIndex = 0

  while (leftIndex <= mid && rightIndex <= right) {
    if (array[leftIndex] < array[rightIndex]) {
      temp[tempIndex++] = array[leftIndex++]
    } else {
      temp[tempIndex++] = array[rightIndex++]
    }
  }
  while (leftIndex <= mid) {
    temp[tempIndex++] = array[leftIndex++]
  }
  while (rightIndex <= right) {
    temp[tempIndex++] = array[rightIndex++]
  }
  tempIndex = 0;
  for (let i = left; i <= right; i++) {
    array[i] = temp[tempIndex++];
  }
}

/**
 * 选择排序
 * 
 * 时间复杂度： O(n2)
 * 
 * 空间复杂度：O(1)
 * 
 * 稳定性： 不稳定
 * 
 * @param {Array} array
 */
function selectSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }

    [array[minIndex], array[i]] = [array[i], array[minIndex]]
  }
}

/**
 * 插入排序
 * 
 * 时间复杂度： O(n2)
 * 
 * 空间复杂度： O(1)
 * 
 * 稳定性： 稳定
 * 
 * @param {Array} array 
 */
function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    let target = i
    for (let j = i - 1; j >= 0; j--) {
      if (array[target] < array[j]) {
        [array[target], array[j]] = [array[j], array[target]]
      } else {
        break
      }
    }
  }
}

/**
 * 冒泡排序
 * 
 * 时间复杂度： O(n2)
 * 
 * 空间复杂度： O(1)
 * 
 * 稳定性： 稳定
 * 
 * @param {Array} array 
 */
function bubbleSort(array) {
  for (let j = 0; j < array.length; j++) {
    let complete = true

    for (let i = 0; i < array.length - 1 - j; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]]
        complete = false
      }
    }

    if (complete) {
      break
    }
  }
}

/**
 * 堆排序
 * 
 * 时间复杂度： O(nlogn)
 * 
 * 空间复杂度： O(1)
 * 
 * 稳定性： 不稳定
 * 
 * @param {Array} array
 * @returns {Array}
 */
function heapSort(array) {
  creatHeap(array)

  /**
   * 每进行一次循环，都将堆顶的最大值与当前堆的末尾值进行互换，再将堆的尾部边界缩小一个，
   * 让经过上浮的大数稳定在数组的末尾而不参与下一轮的堆排序
   */
  for (let i = array.length - 1; i > 0; i--) {
    [array[i], array[0]] = [array[0], array[i]]
    adjust(array, 0, i)
  }
}

/**
 * 构建大顶堆， 从最后一个非叶子结点开始，进行下沉操作
 * 
 * 最后一个非叶子节点公式: n/2 - 1
 * 
 * @param {Array} array 
 */
function creatHeap(array) {
  const len = array.length,
        start = Math.floor(len / 2) - 1
    /**
     * 从最后一个非叶子节点开始大数上浮，循环结束，当前堆顶为最大值
     */
  for (let i = start; i >= 0; i--) {
    adjust(array, i, len)
  }
}

function adjust(array, target, len) {
  /**
   * 通过在目标索引节点开始，对目标索引值节点的子节点开始与目标索引节点的值进行比较，
   * 将当前索引节点的值和其左右子节点进行比较，找到这三者最大的值，然后与当前索引节点
   * 的值进行交换，从最底部生成局部大顶堆。
   * 之所以这里需要用循环是因为，是让当前节点的每一级子节点都都进行一次下沉比较，例如
   * 当前节点是一个非常小的数，那它就会通过循环一直下沉到堆的最底部。
   * 这里不需要关注局部的子树它的同级排列顺序是怎样的，因为我们每次只想获得以当前节点
   * 为根的最大值即可。
   */
  for (let i = 2 * target + 1; i < len; i = 2 * i + 1) {
    if (i + 1 < len && array[i + 1] > array[i]) {
      i = i + 1
    }

    if (array[i] > array[target]) {
      [array[i], array[target]] = [array[target], array[i]]
      target = i
    } else {
      break
    }
  }
}