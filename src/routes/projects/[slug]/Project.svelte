<script>
	export let project

	import LevelDot from "$lib/components/LevelDot.svelte"
</script>

<!-- <div class="project-container">
	<div class="content">
		<h1 class="project-title">{project?.name}</h1>
		<p class="project-description">{project?.description}</p>

		{#if project?.url}
			<a
				href={project?.url}
				class="project-url"
				target="_blank"
				rel="noopener noreferrer">Visit source code</a
			>
		{/if}
		<div class="project-skills">
			<h2>Technologies Used</h2>
			<ul class="skills-list">
				{#each project?.skills as skill}
					<li class="skill-item">
						<span class="skill-name">
							<a href="/skills">{skill.name}</a>
						</span>
						<LevelDot {skill} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div> -->
<h1>TODO: Figure if I want this</h1>

<style lang="scss">
	.project-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		width: 100vw;
		padding: 5vh 5vw;
		box-sizing: border-box;
		// background-color: #f5f5f5; // Light background for the container

		.content {
			max-width: 960px; // Maximum width of the content
			margin: auto;
			padding: 2rem;
			background: #fff;
			border-radius: 8px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			text-align: center;
		}

		.project-title {
			font-size: 2.5rem;
			color: #333;
			margin-bottom: 1rem;
		}

		.project-description {
			font-size: 1.25rem;
			color: #666;
			margin-bottom: 2rem;
		}

		.project-url {
			font-size: 1.25rem;
			color: #007bff;
			text-decoration: none;
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 4px;
			background-color: #007bff;
			color: white;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: #0056b3;
			}
		}

		.project-skills {
			margin-top: 3rem;

			h2 {
				font-size: 1.5rem;
				color: #333;
			}

			.skills-list {
				list-style: none;
				padding: 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				gap: 1rem;

				.skill-item {
					background: #e9ecef;
					border-radius: 16px;
					padding: 0.5rem 1rem;

					.skill-name {
						margin-right: 10px;
						font-weight: bold;

						a {
							color: #333;
							text-decoration: none;

							&:hover {
								text-decoration: underline;
							}
						}
					}
				}
			}
		}
	}
</style>
