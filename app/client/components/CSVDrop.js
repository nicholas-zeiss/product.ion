/**
 *
 *  Dumb component for the modal that allows users to add expenses to a project by uploading a CSV file.
 *
**/


import Papa from 'papaparse';
import React from 'react';
import { Table } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

import { currDateString } from '../utils/misc';


const CSVDrop = props => {
	
	// Papaparse takes a blob file as its first argument.
	// Its second argument is a customizable configuration object. Here, we set the download to true or else the blob file will not be fully downloaded.
	const onDrop = file => {
		Papa.parse(file[0].preview, {
			header: true,
			download: true,
			complete: res => {
				if (res.data.length) {
					if (JSON.stringify(res.meta.fields) !== JSON.stringify(['cost','dateSpent','description','glCode','method','vendor'])) {
						alert('Your CSV has an invalid column structure. The first line of your CSV should be \'cost,dateSpent,description,glCode,method,vendor\'');
					
					} else {
						let valid = res.data.every(row => Object.keys(row).length == 6);

						if (valid) {
							res.data.forEach(row => {
								row.cost = +row.cost;
								row.dateTracked = currDateString();
								row.glCode = +row.glCode;
								row.projID = props.editProject.id;
							});

							props.parseCSV(res.data, props.editProject.id);

							props.toggleCSVModal();
						
						} else {
							alert('Invalid row(s)');
						}
					}
				}
			}
		});
	};


	return (
		<div style={ { textAlign: 'center' } }>
			<div style={ { margin: 'auto', display: 'block' } }>
				<Dropzone onDrop={ onDrop }>
					<div>Try dropping some CSV files here, or click to select files to upload.</div>
				</Dropzone>
			</div>
			<h4>To import a csv first configure the top line of your spreadsheet as follows:</h4>
			<Table>
				<thead>
					<tr>
						<th>cost</th>
						<th>dateSpent</th>
						<th>description</th>
						<th>glCode</th>
						<th>method</th>
						<th>vendor</th>
					</tr>
				</thead>
			</Table>
		</div>
	);
};


export default CSVDrop;

