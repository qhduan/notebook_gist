// ==UserScript==
// @name         CSDNNeedCopy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://blog.csdn.net/*
// @icon         https://blog.csdn.net/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict'
    setTimeout(() => {

        document.querySelectorAll('code.prism').forEach(elem => {
            const text = elem.textContent
            const textArea = document.createElement('textarea')
            textArea.value = text
            elem.parentNode.appendChild(textArea)
        })
    }, 1000)
})();