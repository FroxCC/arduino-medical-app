import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChartComponent from "./ChartComponent";
import { SensorData } from '../types'; // Importa el tipo

// Define explicitamente los tipos para las variables
interface Variable {
    id: number;
    name: string;
    key: keyof SensorData;
}

const variables: Variable[] = [
    { id: 0, name: "Temperatura Ambiente", key: "Temp_Ambiente" },
    { id: 1, name: "Humedad", key: "Humedad" },
    { id: 2, name: "Temperatura Corporal", key: "Corporal" },
    { id: 3, name: "Latidos por minuto (BPM)", key: "BMP" },
    { id: 4, name: "Nivel de oxigeno (SpO2)", key: "SpO2" },
    { id: 5, name: "Angulo Superior", key: "Angulo_superior" },
    { id: 6, name: "Angulo Inferior", key: "Angulo_inferior" },
    { id: 7, name: "Iluminación", key: "Iluminacion" }
];

const socket = io('http://localhost:3000');

export default function Hero() {
    const [data, setData] = useState<SensorData[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [selectedVariable, setSelectedVariable] = useState<keyof SensorData | ''>('');

    useEffect(() => {
        socket.on('serialData', (incomingData) => {
            const parsedData: SensorData = JSON.parse(incomingData);
            setData(prevData => [...prevData, parsedData]);
            setLabels(prevLabels => [...prevLabels, new Date().toLocaleTimeString()]);
        });

        return () => {
            socket.off('serialData');
        };
    }, []);

    const handleButtonClick = (variableKey: keyof SensorData) => {
        setSelectedVariable(variableKey);
    };

    return (
        <main className='flex justify-between h-screen w-screen font-roboto'>
            <div className='flex flex-col items-center w-1/4'>
                <h1 className='font-extrabold tracking-tight lg:text-4xl mt-10'>Pepito Gonzales</h1>
                <div className='flex flex-col h-full justify-evenly'>
                    {variables.map(variable => (
                        <div className='flex items-center w-full justify-between'>
                            <button
                                key={variable.id}
                                className='m-2 p-6 bg-blue-500 text-white rounded-3xl hover:bg-blue-400 text-wrap w-52'
                                onClick={() => handleButtonClick(variable.key)}
                            >
                                {variable.name}
                            </button>
                            <h4 className='px-5'>TEST</h4>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center w-3/4 h-full'>
                <h1 className='lg:text-4xl font-bold mt-6'>{selectedVariable ? variables.find(v => v.key === selectedVariable)?.name : 'Seleccione una variable'}</h1>
                <div className='w-full h-full'>
                    <ChartComponent data={data} labels={labels} selectedVariable={selectedVariable}/>
                </div>
            </div>
        </main>
    )
}
