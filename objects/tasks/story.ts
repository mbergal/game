import config from "@/game/config"
import { Effect, Effects } from "@/game"
import { Commit, Player, Story as StoryObject } from "@/objects"

export interface Story {
    type: "story"
    story: StoryObject.Story
    impact: number
    neededCommits: number
    appliedCommits: number
}

export function make(story: StoryObject.Story): Story {
    return {
        type: "story",
        story: story,
        impact: config.story[story.size].impact,
        neededCommits: config.story[story.size].neededCommits,
        appliedCommits: 0,
    }
}

export function addCommit(
    player: Player.Player,
    task: Story,
    commit: Commit.Commit, // eslint-disable-line @typescript-eslint/no-unused-vars
    effects: Effect.Effect[],
) {
    task.appliedCommits += 1
    if (task.appliedCommits == task.neededCommits) {
        Effects.append(effects, Effect.addImpact(task.impact))
        Effects.append(effects, Effect.showMessage(`Finished ${task.story.name}`, 3_000))
        player.task = null
    }
    return effects
}
