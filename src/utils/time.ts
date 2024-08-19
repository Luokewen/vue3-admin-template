//封装一个函数：获取一个结果：当前早上|上午|下午|晚上
export const getNowTime = () => {
  let time = new Date()
  let hour = time.getHours()
  if (hour <= 9) {
    return '早上好'
  } else if (hour <= 12) {
    return '上午好'
  } else if (hour <= 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
}
