import { useDeleteRoom } from "../../../hooks/room/useDeleteRoom.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useDeleteRoom integration test', () => {
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

    it('should delete room successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const refresh = jest.fn()

        const addRoom = useDeleteRoom()
        await addRoom(987, refresh)

        expect(global.alert).toHaveBeenCalledWith("Room deleted.")
    })

    it('should return error when room with the given roomId does not exist', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const refresh = jest.fn()

        const deleteRoom = useDeleteRoom()
        await deleteRoom(555, refresh)

        expect(global.alert).toHaveBeenCalledWith("Room with device 555 doesn't exist in home")
    })
})
