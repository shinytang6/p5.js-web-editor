import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash/bindAll';
import CodeMirror from 'codemirror';
import beautifyJS from 'js-beautify';

class ConsoleInput extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this._cm = CodeMirror(this.codemirrorContainer, { // eslint-disable-line
      maxLines: 1
    });

    this._cm.on('change', (action) => {
      // console.log(this._cm.getValue());
      // this._cm.setValue('', 0);
    });

    this._cm.on('keydown', (_cm, e) => {
      if (e.keyCode === 13) {
        window.parent.postMessage([{
          method: 'log',
          arguments: this._cm.getValue(),
          source: 'console'
        }], '*');
        this._cm.setValue('', 0);
      }
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

  _cm: CodeMirror.Editor

  render() {
    return (
      <div
        className="console__row console__input"
      >
        <div ref={(element) => { this.codemirrorContainer = element; }} className="editor-holder" tabIndex="0" />
      </div>
    );
  }
}


export default ConsoleInput;
