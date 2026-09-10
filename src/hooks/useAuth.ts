export const useAuth = () => {
    // true estatico para desenvolvimento
    const isAuthenticated = true

    const login = async() => {
        // logica login api futuramente
    }

    const logout = async() => {
        //logout
    }

    return {
        isAuthenticated,
        user: {
            name: "Desenvolvedor",
            email: "dev@existrace.com"
        },
        login,
        logout

    }
}

