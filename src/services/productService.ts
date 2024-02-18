import { Product } from '../models/products.model';
import ProductRepository from '../repositories/productRepository';
import mongoose, { ObjectId } from 'mongoose';

class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.createProduct(product);
  }

  async editProduct(productId: string, updatedProductData: Product): Promise<Product | null> {
    try {
      console.log('Iniciando edição do produto com ID:', productId);
  
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.error('productId inválido:', productId);
        throw new Error('productId inválido.');
      }  

      const updatedProduct = await this.productRepository.editProduct(productId, updatedProductData);

      if (!updatedProduct) {
        console.error('Erro na edição do produto. Produto não encontrado.');
        throw new Error('Erro na edição do produto. Produto não encontrado.');
      }

      console.log('Produto editado com sucesso:', updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error('Erro na edição do produto:', error);
      return null;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const allProducts = await this.productRepository.getAllProducts();
      const productsWithQuantity = allProducts.filter(product => product.amount > 0);
      return productsWithQuantity;
    } catch (error: any) {
      throw new Error('Error getting all products: ' + error.message);
    }
  }

  async getProductById(productId: string): Promise<any> {
    const product = await this.productRepository.findById(productId);
    return product;
  }

  async redeemProduct(productId: string, userId: ObjectId | undefined): Promise<boolean> {
    return this.productRepository.redeemProduct(productId, userId);
  }
}

export default ProductService;
