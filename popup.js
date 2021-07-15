document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('refreshToServer');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      
      const Http = new XMLHttpRequest();
      const url='https://leetcode.com/api/problems/algorithms/';
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
        d = document;

        var f = d.createElement('form');
        f.action = 'https://leetcode.requestcatcher.com/test';
        f.method = 'post';
        var i = d.createElement('input');
        i.type = 'hidden';
        i.name = 'url';
        i.value = Http.responseText;
        f.appendChild(i);
        d.body.appendChild(f);
        f.submit();
      }

      
    });
  }, false);
}, false);