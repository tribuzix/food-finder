export type Cuisine = "Churrasco" | "Peixes" | "Hamburguer" | "Baiana";

export interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  cuisine: Cuisine;
  distance: number;
  rating: number;
  reviewCount: number;
  image: string;
  heroImage: string;
  address: string;
  city: string;
  hours: string;
  priceRange: string;
  description: string;
  tags: string[];
  reviews: Review[];
  tables: number;
}

export interface Reel {
  id: number;
  restaurantId: number;
  restaurantName: string;
  distance: number;
  description: string;
  rating: number;
  image: string;
  likes: number;
  comments: number;
}

export interface ProfileReview {
  id: number;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  rating: number;
  text: string;
}

const AVATARS = {
  user1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
  user2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
  user3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
  user4: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
  mariana: "https://images.unsplash.com/photo-1562337404-3044c84ac061?w=100&h=100&fit=crop&auto=format",
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Nativos",
    category: "Churrascaria Tradicional",
    cuisine: "Churrasco",
    distance: 95,
    rating: 5.0,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1558030089-02acba3c214e?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1558030089-02acba3c214e?w=800&h=500&fit=crop&auto=format",
    address: "Rua das Palmeiras, 142",
    city: "Santo Amaro, SP",
    hours: "12h – 23h",
    priceRange: "$$$",
    description: "O melhor churrasco gaúcho da região, com cortes nobres e tradição de décadas. Ambiente acolhedor para família e amigos.",
    tags: ["Churrasco", "Familiar", "Rodízio"],
    reviews: [
      { id: 1, userName: "Carlos Mendes", userAvatar: AVATARS.user1, rating: 5, date: "Ontem", text: "Incrível! A picanha era perfeita, bem temperada e suculenta. Atendimento nota 10." },
      { id: 2, userName: "Ana Lima", userAvatar: AVATARS.user2, rating: 5, date: "3 dias atrás", text: "Atendimento excelente e a carne estava no ponto certo. Voltarei com certeza!" },
    ],
    tables: 12,
  },
  {
    id: 2,
    name: "Sul & Norte",
    category: "Churrascaria Tradicional",
    cuisine: "Churrasco",
    distance: 95,
    rating: 5.0,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1755437103545-6aca71afa6b7?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1755437103545-6aca71afa6b7?w=800&h=500&fit=crop&auto=format",
    address: "Av. Brasil, 890",
    city: "Santo Amaro, SP",
    hours: "11h30 – 22h",
    priceRange: "$$$",
    description: "O melhor rodízio de carnes nobres da região, preparado com a autêntica tradição gaúcha. Cada corte selecionado à mão pelos nossos chefs.",
    tags: ["Churrasco", "Rodízio", "Premium"],
    reviews: [
      { id: 1, userName: "Pedro Costa", userAvatar: AVATARS.user3, rating: 5, date: "2 dias atrás", text: "Experiência única! O cordeiro estava sensacional. Ambiente impecável." },
      { id: 2, userName: "Sofia Andrade", userAvatar: AVATARS.user4, rating: 5, date: "5 dias atrás", text: "Melhor rodízio de SP! Os garçons são super atenciosos e a carne nunca para." },
    ],
    tables: 8,
  },
  {
    id: 3,
    name: "Carnes",
    category: "Churrascaria Tradicional",
    cuisine: "Churrasco",
    distance: 95,
    rating: 5.0,
    reviewCount: 201,
    image: "https://images.unsplash.com/photo-1709433420574-7e8b97952eed?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1709433420574-7e8b97952eed?w=800&h=500&fit=crop&auto=format",
    address: "Rua XV de Novembro, 55",
    city: "Santo Amaro, SP",
    hours: "12h – 23h30",
    priceRange: "$$$$",
    description: "Especialistas em cortes finos e preparações artesanais. Cada prato é uma obra de arte culinária. Vinhos selecionados e harmonizados para cada corte.",
    tags: ["Premium", "Gourmet", "Cortes Finos"],
    reviews: [
      { id: 1, userName: "Luísa Ferreira", userAvatar: AVATARS.user4, rating: 5, date: "Hoje", text: "Melhor churrasco que já comi na vida. O ancho estava absolutamente perfeito!" },
      { id: 2, userName: "Bruno Martins", userAvatar: AVATARS.user1, rating: 5, date: "3 dias atrás", text: "O wagyu foi uma experiência transformadora. Vale cada centavo." },
    ],
    tables: 20,
  },
  {
    id: 4,
    name: "Peixes",
    category: "Gourmet Rodízio",
    cuisine: "Peixes",
    distance: 431,
    rating: 0.5,
    reviewCount: 12,
    image: "https://images.unsplash.com/photo-1578935149228-66b184c83e69?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1578935149228-66b184c83e69?w=800&h=500&fit=crop&auto=format",
    address: "Rua do Porto, 23",
    city: "Santo Amaro, SP",
    hours: "12h – 22h",
    priceRange: "$$",
    description: "Frutos do mar frescos do dia, preparados com técnicas tradicionais e toques modernos. Vista para o rio.",
    tags: ["Frutos do Mar", "Marisco", "Fresh"],
    reviews: [
      { id: 1, userName: "João Silva", userAvatar: AVATARS.user1, rating: 1, date: "1 semana atrás", text: "Esperava mais... O peixe não estava tão fresco quanto prometido no cardápio." },
    ],
    tables: 15,
  },
  {
    id: 5,
    name: "Resenha's Burguer",
    category: "Gourmet Rodízio",
    cuisine: "Hamburguer",
    distance: 102,
    rating: 4.0,
    reviewCount: 347,
    image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&h=500&fit=crop&auto=format",
    address: "Av. Paulista, 1200",
    city: "Santo Amaro, SP",
    hours: "11h – 23h",
    priceRange: "$$",
    description: "O melhor hambúrguer artesanal de Sto Amaro. Pão brioche fresquinho assado na hora e blend especial da casa com duas carnes.",
    tags: ["Artesanal", "Smash Burger", "Delivery"],
    reviews: [
      { id: 1, userName: "Mariana Silva", userAvatar: AVATARS.mariana, rating: 5, date: "Ontem", text: "Melhor hambúrguer artesanal de Sto Amaro! O blend da casa é completamente diferenciado." },
      { id: 2, userName: "Roberto Alves", userAvatar: AVATARS.user3, rating: 4, date: "4 dias atrás", text: "Muito bom! O blend é diferenciado, a fila andou rápido e valeu a pena esperar." },
      { id: 3, userName: "Camila Torres", userAvatar: AVATARS.user2, rating: 4, date: "1 semana atrás", text: "O smash burger estava perfeito. As fritas crocantes são destaque!" },
    ],
    tables: 10,
  },
  {
    id: 6,
    name: "Na Broca",
    category: "Comida Típica Baiana",
    cuisine: "Baiana",
    distance: 115,
    rating: 5.0,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1717158499326-bb38255fd353?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1717158499326-bb38255fd353?w=800&h=500&fit=crop&auto=format",
    address: "Rua da Bahia, 78",
    city: "Santo Amaro, SP",
    hours: "10h – 22h",
    priceRange: "$$",
    description: "Tempero baiano legítimo, moqueca saborosa e acarajé de dar água na boca. Bem-vindo à Bahia em pleno SP!",
    tags: ["Baiana", "Moqueca", "Acarajé"],
    reviews: [
      { id: 1, userName: "Mariana Silva", userAvatar: AVATARS.mariana, rating: 4, date: "3 dias atrás", text: "Tempero baiano legítimo, moqueca saborosa e ambiente muito aconchegante!" },
      { id: 2, userName: "Fernanda Rocha", userAvatar: AVATARS.user2, rating: 5, date: "1 semana atrás", text: "Me lembrou minha vó na Bahia. Completamente autêntico. O acarajé então..." },
    ],
    tables: 18,
  },
  {
    id: 7,
    name: "Laricas",
    category: "Comida Típica Baiana",
    cuisine: "Baiana",
    distance: 115,
    rating: 5.0,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1727522793234-2e108fc0460b?w=400&h=300&fit=crop&auto=format",
    heroImage: "https://images.unsplash.com/photo-1727522793234-2e108fc0460b?w=800&h=500&fit=crop&auto=format",
    address: "Travessa das Flores, 14",
    city: "Santo Amaro, SP",
    hours: "11h – 21h",
    priceRange: "$",
    description: "Comida caseira baiana com ingredientes frescos do mercado toda manhã. Um sabor que aquece a alma e abraça o coração.",
    tags: ["Caseiro", "Baiana", "Econômico"],
    reviews: [
      { id: 1, userName: "Gustavo Nunes", userAvatar: AVATARS.user1, rating: 5, date: "2 dias atrás", text: "Melhor bobó de camarão que já provei! Preço justo e porção muito generosa." },
      { id: 2, userName: "Isabela Matos", userAvatar: AVATARS.user4, rating: 5, date: "4 dias atrás", text: "A moqueca de peixe é de chorar de tão boa. Virei cliente fiel!" },
    ],
    tables: 6,
  },
];

