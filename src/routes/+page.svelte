<script>
	import { Timeline, TimelineItem, Modal, Button } from "flowbite-svelte"
	import { onMount } from "svelte"
	import NextSection from "$lib/components/NextSection.svelte"

	export let data
	let modal = false
	const experiences = data.experiences

	const profilePicture =
		"https://www.svgrepo.com/show/512721/profile-minus-1350.svg"

	let catchyText = ""
	let isAlternateText = false

	const catchyTextOnOff = () => {
		let text = isAlternateText ? "My name is Malthe" : "Hello World!"
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
	<p class="gradient">{catchyText}</p>
</div>

<div>
	<section class="bg-gray-400 section">
		<div class="mt-10">
			<NextSection nextSectionId={"section2"} title="My journey in Tech" />
			<Timeline order="vertical">
				{#each experiences as experience}
					<TimelineItem
						title={experience.company || experience.school
							? experience.title +
								" @ " +
								(experience.company || experience.school)
							: experience.title}
						date={`${experience.startDate} - ${experience.endDate}`}
					>
						<div>
							{experience.description}
						</div>
						{#if experience.associatedSkills.length > 0}
							<div class="flex flex-col sm:flex-row items-center gap-x-2 mt-2">
								<svg
									class="w-8 h-12 sm:w-8 sm:h-12"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5 19V6.2C5 5.08 5 4.52 5.218 4.092C5.41 3.716 5.716 3.41 6.092 3.218C6.52 3 7.08 3 8.2 3H15.8C16.92 3 17.48 3 17.908 3.218C18.284 3.41 18.59 3.716 18.782 4.092C19 4.52 19 5.08 19 6.2V17H7C5.895 17 5 17.895 5 19ZM5 19C5 20.105 5.895 21 7 21H19M18 17V21M14.5 8V7.917C14.5 6.858 13.642 6 12.583 6H11.5C10.395 6 9.5 6.895 9.5 8C9.5 9.105 10.395 10 11.5 10H12.5C13.605 10 14.5 10.895 14.5 12C14.5 13.105 13.605 14 12.5 14H11.458C10.377 14 9.5 13.123 9.5 12.042V12"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
									/>
								</svg>
								{#each experience.associatedSkills.slice(0, 3) as skill}
									<a class="capitalize" href="/skills#{skill.name}"
										>{skill.name}</a
									>
								{/each}
								{#if experience.associatedSkills.length > 3}
									<Button
										class="bg-inherit p-2 ml-1 text-black hover:bg-gray-200 hover:scale-110 transition-all duration-300 ease-in-out"
										pill="true"
										on:click={() => (modal = true)}
										>More...
									</Button>
									<Modal
										title="Skills Associated with {experience.title} @ {experience.company ||
											experience.school} "
										bind:open={modal}
										autoclose
										outsideclose
									>
										{#each experience.associatedSkills as skill}
											<a
												class="capitalize mr-2
												"
												href="/skills#{skill.name}">{skill.name}</a
											>
										{/each}
										<svelte:fragment slot="footer">
											<Button on:click={() => (modal = !modal)}>Close</Button>
										</svelte:fragment>
									</Modal>
								{/if}
							</div>
						{/if}
					</TimelineItem>
				{/each}
			</Timeline>
		</div>
	</section>
	<!-- 	<section class="bg-gray-400 section">
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
	</section> -->
</div>

<style lang="scss">
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;

		.gradient {
			background: linear-gradient(
				90deg,
				rgb(18, 255, 22),
				rgb(50, 142, 116),
				rgb(72, 0, 255)
			);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

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
