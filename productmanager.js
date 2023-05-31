/*  DESARROLLAR un servidor basado en express
 donde podamos hacer consultas a nuestro archivo de productos

 - se debe usar la clase ProductManager que usamos actualmente para la persistencia de archivos
 - desarrollar uns servidor express que en su archivo app.js importe el archivo de Product Manager que tenemos
 -  el servidor debe contar con los siguientes endpoints:
    - ruta: /products -- leer el archivo products y devolverlos dentro de un objeto
        Agregar para recibir por query param el valor ?limit -- el cual recibira un limite de resultados
        Si no se recibe query de limite se devuelven todos los resultados
        si se recive un limit devolver hasta ese limite de productos
    - ruta /products/:pid:
        - recibe por req.params el product id
        - devuelve solo el producto pedido

        SUGERENCIAS:
            - await y async en endpoints
            - utiliza un archivo que ya tenga productos -- solo get
            -Link a github:
                src -- app-js y productManager
                package.json
                no incluir node_modules. (archivo .gitignore y escribir adentro node_modules)
**/



import { readFileSync, writeFileSync, existsSync } from 'node:fs'
export default class ProductManager {
    #id = 0;
    #products;
    #path

    constructor(path) {
        this.#path = path;
        this.#products = this.#readFile();     
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
    
    getProducts(){  
        if (existsSync(this.#path)){
        const products= readFileSync(this.#path,"utf-8")
        console.log(products)}
        return this.#products;
    }   
    addProduct (name, description, price,thumbnail,code,stock){
        try{
            console.log(code)
        const codeExist = this.#products.find(p => p.code === code);
        if (codeExist){
            console.log("el codigo del producto ya existe")
        } else{
            const newProduct = {
                id: this.#products.length + 1,
                name,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            this.#products.push(newProduct);
            writeFileSync(this.#path,JSON.stringify(this.#products))
            console.log(this.#products)
        }}
        catch(error){console.log(error)}
        }
     getProductoById(id){
            const ProductExist = this.#products.find(product=> 
                 product.id === id)
             return ProductExist ? ProductExist : "No existe ese id de producto" 
             
        } 
    updateProduct(id, props) {
            try {
                const indice = this.#products.findIndex(product => product.id === id);
                if (indice != -1) {
                    const { id, ...rest } = props;
                    this.#products[indice] = { ...this.#products[indice], ...rest };
                    writeFileSync(this.#path, JSON.stringify(this.#products));
                    console.log( 'El producto fue actualizado correctamente!')
                } else
                    console.log(`El producto con ID ${id} no existe`)
            } catch (error) {
                console.log(error);
            }
        }
        
    
    }

    