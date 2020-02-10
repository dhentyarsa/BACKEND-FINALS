const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Putra',
    password: 'Putra123',
    database: 'tokokasih',
    port: 3306,
});

const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(202).send('<h1>Selamat Datang di API Ujian Back End!</h1>')
})

// == CATEGORIES == // 

app.get('/categories', (req, res) => {
    const query = `SELECT * 
        from categories`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    });
})

// parent category names render //
app.get('/categories_pc_names', (req, res) => {
    const query = `SELECT * 
        from parent_category_names`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    });
})

app.post('/categories', (req, res) => {
    const query = `INSERT INTO categories SET ?`;
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('== Category Added! ==')
    })
})

app.put('/categories/:id', (req, res) => {
    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    console.log(query)
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        console.log(res.status)
        res.status(200).send('== Category Updated! ==')
    })
})

app.delete('/categories/:id', (req, res) => {
    const query = `DELETE FROM categories WHERE id = ${connection.escape(req.params.id)}`;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send('== Category Deleted! ==')
    })
})

// == PRODUCTS == // 

app.get('/products', (req, res) => {
    const query = `SELECT * 
        from products`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    });
})

app.post('/products', (req, res) => {
    const query = `INSERT INTO products SET ?`;
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('== New Product Added! ==')
    })
})

app.put('/products/:id', (req, res) => {
    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    console.log(query)
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        console.log(res.status)
        res.status(200).send('== Product Updated! ==')
    })
})

app.delete('/products/:id', (req, res) => {
    const query = `DELETE FROM categories WHERE id = ${connection.escape(req.params.id)}`;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send('== Product Deleted! ==')
    })
})

// == PRODUCT - CATEGORY == //

// rendering product and category names //

app.get('/productcat', (req, res) => {
    const query = `SELECT c.id, c.category, p.id AS product_id , p.nama AS product_name 
        FROM categories c 
        JOIN productcat pct ON c.id = pct.categoryId
        JOIN products p ON p.id = pct.productId
        ORDER BY id;`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    });
})

// category paling child //

app.get('/productcatchild', (req, res) => {
    const query = `SELECT c.id,c.category,ct.category AS child_category,c.parentId 
        FROM categories c 
        LEFT JOIN categories ct ON c.id = ct.parentId 
        HAVING child_category IS NULL 
        ORDER BY c.id;`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    });
})

// delete by productId //

app.delete('/productcat/:id', (req, res) => {
    const query = `DELETE FROM productcat WHERE productId = ${connection.escape(req.params.id)}`;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        res.status(200).send('== Product Category Deleted! ==')
    })
})

// add product category //

app.post('/productcat/:catId/:parId', (req,res) => {
    const query = `INSERT INTO productcat(categoryId,parentId) values(${connection.escape(req.params.catId,req.params.parId)})`;
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('== New Product Category Added! ==')
    })
})

app.post('/productcat/:catId/:parId', (req,res) => {
    const query = `INSERT INTO productcat(categoryId,parentId) values(${connection.escape(req.params.catId,req.params.parId)})`;
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('== New Product Category Added! ==')
    })
})

app.listen(PORT, () => console.log(`API running on PORT ${PORT}`))