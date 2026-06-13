import Layout from '@/components/Layout';
import ApplicationForm from '@/components/ApplicationForm';

export default function HomePage() {
	return (
		<Layout>
			<section className="page-section">
				<div className="container">
					<ApplicationForm />
				</div>
			</section>
		</Layout>
	);
}
