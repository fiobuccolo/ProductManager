// 1. instalar express npm i express
// 2. .gitignore 
// 3. import express
import express from 'express'
// 4. import product manager 
import ProductManager from './productmanager.js';


const app = express()
// 5. instanciar product manager
const productos = new ProductManager('productos.json')
productos.addProduct("porducto 1", "descripción 1'", 500, "img1", "asd123", 15);
productos.addProduct("producto 2", "descripción 2'", 50, "img2", "asdere123", 10);

//app.use(express.urlencoded({extended:true})); 

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  return res.send('primera solución')
})
// app.get("ruta",callback)

/*
// 6. crear enpoints
// Primer endpoint ruta: /products 

        Agregar para recibir por query param el valor ?limit -- el cual recibira un limite de resultados
        Si no se recibe query de limite se devuelven todos los resultados
        si se recive un limit devolver hasta ese limite de productos
**/   
app.get('/products',(req,res)=>{
    // leer el archivo products y devolverlos dentro de un objeto
    const p = productos.getProducts()
    // imprimir por consola los query params
    const { limit } = req.query;
    console.log(limit);
    // si se recibe un limit devolver hasta ese limite de productos
    if(limit){res.json(p.slice(0,limit))}
    // Si no se recibe query de limite se devuelven todos los resultados
    else{res.json({products:p})}
    // devolverlos dentro de un objeto
    
})

/*
- SEGUNDO ENDPOINT: ruta /products/:pid:
- recibe por req.params el product id
- devuelve solo el producto pedido
**/
app.get('/products/:pid', async (req,res) => {
    try{ 
    const { pid } = req.params
    console.log(pid)
    const p = await (productos.getProductoById(parseInt(pid)))
    res.json(p)
    }  catch(error){ throw new Error (error)}
})




app.listen(3000, ()=>{
    console.log("corriendo en puerto 3000")
})    