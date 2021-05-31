module.exports = (x, y, callback) => {
    if (x <= 0 || y <= 0) {
        setTimeout(_ =>
            callback(new Error("Rectangle dimensions should be greater than zero:  x = "
                + x + ",  and y = " + y), null),
            2000);
    }
    else {
        setTimeout(_ =>
            callback(null,
                {
                    perimeter: _ => (2 * (x + y)),
                    area: _ => x * y
                }),
            2000);
    }

}




