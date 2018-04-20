// ==UserScript==
// @name         MDN自动转化中文简体
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       houzhiqiang@gmail.com
// @match        *://developer.mozilla.org/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(function () {
        var optionValue = 'zh-CN';
        var selectObj = document.querySelector('select#language');
        var formData = document.querySelector('.languages.go');

        var defaultSelectIndex = selectObj.selectedIndex;
        var defaultValue = selectObj.options[defaultSelectIndex].value;

        if (!(/zh-CN/.test(location.href))) {
            if (defaultValue.indexOf(optionValue) < 0) {
                for (var i = 0, len = selectObj.length; i < len; i++) {
                    if (selectObj.options[i].value.indexOf(optionValue) > 0) {
                        formData.attributes.action = selectObj.options[i].value;
                        // 某些页面是默认提交表单表单连接为action的value
                        if (formData.attributes.action) {
                            location.href = selectObj.options[i].value;
                        } else {
                            selectObj.options[i].selected = true;
                            formData.submit();
                        }
                        break;
                    }
                }
            }
        }
        return;
    }, 1000);
})();
