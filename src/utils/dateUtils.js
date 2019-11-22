/*
包含n个日期时间处理的工具函数模块
*/

// 格式化日期 XXXX-MM-DD-HH-MM-SS
export function formatDateToSecond(time) {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
    ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

//格式化日期：yyyy-MM-dd
export function formatDate(time) {
  var date = new Date(time)
  var myYear = date.getFullYear();
  var myMonth = date.getMonth() + 1;
  var myWeekday = date.getDate();
  if (myMonth < 10) {
    myMonth = "0" + myMonth;
  }
  if (myWeekday < 10) {
    myWeekday = "0" + myWeekday;
  }
  return (myYear + "-" + myMonth + "-" + myWeekday);
}

/*根据出生日期算出年龄*/
export function getAge(strBirthday) {
  var returnAge;
  if(strBirthday){
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
  }

  let d = new Date();
  var nowYear = JSON.stringify(d.getFullYear());
  var nowMonth = JSON.stringify(d.getMonth() + 1);
  var nowDay = JSON.stringify(d.getDate());

  if (nowYear === birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge; //返回周岁年龄
}

export function getTestTime(time){

}
