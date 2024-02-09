<script>
	import { Timeline, TimelineItem } from "flowbite-svelte"
	import { onMount } from "svelte"
	import NextSection from "$lib/components/NextSection.svelte"
	const profilePicture =
		"https://www.svgrepo.com/show/512721/profile-minus-1350.svg"

	let catchyText = ""
	let isAlternateText = false

	const catchyTextOnOff = () => {
		let text = isAlternateText ? "I am Malthe!" : "Hello World!"
		let index = 0
		const interval = setInterval(() => {
			if (index < text.length) {
				catchyText += text[index++]
			} else {
				catchyText = catchyText.slice(0, -1)
				if (catchyText === "") {
					index = 0 // Reset index when the text is fully deleted
					clearInterval(interval) // Clear the interval
					isAlternateText = !isAlternateText // Toggle the flag
					catchyTextOnOff() // Call the function again
				}
			}
		}, 235)
	}

	onMount(() => {
		catchyTextOnOff()
	})
</script>

<div class="main">
	<img src={profilePicture} alt="profile_picture" />
	<p>{catchyText}</p>
</div>

<div>
	<section class="bg-gray-400 section">
		<div class="mt-10">
			<NextSection nextSectionId={"section2"} title="My journey in Tech" />
			<Timeline order="vertical">
				<TimelineItem
					title="Computer Science AP  @ KEA - Copenhagen School of Design and Technology"
					date="Februray 2021 - June 2023"
					><span>
						I began my journey at <a target="_blank" href="https://www.kea.dk/"
							>KEA - Copenhagen School of Design and Technology.</a
						>
					</span>
				</TimelineItem>
				<TimelineItem
					title="Web Development @ Bonnier Publications"
					date="Februray 2022 - January 2023"
					><span>
						I began as a part time web deveoper at <a
							target="_blank"
							href="https://www.bonnierpublications.com/"
							>Bonnier Publications</a
						>
					</span>
				</TimelineItem>
				<TimelineItem
					title="Internship @ Nets A/S"
					date="January 2023 - April 2023"
				>
					<span>
						I started my internship at <a
							target="_blank"
							href="https://www.nets.eu/dk-da">Nets</a
						> where I worked on a test automation system alongside my colleague.
					</span>
				</TimelineItem>
				<TimelineItem>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
					odit voluptates odio, aut numquam dolorem aliquam officiis enim
					quisquam earum rerum inventore quo repudiandae quas doloribus tenetur
					soluta possimus similique. Animi eligendi laborum perspiciatis sed
					quod neque rerum delectus saepe ratione, itaque cupiditate soluta,
					doloribus deleniti voluptas natus! Suscipit repudiandae quos vitae a
					alias eveniet, quod dolore optio unde error.
				</TimelineItem>
				<TimelineItem
					>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum vero
					veniam eos libero porro dolorem quidem dignissimos molestiae nostrum
					voluptate nemo sed, provident aspernatur adipisci magnam aliquid,
					itaque accusamus ipsa!</TimelineItem
				>
				<TimelineItem
					>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus,
					modi distinctio? Laborum nesciunt perferendis, atque architecto
					aliquam placeat aut provident consectetur omnis. Debitis adipisci
					veritatis, voluptas nam praesentium dolores aspernatur?</TimelineItem
				>
				<TimelineItem
					>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
					temporibus error consequatur omnis ad velit quo corporis rerum, at
					nostrum, eos quidem minima sunt rem sint tempora iusto inventore
					aliquid.</TimelineItem
				>
				<TimelineItem
					>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
					temporibus error consequatur omnis ad velit quo corporis rerum, at
					nostrum, eos quidem minima sunt rem sint tempora iusto inventore
					aliquid.</TimelineItem
				>
			</Timeline>
		</div>
	</section>
	<section class="bg-gray-400 section">
		<div class="mt-10">
			<NextSection title="section2" />
			<Timeline order="vertical">
				<TimelineItem
					>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
					adipisci sequi temporibus iste! Placeat possimus quo rerum sequi non
					cum ullam dolore neque dolorum! Doloribus illum eveniet sapiente
					architecto voluptas.</TimelineItem
				>
			</Timeline>
		</div>
	</section>
</div>

<style lang="scss">
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;

		img {
			width: 100px;
			height: 100px;
		}

		p {
			position: absolute;
			margin-top: 15rem;
			font-size: 2rem;
		}
	}
	.section {
		min-height: 100vh;
		display: flex;
		justify-content: center;

		div {
			max-width: 50%;

			a {
				&:hover {
					text-decoration: underline;
					color: #595959;
				}
				&:active {
					color: #4a4a4a;
				}
			}
		}

		&:nth-child(odd) {
			background-color: #ecf0f1;
		}
	}
</style>
