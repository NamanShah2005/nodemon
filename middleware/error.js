export class errorHandler extends Error {
    constructor(message , status , Name){
        super(message)
        this.stat = status
        this.Name = Name
    }
}

export const errs = (err , req , res , next) => {
    err.message = err.message || "internal server errror"
    err.stat = err.stat || 500
    err.Name = err.Name || "Anonymous"
    return res.status(err.stat).json({
    success : false,
    message : err.message,
    "error to" : err.Name
});
}

// export default errorHandler