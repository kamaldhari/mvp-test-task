export interface CareerPath {
    id: string;
    en: string;
    et: string;
    ru: string;
    fields: {
        en: string;
        et: string;
        ru: string;
    }[];
}

export interface Data {
    education?: string;
    experience?: string;
    current_field?: string;
    comparison_pairs?: {
        [key: string]: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
type ComparisonPairs = { [comparison: string]: { [choice: string]: { [role: string]: number; }; }; };

export interface Scoring {
    [field: string]: {
        [value: string]: {
            [role: string]: number;
        };
    };
    comparison_pairs?: ComparisonPairs;
}

export interface Result {
    [careerId: string]: number;
}
