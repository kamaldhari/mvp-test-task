/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, notification } from 'antd';
import React, { useState } from 'react';
import { questions } from '../data/Multilingual_Career_Questionnaire.json';
import JobScoreAnalysis from './analytics/dashboard';
import CheckboxGroup from './checkboxGroup';
import ProgressBar from './progressbar';
import Question from './question';

interface Option {
  id: string;
  a?: string;
  b?: string;
  label?: string;
}

interface SurveyQuestion {
  id: string;
  type: 'single-choice' | 'comparison';
  en: {
    question: string;
    options?: Option[];
    pairs?: Option[];
  };
}

const Survey: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [selectedFields, setSelectedFields] = useState<any>({});

  const handleNextSingleChoice = (currentQuestionId: string, answer: string) => {
    setSelectedFields((prevFields: any) => ({
      ...prevFields,
      [currentQuestionId]: answer,
    }));
    setProgress((prev) => Math.min(prev + 100 / questions.length, 100));
    setStep((prev) => prev + 1);
  };

  const handleSelectCheckboxGroup = (selected: Record<string, string>) => {
    setSelectedFields((prevFields: any) => ({
      ...prevFields,
      comparison_pairs: selected,
    }));
  };

  const handleNext = () => {
    if (Object.keys(selectedFields).length === step) {
      console.log(selectedFields, step);
      setStep((prev) => prev + 1);
      setProgress((prev) => Math.min(prev + 100 / questions.length, 100));
    } else {
      notification.error({ message: 'Please select any one option' })
    }
  };

  const [showReport, setShowReport] = useState(false);
  const showResults = () => {
    setShowReport(true);
    (window as any).gtag('event', 'form_submission', {
      event_category: 'Form',
      event_label: 'Contact Form',
      value: 1,
    });
  };

  return (
    <div className="mt-5 m-auto rounded-lg shadow-lg bg-white p-5 max-w-4xl">
      {
        showReport ?
          <JobScoreAnalysis data={selectedFields} />
          :
          <>
            <h1 className='mb-4 text-3xl font-bold text-center'>Find Suitable Trainings</h1>
            <ProgressBar progress={progress} />
            <div id="survey">
              {
                questions.length > 0 && questions.map((question: SurveyQuestion | any, index: number) => (
                  <div key={question.id} style={{ display: step === index + 1 ? 'block' : 'none' }}>
                    {question.type === 'single-choice' ? (
                      <Question
                        id={question.id}
                        question={question.en.question}
                        answers={question.en.options || []}
                        handleNext={handleNextSingleChoice}
                        visible={step === index + 1}
                        step={step}
                      />
                    ) : question.type === 'comparison' && (
                      <CheckboxGroup
                        question={question.en.question}
                        pairs={question.en.pairs || []}
                        onSelect={handleSelectCheckboxGroup}
                        visible={step === index + 1}
                        step={step}
                      />
                    )}
                  </div>
                ))
              }
              <Button type='primary' onClick={step === questions.length ? showResults : handleNext} className='mt-4'>
                {step === questions.length ? 'Show results' : 'Continue'}
              </Button>
            </div>
          </>
      }
    </div>
  );
};

export default Survey;
