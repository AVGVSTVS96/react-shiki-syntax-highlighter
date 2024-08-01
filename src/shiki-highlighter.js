import { codeToTokens } from 'shiki';

export function createShikiHighlighter() {
  return {
    highlight: async (code, options) => {
      console.log('Shiki highlight called with options:', options);
      try {
        console.log('Attempting to call codeToTokens');
        const { tokens } = await codeToTokens(code, {
          lang: options.language || 'javascript',
          theme: options.theme || 'github-dark'
        });
        console.log('codeToTokens successful, tokens:', tokens);
        return adaptShikiTokens(tokens);
      } catch (error) {
        console.error('Detailed error in Shiki highlighting:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        return { type: 'root', children: [{ type: 'text', value: code }] };
      }
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
          className: ['token']
        },
        children: [{ type: 'text', value: token.content }]
      }))
    }))
  };
}
