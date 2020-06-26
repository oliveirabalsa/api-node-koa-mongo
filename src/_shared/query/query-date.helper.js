module.exports = (query) => {
    const filter = {
        $and: []
    }

    if (query.start_date) {
        filter.$and.push({
            updatedAt: {
                $gte: new Date(query.start_date)
            }
        });
    }

    if (query.end_date) {
        filter.$and.push({
            updatedAt: {
                $lte: new Date(query.end_date)
            }
        })
    }

    if (filter.$and.length === 0) {
        delete filter.$and;
    }

    return filter;
}