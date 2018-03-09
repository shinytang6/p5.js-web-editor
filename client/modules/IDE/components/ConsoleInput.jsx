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
      styleActiveLine: true,
      value: 'qss'
    });

    this._cm.on('change', () => {
      console.log(this._cm.getValue());
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
        className="console__row console__input"
      >
        <div className="console__chevron console__chevron_blue">&#xf054;</div>
        <div ref={(element) => { this.codemirrorContainer = element; }} className="editor-holder" tabIndex="0" />
      </div>
    );
  }
}


export default ConsoleInput;
