import { CareerPath, Data, Result, Scoring } from "../interface/option";

const getScoresForField = (scoring: Scoring, field: string, value: string | undefined): { [role: string]: number } => {
    return value ? scoring[field]?.[value] || {} : {};
};

const updateResultWithComparisonScores = (result: Result, comparisonScores: Record<string, number>, role: string) => {
    if (result[role] !== undefined) {
        result[role] += comparisonScores[role];
    }
};

const handleComparisonPairs = (data: Data, scoring: Scoring, result: Result) => {
    if (data.comparison_pairs) {
        for (const comparison in data.comparison_pairs) {
            const choice = data.comparison_pairs[comparison];
            const comparisonScores = scoring.comparison_pairs?.[comparison]?.[choice] || {};
            for (const role in comparisonScores) {
                updateResultWithComparisonScores(result, comparisonScores, role);
            }
        }
    }
};

const handleFieldScores = (data: Data, scoring: Scoring, result: Result, field: string) => {
    const fieldValue = data[field];
    const fieldScores = getScoresForField(scoring, field, fieldValue);

    for (const role in fieldScores) {
        updateResultWithComparisonScores(result, fieldScores, role);
    }
};

export const calculateDynamicScores = (data: Data, careerPaths: CareerPath[], scoring: Scoring): Result => {
    const result: Result = {};

    careerPaths.forEach(career => {
        result[career.id] = 0;
    });

    handleComparisonPairs(data, scoring, result);

    for (const field in data) {
        if (field !== 'comparison_pairs') {
            handleFieldScores(data, scoring, result, field);
        }
    }

    return result;
};

