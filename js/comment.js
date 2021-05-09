// 创建评论列表对象
/**
 * 1.传父元素
 * 2.通过父元素判断
 */
const commentList = document.querySelector(".commentList");
class commentItem {
    constructor(result, parentElement) {
        // sign的用处为判断是否为回复而不是评论
        // sign为true则为评论否则为回复
        this.comment = fliterStr(result.comment);
        this.commentId = result.commentId;
        this.commentator = result.commentator;
        this.commentatorAvatar = result.commentatorAvatar;
        this.isDislike = result.isDislike;
        this.isThumbUp = result.isThumbUp;
        this.replyNum = result.replyNum;
        this.thumbUpNum = result.thumbUpNum;
        this.parentElement = parentElement;
        this.element = document.createElement("li");
        this.element.className = "commentItem";
        // 删除节点
        this.deleteBtn = document.createElement("div");
        this.deleteBtn.className = "delete";
        this.deleteBtn.innerHTML = "删除";
        this.isEnd = false;
        // 可以发送的信号
        this.cansend = false;
        this.page = 1;
    }
    // 初始化函数
    init() {
        this.randerElement();
        // 新增规定
        this.refreshDefault();
        // 获取评论的数字
        this.reGetApplyNum();
        // 获取回复内容
        this.getApplyContain()
        // 点击 评论事件
        this.commentFn();
        // 删除评论 事件
        this.clearComment();
        // 点赞评论事件
        this.supportComment();
        // 点踩评论按钮
        this.dislikeComment();
        // 获取跟多
        this.getMoreApply();
    }
    randerElement() {
        this.element.innerHTML = `
        <div class="topComment">
            <div class="commentLeft">
                <img class="commentorHeadImg" src="${httpName.concat('/' + this.commentatorAvatar)}" alt="">
            </div>
            <div class="commentRight">
                <div class="commentorName">${this.commentator}</div>
                <div class="commentText">${this.comment}</div>
                <div class="buttonAction">
                    <div class="time">123天前</div>
                    <div class="commentAction">
                        <div class="none zan ${this.isThumbUp ? "active" : ""}"><i class="iconfont icon-zan"></i><span class="zanNum">${this.thumbUpNum}</span></div>
                        <div class="none apply"><i class="iconfont icon-pinglun1"></i>回复<span class="commentNum">${this.replyNum}</span></div>
                        <div class="none cai ${this.isDislike ? "dislike" : ""}"><i class="iconfont icon-caishixin-"></i></div>
                    </div>
                </div>
                <!-- 回复别人的评论框 -->
                <div class="itemCommentInputContain">
                    <div class="inputContain">
                        <textarea class="commentInput" rows="1" placeholder="请输入评论..."></textarea>
                    </div>
                    <div class="action_box">
                        <button class="sendCommentOtherBtn">评论</button>
                    </div>
                </div>
                <ul class="commentOtherList">
                    <!-- demo -->
                    <div class="reGetMore">
                        <span>点击刷新更多</span>
                    </div>
                </ul>
            </div>
        </div>
        `
        this.parentElement.appendChild(this.element)
        // 获取节点
        // 回复的父元素节点
        this.commentOtherParentElement = this.element.querySelector(".commentOtherList");
        // 获取两个按钮
        this.applyBtn = this.element.querySelector(".apply");
        this.zanBtn = this.element.querySelector(".zan");
        this.caiBtn = this.element.querySelector(".cai");
        // 评论和点赞的数字节点
        this.zanNum = this.element.querySelector(".zanNum")
        this.commentNum = this.element.querySelector(".commentNum")
        // 获取评论框
        this.commentInput = this.element.querySelector(".commentInput");
        this.itemCommentInputContain = this.element.querySelector(".itemCommentInputContain");
        this.sendCommentOtherBtn = this.element.querySelector(".sendCommentOtherBtn");
        // 删除按钮的前一个节点
        this.time = this.element.querySelector(".time");
        // 获取更多的按钮
        this.reGetMore = this.element.querySelector(".reGetMore");
        // 判断是不是自己写的
        if (this.commentator == userDetail.nickname && this.commentatorAvatar == userDetail.headImg) {
            this.time.parentNode.insertBefore(this.deleteBtn, this.time.nextSibling);
        }
    }
    // 获取评论区里面的回复
    getApplyContain() {
        if (this.replyNum > 0) {
            getApply(this.commentId, this.page).then(result => {
                this.page++;
                // 如果有就循环创建新类applyItem
                // 如果数量少就让getmore按钮display：none
                if (result.length < 5) {
                    this.page--;
                    this.reGetMore.style.display = "none";
                    this.isEnd = true;
                }
                // 创建对象
                result.forEach(item => {
                    new applyItem(item, this.commentOtherParentElement, this).init()
                })
            })
        }
    }
    // 获取更多回复的事件
    getMoreApply() {
        this.reGetMore.addEventListener("click", () => {
            this.getApplyContain();
        })
    }
    // 重新得到回复的num值的函数
    reGetApplyNum() {
        this.commentNum.innerText = this.replyNum;
        if (this.replyNum == 0) {
            this.commentOtherParentElement.style.display = "none"
        } else {
            this.commentOtherParentElement.style.display = "block"
        }
    }
    // 点击回复事件
    commentFn() {
        this.sendCommentOtherBtn.addEventListener("click", () => {
            if (this.cansend) {
                /*
                传输数据
                HTML加载数据
                */
                sendApply(this.commentId, this.commentInput.value)
                    .then(result1 => {
                        this.commentInput.value = ""
                        const result = {
                            replier: userDetail.nickname,
                            replierAvatar: userDetail.headImg,
                            replyContent: result1.reply
                        }
                        if(this.isEnd){
                            new applyItem(result, this.commentOtherParentElement, this).init();
                        }
                        // 发送成功，commentNum++;
                        this.replyNum++;
                        this.reGetApplyNum();
                    })
            }
        })
    }
    // 点击删除 评论事件
    clearComment() {
        if(!this.commentId){
            return ;
        }
        this.deleteBtn.addEventListener("click", () => {
            deleteComment(this.commentId).then(() => {
                // 删除成功，将节点删除
                this.parentElement.removeChild(this.element)
            })
        })
    }
    // 评论内容的点赞事件
    supportComment() {
        let that = this;
        this.zanBtn.addEventListener("click", function () {
            let flag;
            if (this.className.indexOf('active') == -1) {
                flag = "true";
                this.classList.add("active");
                // 发送成功，zanNum++
                that.zanNum.innerHTML = parseInt(that.zanNum.innerHTML) + 1;
            } else {
                // 已经点赞了
                // 取消点赞
                flag = "false";
                this.classList.remove("active");
                // 发送成功，zanNum--
                that.zanNum.innerHTML = parseInt(that.zanNum.innerHTML) - 1;
            }
            const commentObj = {
                userId: userId,
                commentId: that.commentId,
                flag: flag
            }
            thumbUpComment(commentObj);
        })
    }
    // 点踩事件
    dislikeComment(){
        let that = this;
        this.caiBtn.addEventListener("click", function () {
            let flag;
            if (this.className.indexOf('dislike') == -1) {
                flag = "true";
                this.classList.add("dislike");
            } else {
                // 已经点赞了
                // 取消点赞
                flag = "false";
                this.classList.remove("dislike");
            }
            const commentObj = {
                userId: userId,
                commentId: that.commentId,
                flag: flag
            }
            dislikeComment(commentObj);
        })
    }
    // 评论区里面遵循的事件
    refreshDefault() {
        /**
         * 1.点击回复跳出回复别人的回复框
         * 2.评论自定义高度和设置样式和评论的对象
         * 3.发送按钮的样式
         * 
         */
        const that = this;
        this.applyBtn.addEventListener("click", (e) => {
            this.itemCommentInputContain.style.display = "block"
            this.commentInput.focus()
            e.cancelBubble = true;
            e.stopPropagation();
        })
        this.itemCommentInputContain.addEventListener("click", (e) => {
            e.cancelBubble = true;
            e.stopPropagation();
        })
        body.addEventListener("click", () => {
            this.itemCommentInputContain.style.display = "none"
        })
        // 
        this.commentInput.addEventListener("keyup", function () {
            // this.style.height = this.scrollHeight;
            // 判断里面有没有内容
            if (this.value != '') {
                that.cansend = true;
                that.sendCommentOtherBtn.style.opacity = "1";
                that.sendCommentOtherBtn.style.cursor = "pointer"
            } else {
                that.cansend = false;
                that.sendCommentOtherBtn.style.opacity = "0.5";
                that.sendCommentOtherBtn.style.cursor = "default"
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
    }
}
// 改变str内容的函数
function fliterStr(str) {
    const elem = document.createElement("span");
    elem.appendChild(document.createTextNode(str));
    const reg = /\[#[ab][1-9]\]/g;
    const reg2 = /[ab][1-9]/
    // 正则匹配表情
    const content = str.match(reg);
    if (content) {
        content.forEach(item => {
            const classname = item.match(reg2)[0];
            elem.innerHTML = elem.innerHTML.replace(item, "<i class='iconfont " + classname + "'></i>")
        })
    }
    return elem.innerHTML;
}