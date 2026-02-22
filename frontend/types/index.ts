

export type EventStatus = "OPEN" | "CLOSED" | "FINISHED";

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

export type UserRegisteredForEvent = {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export type Registrations = {
  id: string;
  title: string;
  date: string;
  status: EventStatus;
  prize: string;
};