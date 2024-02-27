import api from "./api";

export class ProductController {

    //Delete Product
    static async deleteProduct(id) {
        let msgType = 'success';
        const data = await api.delete(`/products/delete/${id}`).then(
            (response) => {
                return response.data;
            }).catch((err) => {
                msgType = 'error';
                return err.response.data;
            });
        
        return { message: data.message, msgType };
    }

    //Edit Product
    static async editProduct(id, product) {
        let msgType = 'success'
        console.log(product.category);
        const data = await api.patch(`/products/edit/${id}`, product).then(
            (response) => {
                return response.data;
            }).catch((err) => {
                msgType = 'error';
                console.log(err.response.data)
                return err.response.data;
            });

        return { message: data.message, msgType };
    }


    //Add Product
    static async addProduct(product) {
        let msgType = 'success';
        const data = await api.post('/products/add/', product).then(
            (response) => {
                return response.data;
            }).catch((err) => {
                msgType = 'error';
                return err.response.data;
            });

        return {message: data.message, msgType};
    }

    //Get by id
    static async getById(id)
    {

       const data = await api.get(`/products/${id}`);
       
       return data;
       
    }
}