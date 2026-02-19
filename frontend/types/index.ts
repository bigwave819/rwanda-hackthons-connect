

export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

export type Event = {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  description: string;
  partners: string;
  status: EventStatus;
  prize: string;
  createdAt: string;
  updatedAt: string;
};


export type registrations = {}

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}