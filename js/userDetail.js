// 获取点赞的列表并通过essayItem渲染到视图中的函数
const emptyBox = document.querySelector(".emptyBox");
const likeListBox = document.querySelector(".likeListBox");
const activityListBox = document.querySelector(".activityListBox");
const concerListBox = document.querySelector(".concerListBox");
const subscribeList = document.querySelector(".subscribeList");
const subscribeMeList = document.querySelector(".subscribeMeList");
const userArticleList = document.querySelector(".userArticleList");
// 关注的头盒子
const concerListHead = document.querySelector(".concerListHead");
// 判断当前是本人还是别人
// let isMine = true;
let requestId = userId;// 初始时自己的ID
function getLikeList() {
    getUserLikeArticles().then(result => {
        // 判断点赞的列表里面有无内容
        likeList.innerHTML = "";
        emptyBox.style.display = "none"
        if (result.length) {
            result.forEach(item => {
                new essayItem(item, likeList).init()
            });
        } else {
            // 没有赞的列表
            emptyBox.style.display = "flex";
        }
    })
}
function getArticleList() {
    getUserWriteArticle().then(result => {
        userArticleList.innerHTML = "";
        emptyBox.style.display = "none"
        if (result.length) {
            result.forEach(item => {
                new essayItem(item, userArticleList).init()
            });
        } else {
            // 没有写文章的列表
            emptyBox.style.display = "flex";
        }
    })
}
// 点击赞的按钮时触发
let oldIndex = 0;
const headerContain = document.querySelector(".bodyList .headerContain");
const liList = headerContain.querySelectorAll("li");
headerContain.addEventListener("click", (e) => {
    e = e || window.event;
    const newIndex = e.target.dataset.index || e.target.parentElement.dataset.index;
    if (newIndex && newIndex != oldIndex) {
        liList[oldIndex].classList.remove("active");
        liList[newIndex].classList.add("active");
        oldIndex = newIndex;
        emptyBox.style.display = "flex";
        concerListHead.style.display = "none"
        switch (oldIndex) {
            case '1':
                // 文章列表
                activityListBox.style.display = "block"
                concerListBox.style.display = "none"
                likeListBox.style.display = "none"
                getArticleList();
                break;
            case '3':
                // 点赞列表
                activityListBox.style.display = "none"
                concerListBox.style.display = "none"
                likeListBox.style.display = "block"
                getLikeList();
                break;
            case '5':
                // 关注
                activityListBox.style.display = "none"
                concerListBox.style.display = "block"
                likeListBox.style.display = "none"
                concerListHead.style.display = "flex"
                // 默认为第一个被点击
                choicList[0].click()
                break;
            default:
                // 没有的一律都显示空
                activityListBox.style.display = "none"
                concerListBox.style.display = "none"
                likeListBox.style.display = "none"
                emptyBox.style.display = "flex"
                break;
        }
    }
})
let nowNum = 0
const choicList = document.querySelectorAll(".choicList li")
// 关注的头部盒子的点击事件
concerListHead.addEventListener("click", (e) => {
    e = e || window.event;
    const num = e.target.dataset.num;
    if(num){
        choicList[nowNum].classList.remove("choose");
        nowNum = num;
        choicList[num].classList.add("choose");
        switch (num) {
            case '0':
                subscribeList.innerHTML = "";
                subscribeList.style.display = "block";
                subscribeMeList.style.display = "none";
                getSubscribe();
                break;
            case '2':
                subscribeMeList.innerHTML = "";
                subscribeMeList.style.display = "block";
                subscribeList.style.display = "none";
                getSubscribeMe();
                break;
            default:
                emptyBox.style.display = "flex"
                break;
        }
    }
})
// 获取关注的用户信息并渲染
// 定义一个数组，用来存储我关注的用户的信息
let subscribeArr = [];
function getSubscribe() {
    getconcerList().then(result => {
        emptyBox.style.display = "none";
        if (result.length) {
            concerListBox.style.display = "block"
            result.forEach(item => {
                new subscribe(item,subscribeList).init();
                // item变成对象，点击列表进入该用户的界面
            });
        } else {
            // 没有关注者的列表
            emptyBox.style.display = "flex";
        }
    })
}
// 获取关注我的人的信息并渲染
function getSubscribeMe(){
    getconcerMeList().then(result => {
        if (result.length) {
            emptyBox.style.display = "none"
            result.forEach(item => {
                new subscribe(item,subscribeMeList).init()
                // item变成对象，点击列表进入该用户的界面
            });
        } else {
            // 没有关注者的列表
            emptyBox.style.display = "flex";
        }
    })
}
/**
 * 1.先要把原来的innerHtml删除
 * 2.要循环遍历添加
 * 3.明天把样式做出来
 */