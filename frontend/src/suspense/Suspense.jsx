import React, { Suspense as SuspenseReact, useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';

function Suspense({ children, fallback }) {
	const [visible, setVisible] = useState(false);
	const minHeight = document.body.clientHeight * (80 / 100);

	useEffect(() => {
		setTimeout(() => setVisible(true), 200);
	}, [])

	const render = () => {
		return (
			<Row align='middle'
				justify='center'
				style={{ minHeight }}>
				<Col span={24}>
					{visible &&
						<span>
							Carregando <br /> <Spin size="large" />
						</span>
					}
				</Col>
			</Row>
		);
	}

	return (
		<SuspenseReact fallback={fallback ? fallback : render()}>
			{children}
		</SuspenseReact>
	);
}

Suspense.propTypes = {
	children: PropTypes.node,
	fallback: PropTypes.node
};

export default Suspense;