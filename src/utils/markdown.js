function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function formatInline(text) {
  const codeSnippets = [];
  let processed = text.replace(/`([^`]+)`/g, (_, code) => {
    const placeholder = `@@CODE${codeSnippets.length}@@`;
    codeSnippets.push(`<code>${escapeHtml(code)}</code>`);
    return placeholder;
  });

  processed = escapeHtml(processed);

  processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
    return `<img src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" class="inline-block max-w-full rounded-2xl border border-border" />`;
  });

  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    return `<a href="${escapeAttribute(url)}" class="text-accent hover:text-accent/80 underline decoration-white/20 hover:decoration-accent transition">${label}</a>`;
  });

  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/(^|\s)\*([^*]+)\*(?=\s|$)/g, '$1<em>$2</em>');

  codeSnippets.forEach((snippet, index) => {
    processed = processed.replace(`@@CODE${index}@@`, snippet);
  });

  return processed;
}

export function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const htmlParts = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let inUnorderedList = false;
  let inOrderedList = false;
  let inBlockquote = false;
  let paragraphBuffer = [];

  const closeParagraph = () => {
    if (paragraphBuffer.length) {
      const text = paragraphBuffer.join(' ').trim();
      if (text) {
        htmlParts.push(`<p>${formatInline(text)}</p>`);
      }
      paragraphBuffer = [];
    }
  };

  const closeLists = () => {
    if (inUnorderedList) {
      htmlParts.push('</ul>');
      inUnorderedList = false;
    }
    if (inOrderedList) {
      htmlParts.push('</ol>');
      inOrderedList = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      htmlParts.push('</blockquote>');
      inBlockquote = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine;
    const trimmed = line.trim();

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        closeParagraph();
        closeBlockquote();
        closeLists();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        const languageClass = codeLanguage ? ` language-${codeLanguage}` : '';
        htmlParts.push(`<pre><code class="${languageClass.trim()}">`);
      } else {
        htmlParts.push('</code></pre>');
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      htmlParts.push(`${escapeHtml(line)}\n`);
      continue;
    }

    if (!trimmed) {
      closeParagraph();
      closeBlockquote();
      closeLists();
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      closeParagraph();
      closeBlockquote();
      closeLists();
      const level = trimmed.match(/^#+/)[0].length;
      const content = trimmed.replace(/^#{1,6}\s+/, '');
      htmlParts.push(`<h${level}>${formatInline(content)}</h${level}>`);
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      closeParagraph();
      closeLists();
      if (!inBlockquote) {
        htmlParts.push('<blockquote>');
        inBlockquote = true;
      }
      const content = trimmed.replace(/^>\s?/, '');
      htmlParts.push(`<p>${formatInline(content)}</p>`);
      continue;
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      closeParagraph();
      closeBlockquote();
      if (!inUnorderedList) {
        closeLists();
        htmlParts.push('<ul>');
        inUnorderedList = true;
      }
      const content = trimmed.replace(/^[-*+]\s+/, '');
      htmlParts.push(`<li>${formatInline(content)}</li>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      closeParagraph();
      closeBlockquote();
      if (!inOrderedList) {
        closeLists();
        htmlParts.push('<ol>');
        inOrderedList = true;
      }
      const content = trimmed.replace(/^\d+\.\s+/, '');
      htmlParts.push(`<li>${formatInline(content)}</li>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeParagraph();
      closeBlockquote();
      closeLists();
      htmlParts.push('<hr class="my-8 border-white/10" />');
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  closeParagraph();
  closeBlockquote();
  closeLists();

  return htmlParts.join('\n');
}
