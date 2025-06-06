---
title: 搜索
description: 搜索一些内容
sitemap: false
---
<input id="search-input" autocomplete="off" autocapitalize="off" maxlength="80" placeholder="输入内容以搜索" spellcheck="false"
  type="search" />
<div>共找到 <span id="search-count">0</span> 个结果</div>
<ul id="search-results"></ul>
<script data-pjax>
  (function () {
    var search = document.getElementById("search-input");
    var count = document.getElementById("search-count");
    var container = document.getElementById("search-results");
    if (search) {
      if (typeof String.prototype.trim === "undefined") {
        String.prototype.trim = function () {
          return this.replace(/^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+|[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/g, '');
        };
      }
      var request = new XMLHttpRequest();
      request.open("GET", "/search.xml", true);
      function onload() {
        /** @type {Document} */
        var dom, getElementValue;
        if (typeof DOMParser !== "undefined") {
          dom = new DOMParser().parseFromString(request.responseText, "text/xml");
          getElementValue = function (element, tag) {
            return element.querySelector(tag).textContent;
          };
        }
        else if (typeof ActiveXObject !== "undefined") {
          function createDocument() {
            var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"];
            for (var i = 0; i < versions.length; i++) {
              try { return new ActiveXObject(versions[i]); }
              catch (_) { }
            }
          }
          dom = createDocument();
          dom.loadXML(request.responseText);
          getElementValue = function (element, tag) {
            return element.selectSingleNode(tag).text;
          };
        }
        var entries = dom.getElementsByTagName("entry");
        var datas = [];
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var title = getElementValue(entry, "title");
          var content = getElementValue(entry, "content");
          var url = getElementValue(entry, "url");
          datas.push({
            title: title.trim(),
            content: content ? content.trim().replace(/<[^>]+>/g, '') : '',
            url: decodeURIComponent(url).replace(/\/{2,}/g, '/')
          });
        }
        function oninput() {
          var searchText = search.value.trim().toLowerCase();
          var keywords = searchText.split(/[-\s]+/);
          var results = [];
          for (var i = 0; i < keywords.length; i++) {
            var word = keywords[i];
            if (word.length) {
              var div = document.createElement('div');
              div.innerText = word.toLowerCase();
              word = div.innerHTML;
              for (var j = 0; j < datas.length; j++) {
                var data = datas[j];
                var regex = new RegExp(word, 'i');
                if (regex.test(data.title.toLowerCase()) || regex.test(data.content.toLowerCase())) {
                  if ((function () {
                    for (var k = 0; k < results.length; k++) {
                      if (data.url === results[k].url) {
                        return false;
                      }
                    }
                    return true;
                  })()) {
                    results.push(data);
                  }
                }
              }
            }
          }
          count.innerText = results.length;
          var content = '';
          for (var j = 0; j < results.length; j++) {
            var result = results[j];
            content += "<li>" + '<a href="' + result.url + '">' + result.title + "</a>" + "</li>"
          }
          container.innerHTML = content;
          if (typeof pjax === "object") { pjax.refresh(container); }
        }
        if (search.addEventListener) {
          search.addEventListener("input", oninput);
        }
        else {
          search.onchange = search.onkeyup = oninput;
        }
      }
      if (typeof request.onload === "undefined") {
        request.onreadystatechange = function () {
          if (request.readyState === 4 && (request.status >= 200 && request.status < 300 || request.status === 304)) {
            onload();
          }
        };
      }
      else {
        request.onload = onload;
      }
      request.send();
    }
  })();
</script>
<style>
  #search-input {
    width: calc(100% - 16px);
    outline: 0;
  }
</style>