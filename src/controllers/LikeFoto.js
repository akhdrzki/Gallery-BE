import { prisma } from "../db/PrismaInstance.js";

export const getLikes = async (_, res) => {
  try {
    const response = await prisma.likefoto.findMany({
      include: {
        Foto: true,
        User: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createLike = async (req, res) => {
  const newLike = req.body;

  const checkExist = await prisma.likefoto.findMany({
    where: {
      TanggalLike: newLike.TanggalLike,
    },
  });

  if (checkExist.length > 0)
    return res.status(400).json({ msg: "data exist!" });
  try {
    const currentDate = new Date()
    const cLike = await prisma.likefoto.create({
      data: {
        FotoID: newLike.FotoID,
        UserID: newLike.UserID,
        TanggalLike: currentDate,
      },
    });
    res.status(201).json({ msg: "data created", data: cLike });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
