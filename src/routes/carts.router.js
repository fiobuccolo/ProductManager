// 1. importar router 
import { Router } from "express";
import CartManager from "../../managers/cartmanager.js";
// 2. instanciar router 
const cartsRouter = Router()
const carts = new CartManager('files/carts.json')


// consultar todos los carts
cartsRouter.get('/',(req,res)=>{
     // leer el archivo products y devolverlos dentro de un objeto
     const c = carts.getCarts()
     res.json({carts:c})
    
})

//2.get/:cid lista los productos que pertenezcan al carrito 
  cartsRouter.get("/:cartId", async (req,res) => {
    try{ 
     const { cartId } = req.params;
     console.log(cartId);
     const cart = await (carts.getCartById(parseInt(cartId)))
     res.json(cart);
  }catch(error){ throw new Error (error)
    }
    })

    cartsRouter.post('/',(req,res)=>{
        try{ 
            const newCart = req.body;
          //  if(!newCart.productos) {
           //     return res.status(400).send ({status:"error",error:"Agregar unm producto al menos para crear un cart"})        
           // } 
            
            carts.createCart(newCart);
            res.status(201).json(newCart)
            //res.send({status:"success",message:"carrito creado"})    

             
        }  catch(error){ throw new Error (error)}
        
       
   })






export default cartsRouter;