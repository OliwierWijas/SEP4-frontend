export async function useLogin(email, password) {
    localStorage.clear()

    const token = "token"
    localStorage.setItem("jwt", token)

    const houseId = 1
    const admin = true
    localStorage.setItem("houseId", houseId)
    localStorage.setItem("admin", admin)
}