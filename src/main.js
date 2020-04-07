const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject=JSON.parse(x)
window.hashMap = xObject || [
    { logo: "M",url: "https://mdn.io" },
    { logo: "J",url: "https://juejin.im" },
    { logo: "Z",url: "https://zhihu.com" },
    { logo: "C",url: "https://bbs.csdn.net" },
    { logo: "B",url: "https://bilibili.com" },
    { logo: "G",url: "https://github.io" },
    { logo: "I",url: "https://www.iconfont.cn" }
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
                     ${simplifyURL(node.url)}
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

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入新增网址：')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
            // 网址开头不是http时自动在开头添加https
        }
    console.log(url)
    hashMap.push({
        logo: simplifyURL(url)[0].toUpperCase(),
        url: url
    })
    render()
    })

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x', string)
    // 在用户离开页面时把网址块存到localStorage中
}
$(document).on('keypress', (e) => {
    const key = e.key 
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
    // 键盘导航:在主页按下某个字母键时可跳转到开头为该字母的网站
})
