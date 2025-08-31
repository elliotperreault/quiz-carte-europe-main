const country = {
  portugal: "f",
  islande: "a",
  belgique: "i",
  allemagne: "l",
  bulgarie: "w",
  "royaume-uni": "e",
  suède: "b",
  lituanie: "o",
  espagne: "g",
  grèce: "x",
  italie: "m",
  finlande: "c",
  ukraine: "q",
  russie: "v",
  "pays-bas": "j",
  "république tchèque": "u",
  serbie: "s",
  roumanie: "r",
  danemark: "k",
  autriche: "t",
  france: "h",
  croatie: "y",
  pologne: "n",
  hongrie: "z",
};

const capitals = {
  varsovie: "16",
  rome: "12",
  belgrade: "24",
  berne: "11",
  bruxelles: "6",
  vienne: "14",
  oslo: "2",
  prague: "15",
  madrid: "9",
  minsk: "19",
  sarajevo: "13",
  paris: "5",
  helsinki: "4",
  londres: "1",
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const admin = await prisma.admin.findUnique({
//   where: { username: "kim" },
// });
// console.log(admin);

// const admins = await prisma.admin.findMany();
// console.log(admins);

console.log(
  await prisma.admin.create({
    data: {
      username: "kim",
      password: "EuropeQuiz41*",
    },
  })
);

//Country id: 585aae34-95df-4385-b572-5403df10366c
//Capitals id: ce5cc595-141d-43b6-aff0-1a8e5bc58bd3
