<script>
	export let skill
</script>

<div>
	<div class="skill-level">
		{#each Array(5) as _, i (i)}
			<span class="dot {i < skill.level ? 'filled' : 'empty'}" />
		{/each}
	</div>
</div>

<style lang="scss">
	.skill-level {
		display: flex;
		align-items: center;
		margin: 0.5rem 0;

		.dot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 4px;

			&.filled {
				background-color: black;
			}

			&.empty {
				background-color: #ccc;
			}
		}
	}
</style>
