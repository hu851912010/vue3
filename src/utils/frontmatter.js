function stripQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function parsePrimitive(raw) {
  const value = raw.trim();
  if (!value) {
    return '';
  }
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === 'null') {
    return null;
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value
        .slice(1, -1)
        .split(',')
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean);
    }
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }
  return stripQuotes(value);
}

function splitKeyValue(line) {
  const colonIndex = line.indexOf(':');
  if (colonIndex === -1) {
    return { key: line.trim(), value: null, hasValue: false };
  }
  const key = line.slice(0, colonIndex).trim();
  const rest = line.slice(colonIndex + 1);
  if (rest.trim() === '') {
    return { key, value: null, hasValue: false };
  }
  return { key, value: rest.trim(), hasValue: true };
}

function parseYaml(block) {
  const lines = block.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, node: root }];

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    if (!rawLine || !rawLine.trim()) {
      continue;
    }

    const indent = rawLine.match(/^\s*/)[0].length;
    const trimmed = rawLine.trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const context = stack[stack.length - 1];
    const { key, value, hasValue } = splitKeyValue(trimmed);

    if (!hasValue) {
      const child = {};
      context.node[key] = child;
      stack.push({ indent, node: child });
      continue;
    }

    if (value === '|') {
      const buffer = [];
      let pointer = i + 1;
      while (pointer < lines.length) {
        const nextLine = lines[pointer];
        if (nextLine === undefined) {
          break;
        }
        const nextIndent = nextLine.match(/^\s*/)[0].length;
        if (!nextLine.trim()) {
          buffer.push('');
          pointer += 1;
          continue;
        }
        if (nextIndent <= indent) {
          break;
        }
        buffer.push(nextLine.slice(indent + 2));
        lines[pointer] = '';
        pointer += 1;
      }
      context.node[key] = buffer.join('\n');
      continue;
    }

    context.node[key] = parsePrimitive(value);
  }

  return root;
}

export function parseFrontMatter(raw) {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw };
  }
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return { data: {}, content: raw };
  }
  const data = parseYaml(match[1]);
  const content = raw.slice(match[0].length);
  return { data, content };
}

export function stripFrontMatter(raw) {
  return parseFrontMatter(raw).content;
}
