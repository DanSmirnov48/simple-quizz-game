interface QuizQuestion {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
}

function shuffle(array: any[]) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const quizQuestions: QuizQuestion[] = shuffle([
    {
        id: 1,
        question: 'What is the capital of France?',
        answers: shuffle(['London', 'Berlin', 'Paris', 'Madrid']),
        correctAnswer: 'Paris',
    },
    {
        id: 2,
        question: 'Which planet is known as the Red Planet?',
        answers: shuffle(['Mars', 'Venus', 'Jupiter', 'Saturn']),
        correctAnswer: 'Mars',
    },
    {
        id: 3,
        question: 'What is the largest mammal in the world?',
        answers: shuffle(['Elephant', 'Giraffe', 'Blue Whale', 'Dolphin']),
        correctAnswer: 'Blue Whale',
    },
    {
        id: 4,
        question: 'What is the chemical symbol for gold?',
        answers: shuffle(['Go', 'Ge', 'Au', 'Ag']),
        correctAnswer: 'Au',
    },
    {
        id: 5,
        question: 'Which gas do plants absorb from the atmosphere?',
        answers: shuffle(['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen']),
        correctAnswer: 'Carbon Dioxide',
    },
    {
        id: 6,
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: shuffle(['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Leo Tolstoy']),
        correctAnswer: 'William Shakespeare',
    },
]);

export default quizQuestions;
