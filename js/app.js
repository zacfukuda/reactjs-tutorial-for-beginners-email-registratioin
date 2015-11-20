/**
 * Copyright (c) 2015, Zac Fukuda.
 * All rights reserved.
 */

var React = require('react');

// Regex for email format
var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var NameInput = React.createClass({
	getInitialState: function() {
		return ({className: '', value: ''});
	},
	onChange: function (e) {
		var value = e.target.value;
		var className = value ? 'ok' : 'err';

		this.setState({className: className, value: value});
	},
	render: function () {
		return (
			<input type="text" name="name" onChange={this.onChange}
				className={this.state.className} value={this.state.value}
				placeholder="Name" />
		);
	}
});

var EmailInput = React.createClass({
	getInitialState: function () {
		return ({className: '', value: ''});
	},
	onChange: function (e) {
		var email = e.target.value;
		var className = emailRegex.test(email) ? 'ok': 'err';

		this.setState({className: className, value: email});
	},
	render: function () {
		return (
			<input type="email" name="email" onChange={this.onChange}
				className={this.state.className} value={this.state.value}
				placeholder="Email Address" />
		);
	}
});

var Feedback = React.createClass({
	render: function () {
		var className = 'feedback ' + this.props.status;
		return (
			<p className={className}>{this.props.feedback}</p>
		);
	}
});

var RegistrationForm = React.createClass({
	getInitialState: function () {
		return ({
			status: '',
			feedback: ''
		});
	},
	onSubmit: function (e) {
		e.stopPropagation();
		e.preventDefault();

		var name = this.refs.name.state.className,
				email = this.refs.email.state.className;

		var feedback = [], status = '', ok = 'ok';

		if ( name !== ok || email !== ok) {
			feedback = 'ERROR: Please check the form.';
			status = 'err';
			this.setState({status: status, feedback: feedback})
			return 0
		}

		var data = {
			name: this.refs.name.state.value.trim(),
			email: this.refs.email.state.value.trim()
		};

		feedback = 'Your email has been registered.';
		this.refs.name.setState({className: '', value: ''});
		this.refs.email.setState({className: '', value: ''});
		this.setState({status: ok, feedback: feedback});

		/**
		 * Your ajax event might come here.
		 * Note that 4 linse above should be inside of done or fail
		 * function with proper values and actions.
		 */
		/* $.ajax({
			url: 'register',
			type: 'GET' || 'POST',
			processData: false,
			contentType: 'application/json;charset=UTF-8',
			data: JSON.stringfy(data)
		}).done( function (res) {
			
		}).fail( function (res) {
			
		});*/
		
	},
	render: function () {
		var status = this.state.status,
				feedback = this.state.feedback;

		return (
			<div>
				<form onSubmit={this.onSubmit} noValidate>
					<NameInput ref="name" />
					<EmailInput ref="email" />
					<input type="submit" value="Submit" />
				</form>
				<Feedback status={status} feedback={feedback} />
			</div>
		);
	}
});

React.render(
	<RegistrationForm />,
	document.getElementById('register')
);