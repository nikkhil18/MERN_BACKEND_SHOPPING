import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProduct,
  updateProduct,
} from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';

const UpdateProduct = ({ match }) => {
  const { user, authToken } = isAutheticated();
  useEffect(() => {
    document.title = 'eCommerce | Update Product';
    preLoad(match.params.productId);
  }, []);

  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    stock: '',
    photo: '',
    loading: false,
    error: '',
    updatedProduct: '',
    formData: '',
    updating: false,
  });

  const {
    name,
    description,
    price,
    categories,
    stock,
    loading,
    error,
    updatedProduct,
    formData,
    updating,
    photo,
  } = state;

  const preLoad = async (productId) => {
    setState({ ...state, loading: true });
    try {
      const product = await getProduct(productId);
      if (product.error) {
        return setState({
          ...state,
          error: product.error,
          updatedProduct: '',
          loading: false,
        });
      }
      const { name, description, price, category, stock } = product;
      setState({
        ...state,
        name: name,
        description: description,
        price: price,
        category: category._id,
        stock: stock,
        formData: new FormData(),
      });
      preLoadCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const preLoadCategories = async () => {
    try {
      const categories = await getCategories();
      if (categories.error) {
        return setState({ ...state, error: categories.error });
      }
      setState({ categories: categories, formData: new FormData() });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setState({ ...state, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, error: '', updating: true });
    updateProduct(match.params.productId, user._id, authToken, formData)
      .then((data) => {
        if (data.error) {
          setState({ ...state, error: data.error, updating: false });
        } else {
          setState({
            ...state,
            name: '',
            description: '',
            price: '',
            error: '',
            photo: '',
            updating: false,
            updatedProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const updateProductForm = () => (
    <form>
      <span>Product image</span>
      <div className='form-group'>
        <label className='btn btn-block btn-success'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image'
            placeholder='choose a file'
          />
        </label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('name')}
          name='photo'
          className='form-control'
          placeholder='Product name'
          value={name}
        />
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          name='photo'
          className='form-control'
          placeholder='Description'
          value={description}
        />
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
        />
      </div>
      <div className='form-group'>
        <select
          onChange={handleChange('category')}
          className='form-control'
          placeholder='Category'
        >
          <option>Change category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('stock')}
          type='number'
          className='form-control'
          placeholder='Stock'
          value={stock}
        />
      </div>
      <button type='submit' onClick={onSubmit} className='btn btn-success mb-3'>
        Update Product
      </button>
    </form>
  );

  const goBack = () => {
    return (
      <div className='mt-1'>
        <Link to='/admin/products' className='btn btn-sm text-white  mb-3'>
          <i className='fas fa-backward'></i> Go Back
        </Link>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-12 text-left'>
          <div
            className='alert alert-success'
            style={{ display: updatedProduct ? '' : 'none' }}
          >
            <i className='fas fa-check-circle'> </i> Product updated
            successfully.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-12  text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            <i className='fas fa-exclamation-circle'></i> {error}
          </div>
        </div>
      </div>
    );
  };
  const updatingMessage = () => {
    return (
      <div className='row'>
        <div className='col-12  text-left'>
          <div
            className='alert alert-danger'
            style={{ display: updating ? '' : 'none' }}
          >
            <i className='fas fa-spinner'></i> Updating product...
          </div>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className='row'>
          <div className='col-12  text-left'>
            <div className='alert alert-info'>
              <h3>
                <i className='fas fa-spinner'></i> Loading product...
              </h3>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <Base
      title='Update Product page'
      description='Here you can upate your products'
      className='container bg-info'
    >
      <div className='row text-white rounded'>
        <div className='col-mg-8 offset-md-2'>
          {goBack()}
          {loadingMessage()}
          {errorMessage()}
          {updatingMessage()}
          {successMessage()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
