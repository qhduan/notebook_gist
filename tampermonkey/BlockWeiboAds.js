// ==UserScript==
// @name         BlockWeiboAds
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://weibo.com/*
// @icon         https://weibo.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const blockUserList = ['@每日白菜优选', '@魔方严选']
    const blockText = ['#京东金榜#', /.*原价[^猫]*猫.*/g, /猫车群/g, /饿了么/g, /百亿补贴/g, /麦玲玲/g, /喜茶/g, /有人财运好/g]

    function removeAd() {

        document.querySelectorAll(".vue-recycle-scroller__item-view").forEach(ad => {
            let hotPush = false
            ad.querySelectorAll('div').forEach(elem => {
                if (elem.textContent.trim() === '热推') {
                    hotPush = true
                    // console.log(ad, elem, 'hot')
                }
                for (const x of blockText) {
                    if (x.compile) {
                        if (elem.textContent.match(x)) {
                            hotPush = true
                            // console.log(ad, elem, 'bad key')
                            break
                        }
                    } else if (elem.textContent.indexOf(x) >= 0) {
                        hotPush = true
                        // console.log(ad, elem, 'bad key')
                        break
                    }
                }
            })
            if (hotPush) {
                ad.style.opacity = 0.1
                return
            }

            let adimg = false
            ad.querySelectorAll('img').forEach(img => {
                // 这是一张带有广告两个字的图片
                if (img.src === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAeCAYAAAB5c901AAACbUlEQVR4AeWYA5AdQRCGY9spxradQmwXYtsux0lxdrQ3sQqxbdssxLbN7trJ1flu92bv7m226j/0m/lff9O9mlT/1XHnzp1M58+f73/u3DkF2hJiUpg7MsQId+nSpQpnz569CfoOOhdqgJizzv0mskSrHH4AAy9euHChZKh2IOaODMgSqZIQGID0oQwXERJZsF3Dg9i/WGKvpgsXLszDmDWPc57X7VylaPGVK2mOiLEFC1hRzq01nJOmXvLRp5iKCLgF5RUQkunGGPkDv9e7n0suwNw3S5YsCW8p26ZV0U8IOtitX0QeY4A60U2YlJS0ccLn8Lp6YfRqJzMgtg1oS0yCFj0Bvx/h33GoVRS/lRpwN/ye/0/YCTp+RMeiSSlV2A/AD2D+DWDueRHM7xmhSrXA6xdU/gV8diOiIHZHAz7RsWjCc9cXQPjyk4m90h04cCAdeF3CxZJSlsaYwRZNfkDwGe5UiM7SoWABbt9OMwLcxNWrV2cOHKAQZATeFuISfMd7BAR9jnucJU0DfkksoG2z+oxZ000IKtzJGOCCBaSgs6rWnlQp9/AOKITVQF+615hKBPy6gt8gt1JKpfcBkPZBQAC1zQFa19DTrYQQ2YwD4iVdX9kGmgTEp5g/f/6kTog4JzN8AwTj7WgeFkbLmQQE7XIxfrovgNCW9fQF5jauZKAAndawTusLzDiMBQpQCNrLgSMvlFI5zQOSX/D7a0IEC/zTOCCYTnXak7XTIdMVvCEEGZYQ4XXAK2CcWxZS0jqG2bQv6SEl65Dw8bQO53QU3gddbVngBk2QN52Cv22oy1oxsBu/wd+6D/DxF6S9dE9EL8SBAAAAAElFTkSuQmCC") {
                    adimg = true
                    // console.log(ad, img, 'img')
                }
            })
            if (adimg) {
                //ad.innerHTML = '我是广告';
                ad.style.opacity = 0.1
                return
            }

            let follow = false
            ad.querySelectorAll('button.woo-button-main').forEach(but => {
                if (but.textContent.match(/关注/)) {
                    follow = true
                    // console.log(ad, but, 'follow')
                }
            })
            if (follow) {
                //ad.innerHTML = '我是广告';
                ad.style.opacity = 0.1
                return
            }

            let blockUser = false
            ad.querySelectorAll('span').forEach(elem => {
                if (blockUserList.indexOf(elem.textContent.trim()) >= 0) {
                    blockUser = true
                    // console.log(ad, elem, 'block')
                }
            })
            if (blockUser) {
                //ad.innerHTML = '我是广告';
                ad.style.opacity = 0.1
                return
            }

            ad.style.opacity = 1.0
       })
    }
    setInterval(removeAd, 500)
    // Your code here...
})();