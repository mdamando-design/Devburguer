import * as yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = yup.object({
      name: yup.string().required(),
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
      return response.status(400).json({ error: 'Category image is required' });
    }

    const { name } = request.body;
    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.create({
      name,
      path: uploadedFile.filename,
    });

    return response.status(201).json(category);
  }

  async update(request, response) {
    const schema = yup.object({
      name: yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({
        error: 'Validation failed',
        messages: error.errors,
      });
    }

    const { id } = request.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const uploadedFile = Array.isArray(request.files)
      ? request.files[0]
      : request.file;

    const { name } = request.body;
    const payload = {};

    if (name) {
      payload.name = name;
    }

    if (uploadedFile) {
      payload.path = uploadedFile.filename;
    }

    if (Object.keys(payload).length === 0) {
      return response.status(400).json({ error: 'No data to update' });
    }

    await category.update(payload);

    return response.status(200).json(category);
  }

  async index(_request, response) {
    const categories = await Category.findAll();

    return response.status(200).json(categories);
  }
}

export default new CategoryController();
