'use strict';

function buildItems(tags) {
  let items = [];

  for (let tag of tags) {
    const splitBarcode = tag.split('-');
    const barcode = splitBarcode[0];
    const count = parseFloat((splitBarcode[1]) || 1);

    const exitItem = items.find(item=>item.itemInfo.barcode === barcode);
    if (exitItem) {
      exitItem.count += count;
    }
    else {
      const allItems = loadAllItems();
      const item = allItems.find(aItem=>aItem.barcode === barcode);
      items.push({itemInfo: item, count: count});
    }
  }

  return items;
}

function subtotalItem(items) {
  let cartItems = {itemsReceipt: items, total: 0.00, saveTotal: 0.00};

  for (let cartItem of cartItems.itemsReceipt) {
    const promotionsBarcode = loadPromotions()[0].barcodes;
    const barcode = cartItem.itemInfo.barcode;

    const havePromotion = promotionsBarcode.find(promotionBarcode=>promotionBarcode === barcode);
    if (havePromotion) {
      let save = Math.floor(cartItem.count / 3) * cartItem.itemInfo.price;
      cartItem.save = save;
      cartItems.saveTotal += save;
    }
    else {
      cartItem.save = 0;
    }
    let total = cartItem.itemInfo.price * cartItem.count;
    cartItem.subtotal = total - cartItem.save;
    cartItems.total += cartItem.subtotal;
  }

  return cartItems;
}

