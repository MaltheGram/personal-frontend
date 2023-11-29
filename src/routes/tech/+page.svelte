<script>
	import LevelDot from "$lib/components/LevelDot.svelte"

	export let data

	const skills = data.skills

	const sortSkillsByType = skills => {
		return skills.sort((a, b) => {
			const typeA = a.type.toLowerCase()
			const typeB = b.type.toLowerCase()

			if (typeA < typeB) return -1
			if (typeA > typeB) return 1
			return 0
		})
	}
	let project = {}

	const getProjectDataBySkill = async skillId => {
		const response = await fetch(
			`http://localhost:8080/api/projects/skill/${skillId}`
		)
		console.log(response)
		if (response.ok) {
			const data = await response.json()
			project = data.Data
		} else {
			console.error("Failed to fetch projects", response.status)
		}
	}
</script>

<div class="grid-container">
	{#each sortSkillsByType(skills) as skill}
		<div class="skill-card">
			<div class="card-inner">
				<div
					class="card-front"
					on:mouseenter={() => getProjectDataBySkill(skill._id)}
					role="button"
					tabindex="0"
				>
					<img src={skill.logo} alt={skill.name} />
					<h2>{skill.name}</h2>
					<p>{skill.type}</p>
					<LevelDot {skill} />
				</div>
				<div class="card-back">
					{#if project[0]}
						<span>This technology is used in the following projects:</span>
						<ul>
							<li>
								Github:
								<a href={project[0]?.url} target="_blank">{project[0]?.name}</a>
							</li>
							<li>
								Website:
								<a href="/projects/{project[0]?.name}">{project[0]?.name}</a>
							</li>
						</ul>
					{:else}
						<span>Sorry, I have no avaliable projects to show off.</span>
					{/if}
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

	.skill-card {
		perspective: 1000px;
		height: 300px; // Adjust as necessary
		// Prevent any layout shift during the animation
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
		overflow: hidden;
		backface-visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		padding: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		border: 1px solid transparent;
	}

	.card-front {
		background-color: #f9f9f9;
		border: 1px solid #ccc;
	}

	.card-back {
		background-color: #ddf;
		border: 1px solid #ccc;
		transform: rotateY(180deg);
	}

	.skill-card:hover .card-inner {
		transform: rotateY(180deg);
	}

	img {
		max-width: 100%;
		max-height: 50%;
		height: auto;
		border-radius: 4px;
		margin-bottom: 8px;
	}

	h2 {
		margin: 0.5em 0;
	}

	p {
		margin-bottom: 12px;
	}
</style>
