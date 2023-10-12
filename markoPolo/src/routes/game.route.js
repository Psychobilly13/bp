// TODO: move to utils/array.js
async function createRangeArray(start, end) {
    const rangeArray = [];
    for (let i = start; i <= end; i++) {
      rangeArray.push(i);
    }
    return rangeArray;
  }

async function gameRoute(app) {
    app.get('/game/:number', async (req, res) => {
        try {
            const number = parseInt(req.params.number);

            /** validation */
            if (typeof number !== 'number' || isNaN(number)) {
                const err = new Error("get.game.param.shouldBeNumber")
                err.code = 400;
                throw err
            }

            const result = await req.gameService.startMarkoPolo(number);
            res.json(result);
        } catch (err) {
            res.status(err.code || 500).json({ error: `${err.message}` });
        }
    });

    app.post('/game/list', async (req, res) => {
        try {
            const numbers = req.body;

            /** validation */
            if (!Array.isArray(numbers) || numbers.some(item => typeof item !== 'number')) {
                const err = new Error("post.game.body.shouldBeArrayOfNumbers");
                err.code = 400;
                throw err;
            }

            const results = await Promise.all(numbers.map(number => req.gameService.startMarkoPolo(number)));
            res.json(results);
        } catch (err) {
            res.status(err.code || 500).json({ error: `${err.message}` });
        }
    });

    app.post('/game/range', async (req, res) => {
        try {
            const range = req.body;

            /** validation */
            if (!Array.isArray(range) || range.some(item => typeof item !== 'number')) {
                const err = new Error("post.game.body.shouldBeArrayOfNumbers");
                err.code = 400;
                throw err;
            }
            if (range.length !== 2) {
                const err = new Error("post.game.body.shouldBeFromTwoNumbers");
                err.code = 400;
                throw err;
            }

            const [start, end] = req.body;

            const numbers = await createRangeArray(start, end);

            const results = await Promise.all(numbers.map(number => req.gameService.startMarkoPolo(number)));
            res.json(results);
        } catch (err) {
            res.status(err.code || 500).json({ error: `${err.message}` });
        }
    });

    // TODO: range
}


module.exports = gameRoute;