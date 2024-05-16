export async function useLogin(user) {
    console.log(user)
    
    const token = "token"
    localStorage.setItem("jwt", token)
    console.log(localStorage.getItem("jwt"))

    const claims = { houseId: 1, admin: false }
    localStorage.setItem("claims", claims)
    console.log(localStorage.getItem("claims"))
}