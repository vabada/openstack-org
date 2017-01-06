import React from 'react';
import ReactDOM from 'react-dom';
import BabelReact from 'babel-preset-react';
import BabelES2015 from 'babel-preset-es2015';

class CodePreview extends React.Component {
  
	constructor(props) {
		super(props);
		this.timeoutID = null;
	}

	componentDidUpdate () {
		clearTimeout(this.timeoutID);
	}

	setTimeout () {
		clearTimeout(this.timeoutID);
		this.timeoutID = setTimeout.apply(null, arguments);
	}

	render () {
	    return <div ref="mount" />;
	}

    componentDidMount () {
      this.executeCode();
    }

    componentDidUpdate (prevProps) {
      // execute code only when the state's not being updated by switching tab
      // this avoids re-displaying the error, which comes after a certain delay
      if (this.props.code !== prevProps.code) {
        this.setTimeout(() => this.executeCode(), 500);
      }
    }

    compileCode () {
      return Babel.transform(
        `(function() { ${this.props.code} })()`,
        {
        	presets: [ BabelReact, BabelES2015 ]
        }
      ).code;
    }

    executeCode () {
      const mountNode = this.refs.mount;

      if(!mountNode) return;
      
      try {
        ReactDOM.unmountComponentAtNode(mountNode);
      } catch (e) { }

      try {
        var compiledCode = this.compileCode();
        ReactDOM.render(
        	<div>{eval(compiledCode)}</div>,
          	mountNode
        );
      } catch (err) {
        this.setTimeout(() => {
          ReactDOM.render(          		
            <div className="playgroundError">{err.toString()}</div>,            
            mountNode
          );
        }, 500);
      }
    }
}

CodePreview.propTypes = {
	code: React.PropTypes.string.isRequired
};

export default CodePreview;