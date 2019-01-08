//定义变量
let c = $('#cc')[0],//定义画板对象
    ctx = c.getContext("2d"),//定义倒计时画笔
    circleInter,//画圈计时器
    time = 10,//画圈的时间间隔
    i = 1,//当前执行次数
    step = 4,//每次画圈的步数
    stepAll = 360,//把圆总共分为多少步
    r = 135,//彩色圆的半径
    today,//今天
    change,//是否需要重新计算渲染
    normalFirstData = [//日常午餐
        {
            name: '螺狮粉'
        }
    ],
    normalLastData = [//日常晚餐
        {
            name: '稀饭'
        },
        {
            name: '西红柿鸡蛋面'
        }
    ],
    firstData = [//周末午餐
        {
            name: '胖哥俩'
        },
        {
            name: '南院门小炒'
        }
    ],
    lastData = [//周末晚餐
        {
            name: '火锅'
        },
        {
            name: '串串'
        },
        {
            name: '稀饭'
        }
    ],
    menuData = {
        normalFirst: '',
        normalLast: '',
        first: '',
        last: '',
    },//菜单数据
    week,//周几
    day;//今天

//倒计时画圈
let countdownCircle = () => {
    ctx.beginPath();
    ctx.arc(145, 145, r, (2 * ((i - 1) * step) / stepAll - 0.5) * Math.PI, ((2 * (i * step) + 1) / stepAll - 0.5) * Math.PI);
    ctx.stroke();
    i++;
    if (i * step > stepAll) {
        clearInterval(circleInter);
        $('.top').hide();
    }
};

//根据周几初始化一些数据
let weekChange = (data) => {
    week = data.getDay();
    let str = '';
    switch (week) {
        case 0:
            str = '周日';
            break;
        case 1:
            str = '周一';
            break;
        case 2:
            str = '周二';
            break;
        case 3:
            str = '周三';
            break;
        case 4:
            str = '周四';
            break;
        case 5:
            str = '周五';
            break;
        case 6:
            str = '周六';
            break;
    }
    $('.title span').text(str);
    if (week === 0 || week === 6) {
        $('.weekend').show();
        $('.noon,.night').addClass('light');
    }
};

// 是否需要渲染
let needChange = (data) => {
    if (localStorage.getItem('today') !== null) {
        let lin = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate();
        if (localStorage.getItem('today') === lin) {
            return false
        }
        else {
            localStorage.setItem('today', data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate());
            return true
        }
    }
    else {
        localStorage.setItem('today', data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate());
        return true
    }
};

//获取今日菜单
let getMenu = () => {
    if (change === true) {
        menuData.normalFirst = Math.floor(Math.random() * normalFirstData.length);
        menuData.normalLast = Math.floor(Math.random() * normalLastData.length);
        if (week === 0 || week === 6) {
            menuData.first = Math.floor(Math.random() * firstData.length);
            menuData.last = Math.floor(Math.random() * lastData.length);
        }
        localStorage.setItem('menuData', JSON.stringify(menuData));
    }
    else {
        menuData = JSON.parse(localStorage.getItem('menuData'));
    }
    $('.noon .msg').text(normalFirstData[menuData.normalFirst].name);
    $('.night .msg').text(normalLastData[menuData.normalLast].name);
    if (week === 0 || week === 6) {
        $('.weekend .noon-else .msg').text(firstData[menuData.first].name);
        $('.weekend .night-else .msg').text(lastData[menuData.last].name);
    }
};

//初始化数据
let radial = ctx.createLinearGradient(r + r * Math.pow(2, 0.5), r * Math.pow(2, 0.5), r * Math.pow(2, 0.5), r + r * Math.pow(2, 0.5));
radial.addColorStop(0, "#2661DD");
radial.addColorStop(0.5, "#40ED94");
radial.addColorStop(1, "#5956CC");
ctx.strokeStyle = radial;
ctx.lineWidth = 16;//定义倒计时画笔宽度
today = new Date();
// today.setDate(26);
weekChange(today);//控制内容显示
//改变显示内容
change = needChange(today);
getMenu();

// alert(localStorage.getItem('today'))

//画圈动画
countdownCircle();
circleInter = setInterval(countdownCircle, time);