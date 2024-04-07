export function render(chars: string[][]) {
    const contentBlock = document.getElementById("content")
    const newInnerHTML = chars.map((x) => x.join("")).join("\n")
    if (contentBlock!.innerHTML != newInnerHTML) {
        contentBlock!.innerHTML = newInnerHTML
    }
}

export const size = { x: 80, y: 27 }
