import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Suspense from '../suspense/Suspense';

const Painel = lazy(() => import('../painel/Painel'));

const AppRouter = () => (
	<Router>
		<Suspense>
			<Switch>
				<Route path="/"
					component={Painel} />
				<Route path="/painel"
					component={Painel} />
			</Switch>
		</Suspense>
	</Router>
)

export default AppRouter;