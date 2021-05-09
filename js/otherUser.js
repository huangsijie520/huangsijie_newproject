/**
 * 1.创建关注者对象
 * 2.进入关注着对象后和我的页面一样
 * 3.
 */


// 进入他人页面点击头像
const apAuthorHeadImg = document.querySelector(".detail-authorHeadImg");
// 获取他人界面的元素
const otherUserHeaderImg = document.querySelector(".otherUserHeaderImg");
const otherUserName = document.querySelector(".otherUserName");
const otherInfoInput = document.querySelector(".otherInfoInput");
const subscribeBtn = document.querySelector(".subscribeBtn");
// 点击作者头像进入其主页
apAuthorHeadImg.addEventListener("click", () => {
    toUserPageFn();
    // 个人界面变成别人的界面
    // requestId改变
    requestId = authorDetail.authorId;
    userInfo.style.display = "none";
    otherUserInfo.style.display = "flex";
    setOtherDetail();
})
function setOtherDetail(){
    getUserDetail(requestId).then(result=>{
        otherUserHeaderImg.src = httpName.concat('/'+result.avatar);
        otherUserName.innerText = result.nickname;
        otherInfoInput.innerText = result.introduction;
    })
}