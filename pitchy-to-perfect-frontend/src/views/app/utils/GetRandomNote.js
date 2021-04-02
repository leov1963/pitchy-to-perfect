const myNotes = [
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4"
];

// let randomNote = myNotes[Math.floor(Math.random()*myNotes.length)];
// let randomNote2 = myNotes[Math.floor(Math.random()*myNotes.length)];

const GetRandomNote = () => {
    console.log("Random note check")
    let randomNote = myNotes[Math.floor(Math.random()*myNotes.length)];
    return randomNote
}

export default GetRandomNote;