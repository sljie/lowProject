/**
 * 对数组进行快速排序
 * @param {*} prop 排序字段
 * @param {*} sort asc/desc
 */
export function fastSort(prop, sort) {
    if (sort === undefined || sort === 'asc') {
      return function(obj1, obj2) {
        const val1 = obj1[prop]
        const val2 = obj2[prop]
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    } else {
      return function(obj1, obj2) {
        const val1 = obj1[prop]
        const val2 = obj2[prop]
        if (val1 < val2) {
          return 1
        } else if (val1 > val2) {
          return -1
        } else {
          return 0
        }
      }
    }
  }