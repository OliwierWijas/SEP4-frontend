import { useAddRoom } from "../../../hooks/room/useAddRoom.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useAddRoom integration test', () => {
    beforeEach(async () => {
        localStorage.clear()
        const username = 'testUser'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)
    })

    afterEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    it('should add room successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const room = {
            name: "testName",
            deviceId: "988",
            homeId: localStorage.getItem("houseId"),
            preferedTemperature: "20",
            preferedHumidity : "25"
        }

        const refresh = jest.fn()

        const addRoom = useAddRoom()
        await addRoom(room, refresh)

        expect(global.alert).toHaveBeenCalledWith("Room created.")
    })

    it('should return error when room with the given deviceId already exists', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const room = {
            name: "testName",
            deviceId: "988",
            homeId: localStorage.getItem("houseId"),
            preferedTemperature: "20",
            preferedHumidity : "25"
        }

        const refresh = jest.fn()

        const addRoom = useAddRoom()
        await addRoom(room, refresh)

        expect(global.alert).toHaveBeenCalledWith("Room 988 already exists in home 1")
    })
})
