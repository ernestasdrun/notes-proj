import { ConflictError, UnauthorizedError } from "../errors/http_errors";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMesage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMesage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMesage);
        } else {
            throw Error(errorMesage);
        }
    }
}