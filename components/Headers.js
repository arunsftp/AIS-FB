import Link from 'next/link';

const navItems = [
	{ href: '/', label: 'Application form' },
	{ href: '/about', label: 'About' },
];

export default function Headers() {
	return (
		<header className="site-header">
			<div className="container site-header__inner">
				<div>
					<p className="eyebrow">AIS-FB intake workspace</p>
					<Link href="/" className="brand">
						Application Form Portal
					</Link>
				</div>
				<nav aria-label="Primary navigation">
					<ul className="nav-list">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link href={item.href}>{item.label}</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
