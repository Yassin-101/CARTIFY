const catchAsync = (fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(next) // Auto forward error to gldobal error handler
    }
}
module.exports = catchAsync