import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
    data: {
        Temp_ambiente: number[];
    };
    labels: string[];
}

const ChartAmbientComponent: React.FC<ChartComponentProps> = ({ data, labels }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Temp Ambiente',
                data: data.Temp_ambiente,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
        ],
    };

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default ChartAmbientComponent;
