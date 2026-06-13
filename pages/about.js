import Layout from '@/components/Layout';

const features = [
	'Reusable layout with shared header and footer components.',
	'Single-page application form with client-side validation and live preview.',
	'Mock API route for submission testing and future backend integration.',
];

export default function AboutPage() {
	return (
		<Layout title="About | Application Form Portal">
			<section className="page-section">
				<div className="container narrow-flow">
					<p className="eyebrow">About this build</p>
					<h1>Application form app</h1>
					<p className="lead-copy">
						This AIS-FB implementation uses the existing repository folders as a standard Next.js pages-router
						app and focuses on a clean intake workflow that can be extended with persistence or approval logic.
					</p>

					<div className="panel info-panel">
						<h2>Included in this scaffold</h2>
						<ul className="feature-list">
							{features.map((feature) => (
								<li key={feature}>{feature}</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</Layout>
	);
}
