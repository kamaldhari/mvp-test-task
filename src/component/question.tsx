import { Button } from 'antd';
import React from 'react';

const Question: React.FC<{
    id: string;
    question: string;
    answers: string[];
    handleNext: (id: string, answer: string) => void;
    visible: boolean;
    step: number;
}> = ({ id, question, answers, handleNext, visible, step }) => {
    if (!visible) return null;
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{step}. {question}</h2>
            <ol>
                {answers.map((answer) => (
                    <Button
                        key={answer}
                        onClick={() => handleNext(id, answer)}
                        className="mr-2 mb-2"
                    >
                        {answer}
                    </Button>
                ))}
            </ol>
        </div >
    );
};

export default Question;
