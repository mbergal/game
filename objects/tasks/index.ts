import { NullTask } from "./null"
import * as StoryTask from "./story"
export * as StoryTask from "./story"

export type Task = StoryTask.Story | NullTask
