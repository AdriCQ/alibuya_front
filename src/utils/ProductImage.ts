import { IProductImage } from "@/types";

export class ProductImage {
  private _images: IProductImage;
  private _default = 'img/png/empty-cart.png';

  constructor(images?: IProductImage) {
    if (images) {
      this._images = images;
    }
    else {
      this._images = {
        id: 0,
        paths: {},
        tags: []
      }
    }
  }

  get tags() {
    if (this._images.tags) {
      return this._images.tags;
    }
  }

  get sm() {
    if (this._images.paths.sm) {
      return this._images.paths.sm
    }
    else {
      return this._default;
    }
  }

  get xs() {
    if (this._images.paths.xs) {
      return this._images.paths.xs
    }
    else {
      return this._default;
    }
  }

  get md() {
    if (this._images.paths.md) {
      return this._images.paths.md
    }
    else {
      return this._default;
    }
  }

  get lg() {
    if (this._images.paths.lg) {
      return this._images.paths.lg
    }
    else {
      return this._default;
    }
  }

  get xl() {
    if (this._images.paths.xl) {
      return this._images.paths.xl
    }
    else {
      return this._default;
    }
  }
}