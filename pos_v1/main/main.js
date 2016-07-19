'use strict';

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

function subtotalCartItem(items,promotions) {
  let cartItems = {itemsReceipt: items, saveTotal: 0, total: 0};

  for (let item of cartItems.itemsReceipt) {
    const exitPromotion = promotions.find(promotionsBarcode=>promotionsBarcode === item.itemInfo.barcode);
    item.save = exitPromotion?parseInt((item.count / 3)) * item.itemInfo.price:0;
    const total = item.itemInfo.price * item.count;
    item.subtotal = total - item.save;
    cartItems.saveTotal += item.save;
    cartItems.total += item.subtotal;
  }

  return cartItems;
}