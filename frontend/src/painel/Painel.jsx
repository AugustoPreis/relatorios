import React, { useState } from 'react';
import { Col, Row, Form, Upload, Input, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function Painel() {
	const [form] = Form.useForm();
	const [files, setFiles] = useState([]);

	const handleReport = values => {
		axios.get('/painel/relatorio', {
			params: { ...values }
		}).then(({ codigo }) => {
			let newWindow = window.open();

			newWindow.location = `/painel/visualizar/${codigo}`;
			newWindow.opener = null;
		}).catch((err) => {
			Modal.error({
				title: 'Erro!',
				content: err.message
			})
		})
	}

	const handleEmail = () => {

	}

	const onChange = (e) => {

	}

	return (
		<Form form={form}
			layout='vertical'
			onFinish={handleReport}>
			<Row justify='center'
				align='middle'
				gutter={10}>
				<Col span={24}>
					<p style={{ fontSize: 24 }}>
						<b>Gerador de relatórios</b>
					</p>
				</Col>
				<Col span={4}>
					<Form.Item name='projeto'
						label='Projeto'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item name='atividade'
						label='Atividade'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item name='titulo'
						label='Título'>
						<Input />
					</Form.Item>
				</Col>
				<Col span={3}>
					<Upload fileList={files}
						onChange={onChange}	>
						<Button block
							icon={<UploadOutlined />}>
							Adicionar fotos
						</Button>
					</Upload>
				</Col>
				<Col span={2}>
					<Button block
						onClick={handleEmail}>
						Enviar email
					</Button>
				</Col>
				<Col span={2}>
					<Button block
						onClick={form.submit}>
						Visualizar
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default Painel;