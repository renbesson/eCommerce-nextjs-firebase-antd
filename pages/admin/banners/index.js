import { CloseCircleTwoTone } from '@ant-design/icons';
import UploadImage from '@/components/admin/products/UploadImage';
import { useDocument } from '@nandorojo/swr-firestore';
import { deleteImage } from '@/utils/sharedFunctions';
import { Card, Col, Divider, Row, Typography } from 'antd';
import ImagesView from '@/components/admin/ImagesView';

const { Title, Text } = Typography;

indexBannersAdmin.AdminLayout = true;

export default function indexBannersAdmin() {
	const { data: banners, error } = useDocument('misc/banners', { listen: true });

	const imgStyle = {
		display: 'table',
		float: 'left',
		width: '500px',
		height: '200px',
		marginRight: '8px',
		marginBottom: '8px',
		textAlign: 'center',
		verticalAlign: 'top',
		backgroundColor: '#fafafa',
		border: '1px dashed #d9d9d9',
		borderRadius: '2px',
		transition: 'border-color 0.3s ease',
	};

	return (
		<>
			<Card>
				<Row>
					<Col span={24}>
						<Title level={3}>Main Banners</Title>
					</Col>
					<Col>
						<Col>
							{banners && (
								<ImagesView
									collection="misc"
									path="misc/banners/mainBanners/"
									docId="banners"
									array="mainBanners"
									images={banners.mainBanners}
									width={500}
									height={200}
								/>
							)}
						</Col>
					</Col>
					<Col span={24}>
						{banners && banners.mainBanners.length < 6 && (
							<UploadImage
								aspect={2.5}
								collection={'misc'}
								path={`misc/banners/mainBanners/`}
								docId={'banners'}
								array={'mainBanners'}
							/>
						)}
						{banners && banners.mainBanners.length >= 6 && <Text strong>Maximum banners reached! Delete any current banner to add a new one.</Text>}
					</Col>
				</Row>
			</Card>
			<Divider />
			<Card>
				<Row>
					<Col span={24}>
						<Title level={3}>Middle Cards</Title>
					</Col>
					<Col>
						{banners && (
							<ImagesView
								collection="misc"
								path="misc/banners/middleBanners/"
								docId="banners"
								array="middleBanners"
								images={banners.middleBanners}
								width={250}
								height={100}
							/>
						)}
					</Col>
					<Col span={24}>
						{banners && banners.middleBanners.length < 3 && (
							<UploadImage
								aspect={1.6}
								collection={'misc'}
								path={`misc/banners/middleBanners/`}
								docId={'banners'}
								array={'middleBanners'}
							/>
						)}
						{banners && banners.mainBanners.length >= 3 && <Text strong>Maximum cards reached! Delete any current card to add a new one.</Text>}
					</Col>
				</Row>
			</Card>
		</>
	);
}
