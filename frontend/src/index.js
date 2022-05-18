import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import Suspense from './suspense/Suspense';

const App = lazy(() => import('./App'));

ReactDOM.render(
	<Suspense>
		<App />
	</Suspense>,
	document.getElementById('app')
);