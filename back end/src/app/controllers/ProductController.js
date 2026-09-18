import * as yup from 'yup';
import Product from './../models/Product.js';

class ProductController {
  async store(request, response) {
    const schema = yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
      category_id: yup.number().required(),
      offer: yup.boolean().default(false),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({
        error: 'Validation failed',
        messages: error.errors,
      });
    }

    const uploadedFile = Array.isArray(request.files)
      ? request.files[0]
      : request.file;

    if (!uploadedFile) {
      return response.status(400).json({ error: 'Product image is required' });
    }

    const { name, price, category_id, offer = false } = request.body;
    const product = await Product.create({
      name,
      price,
      category_id,
      offer,
      path: uploadedFile.filename,
    });

    return response.status(201).json(product);
  }

  async update(request, response) {
    const schema = yup.object({
      name: yup.string(),
      price: yup.number(),
      category_id: yup.number(),
      offer: yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({
        error: 'Validation failed',
        messages: error.errors,
      });
    }

    const uploadedFile = Array.isArray(request.files)
      ? request.files[0]
      : request.file;

    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    const payload = {
      name,
      price,
      category_id,
      offer,
    };

    if (uploadedFile) {
      payload.path = uploadedFile.filename;
    }

    const [updatedRows] = await Product.update(payload, {
      where: {
        id,
      },
    });

    if (updatedRows === 0) {
      return response.status(404).json({ error: 'Product not found' });
    }

    const product = await Product.findByPk(id);

    return response.status(200).json(product);
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: [{
        association: 'category',
        attributes: ['id', 'name'],
      }],
    });

    return response.status(200).json(products);
  }
}

export default new ProductController();