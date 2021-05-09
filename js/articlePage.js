// 评论自定义高度和设置样式和评论的对象
const minRows = 1;// 最小行数
const maxRows = 8;// 最大航速
const allCommentInput = document.querySelector(".allCommentInput");
const inputContain = document.querySelector(".inputContain");
const sendCommentBtn = document.querySelector(".sendCommentBtn");
const actionBox = document.querySelector(".actionBox");
const biaoqingBtn = document.querySelector(".biaoqingBtn ");
// 点赞、点踩和评论按钮
const articleZan = document.querySelector(".articleZan");
const articleCommend = document.querySelector(".articleCommend");
const articleCai = document.querySelector(".articleCai");
const biaoqingBox = document.querySelector(".biaoqingBox");
const body = document.querySelector("body");
const commentAllInputContain = document.querySelector(".commentAllInputContain");
let commendValue = "";
allCommentInput.addEventListener("keyup", function () {
    // this.style.height = this.scrollHeight;
    // 判断里面有没有内容
    if (this.value != '') {
        sendCommentBtn.style.opacity = "1";
        sendCommentBtn.style.cursor = "pointer"
    } else {
        sendCommentBtn.style.opacity = "0.5";
        sendCommentBtn.style.cursor = "default"
        this.style.outline = "none"
    }

    // 自定义textarea高度
    if (this.scrollTop == 0) {
        this.scrollTop = 1;
    }
    while (this.scrollTop == 0) {
        if (this.rows > minRows) {
            this.rows--;
        } else {
            break;
        }
        this.scrollTop = 1;
        if (this.rows < maxRows) {
        } if (this.scrollTop > 0) {
            this.rows++;
            break;
        }
    }
    while (this.scrollTop > 0) {
        if (this.rows < maxRows) {
            this.rows++;
            if (this.scrollTop == 0) {
                this.scrollTop = 1;
            } else {
                break;
            }
        }
    }
});
allCommentInput.addEventListener("focus", function () {
    this.style.outline = "2px solid #007fff";
    actionBox.style.display = "flex";
})
body.addEventListener("click", () => {
    actionBox.style.display = "none";
    biaoqingBox.style.display = "none";
})
commentAllInputContain.addEventListener("click",(e)=>{
    e = e || window.event;
    e.stopPropagation();
    e.cancelBubble = true;
    biaoqingBox.style.display = "none"
})
allCommentInput.addEventListener("focusout", function () {
    if (this.value == "") {
        this.style.outline = "none";
    }
})
// 评论
sendCommentBtn.addEventListener("click", () => {
    // 发送请求
    if (allCommentInput.value != '') {
        sendCommentBtn.style.opacity = "0.5";
        sendCommentBtn.style.cursor = "default"
        sendComment(authorDetail.articleId, allCommentInput.value)
            .then(result => {
                // 创建对象，用于储存评论的信息
                // const commentObj = {
                //     comment:result.comment,

                // }
                allCommentInput.value = '';
                // 发送成功可以申请数据
                if (!nowArticle) {
                    // 如果不可以申请数据了，即只能手动添加一个类
                    // 但是这个类的commentId未知，如果自己添加则会导致无法删除

                    const commentObj = {
                        comment: result.comment,
                        commentator: userDetail.nickname,
                        commentatorAvatar: userDetail.headImg,
                        isDislike: false,
                        isThumbUp: false,
                        replyNum: 0,
                        thumbUpNum: 0
                    }
                    new commentItem(commentObj, commentList).init();
                }
            })
    }
})
// 点赞
articleZan.addEventListener("click", function () {
    // 判断如果是点亮赞
    // if(this.className)
    let flag;
    if (this.className.indexOf('isThmbUp') == -1) {
        flag = "true";
        this.classList.add("isThmbUp");
        acticleZanNum.innerHTML = parseInt(acticleZanNum.innerHTML) + 1;
    } else {
        // 已经点赞了
        // 取消点赞
        flag = "false";
        this.classList.remove("isThmbUp");
        acticleZanNum.innerHTML = parseInt(acticleZanNum.innerHTML) - 1;
    }
    isGetLikeList = false;// 可以重新获取点赞的数据
    const likeArticleObj = {
        'userId': userId,
        'articleId': authorDetail.articleId,
        'flag': flag
    }
    likeClickPost(likeArticleObj).then(result => {
        console.log(result)
    })
})
// 点踩
articleCai.addEventListener("click", function () {
    let flag;
    if (this.className.indexOf('isDislike') == -1) {
        flag = "true";
        this.classList.add("isDislike");
    } else {
        // 已经点赞了
        // 取消点赞
        flag = "false";
        this.classList.remove("isDislike");
    }
    isGetLikeList = false;// 可以重新获取点赞的数据
    const likeArticleObj = {
        'userId': userId,
        'articleId': authorDetail.articleId,
        'flag': flag
    }
    dislikeClickPost(likeArticleObj).then(result => {
        console.log(result)
    })
})
// 点关注
// 获取关注按钮
const articleSubBtn = document.querySelector(".articleSubBtn");
articleSubBtn.addEventListener("click", function () {
    if (this.className.indexOf('isSub') >= 0) {
        // 说明已经关注了
        this.classList.replace("isSub", "yetSub")
        this.innerHTML = "关注";
        // 取消关注的函数
        cancelSubscribe(authorDetail.authorId).then(() => {
            // 添加关注的用户的
            subscribeArr = subscribeArr.filter(item => item != authorDetail.authorId);
            console.log(subscribeArr)
        })
    } else {
        this.classList.replace("yetSub", "isSub")
        this.innerHTML = "已关注"
        // 关注用户的函数
        subscribeSomeone(authorDetail.authorId).then(() => {
            // 添加关注的用户的
            subscribeArr.push(authorDetail.authorId)
        })
    }
})
// 点表情按钮
biaoqingBtn.addEventListener("click", (e) => {
    e = e||window.event;
    e.stopPropagation();
    e.cancelBubble = true;
    biaoqingBox.style.display = "flex";
})
// 点击表情
biaoqingBox.addEventListener("click", (e) => {
    e = e||window.event;
    e.stopPropagation();
    e.cancelBubble = true;
    const name = e.target.dataset.name || e.target.parentElement.dataset.name;
    let str = "";
    if(name){
        str = "[#"+name+"]";
        allCommentInput.value += str;
        // 点击完退出表情
        biaoqingBox.style.display = "none";
        allCommentInput.focus();
    }
})