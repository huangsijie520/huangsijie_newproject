const authorBtnContain = document.querySelector(".authorBtnContain");
const userDetail = {

}
const authorHeaderImg = document.querySelectorAll(".authorHeaderImg");
const userName = document.querySelector(".userName");
const toTopBtn = document.querySelector(".toTopBtn");
// 回到顶部
toTopBtn.addEventListener("click",()=>{
    document.documentElement.scrollTop = 0;
})
// userId
// 首先，在onload事件会根据有没有userId来将列表渲染
// getUserDetail()
// 已经登录
window.onload = function () {
    // 判断登录情况
    if (userId != undefined && userId != 'undefined') {
        randerUserDetail();
        // 获取essay列表
        reGetArticle();
        // // 获取关注数组
        getSubArr();
    }
}
let nowScrollY = document.documentElement.scrollTop;
// 懒加载
window.onscroll = function (e) {
    const scrollTop = scrollY;
    scrollY = document.documentElement.scrollTop;
    if(scrollY < scrollTop){
        return;// 向上滑动不加载警告
    }
    // 这是底部距离高度的位置
    // console.log(document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight)<= 1；视为到了底部)
    if(!nowWrite){
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 1) {
            // console.log('scroll')
            if (nowMain) {
                // 主页的懒加载
                getArticle().then(result => {
                    result.data.forEach(item => {
                        new essayItem(item, essayList).init()
                    });
                })
            }
            else if (nowArticle) {
                // 文章评论页的懒加载
                getCommentContain(authorDetail.articleId).then(result => {
                    // 创建对象
                    result.forEach(item => {
                        new commentItem(item, commentList).init()
                    });
                })
            }else{// 啥也不是
				showEnd();
			}
        }
    }
}
// localStorage.clear()
// 重新 获取essay列表的函数
function reGetArticle(){
    document.documentElement.scrollTop = 0;
    page = 1;
    essayList.innerHTML = "";
    getArticle().then(result => {
        result.data.forEach(item => {
            new essayItem(item, essayList).init()
        });
    })
}