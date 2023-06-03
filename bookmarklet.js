    javascript:(function() {
      function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
      }
    
      function wrapText(text, limit) {
        var words = text.split(' ');
        var lines = [];
        var line = '';
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          if ((line.length + word.length + 1) <= limit) {
            line += (line.length > 0 ? ' ' : '') + word;
          } else {
            lines.push(line.trim());
            line = word;
          }
        }
        lines.push(line.trim());
        return lines;
      }
    
      function convertToMarkdown(text) {
        var wrappedLines = wrapText(text, 54);
        var markdownLines = wrappedLines.map(function(line) {
          return '> ' + line;
        });
        return markdownLines.join('\n');
      }
    
      var url = window.location.href;
      var date = formatDate(new Date());
      var pageTitle = document.title;
      var selection = window.getSelection().toString();
      var markdownText = convertToMarkdown(selection);
      var newTab = window.open('about:blank', '_blank');
      newTab.document.write('<html><head><title>Time to Write a Blog Post…</title>');
      newTab.document.write('<style>html { font-family: monospace; font-size: 14pt;}</style></head><body>');
      newTab.document.write('---<br>');
      newTab.document.write('title: ""<br>');
      newTab.document.write('date: ' + date + '<br>');
      newTab.document.write('featured_image: /featured/<br>');
      newTab.document.write('teaser: ""<br>');
      newTab.document.write('permalink: "/{{ page.fileSlug }}/"<br>');
      newTab.document.write('tags:<br>');
      newTab.document.write('&nbsp;&nbsp;-<br>');
      newTab.document.write('layout: layouts/post.njk<br>');
      newTab.document.write('---');
      newTab.document.write('<p>You’re writing about "' + pageTitle + '" posted at ' + url + '</p>');
      newTab.document.write('<p>Here’s the part that you wanted to quote:</p>');
      newTab.document.write('<pre><code>' + markdownText + '</code></pre>');
      newTab.document.write('<p>Copy and paste this into your text editor and start writing.<br><strong>Don’t forget to add the title, featured image, and tags.</strong>');
      newTab.document.write('</body></html>');
    })();
