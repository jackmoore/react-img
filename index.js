var React = require('react');

// 1x1px
var transparentPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

module.exports = React.createClass({
	getDefaultProps: function() {
		return {
			loadingAttr: 'data-img-loading',
			errorAttr: 'data-img-error',
			errorSrc: transparentPng,
		};
	},
	getInitialState: function() {
		return {
			loading: true,
			error: this.props.src == null,
		};
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({
				loading: true,
				error: nextProps.src == null,
			});
		}
	},
	render: function() {
		var props = {};

		Object.keys(this.props).forEach(function(key){
			props[key] = this.props[key];
		}.bind(this));

		delete props.loadingAttr;
		delete props.errorAttr;
		delete props.errorSrc;

		props[this.props.loadingAttr] = this.state.loading ? true : null;

		props[this.props.errorAttr] = this.state.error ? true : null;

		props.src = this.state.error ? this.props.errorSrc : this.props.src;

		props.onLoad = function(e){
			this.setState({loading: null});

			if (this.props.onLoad && typeof this.props.onLoad === 'function') {
				this.props.onLoad(e);
			}
		}.bind(this);

		props.onError = function(e){
			this.setState({error: true});

			if (this.props.onError && typeof this.props.onError === 'function') {
				this.props.onError(e);
			}
		}.bind(this);

		return React.DOM.img(props);
	},
});