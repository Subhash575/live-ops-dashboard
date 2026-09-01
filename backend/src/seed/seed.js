import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Customer from "../models/Customer.js";
import Mechanic from "../models/Mechanic.js";
import Booking from "../models/Booking.js";

dotenv.config();

// Service data
const services = [
  {
    name: "Oil Change",
    category: "Maintenance",
    minPrice: 60,
    maxPrice: 120,
  },
  {
    name: "Brake Inspection",
    category: "Brakes",
    minPrice: 80,
    maxPrice: 150,
  },
  {
    name: "Brake Pad Replacement",
    category: "Brakes",
    minPrice: 180,
    maxPrice: 350,
  },
  {
    name: "Battery Replacement",
    category: "Electrical",
    minPrice: 120,
    maxPrice: 250,
  },
  {
    name: "Tire Service",
    category: "Tires",
    minPrice: 50,
    maxPrice: 180,
  },
  {
    name: "Engine Diagnostics",
    category: "Diagnostics",
    minPrice: 100,
    maxPrice: 220,
  },
  {
    name: "AC Service",
    category: "AC",
    minPrice: 90,
    maxPrice: 200,
  },
];

// Realistic vehicle data
const vehicles = [
  { make: "Toyota", model: "Camry" },
  { make: "Toyota", model: "Corolla" },
  { make: "Honda", model: "Civic" },
  { make: "Honda", model: "Accord" },
  { make: "Ford", model: "F-150" },
  { make: "Ford", model: "Escape" },
  { make: "Chevrolet", model: "Malibu" },
  { make: "Chevrolet", model: "Equinox" },
  { make: "Nissan", model: "Altima" },
  { make: "Nissan", model: "Rogue" },
  { make: "Hyundai", model: "Elantra" },
  { make: "Hyundai", model: "Tucson" },
  { make: "Kia", model: "Sportage" },
  { make: "Kia", model: "Forte" },
  { make: "Mazda", model: "CX-5" },
  { make: "Mazda", model: "Mazda3" },
  { make: "Volkswagen", model: "Jetta" },
  { make: "Volkswagen", model: "Tiguan" },
  { make: "Subaru", model: "Outback" },
  { make: "Subaru", model: "Forester" },
];

// Helper functions
const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomPrice = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

const getBookingData = () => {
  const now = new Date();

  // Random date from 30 days ago to 14 days in the future
  const daysOffset = randomNumber(-30, 14);

  const date = new Date(now);
  date.setDate(date.getDate() + daysOffset);

  date.setHours(randomNumber(8, 18), randomItem([0, 15, 30, 45]), 0, 0);

  let status;

  if (daysOffset < 0) {
    // Past bookings
    status = randomItem(["COMPLETED", "CANCELLED"]);
  } else if (daysOffset === 0) {
    // Today's bookings
    status = randomItem([
      "PENDING",
      "ASSIGNED",
      "ON_THE_WAY",
      "COMPLETED",
      "CANCELLED",
    ]);
  } else {
    // Future bookings
    status = randomItem(["PENDING", "ASSIGNED"]);
  }

  return {
    date,
    status,
  };
};

// Generate customers
const generateCustomers = (count) => {
  const customers = [];

  for (let i = 1; i <= count; i++) {
    customers.push({
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      phone: `306555${String(i).padStart(4, "0")}`,
    });
  }

  return customers;
};

// Generate mechanics
const generateMechanics = (count) => {
  const mechanics = [];

  for (let i = 1; i <= count; i++) {
    mechanics.push({
      name: `Mechanic ${i}`,
      phone: `306777${String(i).padStart(4, "0")}`,
      status: randomItem(["AVAILABLE", "BUSY", "OFFLINE"]),
      jobsCompleted: randomNumber(5, 150),
      currentBookingId: null,
    });
  }

  return mechanics;
};

// Generate bookings
const generateBookings = (customers, mechanics, count) => {
  const bookings = [];

  for (let i = 1; i <= count; i++) {
    const service = randomItem(services);
    const customer = randomItem(customers);
    const vehicle = randomItem(vehicles);

    const { date, status } = getBookingData();

    const mechanic =
      status === "PENDING" || status === "CANCELLED"
        ? null
        : randomItem(mechanics);

    bookings.push({
      bookingId: `BK-${String(i).padStart(5, "0")}`,

      customerId: customer._id,

      mechanicId: mechanic?._id ?? null,

      vehicle: {
        make: vehicle.make,
        model: vehicle.model,
        year: randomNumber(2017, 2026),
      },

      service: service.name,

      category: service.category,

      status,

      amount: randomPrice(service.minPrice, service.maxPrice),

      scheduledAt: date,
    });
  }

  return bookings;
};

// Seed database
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");

    await Booking.deleteMany({});
    await Mechanic.deleteMany({});
    await Customer.deleteMany({});

    // Customers
    console.log("Creating customers...");

    const customerData = generateCustomers(60);

    const customers = await Customer.insertMany(customerData);

    console.log(`${customers.length} customers created`);

    // Mechanics
    console.log("Creating mechanics...");

    const mechanicData = generateMechanics(25);

    const mechanics = await Mechanic.insertMany(mechanicData);

    console.log(`${mechanics.length} mechanics created`);

    // Bookings
    console.log("Creating bookings...");

    const bookingData = generateBookings(customers, mechanics, 600);

    const bookings = await Booking.insertMany(bookingData);

    console.log(`${bookings.length} bookings created`);

    // Finish
    console.log("");
    console.log("=================================");
    console.log("Database seeded successfully!");
    console.log("=================================");
    console.log(`Customers : ${customers.length}`);
    console.log(`Mechanics : ${mechanics.length}`);
    console.log(`Bookings  : ${bookings.length}`);
    console.log("=================================");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();
