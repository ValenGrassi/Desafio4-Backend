class Cart{
    constructor({id,products}){
        this.id = id
        if (products == undefined){
            this.products = []
        } else{this.products = products}
    }
}

export default Cart