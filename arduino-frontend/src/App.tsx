import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// import { Routes, Route } from 'react-router-dom';
import ChartComponent from './Components/ChartComponent.tsx';
// import ChartAmbientComponent from "./Components/ChartAmbient.tsx";
// import Home from "./Pages/Home.tsx";

const socket = io('http://localhost:3000');

interface SensorData {
    Temp_ambiente: number;
    Humedad: number;
    Corporal: number;
    BPM: number;
    SpO2: number;
    Angulo_superior: number;
    Angulo_inferior: number;
}

const App: React.FC = () => {
    const [data, setData] = useState<SensorData[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        socket.on('serialData', (incomingData: string) => {
            const parsedData: SensorData = JSON.parse(incomingData);
            setData((prevData) => [...prevData, parsedData]);
            setLabels((prevLabels) => [...prevLabels, new Date().toLocaleTimeString()]);
        });

        return () => {
            socket.off('serialData');
        };
    }, []);

    const chartData = {
        Temp_ambiente: data.map(d => d.Temp_ambiente),
        Humedad: data.map(d => d.Humedad),
        Corporal: data.map(d => d.Corporal),
        BPM: data.map(d => d.BPM),
        SpO2: data.map(d => d.SpO2),
        Angulo_superior: data.map(d => d.Angulo_superior),
        Angulo_inferior: data.map(d => d.Angulo_inferior),
    };

    return (
        <div className="container">
            <ChartComponent data={chartData} labels={labels} />
        </div>
    );
};

export default App;
