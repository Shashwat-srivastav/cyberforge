
import React from 'react';
// Fix: Correct import path for types
import type { WorkflowStep } from '../types';

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  currentStepIndex: number;
}

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ steps, currentStepIndex }) => {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isCompleted ? 'bg-blue-600 border-blue-600' :
                    isActive ? 'border-blue-500 bg-gray-700 animate-pulse-fast' : 
                    'border-gray-600 bg-gray-800'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <div className={isActive ? 'text-blue-400' : 'text-gray-500'}>
                        {step.icon}
                    </div>
                  )}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  isCompleted ? 'text-blue-400' :
                  isActive ? 'text-blue-400' : 
                  'text-gray-500'
                }`}>{step.name}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-auto border-t-2 transition-colors duration-500 ${isCompleted ? 'border-blue-600' : 'border-gray-600'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStepper;
