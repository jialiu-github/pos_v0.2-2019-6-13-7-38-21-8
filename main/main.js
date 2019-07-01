'use strict';

function printReceipt(inputs) {
  const items = findItemsByBarcode(inputs);
  const goods = groupItemsByBarcode(items);
  const receipt = buildReceiptHeader() + buildReceiptBody(goods) + buildReceiptFooter(goods);
  console.log(receipt);
}

function findItemsByBarcode(barcodes){
  const allItems = loadAllItems();
  return barcodes.map(b => allItems.find(i => i.barcode === b));
}

function groupItemsByBarcode(items) {
  return items.reduce((acc, current) => {
    if(acc.find(a => a.barcode === current.barcode)){
      return acc;
    }
    acc.push({...current, count: items.filter(g => g.barcode === current.barcode).length});
    return acc;
  }, []);
}

function buildReceiptHeader() {
  return '***<没钱赚商店>收据***\n';
}

function buildReceiptBody(goods){
  return goods.reduce((acc, current) => {
    acc += `名称：${current.name}，数量：${current.count}${current.unit}，单价：${current.price.toFixed(2)}(元)，小计：${(current.count * current.price).toFixed(2)}(元)\n`;
    return acc;
  },'')
}

function buildReceiptFooter(goods) {
  return `----------------------
总计：${goods.reduce((acc, current) => acc += current.price * current.count, 0).toFixed(2)}(元)
**********************`
}
// 名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)
// 名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)
// 名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}


