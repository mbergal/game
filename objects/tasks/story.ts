import config from "../../game/config"
import * as Effect from "../../game/effect"
import * as Effects from "../../game/effects"
import * as Commit from "../../objects/commit"
import * as Player from "../../objects/player"
import * as Story from "../story"

export interface t {
    type: "story"
    story: Story.t
    impact: number
    neededCommits: number
    appliedCommits: number
}

export interface StoryTask extends t {}

export function make(story: Story.t): t {
    return {
        type: "story",
        story: story,
        impact: config.story[story.size].impact,
        neededCommits: config.story[story.size].neededCommits,
        appliedCommits: 0,
    }
}

export function addCommit(player: Player.Player, task: t, commit: Commit.t): Effects.t {
    const effects: Effects.t = []
    task.appliedCommits += 1
    if (task.appliedCommits == task.neededCommits) {
        Effects.append(effects, Effect.addImpact(task.impact))
        Effects.append(effects, Effect.showMessage(`Finished ${task.story.name}`, 30))
        player.task = null
    }
    return effects
}
