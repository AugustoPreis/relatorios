import React from 'react';
import { Col, Row, Form, Upload, Input, Button, Popconfirm, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request from '../request/Request';

function Painel() {
	const [form] = Form.useForm();

	const handleReport = ({ anexos, ...values }) => {
		request('/painel/relatorio', {
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			files: anexos,
			body: { ...values }
		}).then(({ data: { codigo } }) => {
			let newWindow = window.open();

			newWindow.location = `/painel/${codigo}.pdf`;
			newWindow.opener = null;
		}).catch((err) => {
			notification.error({
				message: 'Erro!',
				description: err.response.data.message
			})
		})
	}

	const handleAnexos = (anexos = []) => {
		const files = [];
		for (let i = 0; i < anexos.length; i++) {

			files.push(anexos[i].uid);
		}

		return files;
	}

	const handleEmail = () => {

	}

	return (
		<Form form={form}
			layout='vertical'
			onFinish={handleReport}>
			<Row justify='center'
				align='middle'
				gutter={10}>
				<p style={{ fontSize: 24, marginTop: 15 }}>
					<b>Gerador de atividades</b>
				</p>
			</Row>
			<Row justify='center'
				gutter={10}>
				<Col span={13}>
					<Row gutter={10}
						justify='center'>
						<Col span={12}>
							<Form.Item name='projeto'
								label='Nome do projeto'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='atividade'
								label='Nome da atividade'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name='titulo'
								label='Título'>
								<Input />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name='anexos'>
								<Upload beforeUpload={() => false}>
									<Button block
										icon={<UploadOutlined />}>
										Adicionar fotos
									</Button>
								</Upload>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Popconfirm title='Tem certeza que deseja limpar os campos?'
								onConfirm={() => { form.resetFields() }}>
								<Button block>
									Limpar campos
								</Button>
							</Popconfirm>
						</Col>
						<Col span={6}>
							<Popconfirm title='Tem certeza que deseja enviar a atividade por email?'
								onConfirm={handleEmail}>
								<Button block>
									Enviar email
								</Button>
							</Popconfirm>
						</Col>
						<Col span={6}>
							<Button block
								type='primary'
								onClick={form.submit}>
								Visualizar
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
}

export default Painel;