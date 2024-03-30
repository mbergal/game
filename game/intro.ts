import { Windows, TextWindow } from "@/ui"

export class Window extends TextWindow.TextWindow {
    constructor() {
        super(
            [
                "        REQUIEM FOR A PROGRAMMER.",
                "                                   ",
                "       You ('*') are in Agile hell.",
                "Earn enough money and get out (if you can)!",
                "",
                "Keys",
                "----",
                "",
                "Move - arrows",
                "Drop item - space",
                "Use item - enter",
                "Stop - end",
            ].join("\n"),
        )

        this.onKeyPress((window, event) => {
            Windows.hide(window)
        })
    }
}
