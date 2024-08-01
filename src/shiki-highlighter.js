import * as shiki from 'shiki';

export function createShikiHighlighter() {
  return {
    highlight: async (code, { language, theme }) => {
      const { tokens } = await shiki.codeToTokens(code, {
        lang: language,
        theme: theme || 'github-dark'
      });
      return adaptShikiTokens(tokens);
    }
  };
}

function adaptShikiTokens(shikiTokens) {
  return {
    type: 'root',
    children: shikiTokens.map(line => ({
      type: 'element',
      tagName: 'span',
      properties: { className: ['line'] },
      children: line.map(token => ({
        type: 'element',
        tagName: 'span',
        properties: {
          className: [token.fontStyle, `color-${token.color.slice(1)}`],
          style: { color: token.color }
        },
        children: [{ type: 'text', value: token.content }]
      }))
    }))
  };
}
