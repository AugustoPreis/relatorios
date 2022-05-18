import React, { lazy } from 'react';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import { IntlProvider } from 'react-intl';
import Suspense from '../suspense/Suspense';

const AppRouter = lazy(() => import('../routes/AppRouter'));

const Root = () => (
	<ConfigProvider locale={ptBR}>
		<IntlProvider locale="pt">
			<Suspense>
				<AppRouter />
			</Suspense>
		</IntlProvider>
	</ConfigProvider>
);

export default Root;