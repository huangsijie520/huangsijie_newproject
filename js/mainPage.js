/*
 *1.window.onload的时候获取一些数据（axios获取）
 2.数据以对象的方式储存
    essayItem对象
 3.对象init函数将数据填入到mainContain中
 4.单window滑动到底部的时候，再次请求数据
 5.数据请求封装成函数形式，对象以数组形式储存，每次获取数据都要重新渲染一次html的图层 
 */
/*
// item的demo，建立对象用来封装list
<li>
<div class="essayItem">
<div class="itemLeftContain">
    <div class="authorDetail">
        <div class="authorName">黄思杰</div>
        <div class="sendDate">2天前</div>
    </div>
    <div class="essayTitle">
        【沸点tall】
    </div>
    <div class="eassayBrif">
        超好玩的代码
    </div>
</div>
<div class="rightImgContain">
    <img src="" alt="">
</div>
</div>
</li>*/
// 跳转页面的js