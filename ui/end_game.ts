import { Windows, TextWindow } from "@/ui"

export class Window extends TextWindow.TextWindow {
    constructor(title: string, money: number, description: string) {
        super(
            [
                `${title}`,
                "",
                `You are out of your job :(. Hopefully $${money} will`,
                "last till you find the new one.",
                "",
                `This is not going to be easy for a ${description}`,
            ].join("\n"),
        )
    }
}
