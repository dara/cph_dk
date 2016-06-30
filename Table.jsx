/** @jsx React.DOM */

'use strict'

module.exports = React.createClass({  
	render: function() {
		var headerComponents = this.generateHeaders(),
				rowComponents = this.generateRows();

		return (
			<table className='table'>
				<thead>
					<tr>
						{headerComponents}
					</tr>
				</thead>
				<tbody>{rowComponents}</tbody>
			</table>
		);
	},

	generateHeaders: function() {
		var cols = this.props.cols;
		
		return cols.map(function(colData) {
			return <th key={colData.key}>{colData.label}</th>;
		});
	},

	generateRows: function() {
		var cols = this.props.cols,
				data = this.props.data;

		return data.map(function(item) {
			var cells = cols.map(function(colData) {
				return <td className={colData.key} key={colData.key}>{item[colData.key]}</td>;
			});
		
			return <tr key={item.id}>{cells}</tr>;
		});
	}
});