import createHttpError from 'http-errors';
import { ContactCollection } from '../db/models/Contact.js';

export const checkContactUser = async (req, res, next) => {
  const contactId = req.params.contactId;
  console.log(contactId);
  const userId = req.user._id;
  try {
    if (!contactId) {
      const contacts = await ContactCollection.find({ userId: userId });
      res.json(contacts);
      return next();
    }

    const contact = await ContactCollection.findOne({
      _id: contactId,
      userId: userId,
    });

    if (!contact) {
      return next(createHttpError(403, 'Bu veriye erişim izniniz yok.'));
    }

    // veriyi daha sonra kullanmak istersen:
     req.contact = contact;

    next();
  } catch (err) {
    next(err);
  }
};
