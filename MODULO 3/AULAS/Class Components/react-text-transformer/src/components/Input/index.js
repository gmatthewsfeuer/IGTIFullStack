import React, { Component } from 'react';

import './index.css';

export default class Input extends Component {
	handleInputChange = ({ target }) => {
		const { onChange } = this.props;
		onChange(target.value);
	};

	handleCopy = () => {
		const { id } = this.props;
		const inputId = `input_${id}`;
		const inputElement = document.querySelector(`#${inputId}`);
		inputElement.select();
		document.execCommand('copy');
	};

	render() {
		const {
			id,
			description,
			value,
			autoFocus = false,
			readOnly = false,
			allowCopy = false,
		} = this.props;

		const inputId = `input_${id}`;

		return (
			<div class="row">
				<div class="input-field col s12">
					<input
						id={inputId}
						type="text"
						value={value}
						onChange={this.handleInputChange}
						autoFocus={autoFocus}
						readOnly={readOnly}
						allowCopy={allowCopy}
					/>
					<label htmlFor={inputId} className={allowCopy ? 'activated' : ''}>
						{description}:{' '}
					</label>
				</div>

				{allowCopy && (
					<button
						onClick={this.handleCopy}
						className="btn-floating btn-large waves-effect waves-light black"
					>
						<i className="material-icons">content_copy</i>
					</button>
				)}
			</div>
		);
	}
}
