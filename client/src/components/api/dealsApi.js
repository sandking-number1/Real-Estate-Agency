import host from ".";

const createDeal = async (dealData) => {
    try {
        const response = await host.post("/deals/create", dealData);

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

const deleteFavorite = async (favoriteData) => {
    try {
        const response = await host.post("/favorites/delete", favoriteData);

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

const createFavorite = async (favoriteData) => {
    try {
        const response = await host.post("/favorites/create", favoriteData);

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

export { createDeal, createFavorite, deleteFavorite };