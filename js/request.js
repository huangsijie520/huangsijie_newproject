// 获取文章信息的js文件
// 储存
var page = 1;
var commendPage = 1;
function getArticle(){
    const articleObj = {
        'userId':userId,
        'page':page
    }
    page++;
    return new Promise((resolve, reject) => {
        getAxios('/article/getArticle',articleObj)
        .then(result=>{
			if(result.data.length < 10){
				page--;
				nowMain = false;
			}
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获得详情文章的函数
function getArticleContain(articleId) {
    const articleObj = {
        'userId':userId,
        'articleId':articleId
    }
    return new Promise((resolve, reject) => {
        getAxios('/article/getContent',articleObj)
        .then(result=>{
            resolve(result);
        })
        .catch(error=>{
            reject(error);
        })
    })
}
// 获取评论
function getCommentContain(articleId){
    const commentObj = {
        'userId':userId,
        'articleId':articleId,
        page:commendPage++
    }
    return new Promise((resolve, reject) => {
        getAxios('/comment/getComment',commentObj)
        .then(result=>{
            if(result.data.length < 5){
                commendPage --;
                nowArticle = false;// 不能申请数据了
            }
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获取回复
function getApply(Id,applyPage){
    const applyObj = {
        'userId':userId,
        'commentId':Id,
        page:applyPage
    }
    return new Promise((resolve, reject) => {
        getAxios('/reply/getReply',applyObj)
        .then(result=>{
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 发送评论请求
function sendComment(id,commentText){
    const commentObj = {
        userId:userId,
        articleId:id,
        comment:commentText
    }
    return new Promise((resolve, reject) => {
        postAxios('/comment/postComment',commentObj)
        .then(()=>{
            resolve(commentObj)// 将对象内容返回
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 发送回复请求
function sendApply(commentId,replyText){
    const applyObj = {
        userId:userId,
        commentId:commentId,
        reply:replyText
    }
    return new Promise((resolve, reject) => {
        postAxios('/reply/postReply',applyObj)
        .then(result=>{
            resolve(applyObj)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获取用户信息的js文件
// 获取用户信息的func
function getUserDetail(id){
    const userIdObj = {
        'userId':id
    }
    return new Promise((resolve, reject) => {
        getAxios("/user/getUserInfo",userIdObj)
        .then(result=>{
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 点赞的post请求
function likeClickPost(likeArticleObj){
    return new Promise((resolve, reject) => {
        postAxios('/article/thumbUpArticle',likeArticleObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 点踩文章
function dislikeClickPost(likeArticleObj){
    return new Promise((resolve, reject) => {
        postAxios('/article/dislikeArticle',likeArticleObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 点赞评论的请求
function thumbUpComment(commentObj){
    return new Promise((resolve, reject) => {
        postAxios('/comment/thumbUpComment',commentObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 点踩评论的请求
function dislikeComment(commentObj){
    return new Promise((resolve, reject) => {
        postAxios('/comment/dislikeComment',commentObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 点击删除评论请求
function deleteComment(commentId){
    const commentObj = {
        userId:userId,
        commentId:commentId
    }
    return new Promise((resolve, reject) => {
        postAxios('/comment/deleteComment',commentObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 删除回复内容
function deleteApply(applyId){
    const applyObj = {
        userId:userId,
        replyId:applyId
    }
    return new Promise((resolve, reject) => {
        postAxios('/reply/deleteReply',applyObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 发送文章
function sendActicle(title,content){
    const acticleObj = {
        userId:userId,
        title:title,
        content:content
    }
    return new Promise((resolve, reject) => {
        postAxios('/article/writeArticle',acticleObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获取点赞的列表
function getUserLikeArticles(){
    return new Promise((resolve, reject) => {
        getAxios('/user/getUserLikeArticles',{'userId':requestId})
        .then(result=>{
            resolve(result.data);
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获取文章信息
function getUserWriteArticle(){
    return new Promise((resolve, reject) => {
        getAxios('/user/getUserWriteArticles',{'userId':requestId})
        .then(result=>{
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 删除自己写的文章
function deleteActicle(articleId){
    const acObj = {
        userId:userId,
        articleId:articleId
    }
    return new Promise((resolve, reject) => {
        postAxios("/article/deleteArticle",acObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获取我关注的人
function getconcerList(){
    return new Promise((resolve, reject) => {
        getAxios("/user/getMySubscribe",{userId:requestId})
        .then(result=>{
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 获取用户关注者
function getconcerMeList(){
    return new Promise((resolve, reject) => {
        getAxios("/user/getSubscribeMe",{userId:requestId})
        .then(result=>{
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 关注用户
function subscribeSomeone(id){
    const subscribeObj = {
        userId:userId,
        subscribeId:id
    }
    return new Promise((resolve, reject) => {
        postAxios("/user/subscribeSomeone",subscribeObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 取消关注用户的函数
function cancelSubscribe(id){
    const subscribeObj = {
        userId:userId,
        subscribeId:id
    }
    return new Promise((resolve, reject) => {
        postAxios("/user/cancelSubscribe",subscribeObj)
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
// 判断登录没有
function getIsLogin (){
    return new Promise((resolve, reject) => {
        getAxios('/user/isLogin',{userId:userId})
        .then(result=>{
            resolve(result.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
}