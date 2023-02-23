export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private static isBrie(item: Item) {
    return item.name === 'Aged Brie';
  }

  private static isBackstagePass(item: Item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  private static isSulfuras(item: Item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  private static isConjured(item: Item) {
    return item.name === 'Conjured';
  }
  private static hasSellDataPassed(item: Item) {
    return item.sellIn < 0;
  }





  private static updateItemQuality(item: Item) {
    if (this.isSulfuras(item)) {
      return;
    }



    let itemQualityModifier = -1

    if (this.isConjured(item)) {
      itemQualityModifier = itemQualityModifier * 2;
    }


    if (this.isBackstagePass(item)) {
      itemQualityModifier = itemQualityModifier * -1;
      if (item.sellIn <= 10) {
        itemQualityModifier = itemQualityModifier + 1;
      }
      if (item.sellIn <= 5) {
        itemQualityModifier = itemQualityModifier + 1;
      }

      if (item.sellIn < 0) {
        item.quality = 0;
        return;
      }
    }


    if (this.isBrie(item)) {
      itemQualityModifier = itemQualityModifier * -1;
    }

    if (this.hasSellDataPassed(item)) {
      itemQualityModifier = itemQualityModifier * 2;
    }


    let proposedNewQuality = item.quality + itemQualityModifier;
    if (proposedNewQuality < 0)
      proposedNewQuality = 0;
    if (proposedNewQuality > 50)
      proposedNewQuality = 50;


    item.quality =  proposedNewQuality;
  }


  updateQuality() {
    this.items.forEach(item => {
      GildedRose.updateItemQuality(item);
      item.sellIn = item.sellIn - 1;
    });
  }

  updateQualityBackup() {
    this.items.forEach(item => {
      if (!GildedRose.isBrie(item) && !GildedRose.isBackstagePass(item)) {
        if (item.quality > 0 && !GildedRose.isSulfuras(item)) {
          item.quality = item.quality - 1
        }

      } else if (item.quality < 50) {
        item.quality = item.quality + 1
        if (GildedRose.isBackstagePass(item)) {
          if (item.sellIn < 11 && item.quality < 50) {
            item.quality = item.quality + 1
          }
          if (item.sellIn < 6 && item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
      if (!GildedRose.isSulfuras(item)) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (!GildedRose.isBrie(item)) {
          if (!GildedRose.isBackstagePass(item)) {
            if (item.quality > 0 && !GildedRose.isSulfuras(item)) {
              item.quality = item.quality - 1
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    });

    return this.items;
  }

}
