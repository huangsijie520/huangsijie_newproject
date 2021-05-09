// 回复别人的类
class applyItem{
    constructor(result,parentElement,proto){
        this.element = document.createElement("li");
        this.element.className = "applyItem"
        this.parentElement = parentElement;
        this.replier = result.replier;
        this.replierAvatar = result.replierAvatar ;
        this.replyContent = result.replyContent;
        this.replyId = result.replyId;
        this.proto = proto;// 关联两个对象
        // 删除节点
        this.deleteBtn = document.createElement("div");
        this.deleteBtn.className = "delete";
        this.deleteBtn.innerHTML = "删除";
    }
    init(){
        this.randerElement();
        this.clearApply();
    }
    randerElement() {
        this.element.innerHTML = `
        <div class="topComment">
            <div class="commentLeft">
                <img class="commentorHeadImg" src="${httpName.concat('/' + this.replierAvatar)}" alt="">
            </div>
            <div class="commentRight">
                <div class="commentorName">${this.replier}</div>
                <div class="commentText"></div>
                <div class="buttonAction">
                    <div class="time">123天前</div>
                </div>
                <div class="itemCommentInputContain">
                    <div class="inputContain">
                        <textarea class="commentInput" rows="1" placeholder="请输入评论..."></textarea>
                    </div>
                    <div class="action_box">
                        <button class="sendCommentOtherBtn">评论</button>
                    </div>
                </div>
            </div>
        </div>
        `
        this.commentText = this.element.querySelector(".commentText");
        this.commentText.innerText = this.replyContent;
        this.parentElement.appendChild(this.element)
        // 获取节点
        // 回复的父元素节点
        this.commentOtherParentElement = this.element.querySelector(".commentOtherList");
        // 获取两个按钮
        this.applyBtn = this.element.querySelector(".apply");
        this.zanBtn = this.element.querySelector(".zan");
        // 获取评论框
        this.commentInput = this.element.querySelector(".commentInput");
        this.itemCommentInputContain = this.element.querySelector(".itemCommentInputContain");
        this.sendCommentOtherBtn = this.element.querySelector(".sendCommentOtherBtn");
        // 删除按钮的前一个节点
        this.time = this.element.querySelector(".time");
        // 判断是不是自己写的
        if(this.replier == userDetail.nickname && this.replierAvatar == userDetail.headImg){
            this.time.parentNode.insertBefore(this.deleteBtn,this.time.nextSibling);
        }
    }
    // 点击删除事件
    clearApply(){
        // 请求数据
        if(!this.replyId){
            return ;
        }
        this.deleteBtn.addEventListener("click",()=>{
            deleteApply(this.replyId).then(result=>{
                this.parentElement.removeChild(this.element);
                this.proto.replyNum --;
                this.proto.reGetApplyNum();
            })
        })
    }
}