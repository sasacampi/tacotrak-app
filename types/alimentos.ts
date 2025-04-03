declare module "*.json" {
  const value: Array<{
    id: number;
    nome: string;
    calorias: number;
    proteinas: number;
    carboidratos: number;
  }>;
  export default value;
}
