/**
 * Created by mikepugh on 1/22/16.
 */

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import C from '../../constants';

export default React.createClass({
	mixins: [PureRenderMixin],
	submit(e) {
		const p = this.props;
		let field = this.refs.field;
		p.submit(field.value);
		field.value = "";
		e.preventDefault();
	},
	render() {
		const p = this.props;
		let q = p.quote;
		let button;
		if(p.state === C.EDITING_QUOTE) {
			return (
				<form className="quote" onSubmit={this.submit}>
					<input ref="field" defaultValue={q.content}/>
					<button type="button" onClick={p.cancel}>Cancel</button>
					<button type="submit" onClick={this.submit}>Submit</button>
				</form>
			);
		}
		if(!p.mayedit) {
			button = "";
		} else if(p.state === C.SUBMITTING_QUOTE) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = <span><button onClick={p.edit}>Edit</button><button onClick={p.delete}>Delete</button></span>;
		}
		return (
			<div className="quote">
				<span className="author">{q.username+" said:"}</span>
				{q.content}
				{button}
			</div>
		);

	}
});


