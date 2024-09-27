import React, { useState } from 'react';

interface PairOption {
    id: string;
    a: string;
    b: string;
}

const CheckboxGroup: React.FC<{
    question: string;
    pairs: PairOption[];
    onSelect: (selected: Record<string, string>) => void;
    visible: boolean;
    step: number;
}> = ({ question, pairs, onSelect, visible, step }) => {
    const [selected, setSelected] = useState<Record<string, string>>({});

    if (!visible) return null;

    const toggleOption = (pairId: string, option: string) => {
        const newSelected = { ...selected, [pairId]: option };
        setSelected(newSelected);
        onSelect(newSelected);
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{step}. {question}</h2>
            {pairs.map((pair, index) => (
                <div key={pair.id} className="p-4 bg-gray-100 rounded-lg shadow">
                    <p className="mb-2">{index + 1}. {pair.a} vs {pair.b}</p>
                    <label className="block py-2">
                        <input
                            type="checkbox"
                            checked={selected[pair.id] === 'a'}
                            onChange={() => toggleOption(pair.id, 'a')}
                            className="mr-2"
                        />
                        {pair.a}
                    </label>
                    <label className="block py-2">
                        <input
                            type="checkbox"
                            checked={selected[pair.id] === 'b'}
                            onChange={() => toggleOption(pair.id, 'b')}
                            className="mr-2"
                        />
                        {pair.b}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;
