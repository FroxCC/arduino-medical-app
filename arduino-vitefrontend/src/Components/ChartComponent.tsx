import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { SensorData } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
    data: SensorData[];
    labels: string[];
    selectedVariable: keyof SensorData | '';
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, labels, selectedVariable }) => {
    const chartData = {
        labels,
        datasets: selectedVariable ? [{
            label: selectedVariable,
            data: data.map(d => d[selectedVariable]),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }] : [],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className='w-full h-full'>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;
