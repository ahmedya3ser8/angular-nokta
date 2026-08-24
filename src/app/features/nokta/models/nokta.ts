export interface Nokta {
  _id: string;
  amount: number;
  date: string;
  occasionType: string;
  transactionType: string;
  user: string;
  person: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NoktaForm {
  personName: string;
  amount: number;
  transactionType: string;
  occasionType: string;
  date: string;
}
