'use strict';

function buildItems(barcodes) {
  let items = [];

  for (let bar of barcodes) {
    const splitBarcode = bar.split('-');
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

