import host from ".";

const getProfile = async (id) => {
    try {
        const response = await host.get(`/profile/user/${id}`, id);

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

const updateUserInfo = async (id, userData) => {
    try {
        const response = await host.put(`/profile/update/${id}`, userData);

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


export { getProfile, updateUserInfo };