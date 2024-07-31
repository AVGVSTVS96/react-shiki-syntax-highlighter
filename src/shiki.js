import { createShikiHighlighter } from './shiki-highlighter';
import highlight from './highlight';
import defaultStyle from './styles/shiki/default-style';

const highlighter = createShikiHighlighter();
export default highlight(highlighter, defaultStyle);
