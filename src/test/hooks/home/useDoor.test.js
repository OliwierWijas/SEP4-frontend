import { useDoor } from "../../../hooks/home/useDoor.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useDoor integration test', () => {
    beforeEach(async () => {
        localStorage.clear()
        const username = 'adminUser'
        const password = 'adminPassword'

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

    it('should change door state successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const switchDoor = useDoor()
        await switchDoor(localStorage.getItem("houseId"), "password", true)

        expect(global.alert).toHaveBeenCalledWith("Door state changed.")
    })

    it('should return error when current state is the state that we want to change to', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const switchDoor = useDoor()
        await switchDoor(localStorage.getItem("houseId"), "password", true)

        expect(global.alert).toHaveBeenNthCalledWith(1, "Door is already open.")

        await switchDoor(localStorage.getItem("houseId"), "password", false)

        expect(global.alert).toHaveBeenNthCalledWith(2, "Door state changed.")

        await switchDoor(localStorage.getItem("houseId"), "password", false)

        expect(global.alert).toHaveBeenNthCalledWith(3, "Door is already closed.")

    })
})
