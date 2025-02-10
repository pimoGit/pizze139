function checkTime(req, res, next) {
    const currentTime = new Date().toLocaleString();
    console.log("Sei passato dal middleware di check time alle: ", currentTime);

    next();
}

// export della funzione
module.exports = checkTime;