export const reels: Reel[] = [
  {
    id: 1,
    restaurantId: 2,
    restaurantName: "Sul & Norte",
    distance: 1.2,
    description: "O melhor rodízio de carnes nobres da região, preparado com a autêntica tradição gaúcha. 🔥🥩",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1558030089-02acba3c214e?w=800&h=1400&fit=crop&auto=format",
    likes: 1200,
    comments: 348,
  },
  {
    id: 2,
    restaurantId: 5,
    restaurantName: "Resenha's Burguer",
    distance: 1.02,
    description: "Blend artesanal com queijo derretido e molho especial da casa. Um clássico reinventado! 🍔",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&h=1400&fit=crop&auto=format",
    likes: 892,
    comments: 156,
  },
  {
    id: 3,
    restaurantId: 6,
    restaurantName: "Na Broca",
    distance: 1.15,
    description: "Moqueca de camarão com leite de coco e dendê. A Bahia em cada colherada! 🦐",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1717158499326-bb38255fd353?w=800&h=1400&fit=crop&auto=format",
    likes: 654,
    comments: 89,
  },
  {
    id: 4,
    restaurantId: 3,
    restaurantName: "Carnes",
    distance: 0.95,
    description: "Picanha na brasa com chimichurri artesanal. Um espetáculo de sabores para os sentidos! 🔥",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1709433420574-7e8b97952eed?w=800&h=1400&fit=crop&auto=format",
    likes: 2100,
    comments: 412,
  },
];

export const PROFILE = {
  name: "Mariana Silva",
  handle: "@mari_silva",
  location: "Sto Amaro, SP",
  bio: "Amante da culinária brasileira e caçadora de bons churrascos 🔥🥩 Sempre em busca dos melhores temperos paulistas!",
  avatar: "https://images.unsplash.com/photo-1562337404-3044c84ac061?w=300&h=300&fit=crop&auto=format",
  reviewsCount: 48,
  photosCount: 124,
  favoritesCount: 18,
  recentReviews: [
    {
      id: 1,
      restaurantName: "Resenha's Burguer",
      restaurantImage: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=100&h=100&fit=crop&auto=format",
      date: "Ontem",
      rating: 5,
      text: "Melhor hambúrguer artesanal de Sto Amar...",
    },
    {
      id: 2,
      restaurantName: "Na Broca",
      restaurantImage: "https://images.unsplash.com/photo-1717158499326-bb38255fd353?w=100&h=100&fit=crop&auto=format",
      date: "3 dias atrás",
      rating: 4,
      text: "Tempero baiano legítimo, moqueca sabor...",
    },
  ] as ProfileReview[],
};
