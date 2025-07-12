

import { faker } from '@faker-js/faker';
import { UserEvent } from "../types/interface";

const eventTypes = ["click", "view", "purchase", "scroll", "submit"];



const generateRandomEvent = (): UserEvent => {
  return {
    userId: faker.internet.userName(),
    eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    timestamp: Date.now(),
  };
};





export default generateRandomEvent;


