import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import  validateBody  from '../middlewares/validateBody.js';
import {
  contactCreateShema,
  contactUpdateShema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';


const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post("/register", isValidId, validateBody(contactCreateShema), ctrlWrapper(createContactController));
router.post('/', validateBody(contactCreateShema), ctrlWrapper(createContactController));
router.delete('/:contactId',isValidId, ctrlWrapper(deleteContactController));
router.patch('/:contactId',isValidId, validateBody(contactUpdateShema), ctrlWrapper(updateContactController));

export default router;
