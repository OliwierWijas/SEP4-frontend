const TemperatureData = [
    {
        readAt: '2024-05-16T00:00:00Z',
        value: 29.00723684210526,
    },
    {
        readAt: '2024-05-17T00:00:00Z',
        value: 34.19962962962963,
    }
]

const formattedTemperatureData = TemperatureData.map((temp) => ({
    ...temp,
    readAt: temp.readAt.split('T')[0]
}));

export default formattedTemperatureData