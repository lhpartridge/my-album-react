const con = require('../../config/dbconfig')

const bandDao = {
    table: 'band',

    getInfo: (res, table, id) => {
        con.execute(
            `SELECT al.album_id, al.title, al.yr_released, al.album_cover,
                b.band_id, b.band, b.band_img
                FROM album al
                JOIN band b USING (band_id)
                WHERE ${table}_id = ${id}
                ORDER BY al.yr_released;
            `,
            (error, rows)=> {
                if (!error) {
                    res.json(rows)
                } else {
                    console.log('DAO ERROR: ', error)
                }
            }
        )
    },

    create: (req, res, table)=> {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create."
            })
        } else {
            const fields = Object.keys(req.body)// creates an array of just the properties
            const values = Object.values(req.body)// creates an array of just the values

            con.execute(
                `INSERT INTO ${table} 
                    SET ${fields.join(' = ?, ')} = ?;`,// connects the field/value pairs
                values,
                (error, dbres)=> {
                    console.log(dbres)
                    if (!error) {
                        res.render('pages/process-page', {
                            title: 'Process Page',
                            name: 'Process Page',
                            id: dbres.insertId,
                            table
                        })
                    } else {
                        console.log('DAO ERROR: ', error)
                        res.send('Error creating record')
                    }
                }
            )
        }
    },

    update: (req, res, table)=> {
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": 'Id must be a number.'
            })
        } else if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": 'No fields to update.'
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `UPDATE ${table} 
                    SET ${fields.join(' = ?, ')} = ? 
                    WHERE ${table}_id = ?;`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} row(s).`)
                    } else {
                        console.log('DAO ERROR', error)
                        res.send('Error creating record.')
                    }
                }
            )
        }
    }, 

    sort: (req, res, table)=> {
        con.execute(
            `SELECT * FROM ${table} ORDER BY ${table};`,
            (error, rows)=> {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                        console.log('DAO ERROR: ', error)
                }
            }
        )
    }
}

module.exports = bandDao