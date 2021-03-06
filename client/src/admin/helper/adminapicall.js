// Create Category
export const createCategory = (userId, authToken, name) => {
  return fetch(`/api/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// GET a category
export const getCategory = async (categoryId) => {
  try {
    const category = await fetch(`/api/category/${categoryId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return category.json();
  } catch (error) {
    console.log(error);
  }
};

// DELETE a category
export const deleteCategory = async (userId, authToken, categoryId) => {
  try {
    const deletedCategory = await fetch(
      `/api/category/${categoryId}/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return deletedCategory.json();
  } catch (error) {
    console.log(error);
  }
};

// UPDATE a category
export const updateCategory = async (userId, authToken, categoryId, name) => {
  try {
    const updatedCategory = await fetch(
      `/api/category/${categoryId}/${userId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(name),
      }
    );
    return updatedCategory.json();
  } catch (error) {
    console.log(error);
  }
};

// GET all categories
export const getCategories = () => {
  return fetch(`/api/categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Create product
export const createProduct = (userId, authToken, formData) => {
  return fetch(`/api/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// GET all products
export const getProducts = () => {
  return fetch(`/api/products`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Delete a product
export const deleteProduct = (userId, authToken, productId) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Get a product
export const getProduct = (productId) => {
  return fetch(`/api/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Update a product
export const updateProduct = (productId, userId, authToken, formData) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    methode: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
