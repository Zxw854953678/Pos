'use strict';

function printReceipt(tags) {
  const allItems = loadAllItems();
  const items = buildItems(tags, allItems);
  const promotions = loadPromotions();
  const cartItems = subtotalCartItem(items, promotions);

  console.log(buildCartItemsReceipt(cartItems));
}
function buildItems(tags, allItems) {
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
}

function subtotalCartItem(items, promotions) {
  let cartItems = {itemsReceipt: items, saveTotal: 0, total: 0};

  for (let item of cartItems.itemsReceipt) {
    const exitPromotion = promotions.find(promotions=>promotions.barcodes.includes(item.itemInfo.barcode));
    item.save = exitPromotion ? parseInt((item.count / 3)) * item.itemInfo.price : 0;
    item.subtotal = item.itemInfo.price * item.count - item.save;
    cartItems.saveTotal += item.save;
    cartItems.total += item.subtotal;
  }

  return cartItems;
}

function buildCartItemsReceipt(cartItems) {
  let receiptItems = '';
  for (let cartItemsReceipt of cartItems.itemsReceipt) {
    receiptItems += `
名称：${cartItemsReceipt.itemInfo.name}，数量：${cartItemsReceipt.count}${cartItemsReceipt.itemInfo.unit}，单价：${cartItemsReceipt.itemInfo.price.toFixed(2)}(元)，小计：${cartItemsReceipt.subtotal.toFixed(2)}(元)`;
  }

  return `***<没钱赚商店>收据***${receiptItems}
----------------------
总计：${cartItems.total.toFixed(2)}(元)
节省：${cartItems.saveTotal.toFixed(2)}(元)
**********************`;
}