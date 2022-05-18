import React, { lazy } from 'react';
import Suspense from './suspense/Suspense';

const Root = lazy(() => import('./root/Root'));

const App = () => {
	return (
		<Suspense>
			<Root />
		</Suspense>
	);
}

export default App;