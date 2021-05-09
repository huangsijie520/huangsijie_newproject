const toUserPage = document.querySelectorAll(".toUserPage");// 个人页面按钮
const mainContain = document.querySelector("#mainContain");
const userDetailContain = document.querySelector(".userDetailContain");
const mainNavList = document.querySelector(".mainNavList");// 首页头部导航栏
const toMainPage = document.querySelector("#toMainPage");// 首页按钮
const userSetDetailBox = document.querySelector(".userSetDetailBox")// 修改页面的元素
const userMainContain = document.querySelector(".userMainContain");
const userNavList = document.querySelector(".userNavList");
const setBtn = document.querySelector(".setBtn");// 编辑个人信息按钮
const writeBtn = document.querySelector('.writeBtn');
const mainPage = document.querySelector("#mainPage");
const writePage = document.querySelector("#writePage");
// 本人的信息box
const userInfo = document.querySelector(".userInfo");
// 其他人的信息box
const otherUserInfo = document.querySelector(".otherUserInfo");
let nowMain = true;
let nowArticle = false;
toUserPage.forEach(item => {
    item.addEventListener("click", () => {
        toUserPageFn();
        userInfo.style.display = "flex";
        otherUserInfo.style.display = "none";
        requestId = userId;
    })
})
function toUserPageFn() {
    userSetDetailBox.style.display = "none"
    userMainContain.style.display = "block"
    mainContain.style.display = "none"
    userDetailContain.style.display = "block";
    userNavList.style.display = "none";
    toMainPage.classList.remove("active");
    articlePage.style.display = "none"
    mainNavList.style.display = "none"
    nowMain = false;
    nowArticle = false;
    headerContain.children[0].click();
}
toMainPage.addEventListener("click", (e) => {
    if(e.target.className.indexOf('active') === -1){
        mainContain.style.display = "block"
        userDetailContain.style.display = "none";
        mainNavList.style.display = "block"
        userNavList.style.display = "none";
        toMainPage.classList.add("active");
        articlePage.style.display = "none";
        nowMain = true;
        nowArticle = false;
        reGetArticle();
    }
})
// 点击进入编辑资料
setBtn.addEventListener("click", () => {
    userSetDetailBox.style.display = "block"
    userMainContain.style.display = "none"
    userNavList.style.display = "block";
    nowMain = false;
    nowArticle = false;
})
// 点击进入文章页面
writeBtn.addEventListener('click',()=>{
    // 判断是不是登录了
	if (userId != undefined && userId != 'undefined') {
		mainPage.style.display = "none";
		writePage.style.display = "flex"
		nowWrite = true;
	}else{
        loginBtn.click();
    }
})