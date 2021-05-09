// 关注者对象
// 先获取关注者的id和名称，然后用getUserDetail(关注者id)的方法获取基本信息
// 关注着对象有渲染，点击进入页面的函数

// 获取到的关注者/我关注的人的列表，渲染在视图上
class subscribe {
    constructor(result, parentElement) {
        this.element = document.createElement("li");
        this.element.className = "item";
        this.parentElement = parentElement;
        this.id = result.subId;
    }
    init() {
        // 初始化函数
        this.getDetail().then(result => {
            this.randerElement(result);
            this.subFn();
            this.itemClick();
        });
    }
    getDetail() {
        return new Promise((resolve, reject) => {
            // 获取关注者信息的函数
            getUserDetail(this.id).then(result => {
                resolve(result)
            })
                .catch(error => {
                    reject(error)
                })
        })
    }
    randerElement(result) {
        const index = subscribeArr.indexOf(this.id);
        this.element.innerHTML = `
        <div class="imgContain">
        <img src="${httpName.concat('/' + result.avatar)}" alt="">
    </div>
    <div class="introduceBox">
        <div class="name">${result.nickname}</div>
        <div class="userIntroduction">${result.introduction || "该用户很懒，什么也没有留下"}</div>
    </div>
    <button class="subBtn ${index >= 0 ? 'isSub' : 'noSub'}">
        ${index >= 0 ? '已关注' : '关注'}
    </button>
        `
        this.parentElement.appendChild(this.element);
        // 获取元素节点
        this.subBtn = this.element.querySelector(".subBtn");
    }
    // 点击关注事件
    subFn() {
        const that = this;
        this.subBtn.addEventListener("click", function (e) {
            e = e || window.event;
            e.stopPropagation()
            e.cancelBubble = true;
            if (this.className.indexOf('isSub') == -1) {
                this.classList.replace('noSub', 'isSub')
                this.innerHTML = "已关注";
                subscribeSomeone(that.id).then((result) => {
                    console.log(result)
                    // 添加关注的用户的
                    subscribeArr.push(that.id)
                })
            } else {
                this.classList.replace('isSub', 'noSub')
                this.innerHTML = "关注";
                cancelSubscribe(that.id).then((result) => {
                    console.log(result)
                    // 添加关注的用户的
                    subscribeArr = subscribeArr.filter(item => item != that.id);
                    console.log(subscribeArr)
                })
            }
        })
    }
    // 点击除了按钮以外的item进入用户的主页面
    itemClick() {
        this.element.addEventListener("click", () => {
            // requestId变化
            // 进入页面
            // 自动聚焦第一个位置
            toUserPageFn();
            // 个人界面变成别人的界面
            // requestId改变
            requestId = this.id;
            userInfo.style.display = "none";
            otherUserInfo.style.display = "flex";
            setOtherDetail();
            // 进入主页后初始化主页内容
            /**
             * 1.要重新显示为第一个按钮
             * 2.重置数据
             */
        })
    }
}
//  ${subscribeArr.indexOf(this.id) >= 0 ? 'isSub' : 'noSub'}别人的关注者页面也会渲染，所以要根据有没有关注来渲染他的类名
/**
 * 1.可以使用类似userDetail.js上的方法，父元素代理子元素的方法
 * 2.自点击element.click()事件模拟用户自己点击的点击事件
 * 3.把关注者的类写出来，互相关注 <-> 回关 转化
 */