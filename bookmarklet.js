    javascript:(function() {
      function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
      }

      function wrapText(text, limit) {
        var lines = [];
        var paragraphs = text.split('\n\n');
        for (var i = 0; i < paragraphs.length; i++) {
          var words = paragraphs[i].split(' ');
          var line = '';
        for (var j = 0; j < words.length; j++) {
          var word = words[j];
          if ((line.length + word.length + 1) <= limit) {
            line += (line.length > 0 ? ' ' : '') + word;
          } else {
            lines.push(line.trim());
            line = word;
          }
        }
        lines.push(line.trim());
        lines.push('');
      }
      return lines.map(function(line) {
      return '> ' + line;
      }).join('\n');
    }

      var url = window.location.href;
      var date = formatDate(new Date());
      var pageTitle = document.title;
      var selection = window.getSelection().toString();
      var wrappedSelection = wrapText(selection, 54);
      var newTab = window.open('about:blank', '_blank');
      newTab.document.write('<html><head><title>Time to Write an 8-Bit Post…</title>');
      newTab.document.write('<style>html { font-family: "IBM Plex Mono", "Consolas", monospace; font-size: 14pt; font-weight: 400;}</style></head><body>');
      newTab.document.write('---<br>');
      newTab.document.write('title: ""<br>');
      newTab.document.write('date: ' + date + '<br>');
      newTab.document.write('featured_image: /featured/8-bit-post.png<br>');
      newTab.document.write('teaser: ""<br>');
      newTab.document.write('permalink: "/8bit/' + date + '/"<br>');
      newTab.document.write('reblogged_from: ' + url + '<br>');
      newTab.document.write('tags:<br>');
      newTab.document.write('&nbsp;&nbsp;- 8-bit Post<br>');
      newTab.document.write('&nbsp;&nbsp;-<br>');
      newTab.document.write('layout: layouts/8bit.njk<br>');
      newTab.document.write('---');
      newTab.document.write('<p><pre>' + wrappedSelection + '</pre></p>');
      newTab.document.write('<p><pre>— [source](' + url + ')</pre></p>');
      newTab.document.write('</body></html>');
    })();
