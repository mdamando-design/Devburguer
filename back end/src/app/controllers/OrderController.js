
import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';


class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required().min(1),
          }).noUnknown(true),
        ),
    }).noUnknown(true);

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { userId } = request;
    const userName = request.userName ?? request.username ?? 'User';
    const { products } = request.body;
    const productsIds = products.map((product) => product.id);

    const findedProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
        include: {
            model: Category,
            as: 'category',
            attributes: ['name'],
        }
      
    });

    const orderProducts = products.map((item) => {
      const product = findedProducts.find((dbProduct) => dbProduct.id === item.id);

      if (!product) {
        return null;
      }

      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category ? product.category.name : null,
        quantity: item.quantity,
        url: product.url
      };
    }).filter(Boolean);

    const orderData = {
      user: {
        id: userId,
        name: userName,
      },
      products: orderProducts,
      status:"Pedido realizado"
    };

    const newOrder = await Order.create(orderData);

    return response.status(201).json(newOrder);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    }).noUnknown(true);

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { id } = request.params;
    const { status } = request.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedOrder) {
      return response.status(404).json({ error: 'Pedido não encontrado' });
    }

    return response.status(200).json(updatedOrder);
  }

  async index(request, response){
    const orders = await Order.find()

    return response.status(200).json(orders)
  }

}

export default new OrderController();
