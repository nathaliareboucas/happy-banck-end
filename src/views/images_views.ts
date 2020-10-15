import Image from '../models/Image';

export default {
  
  //TODO: Utilizar variáveis de ambiente no lugar da URL fixa ambiente dev
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }

}