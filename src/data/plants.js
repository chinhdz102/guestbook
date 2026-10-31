export const categories = [
  { id: 'air', title: 'Fresh Air Favorites', description: 'Leafy greens to freshen up your favorite corners.' },
  { id: 'easy', title: 'Easy-Care Essentials', description: 'Low-maintenance companions for everyday living.' },
  { id: 'statement', title: 'Statement Plants', description: 'Big leaves and bold personalities for your space.' }
];

export const plants = [
  { id:'snake-plant', name:'Snake Plant', price:24, category:'air', description:'Elegant upright leaves with golden edges.' },
  { id:'peace-lily', name:'Peace Lily', price:29, category:'air', description:'Glossy leaves and soft white blooms.' },
  { id:'spider-plant', name:'Spider Plant', price:18, category:'air', description:'Beautiful flowing green and white foliage.' },
  { id:'areca-palm', name:'Areca Palm', price:45, category:'air', description:'Tropical fronds for a sunny interior.' },
  { id:'boston-fern', name:'Boston Fern', price:27, category:'air', description:'Soft arching fronds and lush texture.' },
  { id:'rubber-plant', name:'Rubber Plant', price:36, category:'air', description:'Rich green leaves with a polished finish.' },

  { id:'zz-plant', name:'ZZ Plant', price:32, category:'easy', description:'Resilient stems with glossy green leaves.' },
  { id:'golden-pothos', name:'Golden Pothos', price:19, category:'easy', description:'A cheerful cascading trailing plant.' },
  { id:'aloe-vera', name:'Aloe Vera', price:17, category:'easy', description:'Spiky succulent leaves in a neat rosette.' },
  { id:'jade-plant', name:'Jade Plant', price:22, category:'easy', description:'A miniature tree with rounded succulent leaves.' },
  { id:'ponytail-palm', name:'Ponytail Palm', price:39, category:'easy', description:'A playful fountain of narrow green leaves.' },
  { id:'chinese-evergreen', name:'Chinese Evergreen', price:28, category:'easy', description:'Easygoing foliage with lovely variegation.' },

  { id:'monstera', name:'Monstera Deliciosa', price:48, category:'statement', description:'Iconic split leaves and a tropical feel.' },
  { id:'fiddle-leaf-fig', name:'Fiddle-Leaf Fig', price:65, category:'statement', description:'Tall, bold, violin-shaped green leaves.' },
  { id:'bird-of-paradise', name:'Bird of Paradise', price:58, category:'statement', description:'Broad, architectural tropical foliage.' },
  { id:'calathea', name:'Calathea Orbifolia', price:42, category:'statement', description:'Rounded leaves with silvery stripes.' },
  { id:'pink-princess', name:'Pink Princess Philodendron', price:59, category:'statement', description:'Dark green foliage with pink accents.' },
  { id:'anthurium', name:'Anthurium', price:35, category:'statement', description:'Heart-shaped leaves and bright red spathes.' }
].map((plant) => ({ ...plant, image:'/assets/plants/' + plant.id + '.svg' }));

export const plantById = Object.fromEntries(plants.map((plant) => [plant.id, plant]));
export const formatPrice = (amount) => new Intl.NumberFormat('en-US', {
  style:'currency', currency:'USD', minimumFractionDigits:2
}).format(amount);
