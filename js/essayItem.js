const acticleCommentNum = document.querySelector(".acticleCommentNum");
const acticleZanNum = document.querySelector(".acticleZanNum");
// essay列表
// 父元素节点
// const 点赞的和评论的所在父元素改变，一套对象多用
// 当前点击的文章id
let authorDetail = {
};
const essayList = document.querySelector(".essayList");
const likeList = document.querySelector(".likeList");
const articlePage = document.querySelector("#articlePage");
// 点击文章后的视图元素
// const apAuthorHeadImg = document.querySelector(".detail-authorHeadImg")
const apAuthorname = document.querySelector(".authorname");
const apTitle = document.querySelector(".articleContain .title");
const apTextcontain = document.querySelector(".articleContain .textContain");
// 这是小文章列表的类
class essayItem {
    constructor(essayItemObj, parentElement) {
        // 赋值
        this.thumbUpNum = essayItemObj.thumbUpNum
        this.title = essayItemObj.title;
        this.parentElement = parentElement;
        this.parClassName = parentElement.className;
        this.articleId = essayItemObj.articleId;
        this.commentNum = essayItemObj.commentNum;
        // 获取authorId
        this.authorId = essayItemObj.authorId || authorDetail.authorId;
        this.author = essayItemObj.author;
        // 如果是点赞的列表则无下列属性，初始化为点赞
        this.isDislike = essayItemObj.isDislike;
        this.isThumbUp = essayItemObj.isThumbUp;
        // item的元素节点
        this.element = document.createElement("li");
        // 删除 文章的按钮
        this.deleteBtn = document.createElement("li");
        this.deleteBtn.className = "deleteBtn"
        this.deleteBtn.innerHTML = "删除"
    }
    init() {
        // 渲染节点
        this.renderElement();
        // 获取元素的各个节点
        // 事件函数集合
        this.toArticle();
        // 删除文章
        this.deleteEssay();
    }
    // 元素的初始化和渲染在页面上的函数
    renderElement() {
        this.element.innerHTML = `
        <div class="essayItem">
        <div class="itemLeftContain">
            <div class="authorDetail">
                <div class="authorName">${this.author}</div>
                <div class="sendDate">2天前</div>
            </div>
            <div class="essayTitle">
            </div>
            <ul class="actionList">
				<li class="${(this.isThumbUp || this.parClassName == "likeList") ? 'isThumbUp' : ''}"><i class="iconfont icon-zan1"></i><span>${this.thumbUpNum}</li>
				<li><i class="iconfont icon-pinglun"></i><span>${this.commentNum}</span></li>
				<li class="${this.isDislike ? 'isDislike' : ''}"><i class="iconfont icon-caishixin-"></i></li>
	    	</ul>
        </div>
        <div class="rightImgContain">
            <img src="" alt="">
        </div>
        </div>
        `
        this.essayTitle = this.element.querySelector(".essayTitle");
        this.essayTitle.innerText = this.title;
        // 判断是否是自己写的
        this.actionList = this.element.querySelector(".actionList");
        if (this.parentElement.className == "userArticleList" && requestId == userId) {
            this.actionList.appendChild(this.deleteBtn)
        }
        // essay添加入list中
        this.parentElement.appendChild(this.element);
    }
    // 点击文章事件
    toArticle() {
        const that = this;
        this.element.addEventListener("click", () => {
            authorDetail.authorId = this.authorId;
            authorDetail.articleId = that.articleId;
            // 将this.articleId传输，打开新的页面
            mainContain.style.display = "none";
            userDetailContain.style.display = "none";
            articlePage.style.display = "block";
            mainNavList.style.display = "none";
            userNavList.style.display = "none";
            toMainPage.classList.remove("active");
            // 打开文章Page
            // 请求文章内容
            document.documentElement.scrollTop = 0;
            getArticleContain(that.articleId)
                .then(result => {
                    nowMain = false;
                    nowArticle = true;
                    this.randerAuthor(result.data);
                    // 渲染是否有点赞
                    if (result.data.isThumbUp) {
                        articleZan.classList.add("isThmbUp")
                    } else {
                        articleZan.classList.remove("isThmbUp")
                    }
                    if(result.data.isDislike){
                        articleCai.classList.add("isDislike");
                    }else{
                        articleCai.classList.remove("isDislike");
                    }
                })
                .then(() => {
                    commendPage = 1;
                    getCommentContain(that.articleId)
                        .then(result1 => {
                            // 创建对象
                            commentList.innerHTML = "";
                            result1.forEach(item => {
                                new commentItem(item, commentList).init()
                            });
                        })
                })
        })
    }
    // 判断所属父元素
    // 获取文章详情的函数
    randerAuthor(result) {
        acticleCommentNum.innerHTML = result.commentNum
        acticleZanNum.innerHTML = result.thumbUpNum
        apAuthorHeadImg.src = httpName.concat('/' + result.authorAvatar);
        apAuthorname.innerHTML = result.author;
        apTitle.innerHTML = fliterStr(result.title);
        apTextcontain.innerHTML = fliterStr(result.content);
        // 页面关注按钮的类名
        if(subscribeArr.indexOf(this.authorId) >= 0){
            // 说明已经关注了
            articleSubBtn.classList.replace("yetSub","isSub")
            articleSubBtn.innerHTML = "已关注"
        }else{
            articleSubBtn.classList.replace("isSub","yetSub")
            articleSubBtn.innerHTML = "关注"
        }
    }
    // 删除文章事件
    deleteEssay() {
        this.deleteBtn.addEventListener("click", (e) => {
            e = e || window.event;
            e.stopPropagation()
            e.cancelBubble = true;
            // 删除文章
            const sure = confirm("确定要删除这篇文章么？");
            if (sure) {
                // 删除文章
                deleteActicle(this.articleId).then(result => {
                    alert(result.message);
                    this.parentElement.removeChild(this.element)
                    isGetArticleList = false;
                })
            }
        })
    }
    // 获取评论等内容的函数
}
// new essayItem().init()
// articlePage渲染视图的函数
// 步骤
/**
 * 1.封装获取评论列表的函数
 * 2.评论列表用对象封装
 * 3.评论过后先用innerhtml暂时缓存数据，再次点开时才再次发送请求
 * 4.每次重新打开一个文件都要预先清空评论内容
 *
 */