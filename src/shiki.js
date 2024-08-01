import { createShikiHighlighter } from './shiki-highlighter';
import highlight from './highlight';
import defaultStyle from './styles/shiki/default-style';

const asyncHighlighter = createShikiHighlighter();

const syncWrapper = {
  highlight: (code, language) => {
    // Return a promise that resolves immediately with a placeholder
    // The actual highlighting will happen asynchronously
    asyncHighlighter
      .highlight(code, { language })
      .then(result => {
        // You'll need to implement a way to update the highlighted code
        // after it's been asynchronously processed
        console.log('Shiki highlighting complete:', result);
        // updateHighlightedCode(result); // You'll need to implement this function
      })
      .catch(error => {
        console.error('Shiki highlighting error:', error);
      });

    // Return a placeholder immediately
    return { type: 'text', value: code };
  }
};

export default highlight(syncWrapper, defaultStyle);
