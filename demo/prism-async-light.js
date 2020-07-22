import React from 'react';
import { render } from 'react-dom';
import SyntaxHighlighter from '../src/prism-async-light';
import clike from '../src/languages/prism/clike';
import markup from '../src/languages/prism/markup';
import markupTemplating from '../src/languages/prism/markup-templating';
import ExamplesLinks from './examples-links';

SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('markup-templating', markupTemplating);
SyntaxHighlighter.registerLanguage('clike', clike);

const availableStyles = [
  // TODO: Generate list
];

const availableLanguages = ['text', 'javascript', 'java', 'yaml'];

class Component extends React.Component {
  constructor() {
    super();
    const initialCodeString = `function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}

function createChildren(style, useInlineStyles) {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) => createElement({
      node: child,
      style,
      useInlineStyles,
      key:\`code-segment-$\{childrenCount}-$\{i}\`
    }));
  }
}

function createElement({ node, style, useInlineStyles, key }) {
  const { properties, type, tagName, value } = node;
  if (type === "text") {
    return value;
  } else if (tagName) {
    const TagName = tagName;
    const childrenCreator = createChildren(style, useInlineStyles);
    const props = (
      useInlineStyles
      ?
      { style: createStyleObject(properties.className, style) }
      :
      { className: createClassNameString(properties.className) }
    );
    const children = childrenCreator(node.children);
    return <TagName key={key} {...props}>{children}</TagName>;
  }
}
  `;
    this.state = {
      selected: 'atom-dark',
      style: require('../src/styles/prism/atom-dark').default,
      code: initialCodeString,
      showLineNumbers: false,
      language: 'javascript'
    };
  }

  render() {
    return (
      <div className="demo__root demo__root--prism-async-light">
        <header>
          <h1>React Syntax Highlighter Demo</h1>
          <ExamplesLinks />
        </header>

        <main>
          <aside className="options__container">
            {/* <h2 style={h2}>Change Style</h2>
            <select
              className="select"
              value={this.state.selected}
              onChange={(e) => this.setState({style: require(`../styles/prism/${e.target.value}`).default, selected: e.target.value})}
            >
              {availableStyles.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <h2 style={h2}>Change Language</h2>
            <select
              className="select"
              value={this.state.language}
              onChange={(e) => this.setState({language: e.target.value})}
            >
              {availableLanguages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>*/}

            <div className="options__option options__option--line-numbers">
              <label htmlFor="showLineNumbers" className="option__label">
                <input
                  type="checkbox"
                  className="option__checkbox"
                  checked={this.state.showLineNumbers}
                  onChange={() =>
                    this.setState({
                      showLineNumbers: !this.state.showLineNumbers
                    })
                  }
                  id="showLineNumbers"
                />

                <span className="label__text">Show line numbers</span>
              </label>
            </div>
          </aside>

          <div style={{ paddingTop: 20, display: 'flex' }}>
            <textarea
              style={{ flex: 1, marginTop: 11 }}
              rows={40}
              cols={100}
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}
            />
            <div style={{ flex: 1, width: '50%' }}>
              <SyntaxHighlighter
                style={this.state.style}
                showLineNumbers={this.state.showLineNumbers}
                wrapLines={true}
                lineProps={lineNumber => ({
                  style: { display: 'block', cursor: 'pointer' },
                  onClick() {
                    alert(`Line Number Clicked: ${lineNumber}`);
                  }
                })}
                language={this.state.language}
              >
                {this.state.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

render(<Component />, document.getElementById('app'));
