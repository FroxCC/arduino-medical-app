import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
    data: {
        Temp_ambiente: number[];
        Humedad: number[];
        Corporal: number[];
        BPM: number[];
        SpO2: number[];
        Angulo_superior: number[];
        Angulo_inferior: number[];
    };
    labels: string[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, labels }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Temp Ambiente',
                data: data.Temp_ambiente,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Humedad',
                data: data.Humedad,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Corporal',
                data: data.Corporal,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: 'BPM',
                data: data.BPM,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'SpO2',
                data: data.SpO2,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Angulo Superior',
                data: data.Angulo_superior,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
            },
            {
                label: 'Angulo Inferior',
                data: data.Angulo_inferior,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default ChartComponent;
