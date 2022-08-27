export class Debug {
    private static readonly debugEl = document.querySelector("#debug");

    /*
        DEBUG METHODS
    */

    public static clear() {
        Debug.debugEl.innerHTML = "";
    }

    public static write(msg: string) {
        Debug.debugEl.innerHTML += msg;
    }

    public static writeLine(msg: string) {
        Debug.debugEl.innerHTML += `${msg}<br />`;
    }
}