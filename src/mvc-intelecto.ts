import mongoose from 'mongoose';
import { Router } from 'express';

const { Schema } = mongoose;

const intelectoSchema = new Schema({
  name: String,
  phone: String,
  course: String,
  created: Date,
});

const IntelectoSchema = mongoose.model('Intelecto', intelectoSchema);

export const intelectoRoutes = (router: Router): void => {
  router.post('/intelecto/week-of-qualification', async (req, res) => {
    const { name, phone, course } = req.body;

    if (!name || name.length <= 2) {
      return res.status(400).send();
    }

    if (!name || name.lenght < 2) {
      return res.status(400).send();
    }

    if (!phone || phone.lenght < 15) {
      return res.status(400).send();
    }

    if (course === 'Selecione o curso') {
      return res.status(400).send();
    }

    const mvcIntelect = new MVCIntelecto();
    await mvcIntelect.save(name, phone, course);

    res.status(201).send();
  });
};

export class MVCIntelecto {
  async save(name: string, phone: string, course: string): Promise<void> {
    const lead = new IntelectoSchema({
      name,
      phone,
      course,
      created: new Date(),
    });

    await lead.save();
  }
}
