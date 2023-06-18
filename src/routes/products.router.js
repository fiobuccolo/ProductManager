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
/*
- Tercer ENDPOINT: post un product /
**/
productsRouter.post('/', async (req,res) => {
    try{ 
        const newProduct = req.body;
        console.log(newProduct)
        // saco la validación de aca: //if(!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock || !newProduct.code) {
        //    return res.status(400).send ({status:"error",error:"Incomplete values"})        }
        const postResponse = productos.addProduct(newProduct);
        console.log("hola")
        return res.status(201).json(postResponse);
        //res.status(201).json(newProduct); 
    }  catch(error){ throw new Error (error)}
})

/* Cuarto ENDPOINT: delete un product /**/

productsRouter.delete('/:pid', async (req,res)=>{
    try{ 
        const { pid } = req.params;
        console.log(pid)
        const postResponse = productos.deleteProductoById(parseInt(pid))
        return res.status(201).json(postResponse)
        }  catch(error){ throw new Error (error)}
})

/*
- quinto ENDPOINT: PUT un product /
**/

productsRouter.put('/:pid',(req,res)=>{
    try{ 
        const { pid } = req.params;
        const props = req.body;
        console.log(pid)
        const postResponse = productos.updateProduct(parseInt(pid), props)
        return res.status(201).json(postResponse)
        }  catch(error){ throw new Error (error)}
    
})

export default productsRouter;



