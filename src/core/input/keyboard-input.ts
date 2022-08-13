import { Key } from "./key.js";

/**
 * INPUT: This system its not controlled by the game
 */
export class Keyboard {
    private static keysPressed: Key[] = [];
    private static lastKey: Key;

    public static isPressed(key: Key): boolean {
        return this.keysPressed.includes(key);
    }

    public static justPressed(key: Key): boolean {
        const nPressed = this.keysPressed.filter((k) => k === key).length;
        return nPressed < 2 && nPressed > 0 && this.lastKey === key;
    }

    private static getKey(strKey: string): Key {
        if (strKey === " ") return Key.SPACE;
        return Key[`${strKey.toUpperCase()}` as keyof typeof Key];
    }

    public static listen() {
        window.addEventListener("keydown", (e) => {
            const key = this.getKey(e.key);
            this.keysPressed.push(key);
            this.lastKey = key;
        });
        window.addEventListener("keyup", (e) => {
            this.keysPressed = this.keysPressed.filter(
                (key) => key !== this.getKey(e.key)
            );
        });
    }

    public static stop() {
        window.removeEventListener("keydown", (_) => {
            this.keysPressed.splice(0);
        });
        window.removeEventListener("keyup", (_) => {
            this.keysPressed.splice(0);
        });
    }
}
