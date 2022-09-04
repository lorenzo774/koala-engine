"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioManager = void 0;
class AudioManager {
    static audiosList = document.querySelector("#audios");
    static findAudio(name) {
        for (const element of Array.from(AudioManager.audiosList.children)) {
            const htmlAudio = element;
            if (htmlAudio.id === name) {
                return htmlAudio;
            }
        }
        return null;
    }
    static load(src, name, loop = false, volume = 1, speed = 1) {
        const htmlAudio = new Audio(src);
        htmlAudio.loop = loop;
        htmlAudio.volume = volume;
        htmlAudio.id = name;
        htmlAudio.playbackRate = speed;
        AudioManager.audiosList.appendChild(htmlAudio);
    }
    static play(name) {
        const audio = AudioManager.findAudio(name);
        if (!audio)
            return;
        audio.play();
    }
    static pause(name) {
        const audio = AudioManager.findAudio(name);
        if (!audio)
            return;
        audio.pause();
    }
}
exports.AudioManager = AudioManager;
