<script>
	export let data
	const projects = data.projects
</script>

<div class="grid-container">
	{#each projects as project, index (project._id)}
		<div class="project-card" key={project._id}>
			<div class="card-inner">
				<div class="card-front">
					<h2>{project.name}</h2>
					<p>
						{project.description.length > 100
							? project.description.slice(0, 100) + "..."
							: project.description}
					</p>
					<div>
						<ul class="skills">
							<span>Technologies used</span>
							{#each project.skills as skill}
								<li>{skill.name}</li>
							{/each}
						</ul>
					</div>
				</div>
				<div class="card-back">
					<h2>{project.name}</h2>
					<p>{project.description}</p>
					<a href={project.url} target="_blank">View on GitHub</a>
					<a href="/projects/{project.name}">More about {project.name}</a>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 3.5em;
		padding: 2.2rem;
	}

	.project-card {
		perspective: 1000px;
		height: 300px; // Adjust based on your content
		margin: 0;
		box-sizing: border-box;
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		box-sizing: border-box;
	}

	.card-front,
	.card-back {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		padding: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
	}

	.card-front {
		background-color: #f9f9f9;
		border: 1px solid #ccc;

		.skills {
			text-align: left;
			padding: 0;
			margin: 1rem 0;
			list-style: none;

			span {
				font-weight: bold;
				display: block;
				margin-bottom: 0.5rem;
			}

			li {
				background-color: #8a8a8a;
				padding: 0.5rem 1rem;
				border-radius: 4px;

				&:nth-child(odd) {
					background-color: #f0f0f0;
				}
			}
		}
	}

	.card-back {
		background-color: #ddf;
		border: 1px solid #ccc;
		transform: rotateY(180deg);
	}

	.project-card:hover .card-inner {
		transform: rotateY(180deg);
	}

	img {
		max-width: 100%;
		max-height: 50%;
		height: auto;
		border-radius: 4px;
		margin-bottom: 8px;
	}

	h2,
	p {
		margin: 0.5em 0;
	}

	a {
		color: #0066cc;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
</style>
