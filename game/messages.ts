import { Item } from "../objects/object"
import * as Story from "../objects/story"
import * as StorySize from "../objects/story_size"

import { Message } from "./message"

export const startedStory = (story: Story.t): Message => ({
    text: `You started on ${StorySize.toString(story.size)} ${story.name}`,
    ttl: 100,
})

export const itemDropped = (item: Item) => ({
    text: `You droppped on ${item.type}`,
    ttl: 5,
})
