// 变头像的方法
const changeAvatarBtn = document.querySelector("#changeAvatarBtn");
const file = document.querySelector("#file");
// 用button代替点击事件
changeAvatarBtn.onclick = function () {
    file.click()
}
file.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let param = new FormData(); //创建form对象
    param.append('avatar', file);
    param.append("userId", userId);
    // 使用formdata的形式传递参数
    postAxios('/user/changeUserAvatar',param)
    .then(result=>{
        alert(result.message);
        // 重新请求数据改变头像的信息
        randerUserDetail();
    })
})
// 获取dom节点
const nameBox = document.querySelector(".nameBox");
const infoBox = document.querySelector(".infoBox");
// 创建对象，对象用来加入方法
class setItem{
    constructor(type , elem){
        this.element = elem.querySelector("input");// 获取节点的input节点
        this.oldValue = "123";
        this.changeBtn = elem.querySelector(".actionBox");// 修改的按钮
        this.type = type;// 修改的类型
    }
    init(){
        // 初始化函数
        this.changeValue()
    }
    // 点击改变事件
    changeValue(){
        this.changeBtn.addEventListener("click",()=>{
            const newValue = this.element.value;
            // 判断新的值和旧的值是否相同
            if(this.oldValue === newValue){
                // 两个的值相同
                alert('请输入不一样的值');
            }else{
                this.oldValue = newValue;
                this.changeUserInfo();
            }
        })
    }
    reRander(newValue){
        // 重新渲染的函数
        this.element.value = newValue;
    }
    changeUserInfo(){
        // userDetail.nickname   userDetail.introduction
        // 定义对象
        const userDetailObj = {
            'userId':userId,
            nickname:userDetail.nickname,
            introduction:userDetail.introduction
        }
        // type用来判断修改的是哪一个值
        if(this.type === 'name'){
            // 如果修改的是用户名
            userDetailObj.nickname = this.oldValue;
        }else{
            userDetailObj.introduction = this.oldValue;
        }
        postAxios('/user/changeUserInfo',userDetailObj)
        .then(result=>{
            alert(result.message)
            randerUserDetail();
        })
    }
}
const nameInput = new setItem("name", nameBox);
const infoInput = new setItem("info", infoBox);
nameInput.init();
infoInput.init();
// 改变用户信息的函数