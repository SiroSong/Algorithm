let testArray = [7,23,98,45,76,12,31,5,4,64,13,99,77,54,11,21,79,443,976,627,55,975,764,295,362,
                856,991,773,201,119,118,440,339,227,434,130,197,540,227,356,298]

/**
 * 快速排序1
 * 
 * 时间复杂度： 平均O(nlogn)，最坏O(n2)，实际上大多情况小于O(nlogn)
 * 
 * 空间复杂度： O(logn)（递归调用消耗）
 * 
 * 稳定性： 不稳定 因为排序的过程中元素之间进行的是互换，而不是插入。
 * 
 * 特点： 写法简单，浪费大量内存空间
 * 
 * @param {Array} array 待排序数组
 * @returns {Array} 
 */
function quickSort1(array){
  /**
   * 当数组被分割到只剩下一个元素时直接返回这个元素
   */
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
  /**
   * 通过不断细分数组，将分割当数组再次按照规则分割，直至分成一个一个元素
   * 直接返回数组，这样保证每层调用栈上层当函数return回来当数组都是有序的，
   * 直到返回到整个函数执行结束返回整体有序的数组。
   */
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
 * 特点： 不需要额外空间，思路复杂
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
  /**
   * l为最左端索引值，r为最右端索引值，当l < r时进行循环
   */
  while (l < r) {
    /**
     * 此循环目的是从后向前，跳过那些比target大的值，当不满足条件时，
     * 说明此刻array[r]小于target，跳出循环并将array[r]值赋值给
     * array[l]，因为在第一次执行的时候target的值和array[l]是相同
     * 的，所以不用担心在首次array[l]被赋值时原来的值丢失。
     */
    while (l < r && array[r] >= target) {
      r--
    }
    array[l] = array[r]
    /**
     * 此循环是从前往后，跳过那些比target小的值，当不满足条件时，说明
     * array[l]的值大于target，此时将array[l]的值赋值给array[r]，
     * 因为此时的array[r]已经在上面的代码中将值赋给了当时的array[l]，
     * 所以也无需过多考虑。
     */
    while (l < r && array[l] < target) {
      l++
    }
    array[r] = array[l]
  }
    /**
     * 当r===l时，说明这一轮当分拨已经完成，此时只剩下target的值没有被正确赋值， 
     */
  array[l] = target
  /**
   * 将通过索引分割的局部数组在进行上述操作
   */
  quickSort2(array, start, l - 1)
  quickSort2(array, l + 1, end)

  return array
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
 * 特点： 空间复杂度略高，需要创建多个数组
 * 
 * @param {Array} array 待排序数组
 */
function mergeSort1(array) {
  /**
   * 当数组递归到只剩下一个元素时直接返回该数组
   */
  if (array.length < 2) {
    return array
  }

  const mid = Math.floor(array.length / 2),
        front = array.slice(0, mid),
        end = array.slice(mid)
  /**
   * 因为每个mergeSort1方法都会以merge1方法作为返回，而merge1的返回又是
   * 一个数组，所以函数最终执行的结果会是一个数组，这里时两个函数相互递归，越
   * 上层的mergeSort1返回的局部有序数组越长，就这样一直到顶层放回整个有序数组。
   * 
   * 当局部数组被递归到只有一个元素时直接返回该数组，此时这些数组传入merge1进行排序
   * 当排序完成后return，return的有序数组又变成上一层mergeSort1的返回值
   */
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
 * 特点： 写法复杂
 * 
 * @param {Array} array 待排序数组
 * @param {Number} left 当前数组开始索引值
 * @param {Number} right 当前数组结束索引值
 * @param {Array} temp 临时数组
 * @returns {Array}
 */
function mergeSort2(array, left, right, temp = []) {
  /**
   * 在递归中计算出来当mid值传到下一层递归中，当下一层递归的right和left值
   * 相等时就停止继续递归,当停止递归时，说明此刻的数组已经被分割成最小只有两
   * 个元素的单元，然后从这些最小的单元中进行merge2操作。
   */
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
    /**
     * 从当前分成的两个单元中有序将元素赋值给，此处的单元都是从底层的递归中返回
     * 上来的，所以这两个单元都是各自有序的。
     */
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
console.log(mergeSort2(testArray).toString())
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