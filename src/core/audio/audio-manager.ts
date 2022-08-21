export class AudioManager {
    private static audiosList: HTMLDivElement =
        document.querySelector("#audios");

    private static findAudio(name: string): HTMLAudioElement | null {
        for (const element of Array.from(AudioManager.audiosList.children)) {
            const htmlAudio = element as HTMLAudioElement;
            if (htmlAudio.id === name) {
                return htmlAudio;
            }
        }
        return null;
    }

    public static load(
        src: string,
        name: string,
        loop: boolean = false,
        volume: number = 1,
        speed: number = 1
    ) {
        const htmlAudio: HTMLAudioElement = new Audio(src);
        htmlAudio.loop = loop;
        htmlAudio.volume = volume;
        htmlAudio.id = name;
        htmlAudio.playbackRate = speed;
        AudioManager.audiosList.appendChild(htmlAudio);
    }

    public static play(name: string) {
        const audio = AudioManager.findAudio(name);
        if (!audio) return;

        audio.play();
    }

    public static pause(name: string) {
        const audio = AudioManager.findAudio(name);
        if (!audio) return;

        audio.pause();
    }
}
