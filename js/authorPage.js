const authorPageBtn = document.querySelector(".authorPageBtn");
const userDownList = document.querySelector(".userDownList")
authorPageBtn.addEventListener("click",(e)=>{
    userDownList.style.display = "block"
    e.cancelBubble = true;
    e.stopPropagation()
})
document.querySelector("html").addEventListener("click",(e)=>{
    userDownList.style.display = "none"
})