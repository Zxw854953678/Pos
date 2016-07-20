'use strict';

let printReceipt = (tags) =>{
  const allItems = loadAllItems();
  const items = buildItems(tags, allItems);
  const promotions = loadPromotions();
  const cartItems = subtotalCartItems(items, promotions);

  const receipt = totalCartItems(cartItems);
  const receiptText = buildCartItemsReceipt(receipt);

  console.log(receiptText);
};

let buildItems = (tags, allItems)=> {
  let items = [];

  for (let tag of tags) {
    const splitTag = tag.split('-');
    const barcode = splitTag[0];
    const count = parseFloat(splitTag[1] || 1);

    let exitItem = items.find(item=>item.itemInfo.barcode === barcode);

    if (exitItem) {
      exitItem.count += count;
    } else {
      const item = allItems.find(aItem=>aItem.barcode === barcode);
      items.push({itemInfo: item, count: count})
    }
  }

  return items;
};

let subtotalCartItems = (items, promotions)=> {
  return items.map(cartItem=> {
    let promotionType = getPromotionType(cartItem.itemInfo.barcode, promotions);
    let {subtotal, save}= discount(cartItem, promotionType);
    return {cartItem, subtotal, save};
  });
};

let getPromotionType = (barcode, promotions)=> {
  let promotionType = promotions.find(promotion=>promotion.barcodes.includes(barcode));

  return promotionType ? promotionType.type : '';
};

let discount = (cartItem, promotionType)=> {
  let freeItemCount = 0;

  if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
    freeItemCount = parseInt(cartItem.count / 3);
  }

  let save = freeItemCount * cartItem.itemInfo.price;
  let subtotal = cartItem.itemInfo.price * cartItem.count - save;
  return {subtotal, save};
};

let totalCartItems = (cartItems)=> {
  let saveTotal = 0;
  let total = 0;
  for (let cartItem of cartItems) {
    saveTotal += cartItem.save;
    total += cartItem.subtotal;
  }

  return {cartItems, saveTotal, total};
};

let buildCartItemsReceipt = (cartItemsReceipt)=> {

  let cartItemsText = cartItemsReceipt.cartItems.map(cartItemReceipt=> {
   const cartItem = cartItemReceipt.cartItem;
    return `名称：${cartItem.itemInfo.name}，\
数量：${cartItem.count}${cartItem.itemInfo.unit}，\
单价：${formatMoney(cartItem.itemInfo.price)}(元)，\
小计：${formatMoney(cartItemReceipt.subtotal)}(元)`;
  }).join('\n');

  return `***<没钱赚商店>收据***
${cartItemsText}
----------------------
总计：${formatMoney(cartItemsReceipt.total)}(元)
节省：${formatMoney(cartItemsReceipt.saveTotal)}(元)
**********************`
};

let formatMoney = (money)=> {
  return money.toFixed(2);
};


