const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "countries" ORDER BY "name", "continent" DESC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Full result from server:`, result);
            console.log(`Rows property only in result from database`, result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good servers always respond.
        })
})

router.post('/', (req, res) => {
    const country = req.body;
    const sqlText = `INSERT INTO "countries" ("name", "continent") VALUES ($1, $2)`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!).
    // The $1, $2, etc get substituted with the values from the array below.
    pool.query(sqlText, [country.name, country.continent])
        .then((result) => {
            console.log(`Added this country to the database:`, country);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}:`, error);
            res.sendStatus(500); // Good server always respond
        })
})

router.put('/:id', (req, res) => {
    const sqlText = `UPDATE "countries" SET "visited" = NOT "visited" WHERE "id" = $1;`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!).
    // The $1, $2, etc get substituted with the values from the array below.
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            console.log(`Updated country with id`, req.params.id);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}:`, error);
            res.sendStatus(500); // Good server always respond
        })
})

router.delete('/:id', (req, res) => {
    const sqlText = `DELETE FROM "countries" WHERE "id" = $1;`;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!).
    // The $1, $2, etc get substituted with the values from the array below.
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            console.log(`Deleted country with id`, req.params.id);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}:`, error);
            res.sendStatus(500); // Good server always respond
        })
})

module.exports = router;
