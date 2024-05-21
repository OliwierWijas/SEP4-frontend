const HumidityData = [
    {
        readAt: '2024-05-21T00:00:00Z',
        value: 30,
    },
    {
        readAt: '2024-05-22T00:00:00Z',
        value: 33,
    }
]

const formattedHumidityData = HumidityData.map((temp) => ({
    ...temp,
    readAt: temp.readAt.split('T')[0]
}));

export default formattedHumidityData