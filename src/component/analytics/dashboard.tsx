import { useEffect, useState } from 'react';
import { careerPaths, scoring } from '../../data/Updated MVP Scoring System.json';
import { calculateDynamicScores } from '../../utils/common';
import { Scoring } from '../../interface/option';

interface Data {
    education: string;
    experience: string;
    current_field: string;
    comparison_pairs: {
        [key: string]: string;
    };
}

interface Scores {
    [role: string]: number;
}

// Helper function to calculate the total number of questions
const getTotalQuestions = (scoring: Scoring): number => {
    return Object.keys(scoring).reduce((total, key) => {
        if (key === 'comparison_pairs') {
            return total + Object.keys(scoring[key]).length;
        }
        return total + 1;
    }, 0);
};

// Helper function to calculate scores
const calculateScores = (data: Data, setScores: React.Dispatch<React.SetStateAction<Scores>>, scoring: Scoring) => {
    const result = calculateDynamicScores(data, careerPaths, scoring);

    const totalCareerPaths = careerPaths.length;
    const totalQuestions = getTotalQuestions(scoring);
    const total = totalQuestions * totalCareerPaths;

    Object.keys(result).forEach((key) => {
        const newValue = (result[key] / total) * 100;
        setScores((prevScores) => ({
            ...prevScores,
            [key]: parseFloat(newValue.toFixed(0)),
        }));
    });
};

const JobScoreAnalysis: React.FC<{ data: Data }> = ({ data }) => {
    const [scores, setScores] = useState<Scores>({});

    useEffect(() => {
        calculateScores(data, setScores, scoring as unknown as Scoring);
    }, [data]);

    const topRoles = () => {
        return Object.entries(scores)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .slice(0, 3)
            .map(([role, score]) => ({ role, score }));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Personalized Career Report</h2>
            <p className="text-xl mb-2">Your Top 3 Career Matches</p>
            <ul className="list-disc pl-5">
                {topRoles().map(({ role, score }) => (
                    <li key={role} className="text-lg">
                        <span className="font-semibold">{role.toUpperCase()}:</span> {score}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobScoreAnalysis;
