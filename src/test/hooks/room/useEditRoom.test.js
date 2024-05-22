import { useEditRoom } from "../../../hooks/room/useEditRoom.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useEditRoom integration test', () => {
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

    it('should edit room successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const newRoom = {
            name: "testName1",
            deviceId: "988",
            homeId: localStorage.getItem("houseId"),
            preferedTemperature: "25",
            preferedHumidity : "27"
        }

        const refresh = jest.fn()

        const editRoom = useEditRoom()
        await editRoom(newRoom.deviceId, newRoom, refresh)

        expect(global.alert).toHaveBeenCalledWith("Room edited.")
    })

    it('should return error when room with the given roomId does not exist', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const newRoom = {
            name: "testName1",
            deviceId: "985",
            homeId: localStorage.getItem("houseId"),
            preferedTemperature: "25",
            preferedHumidity : "27"
        }

        const refresh = jest.fn()

        const editRoom = useEditRoom()
        await editRoom(newRoom.deviceId, newRoom, refresh)

        expect(global.alert).toHaveBeenCalledWith("Room with device 985 doesn't exist in home")
    })
})
