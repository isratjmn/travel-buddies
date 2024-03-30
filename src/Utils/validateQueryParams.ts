
const validateQueryParams = (queryParams: any) => {
    const allowedParams = new Set([
        "destination",
        "startDate",
        "endDate",
        "budget",
        "searchTerm",
        "minBudget",
        "maxBudget",
        "page",
        "limit",
        "sortBy",
        "sortOrder",
    ]);
    for (const param in queryParams)
    {
        if (!allowedParams.has(param))
        {
            throw new Error(`Invalid query parameter: ${param}`);
        }
    }
};


export default validateQueryParams;