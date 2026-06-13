import Head from 'next/head';
import Headers from '@/components/Headers';
import Footers from '@/components/Footers';

export default function Layout({
	children,
	title = 'Application Form Portal',
	description = 'Submit and review applicant details through a structured intake flow.',
}) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className="app-shell">
				<Headers />
				<main>{children}</main>
				<Footers />
			</div>
		</>
	);
}
