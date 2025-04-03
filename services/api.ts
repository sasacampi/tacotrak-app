import tacoData from "../assets/taco.data.json";

export const api = {
  getAlimentos: () => tacoData,
  searchAlimento: (query: string) =>
    tacoData.filter((item) =>
      item.nome.toLowerCase().includes(query.toLowerCase())
    ),
};
