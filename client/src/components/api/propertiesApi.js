import host from ".";

const getCatalogProperties = async () => {
    try {
        const response = await host.get("/properties");

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

const createProperty = async (propertyData) => {
    try {
        const response = await host.post("/properties/create", propertyData);

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

export { getCatalogProperties, createProperty };