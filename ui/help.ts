import { Windows, TextWindow } from "@/ui"

export class Window extends TextWindow.TextWindow {
    constructor() {
        super(
            [
                "        HELP.",
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
