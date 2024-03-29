import { prisma } from "../db/PrismaInstance.js";

export const getAlbum = async (_, res) => {
  try {
    const response = await prisma.album.findMany({
      include: {
        foto: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAlbum = async (req, res) => {
  const newAlbum = req.body;

  const checkAlbum = await prisma.album.findMany({
    where: {
      NamaAlbum: newAlbum.NamaAlbum,
    },
  });

  if (checkAlbum.length > 0)
    return res.status(400).json({ msg: "data exist!" });

  try {
    const currentDate = new Date()
    const cAlbum = await prisma.album.create({
      data: {
        NamaAlbum: newAlbum.NamaAlbum,
        Deskripsi: newAlbum.Deskripsi,
        TanggalDibuat: currentDate,
        UserID: newAlbum.UserID,
      },
    });
    res.status(201).json({ msg: "data created", data: cAlbum });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  const paramsId = parseInt(req.params.id);
  const upAlbumData = req.body;

  try {
    const upAlbum = await prisma.album.update({
      where: {
        AlbumID: paramsId,
        UserID: paramsId,
      },

      data: {
        NamaAlbum: upAlbumData.NamaAlbum,
        Deskripsi: upAlbumData.Deskripsi,
        TanggalDibuat: upAlbumData.TanggalDibuat,
        UserID: upAlbumData.UserID,
      },
    });

    res.status(200).json({ msg: "data updated", data: upAlbum });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
