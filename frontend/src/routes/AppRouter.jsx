import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Suspense from '../suspense/Suspense';

const Gerador = lazy(() => import('../gerador/Gerador'));

const AppRouter = () => (
	<Router>
		<Suspense>
			<Switch>
				<Route path="/"
					component={Gerador} />
				<Route path="/gerador"
					component={Gerador} />
			</Switch>
		</Suspense>
	</Router>
)

export default AppRouter;