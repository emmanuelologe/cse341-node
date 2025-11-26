const router = require('express').Router();

router.use( '/', require('./swagger') );

/* router.get('/', (req, res) => { res.send('Hello World!'); });
 */
router.use( '/contacts', require('./contacts') );
router.use( '/cars', require('./cars') );

module.exports = router;