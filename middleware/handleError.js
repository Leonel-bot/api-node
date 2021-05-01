module.exports = (error, request, response, next) => {
    if(error.name === 'CastError'){
        response.status(404).send({error : "id used is malformed"})
    }else if(error.name === "JsonWebTokenError"){
        response.status(401).send({error: 'invalid token'})
    }
    else{
        response.status(500).end()
    }
}