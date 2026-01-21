"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const values = [
	{
		title: "Christ-Centered",
		description:
			"Every ministry, message, and activity is rooted in the life, teachings, and soon return of Jesus Christ.",
		icon: "✝️",
	},
	{
		title: "Mission-Focused",
		description:
			"We exist to reach hearts in Malawi and beyond with the everlasting gospel and practical acts of compassion.",
		icon: "🌍",
	},
	{
		title: "Family & Youth",
		description:
			"We invest intentionally in homes and young people, raising a generation that loves God and serves others.",
		icon: "👨‍👩‍👧‍👦",
	},
	{
		title: "Integrity & Service",
		description:
			"We seek to reflect Christ's character in honesty, humility, and faithful stewardship of every resource.",
		icon: "🤝",
	},
];

const team = [
	{
		name: "Leadership Team",
		role: "Pastoral & Mission Directors",
		description:
			"Dedicated servants guiding the spiritual direction and mission strategy",
		icon: "👥",
	},
	{
		name: "Community Outreach",
		role: "Social Impact Ministry",
		description: "Bringing food, education, health, and hope to vulnerable families",
		icon: "🤲",
	},
	{
		name: "Youth & Discipleship",
		role: "Next Generation Leaders",
		description: "Mentoring young people to become strong disciples of Jesus",
		icon: "📚",
	},
	{
		name: "Worship & Prayer",
		role: "Spiritual Formation",
		description: "Cultivating a culture of prayer, praise, and deep spiritual connection",
		icon: "🙏",
	},
];

const timeline = [
	{
		year: "2020",
		milestone: "Movement Begins",
		description: "Small group of believers unite with a vision for spiritual revival",
	},
	{
		year: "2021",
		milestone: "First Mission Hub",
		description: "Establish base in Guma, Dowa District for community ministry",
	},
	{
		year: "2022",
		milestone: "Expansion Phase",
		description: "Expand outreach programs and discipleship initiatives",
	},
	{
		year: "2024",
		milestone: "Regional Impact",
		description: "Reach 500+ families across 5+ districts with gospel and aid",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 },
	},
};

