const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject=JSON.parse(x)
window.hashMap = xObject || [
    { logo: "M", name: "MDN", url: "https://mdn.io" },
    { logo: "J", name: "掘金", url: "https://juejin.im" },
    { logo: "Z", name: "知乎", url: "https://zhihu.com" },
    { logo: "C", name: "CSDN", url: "https://bbs.csdn.net" },
    { logo: "G", name: "Github", url: "https://github.io" },
    { logo: "I", name: "Iconfont", url: "https://www.iconfont.cn" },
    { logo: "N", name: "牛客网", url: "https://www.nowcoder.com/" }
]
const simplifyURL=(url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace("www.", '')
        .replace(/\/.*/,'') //删除以 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li=$(`<li>
                 <div class="site">
                     <div class="logo">
                         ${node.logo[0]}
                     </div>
                     <div class="link">
                    <!--${simplifyURL(node.url)}-->
                        ${node.name}
                     </div>
                     <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                     </div>
                 </div>
         </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            alert("是否删除此站点卡片？")
            e.stopPropagation() 
            // 点close退出时不会进入a标签
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()
const resetInput = () => {
    $('input[name="name"]').val("");
    $('input[name="url"]').val("");
}
const getInput = () => {
    let name = $('input[name="name"]').val();
    let url = $('input[name="url"]').val();
    console.log(name, url)
    if (url.indexOf('http') !== 0 && url !== "") {
        url = 'https://' + url;
        // 网址开头不是http时自动在开头添加https
    }
    if (name === "") {
        name = simplifyURL(url);
        // 用户没有填写快捷方式名称时，则把url作为站点名称
    }
    hashMap.push({
        logo: simplifyURL(url)[0].toUpperCase(),
        name: name,
        url: url
    })
    resetInput()
    render()        
    return name,url
}
$('.cancel')
    .on('click', () => {
        $('.dialogContainer').hide()
    })
$('.confirm')
    .on('click', () => {
        $('.dialogContainer').hide()
        getInput()
    })
$('.urlInput').on('keyup', () => {
    if (event.keyCode === 13) {
        getInput()
        $('.dialogContainer').hide()
    }
})
$('.addButton')
    .on('click', () => {
        $('.dialogContainer').show()        
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)
    // 在用户离开页面时把网址块存到localStorage中
}

