/**
 * Event handler wrapper to help catch async and sync errors
 * during event handler processes user requests. Call next()
 * to route these errors to Express error handler.
 *
 * See more: http://thecodebarbarian.com/80-20-guide-to-express-error-handling
 */
module.exports = function(eventHandler) {
    return function(req, res, next) {
        eventHandler(req, res, next).catch(next);
    }
}
