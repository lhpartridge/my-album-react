const con = require('../../config/dbconfig')

const artistDao = {
    table: 'artist',

    getInfo: (res, table, id)=> {
        con.execute(
            `SELECT al.album_id, al.title, al.yr_released, al.album_cover,
                CASE
                    WHEN ar.alias IS NULL THEN ''
                    ELSE ar.alias
                    END alias,
                CASE 
                    WHEN ar.fName is NULL THEN ''
                    ELSE ar.fName
                    END fName,
                CASE
                    WHEN ar.lName IS NULL THEN ''
                    ELSE ar.lName
                    END lName,
                ar.artist_img,
                ar.artist_id
                FROM album al
                JOIN artist ar USING (artist_id)
                WHERE ${table}_id = ${id}
                ORDER BY al.yr_released;`,
            (error, rows) => {
                if (!error) {
                    // if (rows.length === 1) {
                        // res.json(...rows)
                    // } else {
                    res.json(rows)
                // }
            } else {
                console.log('DAO error', error)
            }
        })
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
                    SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error) {
                        // res.send(`Last id: ${dbres.insertId}`)
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
                        console.log('DAO ERROR: ', error)
                        res.send('Error creating record.')
                    }
                }
            )
        }
    }, 

    sort: (req, res, table)=> {
        con.execute(
            `SELECT * FROM ${table} ORDER BY lName, fName;`,
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

module.exports = artistDao