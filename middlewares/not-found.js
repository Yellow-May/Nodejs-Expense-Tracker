const notFound = (req, res) => {
   res.status(404).json({message: `route to ${req.url} not found`})
}

module.exports = notFound