import React from 'react';
import { connect } from 'react-redux';
import { markdown } from 'markdown';

const getType = (typeInfo) => (
	typeInfo.name === 'union' ? 
		typeInfo.value.map(t => t.name).join(' | ') :
		typeInfo.name
);

const getDefault = (defaultInfo) => (
	defaultInfo ?
		(defaultInfo.computed ? <em>Computed</em> : defaultInfo.value) :
		<em>null</em>
);

export default ({
	props
}) => (
	<table className="table table-striped table-bordered">
		<thead>
			<tr>
				<th>Property</th>
				<th width={75}>Type</th>
				<th width={100}>Default</th>
				<th width={50}>Required?</th>
				<th width={'50%'}>Description</th>
			</tr>
		</thead>
		<tbody>
			{Object.keys(props).map(propKey => {
				const propInfo = props[propKey];
				const { description } = propInfo;

				return (
					<tr key={propKey}>
						<td>{propKey}</td>
						<td>{getType(propInfo.type)}</td>
						<td>{getDefault(propInfo.defaultValue)}</td>
						<td>{propInfo.required ? 'Yes' : 'No'}</td>
						<td dangerouslySetInnerHTML={{__html: description ? markdown.toHTML(description) : '<em>None</em>'}} />
					</tr>
				);

			})}
		</tbody>
	</table>
);