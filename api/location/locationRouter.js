const router = require("express").Router();

const Locations = require("./locationModel.js");

router.get("/", (req, res) => {
  Locations.find()
    .then(locations => {
      res.json(locations);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Locations.findById(id)
  .then(location => {
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Could not find location with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get location' });
  });
});

module.exports = router;