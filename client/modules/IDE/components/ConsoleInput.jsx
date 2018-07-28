import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash/bindAll';
import CodeMirror from 'codemirror';
import beautifyJS from 'js-beautify';
import InlineSVG from 'react-inlinesvg';

const rightArrowUrl = require('../../../images/right-arrow.svg');

class ConsoleInput extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this._cm = CodeMirror(this.codemirrorContainer, { // eslint-disable-line
      // lineNumbers: true
      theme: 'p5-console',
      scrollbarStyle: null
    });

    this._cm.focus();
    this._cm.setCursor({ line: 1, ch: 5 });

    this._cm.on('change', (action) => {
      // console.log(this._cm.getValue());
      // this._cm.setValue('', 0);
    });

    this._cm.on('keydown', (_cm, e) => {
      if (e.keyCode === 13) {
        const value = this._cm.getValue();
        if (value.trim(' ') === '') {
          return false;
        }
        window.postMessage([{
          method: 'log',
          arguments: value,
          source: 'console'
        }], '*');
        this._cm.setValue('', 0);
      }
      return true;
    });

    this._cm.on('beforeChange', (cm, changeObj) => {
      const typedNewLine = changeObj.origin === '+input' && typeof changeObj.text === 'object' && changeObj.text.join('') === '';
      if (typedNewLine) {
        return changeObj.cancel();
      }

      const pastedNewLine = changeObj.origin === 'paste' && typeof changeObj.text === 'object' && changeObj.text.length > 1;
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

  // _ref(containerElement) {
  //   if (containerElement) {
  //       this._cm = CodeMirror(this.codemirrorContainer, { // eslint-disable-line
  //         styleActiveLine: true,
  //         inputStyle: 'contenteditable',
  //         lineWrapping: false,
  //         fixedGutter: false,
  //         foldGutter: true
  //       });

  //     this._cm.on('change', () => {
  //       alert(this._cm.getValue());
  //     });
  //   }
  // }

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
