import { useRoomData } from "../../../hooks/room/useRooms.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"
import { screen, render } from "@testing-library/react"

global.alert = jest.fn()

describe('useRooms integration test', () => {
    beforeEach(() => {
        localStorage.clear()
        const username = 'testUser'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        useLogin(user)
    })

    afterEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    const TestComponent = () => {
        const roomDataIndex = 0
        const rooms = useRoomData(1, roomDataIndex)

        return (
            <div>
                {rooms.map(room => (
                    <div key={room.id} data-testid="room">
                        <div>{room.roomId}</div>
                        <div>{room.deviceId}</div>
                        <div>{room.name}</div>
                        <div>{room.tempValue}</div>
                        <div>{room.humiValue}</div>
                        <div>{room.lightValue}</div>
                        <div>{room.radiatorState}</div>
                        <div>{room.lightLevel}</div>
                        <div>{room.isWindowOpen}</div>
                    </div>
                ))}
            </div>
        );
    };

    it('should get rooms successfully', async () => {
        localStorage.clear()
        const username = 'testUser'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        useLogin(user)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        render(<TestComponent />)

        const rooms = await screen.findAllByTestId('room')

        expect(rooms).toHaveLength(4)
        const room = rooms[0]
        console.log(room)
        expect("default").toBeInTheDocument()
    })
})
