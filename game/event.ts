import { Story } from "@/objects"
import * as DayOfWeek from "./day_of_week"

export namespace Event {
    type GameStarted = {
        type: "gameStarted"
    }

    type GameEnded = {
        type: "gameEnded"
    }

    type DayStarted = {
        type: "dayStarted"
        day: number
        dayOfWeek: DayOfWeek.DayOfWeek
    }

    type PerformanceReview = {
        type: "performanceReview"
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
        sprintDay: number
        sprintDaysLeft: number
        day: number
        dayOfWeek: DayOfWeek.DayOfWeek
    }

    type SprintDayEnd = {
        type: "sprintDayEnd"
        sprintDay: number
        sprintDaysLeft: number
    }

    type WeekendStart = {
        type: "weekendStart"
    }
    type WeekendEnd = {
        type: "weekendEnd"
    }

    type CollapseStart = {
        type: "collapseStart"
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
        | GameStarted
        | GameEnded
        | DayStarted
        | CollapseStart
        | PerformanceReview

    export type Event = t
}
