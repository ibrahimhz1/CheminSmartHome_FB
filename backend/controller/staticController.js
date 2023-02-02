const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


exports.sampleRes = catchAsyncErrors(async(req, res, next)=> {
    res.send("helloworld");
});


