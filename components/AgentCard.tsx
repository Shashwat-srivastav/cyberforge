
import React from 'react';

interface AgentCardProps {
  agentName: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const AgentCard: React.FC<AgentCardProps> = ({ agentName, icon, isLoading = false, children }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="mr-3">{icon}</div>
        <h2 className="text-xl font-bold text-gray-200">{agentName}</h2>
        {isLoading && (
            <div className="ml-4 flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-400">Processing...</span>
            </div>
        )}
      </div>
      <div className="prose prose-invert max-w-none text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default AgentCard;
