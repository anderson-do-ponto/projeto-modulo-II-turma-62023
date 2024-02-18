import { Request, Response } from 'express';
import ProductService from '../services/productService';
import { Product } from '../models/products.model';

class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData: Product = req.body;
      const newProduct = await this.productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error: any) {
      console.error('Error creating product:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async editProduct(req: Request, res: Response): Promise<any> {
    try {
      console.log('isAdmin (value):', req.user?.isAdmin);
      console.log('isAdmin (type):', typeof req.user?.isAdmin);
      
      if (req.user?.isAdmin === false) {
        console.log('User is not an admin.');
        return res.status(403).json({ message: 'Aviso: Apenas ADMIN podem alterar os produtos.' });
      }

      const productId = req.params.productId;

      const updatedProductData = req.body;

      const updatedProduct = await this.productService.editProduct(productId, updatedProductData);

      res.status(200).json({
        message: 'Success: Product edited successfully.',
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error editing product:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error getting all products:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const product = await this.productService.getProductById(productId);

      if (!product) {
        res.status(404).json({ message: 'Product not found.' });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Error getting product by ID:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  }

  async redeemProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;
      const userId = req.user?._id;

      const success = await this.productService.redeemProduct(productId, userId);

      if (success) {
        res.status(200).json({ message: 'Success: Product redeemed successfully.' });
      } else {
        res.status(403).json({ message: 'Forbidden: Unable to redeem product.' });
      }
    } catch (error) {
      console.error('Error redeeming product:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
  
}

export default ProductController;
