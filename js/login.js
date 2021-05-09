// 登录的一系列事件
// userId
let userId = localStorage.userId;
// 获取登录的元素
// 登录按钮
let loginBtn = document.querySelector(".loginBtn");
const loginPage = document.querySelector("#loginPage");
// 获取三只熊猫的图片
const loginImg = loginPage.querySelectorAll("img");
// 默认第二个索引图片为初始的
let currentImg = 1;
// 点击 phoneContain 事件
// 获取 phoneContain 和 passwordContain 元素
// 获取关闭按钮
const closeLogin = loginPage.querySelector(".close");
// 账号
const phoneContain = loginPage.querySelector(".phoneContain");
const inputInPhone = phoneContain.querySelectorAll("input");
// 手机号码的
const phoneInput = inputInPhone[1];
// 密码
const passwordContain = loginPage.querySelector(".passwordContain");
const inputInPassword = passwordContain.querySelector("input")
// 登录按钮
const goLogin = loginPage.querySelector(".goLogin")
// 登录contain
const loginBtnContain = document.querySelector(".loginBtnContain");
// 退出登录的按钮
const loginOutBtn = document.querySelector(".loginOutBtn");
// 事件
// 点击登录按钮
loginBtn.addEventListener("click", () => {
    loginPage.style.display = "flex"
    // loginPage自动聚焦
    phoneInput.focus()
})
// 点击关闭按钮关闭登录界面
closeLogin.addEventListener("click", function () {
    loginPage.style.display = "none";
})
// 点击 phoneContain 里的input的事件
inputInPhone.forEach(item => {
    item.addEventListener("focus", function () {
        phoneContain.style.border = "1px solid #007fff"
        // 熊猫变化
        loginImg[currentImg].className = "unShow"
        loginImg[1].className = "show";
        currentImg = 1;
    })
    item.addEventListener("focusout", function () {
        phoneContain.style.border = "1px solid #d9d9d9"
        // 熊猫变化
        loginImg[currentImg].className = "unShow"
        loginImg[0].className = "show";
        currentImg = 0;
    })
})
// 密码框 的input
inputInPassword.addEventListener("focus", () => {
    passwordContain.style.border = "1px solid #007fff"
})
inputInPassword.addEventListener("focusout", () => {
    passwordContain.style.border = "1px solid #d9d9d9"
})
// 登录按钮
goLogin.addEventListener("click", () => {
    // 熊猫改变
    loginImg[currentImg].className = "unShow"
    loginImg[2].className = "show";
    currentImg = 2;
    const userLoginDate = {
        username: phoneInput.value,
        password: inputInPassword.value
    }
    // 获取登录信息
    // 传输数据判断登录情况
    postAxios('/user/login', userLoginDate)
        .then(result => {
            // 获取userId
            userId = result.userId;
            localStorage.userId = userId;
            requestId = userId;
            if (userId == "undefined") {
                alert("账号或密码错误")
            } else {
                alert("登录成功")
                loginPage.style.display = "none";
                // 登录成功，将登录框改成头像框
                // 获取用户信息
                randerUserDetail();
                reGetArticle();
                getSubArr();
            }
        })
})
// 退出登录函数
loginOutBtn.addEventListener("click", function () {
    const match = confirm("确定退出么？");
    page = 1;
    if (match === true) {
        userId = undefined;
        localStorage.userId = userId;
        randerUserDetail()
        loginBtnContain.style.display = "block";
        authorBtnContain.style.display = "none";
        // 登出要变成第一页
        toMainPage.click();
    }
})
// 获取用户头像和名称的方法
function randerUserDetail() {
    authorBtnContain.style.display = "flex";
    loginBtnContain.style.display = "none";
    // 说明已经登录了
    // 获取用户头像
    getUserDetail(userId).then(result => {
        userDetail.headImg = result.avatar;
        userDetail.nickname = result.nickname;
        userDetail.introduction = result.introduction;
        authorHeaderImg.forEach(item => {
            item.src = httpName.concat('/'+ userDetail.headImg);
        })
        userName.innerHTML = userDetail.nickname;
        // 用户的新名称
        nameInput.reRander(userDetail.nickname);
        infoInput.reRander(userDetail.introduction);
    })
}
// 获取用户关注的数组的函数
// // 获取关注数组
function getSubArr(){
    getconcerList().then(result=>{
        subscribeArr = []
        if(result.length){
            result.forEach(item => {
                subscribeArr.push(item.subId);
            });
        }
    })
}