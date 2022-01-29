// ==UserScript==
// @name         Bilibili report inject
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       qhduan
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    function sleep(n) {
        return new Promise(resolve => {
            setTimeout(resolve, n)
        })
    }

    async function reportInject() {
        console.log('try inject report button')
        await sleep(1000)
        document.querySelectorAll(
            'div.operation.btn-hover.btn-hide-re > div > ul > li.report'
        ).forEach(item => {
            const p4 = item.parentNode.parentNode.parentNode.parentNode
            const p5 = p4.parentNode
            // console.log(p5.textContent)
            if (p5.textContent.match(/资料|电子书/i)) {
                // 插入按钮
                let t = document.createElement('button')
                t.onclick = async function() {
                    // 点击举报
                    item.click()
                    await sleep(300)
                    // 点击垃圾广告
                    document.querySelectorAll('label[for=r6]')[0].click()
                    await sleep(300)
                    document.querySelectorAll('a.btn-submit')[0].click()
                    await sleep(300)
                    const cancel = document.querySelectorAll('a.btn-cancel')
                    if (cancel && cancel.length) {
                        cancel[0].click()
                    }
                }
                t.textContent = 'report'
                p4.appendChild(t)
            }
        })
    }

    setTimeout(reportInject, 3000)

    // Your code here...
})();
