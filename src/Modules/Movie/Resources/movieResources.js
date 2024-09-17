

/**
 * Standard response format for successful operations.
 * @param {Object} data - The data to be sent in the response.
 * @param {Object} [meta] - Optional metadata about the response.
 * @returns {Object} - Formatted response object.
 */
const successResponse = (data, meta = {}) => {
    return {
        success: true,
        data,
        meta
    };
};

/**
 * Standard response format for error operations.
 * @param {number} statusCode - HTTP status code for the error.
 * @param {string} message - Description of the error.
 * @param {Object} [errors] - Optional detailed errors.
 * @returns {Object} - Formatted error response object.
 */
const errorResponse = (statusCode, message, errors = {}) => {
    return {
        success: false,
        statusCode,
        message,
        errors
    };
};

module.exports = {
    successResponse,
    errorResponse
};
