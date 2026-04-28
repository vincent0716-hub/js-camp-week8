// ========================================
// 購物車服務
// ========================================

const {
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../api");
const { validateCartQuantity, formatCurrency } = require("../utils");

/**
 * 取得購物車
 * @returns {Promise<Object>}
 */
async function getCart() {
  // 請實作此函式
  // 提示：呼叫 fetchCart() 取得購物車資料並回傳
  const fetchedData = await fetchCart();
  return fetchedData;
}

/**
 * 加入商品到購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>}
 */
async function addProductToCart(productId, quantity) {
  // 請實作此函式
  // 提示：先用 utils validateCartQuantity() 驗證數量，驗證失敗時回傳 { success: false, error: ... }
  // 驗證通過後，呼叫 addToCart() 加入購物車
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  const validObj = validateCartQuantity(quantity);
  if (!validObj.isValid) {
    return { success: false, error: validObj.error };
  }
  const fetchedData = await addToCart(productId, quantity);
  return { success: true, data: fetchedData };
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>}
 */
async function updateProduct(cartId, quantity) {
  // 請實作此函式
  // 提示：先用 utils validateCartQuantity() 驗證數量，驗證失敗時回傳 { success: false, error: ... }
  // 驗證通過後，呼叫 updateCartItem() 更新數量
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  const validObj = validateCartQuantity(quantity);

  if (!validObj.isValid) {
    return { success: false, error: validObj.error };
  }
  const fetchedData = await updateCartItem(cartId, quantity);
  return { success: true, data: fetchedData };
}

/**
 * 移除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>}
 */
async function removeProduct(cartId) {
  // 請實作此函式
  // 提示：呼叫 deleteCartItem()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  const fetchedData = await deleteCartItem(cartId);
  return { success: true, data: fetchedData };
}

/**
 * 清空購物車
 * @returns {Promise<Object>}
 */
async function emptyCart() {
  // 請實作此函式
  // 提示：呼叫 clearCart()
  // 回傳格式：{ success: true, data: ... }
  const fetchedData = await clearCart();
  if (fetchedData.status === true)
    return { success: fetchedData.status === true, data: fetchedData.carts };
  else return { success: fetchedData.status, error: fetchedData.message };
}

/**
 * 計算購物車總金額
 * @returns {Promise<Object>}
 */
async function getCartTotal() {
  // 請實作此函式
  // 提示：呼叫 fetchCart() 取得購物車資料
  // 回傳格式：{ total: 原始金額, finalTotal: 折扣後金額, itemCount: 商品筆數 }
  const fetchedData = await fetchCart();
  return {
    total: fetchedData.total,
    finalTotal: fetchedData.finalTotal,
    itemCount: fetchedData.carts.length,
  };
}

/**
 * 顯示購物車內容
 * @param {Object} cart - 購物車資料
 */
function displayCart(cart) {
  // 請實作此函式
  // 提示：先判斷購物車是否為空（cart.carts 不存在或長度為 0），若空則輸出「購物車是空的」
  // 會使用到 utils formatCurrency() 來格式化金額
  //
  // 預期輸出格式：
  // 購物車內容：
  // ----------------------------------------
  // 1. 產品名稱
  //    數量：2
  //    單價：NT$ 800
  //    小計：NT$ 1,600
  // ----------------------------------------
  // 商品總計：NT$ 1,600
  // 折扣後金額：NT$ 1,600
  if (cart.carts.length === 0) {
    console.log("購物車是空的");
  } else {
    console.log("購物車內容：");
    cart.carts.map((cartItem, ind) => {
      console.log("----------------------------------------");
      console.log(`${ind + 1}}. 產品名稱：${cartItem.name}`);
      console.log(`   數量：${cartItem.quantity}`);
      console.log(`   數量：${formatCurrency(cartItem.price)}`);
      console.log(
        `   數量：${formatCurrency(cartItem.price * cartItem.quantity)}`,
      );
    });
    console.log("----------------------------------------");
    console.log(`商品總計：${formatCurrency(cart.carts.total)}`);
    console.log(`折扣後金額：${formatCurrency(cart.carts.finalTotal)}`);
  }
}

module.exports = {
  getCart,
  addProductToCart,
  updateProduct,
  removeProduct,
  emptyCart,
  getCartTotal,
  displayCart,
};
