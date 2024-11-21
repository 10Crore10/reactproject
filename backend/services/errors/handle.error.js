
function handleError(res, status, message, data, data2) {
    res.status(status).json({message: message, data: data, result: data2});
}

export default handleError