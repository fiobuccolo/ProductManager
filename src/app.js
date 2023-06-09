// 1. instalar express npm i express
// 2. .gitignore 
// 3. import express
import express from 'express'
// 4. import product manager -- lo llevo al route
//import ProductManager from '../managers/productmanager.js';
const app = express()

// 4b import cart manager
import CartManager from '../managers/cartmanager.js';

// 5. instanciar product manager -- lo llevo al route
// const productos = new ProductManager('productos.json')
//productos.addProduct("producto 1", "descripción 1'", 500, "img1", "asd123", 15);
//productos.addProduct("producto 2", "descripción 2'", 50, "img2", "asdere123", 10);

// 5b. instanciar cart manager
const carts = new CartManager('carts.json')

// 7. importar routers
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

//8. app.use
app.use(express.json()) // ahora el servidor podra recibir json al momento de la peticion
app.use(express.urlencoded({extended:true})) // permite que se pueda enviar información tmbien desde la url
app.use('/products',productsRouter) // ruta
app.use('/carts',cartsRouter) // ruta


// respond with "primera solucion" when a GET request is made to the homepage
app.get('/', (req, res) => {
  return res.send('primera solución')
})
// app.get("ruta",callback)




app.listen(8080, ()=>{
    console.log("corriendo en puerto 8080")
})    




