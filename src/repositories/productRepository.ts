import mongoose, { Model, ObjectId } from "mongoose";
import { Product } from "../models/products.model";
import UserService from "../services/userService";

class ProductRepository {
  private productModel: Model<Product>;
  private userModel: UserService;

  constructor(productModel: Model<Product>, userModel: UserService) {
    this.productModel = productModel;
    this.userModel = userModel;
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  async editProduct(
    productId: string,
    updatedProductData: Partial<Product>
  ): Promise<Product | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("productId inválido.");
      }

      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        { $set: updatedProductData },
        { new: true, runValidators: true, context: "query" }
      );

      return updatedProduct;
    } catch (error) {
      console.error("Erro na edição do produto:", error);
      return null;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();

      return products;
    } catch (error: any) {
      throw new Error(
        "Error getting all products from repository: " + error.message
      );
    }
  }

  async findById(productId: string): Promise<any> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async redeemProduct(productId: string, userId: ObjectId | undefined): Promise<boolean> {
    try {
      const product = await this.productModel.findById(productId);

      if (!product) {
        return false;
      }

      const user = await this.userModel.getUserById(userId);

      if (!user) {
        return false;
      }

      if (user.jewelsAmount < product.value) {
        console.log('Jóias insuficientes')
        return false;
      }

      product.amount--;

      user.jewelsAmount -= product.value;

      user.products.push(product.name);

      await product.save();
      await user.save();

      return true;
    } catch (error: any) {
      console.error('Error redeeming product:', error);
      throw new Error('Error redeeming product: ' + error.message);
    }
  }
}

export default ProductRepository;
