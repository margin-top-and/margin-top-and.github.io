// $(document).ready(function() {
//   let fYear = $('#fYear').value,
//     fMonth = $('#fMonth').value,
//     fDay = $('#fDay').value,
//     lYear = $('#lYear').value,
//     lMonth = $('#lMonth').value,
//     lDay = $('#lDay').value,
//     btn = $('#btn');
//   btn.click(function() {
//     document.write(fYear, fMonth, fDay, lYear, lMonth, lDay);
//   });
// });
var idBtn = document.getElementById('idBtn');
var spans = document.getElementsByClassName('hint');
idBtn.onclick = function() {
  var idNum = document.getElementById('idNum').value;
  var coeff = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var suffix = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  if (idNum.length > 16) {
    var myNum = 0;
    for (var i = 0; i < 17; i++) {
      myNum += coeff[i] * idNum[i];
    }
    myNum %= 11;
    spans[1].style.display = 'flex';
    spans[1].innerHTML = '身份证最后一位是' + suffix[myNum];
  } else {
    spans[1].style.display = 'flex';
    spans[1].innerHTML = '请输入17位身份证号码';
  }
};

//获得时间的范围
let btn = document.getElementById('btn');
btn.onclick = function() {
  let nNum = {
    fYear: document.getElementById('fYear').value,
    fMonth: document.getElementById('fMonth').value,
    fDay: document.getElementById('fDay').value,
    lYear: document.getElementById('lYear').value,
    lMonth: document.getElementById('lMonth').value,
    lDay: document.getElementById('lDay').value,
    city: document.getElementById('city').value,
    lastIdNum: document.getElementById('lastIdNum').value
  };
  let lastNum = document.getElementById('lastNum').value;
  //生成指定日期范围的数组
  function createdTime(
    sYear,
    sMonth,
    sDay,
    eYear,
    eMonth,
    eDay,
    firstNum,
    lastNum
  ) {
    //将开始时间距1970年秒数和结束时间的秒数分别赋值
    let startTime = new Date(sYear, sMonth, sDay).getTime(),
      endTime = new Date(eYear, eMonth, eDay).getTime(),
      res = [];
    //循环开始时间到结束时间
    for (let i = startTime; i <= endTime; ) {
      res.push(firstNum + formatTime(i) + lastNum);
      i += 24 * 60 * 60 * 1000;
    }
    //格式化年份月份和日期
    function formatTime(time) {
      let date = new Date(time),
        year = date.getFullYear(),
        month = test(date.getMonth() + 1),
        day = test(date.getDate());
      return year + '.' + month + '.' + day;
    }
    //测试如果获取到的值小于10,前面加上一位0
    function test(t) {
      if (t < 10) {
        return '0' + t;
      } else {
        return t;
      }
    }
    //正则匹配数组并删除特殊字符
    let result = [];
    function removeChars(str) {
      let pattern = /\.*/gi;
      for (let i = 0; i < str.length; i++) {
        result.push(str[i].replace(pattern, ''));
      }
    }
    removeChars(res);
    return result;
  }
  let res = createdTime(
    nNum.fYear,
    nNum.fMonth - 1,
    nNum.fDay,
    nNum.lYear,
    nNum.lMonth - 1,
    nNum.lDay,
    nNum.city,
    nNum.lastIdNum
  );
  //身份证最后一位校验,并分组
  function test(timer, testId) {
    let idNum = [],
      coeff = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1],
      suffix = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    //循环每个timer,并根据子循环处理每个值,进行相乘相加和取余运算
    for (let j = 0; j < timer.length; j++) {
      let myNum = 0;
      for (let i = 0; i < 17; i++) {
        myNum += coeff[i] * timer[j][i];
        myNum %= 11;
      }
      //如果余数对应的数字和参数一致,添加匹配数组
      if (suffix[myNum] == testId) {
        idNum.push(timer[j]);
      }
    }
    return '符合条件的有:' + idNum;
    // if (idNum == true) {
    //   spans[0].style.display = 'flex';
    //   spans[0].innerHTML = '请到console控制器中查看';
    //   return '符合条件的有' + idNum;
    // } else if (idNum == false) {
    //   spans[0].style.display = 'flex';
    //   spans[0].innerHTML = '请输入正确的最后一位';
    //   return '符合条件的有' + idNum;
    // }
  }
  console.log(test(res, lastNum));
};
