import express from 'express';
import ProductController from '../controllers/productController';
import ProductService from '../services/productService';
import ProductRepository from '../repositories/productRepository';
import { ProductModel } from '../models/products.model';
import adminAuthMiddleware from '../utils/adminAuthMiddleware';
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';
import { UserModel } from '../models/user.model';
import { Token } from '../utils/token';
import CryptoService from '../utils/crypt';
import UserController from '../controllers/userController';

const userRepository = new UserRepository(UserModel);
const tokenService = new Token();
const cryptService = new CryptoService();
const userService = new UserService(userRepository, cryptService, tokenService);
const productRepository = new ProductRepository(ProductModel, userService);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = express.Router();

router.post('/', adminAuthMiddleware, (req, res) => productController.createProduct(req, res));
router.put('/:productId', adminAuthMiddleware, (req, res) =>  productController.editProduct(req, res));
router.get('/allProducts', (req, res) => productController.getAllProducts(req, res));
router.get('/:productId', adminAuthMiddleware, (req, res) => productController.getProductById(req, res));
router.put('/redeem/:productId', adminAuthMiddleware, (req, res) => productController.redeemProduct(req, res));

export default router;
