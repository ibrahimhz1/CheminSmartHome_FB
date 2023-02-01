exports.sampleRes = catchAsyncErrors(async(req, res, next)=> {
    res.send("helloworld");
})
