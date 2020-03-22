//将时间戳转化为对应的时间格式
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

//确定标签颜色
export function tagColor(index) {  
  let colors = ['rgb(39, 96, 219)', 'rgb(235, 232, 93)', 'rgb(228, 22, 228)', 'rgb(228, 22, 32)',
  'rgb(63, 228, 22)', 'rgb(245, 138, 111)', 'rgb(103, 64, 245)', 'rgb(95, 20, 79)',
  'rgb(16, 17, 16)', 'rgb(250, 205, 4)']  //标签颜色
  if(index > 9) { index = index - 10 }  //使得index的值一直在0到9之间
  if(index > 19) { index = index - 10 * (index / 10)} 
  return colors[index]
}
