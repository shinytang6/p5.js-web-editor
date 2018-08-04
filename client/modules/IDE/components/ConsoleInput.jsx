import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash/bindAll';
import CodeMirror from 'codemirror';
import beautifyJS from 'js-beautify';
import InlineSVG from 'react-inlinesvg';

const rightArrowUrl = require('../../../images/right-arrow.svg');

class ConsoleInput extends React.Component {
  componentDidMount() {
    this._cm = CodeMirror(this.codemirrorContainer, { // eslint-disable-line
      theme: 'p5-console',
      scrollbarStyle: null,
      keyMap: 'sublime'
    });

    this._cm.setOption('extraKeys', {
      'Up': cm => cm.undo(),
      'Down': cm => cm.redo()
    });

    this._cm.focus();
    this._cm.setCursor({ line: 1, ch: 5 });

    this._cm.on('keydown', (cm, e) => {
      if (e.keyCode === 13) {
        const value = cm.getValue();
        if (value.trim(' ') === '') {
          return false;
        }
        window.postMessage([{
          method: 'log',
          arguments: value,
          source: 'console'
        }], '*');

        cm.setValue('');
      }
      return true;
    });

    this._cm.on('beforeChange', (cm, changeObj) => {
      const typedNewLine = changeObj.origin === '+input' && changeObj.text.join('') === '';
      if (typedNewLine) {
        return changeObj.cancel();
      }

      const pastedNewLine = changeObj.origin === 'paste' && changeObj.text.length > 1;
      if (pastedNewLine) {
        const newText = changeObj.text.join(' ');
        return changeObj.update(null, null, [newText]);
      }

      return null;
    });
  }

  componentWillUnmount() {
    this._cm = null;
  }

  _cm: CodeMirror.Editor

  render() {
    return (
      <div
        className="console__input"
      >
        <InlineSVG src={rightArrowUrl} className="console-active__chevron" />
        <div ref={(element) => { this.codemirrorContainer = element; }} className="console__editor" />
      </div>
    );
  }
}


export default ConsoleInput;
