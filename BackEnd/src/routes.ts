import { Router} from 'express';
import multer from 'multer'
import {CreateUser} from './controlers/user/CreateUser'
import {AuthUserController} from './controlers/user/LoginController'
import {DetalheUsController} from './controlers/user/DetalheUsController'

import {AutenticacaoUs} from './middleware/AutenticacaoUs'

import {CreateCategoryController} from './controlers/category/CreateCategoryController'
import {ListaCategoryController} from   './controlers/category/ListarCategoryController'
import {CreateProductController} from './controlers/Produtos/CreateProductController'
import {ListarCategoriasController} from './controlers/Produtos/ListarCategoriasController'

import {CreateOrderController} from './controlers/order/CreateOrderController'
import {RemoveOrderController} from './controlers/order/RemoveOrderController'
import {RemoveItemController} from './controlers/order/RemoveItemController'
import {SendOrderController} from '././controlers/order/SendOrderController'
import {ListOrderController} from '././controlers/order/ListOrderController'
import {DetailOrderController} from './controlers/order/DetailOrderController'
import {FinzalizarPedidoController} from './controlers/order/FinalizarPedidoController'

import {AddItemController} from './controlers/order/AddItemController'
import uploapConfig from './config/multer'

const router = Router();

const upload = multer(uploapConfig.upload("./tmp"));

//ROTAS DO USUARIO
router.post('/users', new CreateUser().handle) 
//Rotas de Login
router.post('/login', new AuthUserController().handle)

router.get('/infous', AutenticacaoUs, new DetalheUsController().handle )

//ROTAS de Categorias
router.post('/categoria', AutenticacaoUs, new CreateCategoryController().handle )
router.get('/categoria', AutenticacaoUs, new ListaCategoryController().handle )

//Rotas de Produtos
router.post('/produtos', AutenticacaoUs, upload.single('file'), new CreateProductController().handle )
router.get('/categoria/produtos', AutenticacaoUs, new ListarCategoriasController().handle)

//Rotas dos Pedidos
router.post('/order', AutenticacaoUs, new CreateOrderController().handle)
router.delete('/order', AutenticacaoUs,new RemoveOrderController().handle )

router.post('/order/add', AutenticacaoUs, new AddItemController().handle)
router.delete('/order/remove', AutenticacaoUs, new RemoveItemController().handle)
router.put('/order/send', AutenticacaoUs, new SendOrderController().handle);
router.get('/orders', AutenticacaoUs, new ListOrderController().handle);
router.get('/order/details', AutenticacaoUs, new DetailOrderController().handle);

router.put('/order/finish', AutenticacaoUs, new FinzalizarPedidoController().handle)

export {router};