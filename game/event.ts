import * as Story from "../objects/story"
import * as DayOfWeek from "./day_of_week"

type GameStarted = {
    type: "gameStarted"
}

type GameEnded = {
    type: "gameStarted"
}

type DayStarted = {
    day: number
    dayOfWeek: DayOfWeek.t
}

type SprintStart = {
    type: "sprintStart"
}

type SprintEnd = {
    type: "sprintEnd"
}

type GroomBacklogStart = {
    type: "groomBacklogStart"
}

type CreateBacklogIssue = { type: "createBacklogIssue"; size: Story.Size }

type GroomBacklogEnd = {
    type: "groomBacklogEnd"
}

type SprintDayStart = {
    type: "sprintDayStart"
    day: number
}

type SprintDayEnd = {
    type: "sprintDayEnd"
    day: number
}

type WeekendStart = {
    type: "weekendStart"
}
type WeekendEnd = {
    type: "weekendEnd"
}

export type t =
    | SprintStart
    | SprintEnd
    | WeekendEnd
    | WeekendStart
    | GroomBacklogStart
    | GroomBacklogEnd
    | SprintDayStart
    | SprintDayEnd
    | CreateBacklogIssue

export type Event = t
