
class Product{

    constructor({title,description,price,category,thumbnail = "",code,stock,status = true}){
        this.id = Math.random().toString(30).substring(2);
        this.status = status
        this.thumbnail = thumbnail
        
        this.title = title
        if (title == undefined){
            throw new Error("el titulo es obligatorio")
        }
        this.description = description
        // if (description == undefined){
        //     throw new Error("la descripcion es obligatoria")
        // }
        this.price = price
        if (price == undefined){
            throw new Error("el precio es obligatorio")
        }
        this.code = code
        // if (code == undefined){
        //     throw new Error("el codigo es obligatorio")
        // }
        this.stock = stock
        if (stock == undefined){
            throw new Error("el stock es obligatorio")
        }
        this.category = category
        // if (category == undefined){
        //     throw new Error("la categoría es obligatoria")
        // }
    }
}

export default Product;