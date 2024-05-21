const LightData = [
    {
        readAt: '2024-05-17T00:00:00Z',
        value: 57,
    },
    {
        readAt: '2024-05-18T00:00:00Z',
        value: 67,
    }
]

const formattedLightData = LightData.map((temp) => ({
    ...temp,
    readAt: temp.readAt.split('T')[0]
}));

export default formattedLightData