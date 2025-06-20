export type createCarResponse = {
  car_id: string;
  brand: string;
  modelName: string;
  plateNo: string;
  color: string;
  driver_id: string | null;
  driver?: {
    driver_id: string;
    drivername: string;
    email: string;
    phone: string;
    status: string;
    password: string;
    address: string;
    rating: number;
    createdAt: Date;
    role: string;
  };
};

export type CarDetailsResponse = createCarResponse | null;

export type createCarRequest = {
  brand: string;
  modelName: string;
  plateNo: string;
  color: string;
  driver_id?: string;
};
