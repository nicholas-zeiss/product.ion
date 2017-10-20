/**
 *
 *	The main container component for the app view which is connected to the redux store and is the parent of all view components
 *
**/

import React from 'react';
import { Link } from 'react-router';


const App = props => (
	<div className='titleHeader'>
		<Link to='/'>
			<div id='title' style={ { 'color': 'white' } }> product.ion </div>
		</Link>

		{ React.cloneElement(props.children, props) }

	</div>
);


export default App;

