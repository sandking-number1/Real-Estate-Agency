import host from ".";

const createReview = async (reviewData) => {
    try {
        const response = await host.post("/reviews/create", reviewData);

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

export { createReview };