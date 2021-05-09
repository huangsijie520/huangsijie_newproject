// 写文章的js
const exitBtn = document.querySelector(".exitBtn")
const sendBtn = document.querySelector(".sendBtn")
const titleInput = document.querySelector(".titleInput")
let nowWrite = false
const content = document.querySelector(".content");
const rightContentText = document.querySelector(".rightContentText")
content.addEventListener("keyup", function () {
    // 节流的方法获取左边的value值传到右边
    if (timeout) {
        clearTimeout(timeout);
    }
    var timeout = setTimeout(() => {
        rightContentText.innerHTML = this.value
    }, 100);
})
sendBtn.addEventListener("click", () => {
    // 发送写文章请求
    const titleValue = titleInput.value.trim();
    const contentValue = content.value.trim();
    if (titleValue != "" && contentValue != '') {
        // 判断两个内容都有 发送请求
        sendActicle(titleValue, contentValue)
            .then(result => {
                alert(result.message)
            })
            .then(() => {
                // 发送成功
                isGetArticleList = false;
                // 返回主页
                titleInput.value = "";
                content.value = "";
                rightContentText.innerHTML = "";
                // 自动点击退出
                exitBtn.click();
            })
    }
})
exitBtn.addEventListener("click", () => {
    // 退出
    mainPage.style.display = "flex";
    writePage.style.display = "none";
    nowWrite = false;
})