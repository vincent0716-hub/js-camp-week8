// ========================================
// API 請求函式
// ========================================

const axios = require("axios");
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require("./config");

// ========== 客戶端 API ==========
//test git push

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
  const res = await axios.get(url);
  return res.data.products;
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const res = await axios.get(url);
  return {
    carts: res.data.carts,
    total: res.data.total,
    finalTotal: res.data.finalTotal,
  };
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  const payload = {
    data: { productId, quantity },
  };
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const res = await axios.post(url, payload);
  return res.data;
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  const payload = {
    data: { id: cartId, quantity },
  };
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const res = await axios.patch(url, payload);
  return res.data;
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`;
  const res = await axios.delete(url);
  return res.data;
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const res = await axios.delete(url);
  return res.data;
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  const payload = {
    data: { user: userInfo },
  };
  const url = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`;
  const res = await axios.post(url, payload);
  return res.data;
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  const url = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
  const res = await axios.get(url, { headers: { authorization: ADMIN_TOKEN } });
  return res.data.orders;
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  const payload = {
    data: {
      id: orderId,
      paid: isPaid,
    },
  };
  const config = {
    headers: { authorization: ADMIN_TOKEN },
  };
  const url = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
  const res = await axios.put(url, payload, config);
  return res.data;
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  const url = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`;
  const res = await axios.delete(url, {
    headers: { authorization: ADMIN_TOKEN },
  });
  return res.data;
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
