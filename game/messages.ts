import { Story } from "../objects/object"
import { Message } from "./message"

export const startedStory = (size: Story.Size): Message => ({
    text: `You started on ${Story.toString(size)} ${stories[size]}`,
    ttl: 100,
})

const stories: Record<Story.Size, string> = {
    [Story.Size.small]:
        "Bug Fix: Paperclip Panic\nResolve the issue where the 'undo' function mistakenly deletes the user's last paperclip click",
    [Story.Size.medium]:
        'Meeting Madness Expansion (Feature Development): Develop a new module that automatically schedules meetings based on employee availability, ensuring maximum "meeting madness" efficiency',
    [Story.Size
        .large]: `"Corporate Culture Overhaul" (Major Feature Development): Implement a comprehensive initiative to revamp the company's culture, including mandatory 'fun' activities and a rewards program for using the most corporate buzzwords.`,
}
