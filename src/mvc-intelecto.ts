/* eslint-disable @typescript-eslint/no-explicit-any */
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

  router.get('/intelecto/get-leads', async (req, res) => {
    const result = await getLeads();

    const todayLead =
      result.leadToday.length > 0
        ? result.leadToday.map((item) => {
            return `<p>
        Nome: ${item.Nome} </br>
        Telefone: ${item.Telefone} </br>
        Curso: ${item.Curso} </br>
      </p>`;
          })
        : 'Nenhum lead hoje!';

    const allLeads = result.allLeads.map((item) => {
      return `<p>
        Nome: ${item.Nome} </br>
        Telefone: ${item.Telefone} </br>
        Curso: ${item.Curso} </br>
      </p>`;
    });

    const htmlResult = `
      <h1>All Leads: </h1>
      ${allLeads.toString().replace(/,/g, '')}
      </br>
      <h1>All Leads Count</h1>
      <p>${result.allLeadsCount}</p>
      <h1>Today Leads</h1>
      ${todayLead.toString().replace(/,/g, '')}
      <h1>Today Leads Count</h1>
      <p>${result.leadsTodayCount}</p>
    `;
    res.status(200).send(htmlResult);
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

  async getAllLeads(): Promise<resultLeads> {
    const todayLeads = await IntelectoSchema.find({
      created: { $gte: new Date(new Date().toDateString()), $lt: new Date() },
    });
    const allLeads = await IntelectoSchema.find();

    return {
      todayLeads,
      allLeads,
    } as any;
  }
}

interface resultLeads {
  todayLeads: any[];
  allLeads: any[];
}

type Lead = {
  Nome: string;
  Telefone: string;
  Curso: string;
  Data: Date;
};

const getLeads = async () => {
  const mvcIntelecto = new MVCIntelecto();
  const { todayLeads, allLeads } = await mvcIntelecto.getAllLeads();

  const allLeadsFormat: Lead[] = allLeads.map((item) => ({
    Nome: item.name,
    Telefone: item.phone,
    Curso: item.course,
    Data: item.created,
  }));

  const allLeadsUniques = [];

  allLeadsFormat.forEach((item) => {
    if (allLeadsUniques.map((item) => item.Nome).includes(item.Nome)) return;

    allLeadsUniques.push(item);
  });

  const todayLeadsFormat = todayLeads.map((item) => ({
    Nome: item.name,
    Telefone: item.phone,
    Curso: item.course,
    Data: item.created,
  }));

  return {
    allLeads: allLeadsUniques,
    allLeadsCount: allLeadsUniques.length,
    leadToday: todayLeadsFormat,
    leadsTodayCount: todayLeadsFormat.length,
  };
};
