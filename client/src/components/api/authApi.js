import host from ".";

const login = async (loginData) => {
    try {
        const response = await host.post("/auth/login", loginData);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const checkEmail = async (email) => {
    try {
        const response = await host.post("/auth/register", { email });

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

const registerUser = async (userData) => {
    try {
        const response = await host.post("/auth/register/user", userData);

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log("Server did not respond.");
        } else {
            console.log("Error while creating request");
        }
    }
};

export { login, checkEmail, registerUser};