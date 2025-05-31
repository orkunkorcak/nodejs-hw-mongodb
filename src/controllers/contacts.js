import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    
};

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
      }
    res.json({
      status: 200,
      message: `Successfully found contact with id: ${id}!`,
      data: contact,
    });
  };

