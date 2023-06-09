import { readFileSync, writeFileSync, existsSync } from 'node:fs'

export default class CartManager {
    #id = 0;
    #carts;
    #path

    constructor(path) {
        this.#path = path;
        this.#carts = this.#readFile();     
    }

    #readFile(){
        try{
            let data;
            if (existsSync(this.#path))
                data = JSON.parse(readFileSync(this.#path,"utf-8"));
            else 
             data = []
            return data
        }
        catch(error){console.log(error)}
    }
    
    getCarts(){  
        if (existsSync(this.#path)){
        const carts= readFileSync(this.#path,"utf-8")
        console.log(carts)}
        return this.#carts;
    }   

    //crear un nuevo carrito:
        //id
        //products (array)
    createCart (){
        try{
        //   console.log(id)
        //const idExist = this.#carts.find(c => c.id === id);
        // if (idExist){
        //     console.log("el id del cart ya existe")
        // } else{
            const newCart = {
                id: this.#carts.length + 1,
                products: []
            }
            this.#carts.push(newCart);
            writeFileSync(this.#path,JSON.stringify(this.#carts))
            console.log(this.#carts)
            return id 
        } catch(error){console.log(error)}
        }

     getCartById(id){
            const CartExist = this.#carts.find(cart => 
                 cart.id === id)
             return CartExist ? CartExist : "No existe ese id de cart"  
            }

           


        /*
         agrega un producto al carrito - 
         solo agregar el id
        quantity; debe contener el numero de ejemplares  de dicho producto
        */
    updateCart(cartId, productId) {
            try {
                // const indiceCart = this.#carts.findIndex(cart => cart.id === cartId);
                const cart = this.#carts.find(cart => cart.id == cartId);
                const product = cart.products.find(product => product.id == productId);
                if (!cart){
                    console.log( 'El carrito con ese ID no existe')
                }else{
                    if(product){
                        product.quantity += 1;
                    }else{
                        const newProduct = {
                            product: productId,
                            quantity: 1,
                        };
                        cart.products.push(newProduct);
                        }
                    writeFileSync(this.#path, JSON.stringify(this.#carts));
                    console.log( 'El carrito fue actualizado correctamente!')
                     }
                 }catch (error) {console.log(error);
                 }
                }
        }