// 改进请求的函数
const wittingpage = document.querySelector("#wittingpage");
const httpName = "http://47.100.42.144:3389";
const wit = document.querySelector(".wit");
const end = document.querySelector(".end");
const html = document.querySelector("html");
function showWritting(){
	wittingpage.style.display = "flex";
	html.style.overflow = "hidden";
	wit.style.display = "inline-block";
	end.style.display = "none";
}
function showEnd(){
	wittingpage.style.display = "flex";
	html.style.overflow = "hidden";
	wit.style.display = "none";
	end.style.display = "inline-block";
	setTimeout(()=>{
		wittingpage.style.display = "none"
		html.style.overflow = "auto";
	},400)
}
function getAxios(url,obj){
    showWritting();
    url = httpName.concat(url + '?');
    for(key in obj){
        url = url.concat(key + '=' + obj[key] + '&')
    }
    url = url.substring(0,url.length - 1);
    return new Promise((resolve, reject) => {
        axios({
            method:"GET",
            url:url,
            data:obj,
        })
        .then(result=>{
            wittingpage.style.display = "none";
            html.style.overflow = "auto"
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
function postAxios(url,obj){
    showWritting();
    url = httpName.concat(url);
    return new Promise((resolve, reject) => {
        axios.post(url,obj)
        .then(result=>{
            wittingpage.style.display = "none"
            html.style.overflow = "auto";
            resolve(result.data.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}