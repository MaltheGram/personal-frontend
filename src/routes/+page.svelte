<script>
	import { onMount } from "svelte"
	const profilePicture =
		"https://www.svgrepo.com/show/512721/profile-minus-1350.svg"
	const notDesktop = true

	let catchyText = ""
	let isAlternateText = false

	const catchyTextOnOff = () => {
		let text = isAlternateText ? "I am Malthe!" : "Hello world!"
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
</style>
