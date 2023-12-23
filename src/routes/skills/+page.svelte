<script>
	import LevelDot from "$lib/components/LevelDot.svelte"
	import { Card } from "flowbite-svelte"

	export let data

	const skills = data.skills
	let numberOfSkillTypes = new Set()
	skills.forEach(skill => numberOfSkillTypes.add(skill.type))

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
		const response = await fetch(`api/projects/skill/${skillId}`)
		if (response.ok) {
			const data = await response.json()
			project = data
		} else {
			console.error("Failed to fetch projects", response.status)
		}
	}
</script>

<div class="grid grid-cols-1 gap-4">
	{#each numberOfSkillTypes as type}
		<div class="text-center">
			<h1 id={type}>{type}</h1>
			{#each skills as skill}
				{#if skill.type === type}
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
									<span>This technology is used in the following projects:</span
									>
									<ul>
										<li>
											Github:
											<a href={project[0]?.url} target="_blank"
												>{project[0]?.name}</a
											>
										</li>
										<li>
											Website:
											<a href="/projects/{project[0]?.name}"
												>{project[0]?.name}</a
											>
										</li>
									</ul>
								{:else}
									<span>Sorry, I have no avaliable projects to show off.</span>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<!-- <div class="grid-container">
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
</div> -->

<style lang="scss">
	.skill-card {
		height: 10rem;
		margin: 2.2em 0 0 0;
		box-sizing: border-box;
		&:last-child {
			margin-bottom: 50px;
		}
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		box-sizing: border-box;
		a {
			color: blue;
			text-decoration: underline;
		}
	}

	.card-front,
	.card-back {
		margin: 5px 0 0 0;
		position: absolute;
		top: 0;
		left: 25%;
		width: 50%;
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
		padding: 10px;
	}

	h2 {
		margin: 0.5em 0;
	}

	p {
		margin-bottom: 12px;
	}
</style>
