import React from 'react';

export interface Metrics {
    filesScanned: number;
    functionsAnalyzed: number;
    vulnerabilitiesFound: number;
    criticalFindings: number;
}

interface MetricsDashboardProps {
    metrics: Metrics;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8 animate-fade-in">
            <MetricCard 
                label="Files Scanned" 
                value={metrics.filesScanned} 
                icon="📄" 
                color="blue" 
            />
            <MetricCard 
                label="Functions" 
                value={metrics.functionsAnalyzed} 
                icon="⚙️" 
                color="purple" 
            />
            <MetricCard 
                label="Issues Found" 
                value={metrics.vulnerabilitiesFound} 
                icon="🔍" 
                color="yellow" 
            />
            <MetricCard 
                label="Critical" 
                value={metrics.criticalFindings} 
                icon="🚨" 
                color="red" 
            />
        </div>
    );
};

interface MetricCardProps {
    label: string;
    value: number;
    icon: string;
    color: 'blue' | 'purple' | 'yellow' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, color }) => {
    const colorClasses = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        yellow: 'text-yellow-400',
        red: 'text-red-400'
    };
    
    return (
        <div className="text-center">
            <div className={`text-4xl mb-2 ${colorClasses[color]}`}>
                {icon}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
                {value}
            </div>
            <div className="text-sm text-gray-400">
                {label}
            </div>
        </div>
    );
};

export default MetricsDashboard;