export default function About() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative min-h-[70vh] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden py-16 px-6">
				{/* Animated background elements */}
				<motion.div
					className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"
					animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
					transition={{ duration: 10, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full opacity-5 blur-3xl"
					animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
					transition={{ duration: 12, repeat: Infinity }}
				/>

				<div className="relative z-10 mx-auto max-w-5xl text-center">
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-sm font-semibold tracking-[0.25em] text-blue-200 uppercase mb-4"
					>
						Know Our Heart
					</motion.p>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
					>
						About Chia View
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
					>
						A Christ-centered community in Central Malawi, called to proclaim hope,
						nurture disciples, and serve with the hands of Jesus until He returns.
					</motion.p>
				</div>
			</section>

			{/* Our Story Section */}
			<section className="py-20 px-6 bg-white">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-12 md:grid-cols-[1.5fr,1fr] items-center">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7 }}
							className="space-y-6"
						>
							<div>
								<motion.h2
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
								>
									Our Story
								</motion.h2>
								<div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
							</div>

							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className="text-lg text-gray-700 leading-relaxed"
							>
								Chia View Church Mission grew from a small group of believers who longed to see genuine,
								Bible-based revival in their communities in the central region of Malawi. What began with
								simple home meetings, prayer gatherings, and open-air preaching has blossomed into a vibrant
								movement touching thousands of lives.
							</motion.p>

							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="text-lg text-gray-700 leading-relaxed"
							>
								Today, our mission centers in <strong>Guma, Dowa District</strong> serve as beacons of hope,
								functioning as hubs for worship, discipleship, evangelism, and tangible community impact. Through
								Bible studies, youth mentorship, health campaigns, and humanitarian support, we seek to reveal
								the transformative character of Christ in practical, compassionate ways.
							</motion.p>

							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 }}
								className="text-lg text-gray-700 leading-relaxed"
							>
								We are proud members of the worldwide Seventh-day Adventist family, holding the Bible as our
								final authority and joyfully proclaiming the <strong>Three Angels' Messages</strong> of Revelation 14
								— a call to worship the Creator, embrace the everlasting gospel, and prepare hearts for Christ's
								imminent return.
							</motion.p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-100 bg-white"
						>
							<Image
								src="/about-hero.jpg"
								alt="Chia View Church Mission community gathering"
								width={600}
								height={500}
								className="w-full h-auto object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Core Values Section */}
			<section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
				<div className="mx-auto max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
							What Matters Most to Us
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							These core values guide every decision, ministry, and interaction
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
					>
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								variants={itemVariants}
								whileHover={{ y: -10 }}
								className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-2xl transition-all duration-300"
							>
								<div className="text-5xl mb-4">{value.icon}</div>
								<h3 className="text-2xl font-bold text-blue-900 mb-3">
									{value.title}
								</h3>
								<p className="text-gray-700 leading-relaxed">
									{value.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Our Journey Timeline */}
			<section className="py-20 px-6 bg-white">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
							Our Journey
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Milestones in faith, growth, and service
						</p>
					</motion.div>

					<div className="relative">
						{/* Timeline line */}
						<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-400"></div>

						<motion.div
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="space-y-12"
						>
							{timeline.map((item, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className={`flex gap-8 items-center ${
										index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
									}`}
								>
									{/* Content */}
									<div
										className={`flex-1 ${
											index % 2 === 0 ? "md:text-right" : "md:text-left"
										}`}
									>
										<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200">
											<div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
												{item.year}
											</div>
											<h3 className="text-2xl font-bold text-blue-900 mb-2">
												{item.milestone}
											</h3>
											<p className="text-gray-700">
												{item.description}
											</p>
										</div>
									</div>

									{/* Timeline dot */}
									<div className="hidden md:flex justify-center">
										<motion.div
											whileHover={{ scale: 1.2 }}
											className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"
										></motion.div>
									</div>

									{/* Spacer for layout */}
									<div className="flex-1 hidden md:block"></div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Team/Ministry Areas */}
			<section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
				<div className="mx-auto max-w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
							Our Ministry Areas
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Different callings, one mission — serving Christ through diverse ministries
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
					>
						{team.map((area, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-600 hover:shadow-2xl transition-all duration-300 text-center"
							>
								<div className="text-6xl mb-4">{area.icon}</div>
								<h3 className="text-xl font-bold text-blue-900 mb-2">
									{area.name}
								</h3>
								<p className="text-sm font-semibold text-blue-600 mb-3">
									{area.role}
								</p>
								<p className="text-gray-700">
									{area.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Vision Statement Section */}
			<section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
				<div className="mx-auto max-w-4xl text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7 }}
					>
						<div className="text-6xl mb-6">🎯</div>
						<h2 className="text-4xl md:text-5xl font-bold mb-6">
							Our Vision
						</h2>
						<p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
							To see a thriving community of believers—families, youth, and leaders—rooted in Scripture,
							empowered by the Holy Spirit, and actively proclaiming Christ's love through word and deed.
							A movement that transforms hearts, strengthens communities, and prepares people for eternity.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 px-6 bg-white">
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mx-auto max-w-4xl text-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl py-16 px-8 shadow-2xl"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Join Our Community
					</h2>
					<p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
						Whether you're seeking a church family, exploring faith for the first time, or looking for meaningful
						ways to serve, there is room and purpose for you in this mission.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/#contact"
							className="inline-block rounded-full bg-white text-blue-900 font-semibold px-10 py-3 shadow-lg hover:bg-blue-50 transition duration-300 hover:scale-105"
						>
							Get In Touch
						</Link>
						<Link
							href="/Mission"
							className="inline-block rounded-full border-2 border-white text-white font-semibold px-10 py-3 hover:bg-white/10 transition duration-300 hover:scale-105"
						>
							Explore Our Mission
						</Link>
					</div>
				</motion.div>
			</section>
		</>
	);
}
