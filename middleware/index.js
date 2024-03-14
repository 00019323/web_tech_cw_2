const renderWithUser = (req, res, next) => {
    res.renderWithUser = (view, options, callback) => {
        const mergedOptions = Object.assign({}, options, {user: req.user});
        res.render(view, mergedOptions, callback);
    };
    next();
};

module.exports = renderWithUser;