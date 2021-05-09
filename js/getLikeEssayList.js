// 获取点赞的列表并通过essayItem渲染到视图中的函数
const emptyBox = document.querySelector(".emptyBox");
var isGetLikeList = false;// 判断是否可以 发送请求得到数据//判断是否已经请求过数据
var isGetArticleList = false;// 判断是否可以 发送请求得到数据//判断是否已经请求过数据
const likeListBox = document.querySelector(".likeListBox");
const activityListBox = document.querySelector(".activityListBox");
const concerListBox = document.querySelector(".concerListBox");
const userArticleList = document.querySelector(".userArticleList");
// 获取点赞信息并渲染
function getLikeList() {
    getUserLikeArticles().then(result => {
        // console.log(result)
        // 判断点赞的列表里面有无内容
        if (result.length) {
            isGetLikeList = true;// 已经获取了数据
            emptyBox.style.display = "none"
            result.forEach(item => {
                console.log(item)
                new essayItem(item, likeList).init()
            });
        } else {
            // 没有赞的列表
            emptyBox.style.display = "flex";
        }
    })
}
// 获取文章信息并渲染
function getArticleList() {
    getUserWriteArticle().then(result => {
        console.log(result)
        if (result.length) {
            isGetArticleList = true;
            emptyBox.style.display = "none"
            result.forEach(item => {
                console.log(item)
                new essayItem(item, userArticleList).init()
            });
        } else {
            // 没有赞的列表
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
        emptyBox.style.display = "none"
        switch (oldIndex) {
            case '1':
                // 文章列表
                activityListBox.style.display = "block"
                concerListBox.style.display = "none"
                likeListBox.style.display = "none"
                if (!isGetArticleList) {
                    getArticleList();
                }
                break;
            case '3':
                // 点赞列表
                activityListBox.style.display = "none"
                concerListBox.style.display = "none"
                likeListBox.style.display = "block"
                if (!isGetLikeList) {
                    getLikeList();
                }
                break;
            case '5':
                // 关注
                activityListBox.style.display = "none"
                concerListBox.style.display = "block"
                likeListBox.style.display = "none"
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