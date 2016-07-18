'use strict';

function printReceipt(tags) {
  const allItems = loadAllItems();
  const items = buildItems(tags,allItems);
  const promotionsBarcode = loadPromotions()[0].barcodes;
  const cartItems = subtotalItem(items,promotionsBarcode);
  const receiptText = buildCartItemsReceipt(cartItems);
  console.log(receiptText);
}
function buildItems(tags,allItems) {
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
      const item = allItems.find(aItem=>aItem.barcode === barcode);
      items.push({itemInfo: item, count: count});
    }
  }

  return items;
}

function subtotalItem(items,promotionsBarcode) {
  let cartItems = {itemsReceipt: items, total: 0.00, saveTotal: 0.00};

  for (let cartItem of cartItems.itemsReceipt) {
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

function buildCartItemsReceipt(cartItems) {
  let receiptText = `***<没钱赚商店>收据***
`;

  for (let cartItem of cartItems.itemsReceipt) {
    const name = cartItem.itemInfo.name;
    const count = cartItem.count;
    const unit = cartItem.itemInfo.unit;
    const price = cartItem.itemInfo.price.toFixed(2);
    const subtotal = cartItem.subtotal.toFixed(2);
    receiptText += '名称：' + name + '，数量：' + count + unit + '，单价：' + price + '(元)，小计：' + subtotal + '(元)' + `
`;
  }
  receiptText += `----------------------
总计：` + cartItems.total.toFixed(2) + `(元)
节省：` + cartItems.saveTotal.toFixed(2) + `(元)
**********************`;

  return receiptText;
}

