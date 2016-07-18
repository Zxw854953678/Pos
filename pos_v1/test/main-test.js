'use strict';

describe('pos', () => {
  describe('unit test', ()=> {

    describe('test : buildItems function', ()=> {
      let tags;

      beforeEach(() => {
        tags = [
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000003-2',
          'ITEM000005',
          'ITEM000005',
          'ITEM000005'
        ];
      });

      it('print items1', () => {
        let items = buildItems(['ITEM000001', 'ITEM000001-2', 'ITEM000005']);

        const expectItems = [
          {
            itemInfo: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 3
          },
          {
            itemInfo: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 1
          }
        ];

        expect(items).toEqual(expectItems);
      });

      it('print items2', () => {
        let items = buildItems(tags);

        const expectItems = [
          {
            itemInfo: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          {
            itemInfo: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          {
            itemInfo: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          }
        ];

        expect(items).toEqual(expectItems);
      });
    });

    describe('test : subtotalItem function', ()=> {
      let items;

      beforeEach(()=> {
        items = items = [
          {
            itemInfo: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          {
            itemInfo: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          {
            itemInfo: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          }
        ];
      });

      it('print correct cartItems', ()=> {
        let cartItems = subtotalItem(items);

        const expectCartItems = {
          itemsReceipt: [
            {
              itemInfo: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 5,
              save: 3.00,
              subtotal: 12.00
            },
            {
              itemInfo: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2,
              save: 0,
              subtotal: 30.00
            },
            {
              itemInfo: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3,
              save: 4.50,
              subtotal: 9.00
            }
          ],
          saveTotal: 7.50,
          total: 51.00
        };

        expect(cartItems).toEqual(expectCartItems);
      });
    });

    describe('test : buildCartItemsReceipt function',()=>{
      let cartItems;

      beforeEach(()=>{
        cartItems = {
          itemsReceipt: [
            {
              itemInfo: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
              },
              count: 5,
              save: 3.00,
              subtotal: 12.00
            },
            {
              itemInfo: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2,
              save: 0,
              subtotal: 30.00
            },
            {
              itemInfo: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3,
              save: 4.50,
              subtotal: 9.00
            }
          ],
          saveTotal: 7.50,
          total: 51.00
        };
      });

      it('print cartItemsText',()=>{
        let cartItemsText = buildCartItemsReceipt(cartItems);

        const expectCartItemsText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

        expect(cartItemsText).toEqual(expectCartItemsText);
      })
    });
  });

  describe('integration test', ()=> {
    let tags;

    beforeEach(() => {
      tags = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
      ];
    });

    it('should print text', () => {

      spyOn(console, 'log');

      printReceipt(tags);

      const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

      expect(console.log).toHaveBeenCalledWith(expectText);
    });
  });
});
