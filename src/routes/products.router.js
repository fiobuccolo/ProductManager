// 1. importar router 
import { Router } from "express";
// importar product manager
import ProductManager from "../../managers/productmanager.js";
// 2. instanciar router 
const productsRouter = Router()
const productos = new ProductManager('files/productos.json')


// Endpoints de product ya creados en entregas anteriores

/*
// 6. crear enpoints
// Primer endpoint ruta: /products 

        Agregar para recibir por query param el valor ?limit -- el cual recibira un limite de resultados
        Si no se recibe query de limite se devuelven todos los resultados
        si se recive un limit devolver hasta ese limite de productos
**/   

productsRouter.get('/',(req,res)=>{
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
productsRouter.get('/:pid', async (req,res) => {
    try{ 
    const { pid } = req.params
    console.log(pid)
    const p = await (productos.getProductoById(parseInt(pid)))
    res.json(p)
    }  catch(error){ throw new Error (error)}
})

productsRouter.post('/', async (req,res) => {
    try{ 
        const newProduct = req.body;
        console.log(newProduct)
        if(!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock || !newProduct.code) {
            return res.status(400).send ({status:"error",error:"Incomplete values"})        
        }
        // no se como hacer la validacon de codigo aca, o si la tengo que dejar
        // en el product manager y que el product manager me responda error y con ese error le devuelvo un error al post
        const postResponse = productos.addProduct(newProduct);
        console.log("hola")
        return res.status(201).json(postResponse);
        //res.status(201).json(newProduct); 
    }  catch(error){ throw new Error (error)}
})


export default productsRouter;



 // coments al tutor

/*
1.
rutas de producto: 
    - Pregunta: la validacion de campos completos y de codigo existente, es mejor que esten en el post como hice con los inputs completos? o en el product manager como hice con la validacion de codigo existente?
    - Me queda pendiente el 
        - Ruta put/:pid debe tomar un producto y actualizar por los campos enviados. No eliminar ni actualizar el id
        - ruta delete/:pid
rutas cart:
    - me queda pendiente agrega un producto al carrito 
 */