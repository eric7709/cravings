export function playCustomBeep({
  frequency = 1000,
  duration = 0.2,
  type = "sine" as OscillatorType, 
  volume = 0.1,
} = {}) {
  try {
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
    oscillator.onended = () => {
      audioCtx.close();
    };
  } catch (error) {
    console.error("Beep not supported", error);
  }
}
