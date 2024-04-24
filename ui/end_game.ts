import { Windows, TextWindow } from "@/ui"
import { Format } from "@/utils"

export class Window extends TextWindow.TextWindow {
    constructor(title: string, money: number, description: string) {
        super(
            TextWindow.centerText(
                [
                    `${title}`,
                    "",
                    `You are out of your job :(. Hopefully ${Format.currency(money)} will`,
                    "last till you find the new one.",
                    "",
                    `This is not going to be easy for a ${description}`,
                ].join("\n"),
            ),
        )
    }
}
