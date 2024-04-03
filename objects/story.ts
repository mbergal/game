import { Vector } from "../geometry"
import * as random from "../utils/random"
import * as GameObject from "./object"
import * as StorySize from "./story_size"
export { Size } from "./story_size"

export const type = "story"
export interface t {
    type: typeof type
    position: Vector.t
    size: StorySize.Size
    impact: number
    zIndex: number
    name: string
    open: boolean
}

export interface Story extends t {}

export function isStory(obj: GameObject.GameObject): obj is Story {
    return obj.type === type
}

export function make(position: Vector.t, size: StorySize.Size): Story {
    return {
        type: type,
        position: position,
        size: size,
        zIndex: 1,
        impact: 1,
        open: false,
        name: random.choice(storyNames[size]),
    }
}

const storyNames: Record<StorySize.Size, string[]> = {
    medium: [
        "Implement Dark Mode for Night Owls",
        "Refactor 'Frankencode' Module",
        "Add Emoji Support for Error Messages",
        "Address Complaints About Clashing Color Scheme",
        "Clarify the Meaning of 'Technical Debt'",
        "Reduce Loading Time for Image-heavy Pages",
        "Streamline Checkout Process for Mobile Users",
        "Update Third-party Libraries to Latest Versions",
        "Resolve Issue with Form Submission Error Handling",
        "Integrate Social Media Sharing Buttons",
    ],
    small: [
        "Option to Change Font Size",
        "Fix Typo in Terms of Service Link",
        "Update README with Installation Instructions",
        "Add Loading Spinner for AJAX Requests",
        "Remove Deprecated Function Calls",
        "Increase Character Limit for Comments",
        "Adjust Button Placement for Accessibility",
        "Minify CSS and JavaScript Files",
        "Implement CSRF Protection on Forms",
        "Resolve Issue with Broken Image Links",
    ],
    large: [
        "Revamp User Interface for Modern Look and Feel",
        "Rewrite Monolithic Codebase into Microservices",
        "Implement Machine Learning Algorithm for Recommendations",
        "Redesign Navigation Structure for Improved Usability",
        "Create Comprehensive Developer Guide",
        "Conduct Full Accessibility Audit and Remediation",
        "Implement Caching Strategy for Scalability",
        "Migrate to OAuth2 for Enhanced Authentication",
        "Transition to Cloud-based Hosting Environment",
        "Integrate Multi-language Support Across Platform",
    ],
}
