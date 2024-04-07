import { Windows, TextWindow } from "@/ui"

export class Window extends TextWindow.TextWindow {
    constructor(title: string, money: number, description: string) {
        super(
            [
                `        ${title}       `,
                "",
                `You are out of you job :(. Hopefully ${money} will be last enough`,
                "till you find the new job.",
                "",
                `This is not going to be easy for a ${description}`,
            ].join("\n"),
        )
    }
}
