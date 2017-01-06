import React from 'react';
import CodeMirror from 'codemirror';
import JSParser from 'react-live-editor/code-mirror-highlighting/jsparser';
import stringStream from 'react-live-editor/code-mirror-highlighting/stringstream';

const indentUnit = 2;

const normaliseString = (string) => {
	var tab = "";
	for (var i = 0; i < indentUnit; i++) tab += " ";

	string = string.replace(/\t/g, tab).replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n");
	var pos = 0, parts = [], lines = string.split("\n");
	for (var line = 0; line < lines.length; line++) {
		if (line != 0) parts.push("\n");
			parts.push(lines[line]);
	}

	return {
		next () {
			if (pos < parts.length) return parts[pos++];
			else throw StopIteration;
		}
	};
};

const highlightText = (string, callback) => {
	const parser = JSParser.make(stringStream(normaliseString(string)));
	const result = [];
	let i = 0;
	try {
		while (true) {
			var token = parser.next();
			result.push(
				token.value === '\n'
					? <br key={i} />
					: <span key={i} className={token.style}>{token.value}</span>
			);
			i++;
		}
	}
	catch (e) {
		if (e != StopIteration) throw e;
	}
	
	return result;
};

const CodeMirrorHighlight = ({codeText, theme}) => {
  return (
    <pre
      style={{overflow: 'scroll'}}
      className={"CodeMirror cm-s-"+theme}
    >
      {highlightText(codeText)}
    </pre>
  );
};

CodeMirrorHighlight.defaultProps = {
	theme: 'solarized-light'
};

export default CodeMirrorHighlight;