const { validationResult } = require("express-validator")

const validate = (req, res, next) => {
    const errors = validationResult(req);

    const hasErrors = !errors.isEmpty()

    if(hasErrors){
        const errorMessages = errors.array().map((err) => ({
            field: err.param,
            message: err.msg
        }))

        return res.responseFormatter({
            statusCode: 422,
            success: false,
            message: "Validation failed",
            data: errorMessages
        })
    }
    next()
}

module.exports = validate