import React, { useState } from 'react';
import axios from 'axios';
import { Col, Row, Form, Upload, Input, Button, Popconfirm, notification, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { formData } from './utils';

function Gerador() {
	const [form] = Form.useForm();
	const [path, setPath] = useState('');

	const handleReport = values => {
		if (!values.anexos || values.anexos.length === 0)
			return message.error('É preciso inserir ao menos um arquvio!');

		values.anexos = values.anexos.fileList || [];

		const form = formData(values);

		axios.post('/gerador/relatorio', form, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(({ data: { nome } }) => {
			const newWindow = window.open();

			newWindow.location = `/gerador/${nome}.pdf`;
			newWindow.opener = null;
		}).catch((err) => {
			let { message } = err.response.data;

			if (message === 'ALREADY_EXISTS')
				message = `A atividade ${values.nome} já existe`;

			notification.error({
				message: 'Erro!',
				description: message || ''
			});
		})
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
						<Col span={10}>
							<Form.Item name='nome'
								label='Nome do arquivo'
								rules={[{ required: true, message: 'O nome da atividade é obrigatório!' }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={14}>
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
						<Col span={12}>
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
								Gerar atividade
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
}

export default Gerador;