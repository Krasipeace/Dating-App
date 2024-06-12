import GifHandler from "@/components/GifHandler";

export default function Home() {
	return (
		<div>
			<div className="flex justify-center">
				<h1 className="homePageTitle bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 inline-block text-transparent bg-clip-text">Welcome to HeartBound</h1>
			</div>
			{/* <GifHandler gifUrl="/assets/HeartBound.gif" altText="image" /> */}
		</div>
	);
}
