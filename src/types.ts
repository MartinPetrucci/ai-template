export type CompletionResponse = {
  completion: string;
};

export type CompletionParams = {
  prompt: string;
  model: Model;
  max_tokens?: number;
  temperature?: number;
};

export enum Model {
  DAVINCI = "text-davinci-003",
  CURIE = "text-curie-001",
  BABBAGE = "text-babbage-001",
  ADA = "text-ada-001",
}

export const MODELS = [
  {
    name: Model.ADA,
    commercialName: "Ada",
    pricing: 0.0004,
  },
  {
    name: Model.BABBAGE,
    commercialName: "Babbage",
    pricing: 0.0005,
  },
  {
    name: Model.CURIE,
    commercialName: "Curie",
    pricing: 0.002,
  },
  {
    name: Model.DAVINCI,
    commercialName: "Davinci",
    pricing: 0.02,
  },
];


